const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectToMongo } = require('./netlify/functions/lib/mongo');
const { buildBlogPost } = require('./netlify/functions/models/blogPost');

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const DATABASE_NAME = process.env.MONGO_DB_NAME || 'my_blog';
const COLLECTION_NAME = process.env.MONGO_COLLECTION_NAME || 'blog_posts';

app.use(cors());
app.use(express.json());

function jsonResponse(res, statusCode, body) {
  return res.status(statusCode).json(body);
}

async function fetchReadme(sourceRepo, branch = 'main', sourcePath = 'README.md') {
  const rawUrl = `https://raw.githubusercontent.com/${sourceRepo}/${branch}/${sourcePath}`;
  const response = await fetch(rawUrl);
  if (!response.ok) {
    throw new Error(`Unable to fetch README from GitHub: ${response.status} ${response.statusText}`);
  }
  return await response.text();
}

async function fetchCommitDate(sourceRepo, branch = 'main', sourcePath = 'README.md') {
  const commitsUrl = `https://api.github.com/repos/${sourceRepo}/commits?path=${encodeURIComponent(sourcePath)}&per_page=1&sha=${encodeURIComponent(branch)}`;
  const response = await fetch(commitsUrl);
  if (!response.ok) {
    throw new Error(`Unable to fetch commit metadata from GitHub: ${response.status} ${response.statusText}`);
  }
  const commits = await response.json();
  if (!Array.isArray(commits) || commits.length === 0) {
    throw new Error('No commits found for README path.');
  }
  return commits[0]?.commit?.committer?.date || commits[0]?.commit?.author?.date || new Date().toISOString();
}

async function getCollection() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI environment variable is required.');
  }

  const client = await connectToMongo(MONGO_URI);
  return client.db(DATABASE_NAME).collection(COLLECTION_NAME);
}

app.get('/api/blog', async (req, res) => {
  try {
    const collection = await getCollection();
    const { sourceRepo, sourcePath = 'README.md', branch = 'main', title, description, coverImageUrl, authorName, sourceUrl } = req.query;

    if (sourceRepo) {
      const markdown = await fetchReadme(sourceRepo, branch, sourcePath);
      const commitDate = await fetchCommitDate(sourceRepo, branch, sourcePath);
      const blogPost = buildBlogPost({
        sourceRepo,
        sourcePath,
        branch,
        markdown,
        commitDate,
        env: process.env,
        metadata: {
          title,
          description,
          coverImageUrl,
          authorName,
          sourceUrl,
        },
      });

      await collection.updateOne(
        { id: blogPost.id },
        { $set: { ...blogPost, updatedAt: new Date().toISOString() } },
        { upsert: true }
      );
    }

    const posts = await collection.find({}).sort({ publishedAt: -1 }).toArray();
    return jsonResponse(res, 200, posts);
  } catch (error) {
    console.error('Local server GET /api/blog error:', error);
    return jsonResponse(res, 500, { error: 'Unable to load blog posts.' });
  }
});

app.post('/api/blog', async (req, res) => {
  try {
    const collection = await getCollection();
    const { sourceRepo, sourcePath = 'README.md', branch = 'main', title, description, coverImageUrl, authorName, sourceUrl } = req.body;

    if (!sourceRepo) {
      return jsonResponse(res, 400, { error: 'sourceRepo is required for blog seeding.' });
    }

    const markdown = await fetchReadme(sourceRepo, branch, sourcePath);
    const commitDate = await fetchCommitDate(sourceRepo, branch, sourcePath);
    const blogPost = buildBlogPost({
      sourceRepo,
      sourcePath,
      branch,
      markdown,
      commitDate,
      env: process.env,
      metadata: {
        title,
        description,
        coverImageUrl,
        authorName,
        sourceUrl,
      },
    });

    await collection.updateOne(
      { id: blogPost.id },
      { $set: { ...blogPost, updatedAt: new Date().toISOString() } },
      { upsert: true }
    );

    return jsonResponse(res, 200, { success: true, post: blogPost });
  } catch (error) {
    console.error('Local server POST /api/blog error:', error);
    return jsonResponse(res, 500, { error: 'Unable to seed blog post.' });
  }
});

app.listen(PORT, () => {
  console.log(`Local blog API server running on http://localhost:${PORT}`);
});
