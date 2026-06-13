import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Container } from '../styles/GlobalStyle';
import SEO from '../components/SEO';
import { getPostBySlug, BlogPost, formatPostDate } from '../utils/blog';
import { FullScreenLoading } from '../components/LoadingSpinner';

const slugifyHeading = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/`/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const extractHeadings = (markdown: string) => {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: Array<{ text: string; id: string; level: number }> = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const rawText = match[2].trim();
    const text = rawText.replace(/\s*#\s*$/, '').replace(/\[|\]|\(|\)|`/g, '');
    headings.push({ text, id: slugifyHeading(text), level });
  }

  return headings;
};

const BlogDetailSection = styled.section`
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: var(--spacing-20);
  position: relative;
`;

const Header = styled.div`
  max-width: 860px;
  margin: 0 auto var(--spacing-12);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
`;

const ContentLayout = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;

  @media (min-width: 1024px) {
    padding-left: calc(56px + var(--spacing-4) + 24px);
    padding-right: 340px;
    max-width: calc(100vw - 412px);
  }
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding-right: 0;

  @media (min-width: 1024px) {
    padding-right: 0;
  }
`;

const TOCPanel = styled.aside`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    position: fixed;
    top: calc(var(--spacing-8) + 120px);
    right: 24px;
    width: 300px;
    max-height: calc(100vh - 160px);
    overflow-y: auto;
    overflow-x: hidden;
    padding: var(--spacing-6);
    border-radius: var(--radius-2xl);
    background: rgba(9, 9, 11, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.18);
  }
`;

const TOCHeader = styled.h2`
  margin: 0 0 var(--spacing-4);
  font-size: 1rem;
  color: var(--text-100);
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const TOCList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const TOCItem = styled.li<{ level: number; $active?: boolean }>`
  margin: 0 0 0.75rem 0;
  padding-left: ${props => props.level > 2 ? `${(props.level - 2) * 1.25}rem` : '0'};
  background: ${props => props.$active ? 'rgba(100, 255, 218, 0.08)' : 'transparent'};
  border-radius: var(--radius-md);
`;

const TOCLink = styled.a`
  color: var(--text-200);
  text-decoration: none;
  transition: color 0.2s ease;
  display: inline-block;
  word-break: break-word;
  white-space: normal;

  &:hover {
    color: var(--accent-primary);
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-primary);
  text-decoration: none;
  font-size: var(--text-sm);

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: var(--font-extrabold);
  margin: 0;
  color: var(--text-100);
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
  color: var(--dark-400);
  font-size: var(--text-sm);
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
`;

const TagItem = styled.span`
  color: var(--accent-primary);
  background: rgba(100, 255, 218, 0.08);
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(100, 255, 218, 0.18);
`;

const CoverImage = styled.div<{ $imageUrl?: string }>`
  width: 100%;
  min-height: 300px;
  border-radius: var(--radius-2xl);
  background: ${props => props.$imageUrl
    ? `url(${props.$imageUrl})`
    : 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'};
  background-size: cover;
  background-position: center;
  margin: var(--spacing-8) 0;
`;

const MarkdownContent = styled.article`
  max-width: 900px;
  margin: 0 auto;
  color: var(--text-200);
  line-height: 1.95;
  font-size: var(--text-base);

  h1, h2, h3, h4, h5, h6 {
    color: var(--text-100);
    margin-top: var(--spacing-8);
    margin-bottom: var(--spacing-4);
    line-height: 1.2;
  }

  h2 {
    font-size: clamp(1.75rem, 3vw, 2.5rem);
  }

  h3 {
    font-size: clamp(1.5rem, 2.5vw, 2rem);
  }

  p {
    margin: var(--spacing-3) 0;
  }

  strong {
    color: var(--text-100);
  }

  a {
    color: var(--accent-primary);
    text-decoration: underline;
  }

  blockquote {
    border-left: 4px solid rgba(100, 255, 218, 0.4);
    margin: var(--spacing-6) 0;
    padding: var(--spacing-4) var(--spacing-5);
    background: rgba(255, 255, 255, 0.02);
    color: var(--text-200);
  }

  pre {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--radius-xl);
    overflow: auto;
    padding: var(--spacing-4);
    margin: var(--spacing-6) 0;
  }

  code {
    background: rgba(255, 255, 255, 0.06);
    border-radius: 0.5rem;
    padding: 0.2rem 0.4rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: var(--spacing-6) 0;
  }

  th, td {
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 0.9rem 1rem;
  }

  th {
    background: rgba(255, 255, 255, 0.04);
    font-weight: 700;
  }

  ul, ol {
    margin: var(--spacing-4) 0;
    padding-left: 1.25rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-20) var(--spacing-6);
  color: var(--dark-400);
`;

const ErrorState = styled(EmptyState)`
  h2 {
    color: var(--error, #ef4444);
  }
`;

const BlogDetail: React.FC = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const tocItemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const loadedPost = await getPostBySlug(slug);
        if (!loadedPost) {
          setError(true);
        } else {
          setPost(loadedPost);
        }
      } catch (err) {
        console.error('Unable to load blog detail:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const headings = useMemo(() => {
    if (!post?.content) return [];
    return extractHeadings(post.content);
  }, [post]);

  useEffect(() => {
    if (!headings.length) {
      setActiveHeadingId('');
      return;
    }

    const handleScroll = () => {
      const offset = 120;
      let currentId = headings[0]?.id || '';

      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (!element) return;
        const top = element.getBoundingClientRect().top;
        if (top <= offset) {
          currentId = heading.id;
        }
      });

      setActiveHeadingId(currentId);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  useEffect(() => {
    if (!activeHeadingId) return;
    const activeItem = tocItemRefs.current[activeHeadingId];
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }, [activeHeadingId]);

  const renderHeading = (level: number) => {
    return (props: any) => {
      const children = props.children;
      const text = Array.isArray(children)
        ? children.flatMap((child: any) =>
            typeof child === 'string' ? child : child?.props?.children || ''
          ).join('')
        : typeof children === 'string'
        ? children
        : '';
      const id = slugifyHeading(String(text));
      return React.createElement(`h${level}`, { id }, children);
    };
  };

  if (loading) {
    return <FullScreenLoading text="Loading blog post..." />;
  }

  if (error || !post) {
    return (
      <BlogDetailSection>
        <Container>
          <ErrorState>
            <h2>Blog post not found</h2>
            <p>We couldn't load that blog post. Please go back to the blog list.</p>
            <BackLink to="/blog">← Back to blog</BackLink>
          </ErrorState>
        </Container>
      </BlogDetailSection>
    );
  }

  const tags = post.tags?.map((tag) => `#${tag.name}`) || [
    `#${post.sourceRepo?.split('/')[1] ?? 'blog'}`,
    '#readme',
  ];

  return (
    <>
      <SEO
        title={`${post.title} — Lại Minh Sáng Blog`}
        description={post.brief}
        keywords={`${post.title}, ${post.author.name}, README blog, ${post.sourceRepo}`}
        image={post.coverImage?.url}
        url={`https://yoonique.netlify.app/blog/${post.slug}`}
        type="article"
        publishedAt={post.publishedAt}
        tags={tags}
      />
      <BlogDetailSection>
        <Container>
          <Header>
            <BackLink to="/blog">← Back to blog</BackLink>
            <TagList>
              {tags.map((tag) => (
                <TagItem key={tag}>{tag}</TagItem>
              ))}
            </TagList>
            <Title>{post.title}</Title>
            <Meta>
              <span>By {post.author.name}</span>
              <span>{formatPostDate(post.publishedAt)}</span>
            </Meta>
          </Header>

          <ContentLayout>
            <MainContent>
              <CoverImage $imageUrl={post.coverImage?.url} />

              <MarkdownContent>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: renderHeading(2),
                    h3: renderHeading(3),
                    h4: renderHeading(4),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </MarkdownContent>
            </MainContent>

            {headings.length > 0 && (
              <TOCPanel>
                <TOCHeader>Table of contents</TOCHeader>
                <TOCList>
                  {headings.map((heading) => (
                    <TOCItem
                      key={heading.id}
                      level={heading.level}
                      $active={heading.id === activeHeadingId}
                      ref={(el) => { tocItemRefs.current[heading.id] = el; }}
                    >
                      <TOCLink href={`#${heading.id}`}>
                        {heading.text}
                      </TOCLink>
                    </TOCItem>
                  ))}
                </TOCList>
              </TOCPanel>
            )}
          </ContentLayout>
        </Container>
      </BlogDetailSection>
    </>
  );
};

export default BlogDetail;
