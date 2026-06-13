const { connectToMongo } = require('./lib/mongo');
const { buildBlogPost } = require('./models/blogPost');

const MONGO_URI = process.env.MONGO_URI;
const DATABASE_NAME = process.env.MONGO_DB_NAME || 'my_blog';
const COLLECTION_NAME = process.env.MONGO_COLLECTION_NAME || 'blog_posts';

function jsonResponse(statusCode, body) {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age=60, s-maxage=60',
        },
        body: JSON.stringify(body),
    };
}

async function fetchReadme(sourceRepo, branch = 'main', sourcePath = 'README.md') {
    const rawUrl = `https://raw.githubusercontent.com/${sourceRepo}/${branch}/${sourcePath}`;
    const response = await fetch(rawUrl, { headers: { 'User-Agent': 'netlify-blog-fetcher' } });
    if (!response.ok) {
        throw new Error(`Unable to fetch README from GitHub: ${response.status} ${response.statusText}`);
    }
    return await response.text();
}

async function fetchCommitDate(sourceRepo, branch = 'main', sourcePath = 'README.md') {
    const commitsUrl = `https://api.github.com/repos/${sourceRepo}/commits?path=${encodeURIComponent(sourcePath)}&per_page=1&sha=${encodeURIComponent(branch)}`;
    const response = await fetch(commitsUrl, { headers: { 'User-Agent': 'netlify-blog-fetcher' } });
    if (!response.ok) {
        throw new Error(`Unable to fetch commit metadata from GitHub: ${response.status} ${response.statusText}`);
    }
    const commits = await response.json();
    if (!Array.isArray(commits) || commits.length === 0) {
        throw new Error('No commits found for README path.');
    }
    return commits[0]?.commit?.committer?.date || commits[0]?.commit?.author?.date || new Date().toISOString();
}

function parseRequestBody(event) {
    if (!event.body) return {};

    try {
        return JSON.parse(event.body);
    } catch (error) {
        return {};
    }
}

exports.handler = async function (event) {
    if (!MONGO_URI) {
        return jsonResponse(500, { error: 'MONGO_URI environment variable is required.' });
    }

    try {
        const client = await connectToMongo(MONGO_URI);
        const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);

        if (event.httpMethod === 'POST') {
            const body = parseRequestBody(event);
            const sourceRepo = body.sourceRepo;
            const sourcePath = body.sourcePath || 'README.md';
            const branch = body.branch || 'main';

            if (!sourceRepo) {
                return jsonResponse(400, { error: 'sourceRepo is required for blog seeding.' });
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
                    title: body.title,
                    description: body.description,
                    coverImageUrl: body.coverImageUrl,
                    authorName: body.authorName,
                    sourceUrl: body.sourceUrl,
                },
            });

            await collection.updateOne(
                { id: blogPost.id },
                { $set: { ...blogPost, updatedAt: new Date().toISOString() } },
                { upsert: true }
            );

            return jsonResponse(200, { success: true, post: blogPost });
        }

        if (event.httpMethod === 'GET') {
            const params = event.queryStringParameters || {};
            const sourceRepo = params.sourceRepo || params.repo;
            const sourcePath = params.sourcePath || params.path || 'README.md';
            const branch = params.branch || 'main';

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
                        title: params.title,
                        description: params.description,
                        coverImageUrl: params.coverImageUrl,
                        authorName: params.authorName,
                        sourceUrl: params.sourceUrl,
                    },
                });

                await collection.updateOne(
                    { id: blogPost.id },
                    { $set: { ...blogPost, updatedAt: new Date().toISOString() } },
                    { upsert: true }
                );
            }

            const posts = await collection.find({}).sort({ publishedAt: -1 }).toArray();
            return jsonResponse(200, posts);
        }

        return jsonResponse(405, { error: 'Method not allowed. Use GET or POST.' });
    } catch (error) {
        console.error('Blog function error:', error);
        return jsonResponse(500, { error: 'Unable to load blog posts.' });
    }
};
