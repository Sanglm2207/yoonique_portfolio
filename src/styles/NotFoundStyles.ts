import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 60px 20px;
`;

export const Code = styled(motion.span)`
  font-size: clamp(6rem, 20vw, 10rem);
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.05em;
`;

export const Title = styled(motion.h1)`
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  color: var(--dark-200);
  margin: var(--spacing-4) 0 var(--spacing-3);
`;

export const Sub = styled(motion.p)`
  color: var(--dark-400);
  font-size: var(--text-base);
  margin-bottom: var(--spacing-8);
`;

export const HomeLink = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-8);
  background: var(--accent-gradient);
  color: var(--dark-950);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
    color: var(--dark-950);
  }
`;
