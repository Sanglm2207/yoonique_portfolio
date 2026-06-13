function parseTitle(markdown, fallbackTitle) {
    const headingMatch = markdown.match(/^#\s+(.+)$/m);
    if (headingMatch) {
        return headingMatch[1].trim();
    }
    return fallbackTitle || 'Blog Update';
}

function parseExcerpt(markdown) {
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

function parseFirstImage(markdown) {
    const match = markdown.match(/!\[[^\]]*\]\((https?:\/\/[^)]+)\)/);
    if (match) {
        return match[1];
    }
    return null;
}

function buildBlogPost({
    sourceRepo,
    sourcePath,
    branch,
    markdown,
    commitDate,
    env,
    metadata = {},
}) {
    const rawAuthor = metadata.authorName || env.BLOG_AUTHOR || sourceRepo.split('/')[0] || 'Unknown';
    const title = metadata.title || env.BLOG_TITLE || parseTitle(markdown, 'Blog Post');
    const imageFromMarkdown = parseFirstImage(markdown);
    const coverImageUrl =
        imageFromMarkdown ||
        metadata.coverImageUrl ||
        env.BLOG_COVER_IMAGE_URL ||
        'https://via.placeholder.com/1200x630?text=Blog+Cover';

    return {
        id: `${sourceRepo}:${sourcePath}`,
        title,
        brief: metadata.description || env.BLOG_DESCRIPTION || parseExcerpt(markdown),
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        url: metadata.sourceUrl || env.BLOG_SOURCE_URL || `https://github.com/${sourceRepo}/blob/${branch}/${sourcePath}`,
        publishedAt: commitDate,
        coverImage: coverImageUrl ? { url: coverImageUrl } : undefined,
        author: {
            name: rawAuthor,
        },
        tags: [],
        content: markdown,
        sourceRepo,
        sourcePath,
        sourceBranch: branch,
    };
}

module.exports = { buildBlogPost };
