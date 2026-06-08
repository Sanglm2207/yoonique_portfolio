import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Section } from './GlobalStyle';

// --- Hero ---

export const ContactHero = styled(Section)`
  padding-top: 120px;
  padding-bottom: 60px;
  text-align: center;
  position: relative;
  overflow: hidden;

  /* Ambient background glow */
  &::before {
    content: '';
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(100, 255, 218, 0.03) 0%, transparent 70%);
    z-index: -1;
    pointer-events: none;
  }
`;

export const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: var(--spacing-6);
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: var(--font-extrabold);
  letter-spacing: -0.025em;
`;

export const HeroSubtitle = styled(motion.p)`
  font-size: var(--text-xl);
  color: var(--dark-300);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

export const ContactContent = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-12);
  align-items: start;
  padding-bottom: 100px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-12);
  }
`;

// Left Column: Contact Info
export const InfoColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
`;

export const InfoCard = styled(motion.div)`
  background: rgba(30, 41, 59, 0.3);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8);
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(100, 255, 218, 0.2);
  }
`;

export const InfoTitle = styled.h3`
  font-size: var(--text-xl);
  color: var(--dark-100);
  margin-bottom: var(--spacing-4);
  font-weight: var(--font-bold);
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
`;

export const InfoText = styled.div`
  color: var(--dark-400);
  line-height: 1.6;
  font-size: var(--text-base);

  p {
    margin-bottom: var(--spacing-3);
    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    color: var(--accent-primary);
    text-decoration: none;
    transition: opacity 0.2s ease;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-3);
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-2);
  }
`;

export const SocialCardButton = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-xl);
  color: var(--dark-300);
  text-decoration: none;
  transition: all 0.3s ease;
  gap: var(--spacing-2);

  @media (max-width: 480px) {
    padding: var(--spacing-3);
    border-radius: var(--radius-lg);
    gap: var(--spacing-1);
  }

  span {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    
    @media (max-width: 480px) {
      font-size: var(--text-xs);
    }
  }

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
    margin-bottom: 4px;
    
    @media (max-width: 480px) {
      width: 20px;
      height: 20px;
      margin-bottom: 2px;
    }
  }

  &:hover {
    background: rgba(100, 255, 218, 0.1);
    border-color: var(--accent-primary);
    transform: translateY(-4px);
    color: var(--accent-primary);
    box-shadow: 0 4px 12px rgba(100, 255, 218, 0.15);
  }
`;

// Right Column: Contact Form
export const FormColumn = styled(motion.div)`
  position: relative;
`;

export const StyledForm = styled.form`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 640px) {
    padding: var(--spacing-6);
  }
`;

export const FormGroup = styled.div`
  margin-bottom: var(--spacing-6);
  position: relative;
`;

export const Label = styled.label`
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--dark-300);
  margin-bottom: var(--spacing-2);
  margin-left: 4px;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 14px 16px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid ${props => props.$hasError ? 'var(--error)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: var(--radius-lg);
  color: var(--dark-100);
  font-size: var(--text-base);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? 'var(--error)' : 'var(--accent-primary)'};
    background: rgba(15, 23, 42, 0.8);
    box-shadow: 0 0 0 4px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(100, 255, 218, 0.1)'};
  }

  &::placeholder {
    color: var(--dark-500);
  }
`;

export const Textarea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  padding: 14px 16px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid ${props => props.$hasError ? 'var(--error)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: var(--radius-lg);
  color: var(--dark-100);
  font-size: var(--text-base);
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? 'var(--error)' : 'var(--accent-primary)'};
    background: rgba(15, 23, 42, 0.8);
    box-shadow: 0 0 0 4px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(100, 255, 218, 0.1)'};
  }

  &::placeholder {
    color: var(--dark-500);
  }
`;

export const ErrorText = styled(motion.span)`
  display: block;
  color: var(--error);
  font-size: var(--text-xs);
  margin-top: 6px;
  margin-left: 4px;
`;

export const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 16px;
  background: var(--accent-gradient);
  color: var(--dark-950);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: var(--font-bold);
  font-size: var(--text-base);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(100, 255, 218, 0.25);
  }
`;

export const StatusMessage = styled(motion.div)<{ type: 'success' | 'error' }>`
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  margin-top: var(--spacing-6);
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  background: ${props => props.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  border: 1px solid ${props => props.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  color: ${props => props.type === 'success' ? 'var(--success)' : 'var(--error)'};
  font-size: var(--text-sm);
`;
