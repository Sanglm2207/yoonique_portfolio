export interface BlogPost {
    id: string;
    title: string;
    brief: string;
    slug?: string;
    url: string;
    publishedAt: string;
    coverImage?: { url: string };
    author: { name: string; profilePicture?: string };
    tags?: Array<{ name: string; slug: string }>;
    content?: string;
    sourceRepo?: string;
    sourcePath?: string;
    sourceBranch?: string;
}

const API_PATH = '/api/blog';
const FALLBACK_GITHUB_REPO = import.meta.env.VITE_GITHUB_BLOG_REPO || '';
const FALLBACK_GITHUB_BRANCH = import.meta.env.VITE_GITHUB_BLOG_BRANCH || 'main';
const FALLBACK_GITHUB_PATH = import.meta.env.VITE_GITHUB_BLOG_README_PATH || 'README.md';

async function fetchBlogPosts(): Promise<BlogPost[]> {
    const response = await fetch(API_PATH, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        return (await response.json()) as BlogPost[];
    }

    if (FALLBACK_GITHUB_REPO) {
        console.warn(`Blog API unavailable (${response.status}); falling back to GitHub README source.`);
        const fallbackPost = await fetchFallbackPost(
            FALLBACK_GITHUB_REPO,
            FALLBACK_GITHUB_BRANCH,
            FALLBACK_GITHUB_PATH
        );
        return [fallbackPost];
    }

    throw new Error(`Blog API error: ${response.status}`);
}

async function fetchFallbackPost(sourceRepo: string, branch: string, path: string): Promise<BlogPost> {
    const markdownUrl = `https://raw.githubusercontent.com/${sourceRepo}/${branch}/${path}`;
    const commitUrl = `https://api.github.com/repos/${sourceRepo}/commits?path=${encodeURIComponent(path)}&per_page=1&sha=${encodeURIComponent(branch)}`;

    const markdownResp = await fetch(markdownUrl);
    let commitDate = new Date().toISOString();

    if (!markdownResp.ok) {
        throw new Error(`Fallback markdown fetch failed: ${markdownResp.status}`);
    }

    const markdown = await markdownResp.text();

    try {
        const commitResp = await fetch(commitUrl);
        if (commitResp.ok) {
            const commits = await commitResp.json();
            commitDate = commits[0]?.commit?.committer?.date || commits[0]?.commit?.author?.date || commitDate;
        } else {
            console.warn(`GitHub commit fetch returned ${commitResp.status}; using current date instead.`);
        }
    } catch (commitError) {
        console.warn('GitHub commit fetch failed:', commitError);
    }

    return {
        id: `${sourceRepo}:${path}`,
        title: parseTitle(markdown),
        brief: parseExcerpt(markdown),
        url: `https://github.com/${sourceRepo}/blob/${branch}/${path}`,
        publishedAt: commitDate,
        coverImage: { url: parseFirstImage(markdown) || 'https://via.placeholder.com/1200x630?text=Blog+Cover' },
        author: { name: sourceRepo.split('/')[0] },
        tags: [],
        content: markdown,
        sourceRepo,
        sourcePath: path,
        sourceBranch: branch,
    };
}

function parseTitle(markdown: string): string {
    const match = markdown.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : 'Blog Post';
}

function parseExcerpt(markdown: string): string {
    const cleaned = markdown
        .replace(/(!\[[^\]]*\]\([^\)]+\))/g, '')
        .replace(/(```[\s\S]*?```)/g, '')
        .replace(/`[^`]*`/g, '')
        .replace(/#{1,6}\s*/g, '')
        .replace(/\[(.*?)\]\([^\)]+\)/g, '$1')
        .replace(/\n{2,}/g, '\n')
        .trim();

    return cleaned.split('\n').find(Boolean)?.slice(0, 220) || '';
}

function parseFirstImage(markdown: string): string | null {
    const match = markdown.match(/!\[[^\]]*\]\((https?:\/\/[^)]+)\)/);
    return match ? match[1] : null;
}

export async function getLatestPosts(limit = 3): Promise<BlogPost[]> {
    const posts = await fetchBlogPosts();
    return posts.slice(0, limit);
}

export async function getAllPosts(): Promise<BlogPost[]> {
    return await fetchBlogPosts();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await fetchBlogPosts();
    return posts.find((post) => post.slug === slug) || null;
}

export function formatPostDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}
