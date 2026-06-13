const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const { buildBlogPost } = require('../netlify/functions/models/blogPost');

const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const [key, ...rest] = trimmed.split('=');
    process.env[key] = rest.join('=').trim();
  });
}

const MONGO_URI = process.env.MONGO_URI;
const DATABASE_NAME = process.env.MONGO_DB_NAME || 'my_blog';
const COLLECTION_NAME = process.env.MONGO_COLLECTION_NAME || 'blog_posts';

async function fetchReadme(sourceRepo, branch = 'main', sourcePath = 'README.md') {
  const rawUrl = `https://raw.githubusercontent.com/${sourceRepo}/${branch}/${sourcePath}`;
  const response = await fetch(rawUrl, {
    headers: { 'User-Agent': 'seed-blog-script' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch README: ${response.status} ${response.statusText}`);
  }

  return await response.text();
}

async function fetchCommitDate(sourceRepo, branch = 'main', sourcePath = 'README.md') {
  const commitsUrl = `https://api.github.com/repos/${sourceRepo}/commits?path=${encodeURIComponent(sourcePath)}&per_page=1&sha=${encodeURIComponent(branch)}`;
  const response = await fetch(commitsUrl, {
    headers: { 'User-Agent': 'seed-blog-script' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch commit metadata: ${response.status} ${response.statusText}`);
  }

  const commits = await response.json();
  if (!Array.isArray(commits) || commits.length === 0) {
    throw new Error('No commits found for README path.');
  }

  return commits[0]?.commit?.committer?.date || commits[0]?.commit?.author?.date || new Date().toISOString();
}

async function main() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not set in .env');
  }

  const sourceRepo = 'Sanglm2207/reliable-commerce-data-product';
  const sourcePath = 'README.md';
  const branch = 'main';

  console.log(`Seeding blog post from ${sourceRepo}/${sourcePath} (${branch})`);

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
      title: 'Reliable Commerce Data Product',
      description: 'Blog content seeded from the GitHub README for the Reliable Commerce Data Product repository.',
      coverImageUrl: 'https://via.placeholder.com/1200x630?text=Blog+Cover',
      authorName: 'Sanglm2207',
      sourceUrl: `https://github.com/${sourceRepo}/blob/${branch}/${sourcePath}`,
    },
  });

  const client = new MongoClient(MONGO_URI);
  await client.connect();

  const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
  const result = await collection.updateOne(
    { id: blogPost.id },
    { $set: { ...blogPost, updatedAt: new Date().toISOString() } },
    { upsert: true }
  );

  console.log('Seed complete:', result.upsertedId ? 'Inserted new post' : 'Updated existing post');
  console.log('Blog post id:', blogPost.id);
  console.log('Title:', blogPost.title);
  await client.close();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
