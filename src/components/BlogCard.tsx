import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BlogPost, formatPostDate } from '../utils/blog';

// Styled Components
const LinkCard = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const Card = styled(motion.article)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(100, 255, 218, 0.3);
    box-shadow: 0 20px 40px rgba(100, 255, 218, 0.1);
  }
`;

const CoverImage = styled.div<{ $imageUrl?: string }>`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${props => props.$imageUrl
    ? `url(${props.$imageUrl})`
    : 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
  };
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(9, 9, 11, 0.8) 100%);
  }
`;

const Content = styled.div`
  padding: var(--spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  flex: 1;
`;

const Title = styled.h3`
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--dark-100);
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Excerpt = styled.p`
  font-size: var(--text-sm);
  color: var(--dark-400);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  margin-top: var(--spacing-4);
`;

const TagPill = styled.span`
  font-size: var(--text-xs);
  color: var(--accent-primary);
  background: rgba(100, 255, 218, 0.08);
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(100, 255, 218, 0.2);
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-3);
  padding-top: var(--spacing-3);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: auto;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: var(--spacing-2);
  }
`;

const Author = styled.span`
  font-size: var(--text-xs);
  color: var(--dark-400);
`;

const Date = styled.time`
  font-size: var(--text-xs);
  color: var(--dark-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formattedDate = formatPostDate(post.publishedAt);
  const displayTags = post.tags?.slice(0, 3) || [
    { name: 'blog', slug: 'blog' },
    { name: 'readme', slug: 'readme' },
  ];
  const postSlug = post.slug || encodeURIComponent(post.id);

  return (
    <LinkCard to={`/blog/${postSlug}`}>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <CoverImage $imageUrl={post.coverImage?.url} />

        <Content>
          <Title>{post.title}</Title>

          <Excerpt>{post.brief}</Excerpt>

          {displayTags.length > 0 && (
            <TagRow>
              {displayTags.map((tag) => (
                <TagPill key={tag.slug}>#{tag.name}</TagPill>
              ))}
            </TagRow>
          )}

          <Meta>
            <Author>By {post.author.name}</Author>
            <Date dateTime={post.publishedAt}>{formattedDate}</Date>
          </Meta>
        </Content>
      </Card>
    </LinkCard>
  );
};

export default BlogCard;
