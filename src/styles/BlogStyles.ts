import styled from 'styled-components';
import { motion } from 'framer-motion';

export const BlogSection = styled.section`
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: var(--spacing-20);
  position: relative;

  /* Background gradient */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50vw;
    height: 50vh;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%);
    pointer-events: none;
    z-index: -1;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-16);
`;

export const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: var(--font-extrabold);
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-4);
  letter-spacing: -0.025em;
  line-height: 1.2;
  padding-bottom: 0.1em;
`;

export const Subtitle = styled(motion.p)`
  font-size: var(--text-lg);
  color: var(--dark-400);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

export const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 350px), 1fr));
  gap: var(--spacing-8);
  margin-top: var(--spacing-12);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
  }
`;

export const EmptyState = styled(motion.div)`
  text-align: center;
  padding: var(--spacing-20) var(--spacing-6);
  color: var(--dark-400);

  h2 {
    font-size: var(--text-2xl);
    color: var(--dark-200);
    margin-bottom: var(--spacing-4);
  }

  p {
    font-size: var(--text-base);
    margin-bottom: var(--spacing-6);
  }

  a {
    color: var(--accent-primary);
    text-decoration: none;
    font-weight: var(--font-medium);
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorState = styled(EmptyState)`
  h2 {
    color: var(--error, #ef4444);
  }
`;
