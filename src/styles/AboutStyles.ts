import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section } from './GlobalStyle';

// --- Hero ---

export const AboutHero = styled(Section)`
  padding-top: 140px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding-top: 120px;
    padding-left: var(--spacing-4);
    padding-right: var(--spacing-4);
  }
  
  @media (max-width: 480px) {
    padding-top: 100px;
    padding-left: var(--spacing-3);
    padding-right: var(--spacing-3);
  }
`;

export const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 3.5rem);
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
  color: var(--dark-400);
  max-width: 600px;
  margin: 0 auto var(--spacing-8);
  line-height: 1.7;
`;

export const ResumeButtonWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-8);
`;

export const AboutImageSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-16);
  
  @media (max-width: 968px) {
    margin-bottom: var(--spacing-8); /* Reduced gap on mobile */
  }
  
  @media (max-width: 640px) {
    margin-bottom: var(--spacing-6); /* Even tighter on small screens */
  }
`;

export const AboutImageContainer = styled.div`
  position: relative;
  width: 450px;
  height: 450px;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  border: 2px solid var(--dark-800);
  box-shadow: var(--shadow-lg);
  margin: 0 auto;
  transition: var(--transition-normal);

  &:hover {
    border-color: var(--accent-primary);
  }

  @media (max-width: 768px) {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 480px) {
    width: 360px;
    height: 360px;
    margin: 0 auto;
  }
  
  @media (max-width: 360px) {
    width: 320px;
    height: 320px;
  }
`;

export const AboutImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-normal);

  &:hover {
    transform: scale(1.05);
  }
`;

// --- Journey Section ---

export const JourneySection = styled(Section)`
  position: relative;
  overflow: hidden;
`;

export const JourneyHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-20);
  position: relative;
  z-index: 2;
`;

export const JourneyTitle = styled(motion.h2)`
  font-size: var(--text-4xl);
  color: var(--dark-100);
  margin-bottom: var(--spacing-4);
  display: inline-block;
  position: relative; /* For Pseudo-element */
  
  &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: var(--accent-gradient);
      border-radius: var(--radius-sm);
  }
`;

export const JourneySubtitle = styled(motion.p)`
  color: var(--dark-400);
  font-size: var(--text-lg);
  max-width: 500px;
  margin: 0 auto;
`;

export const JourneyContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  padding: var(--spacing-4) 0;
`;

export const ProgressLineContainer = styled.div`
  position: absolute;
  left: 50%; /* Center on desktop */
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--dark-800);
  transform: translateX(-50%);
  z-index: 1;
  border-radius: var(--radius-full);
  overflow: hidden; 

  @media (max-width: 768px) {
    left: 24px; /* Move to left on mobile */
  }
`;

export const ProgressLine = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: var(--accent-gradient);
  transform-origin: top;
  width: 100%;
  height: 100%;
`;

export const JourneyItemWrapper = styled.div<{ $align: 'left' | 'right' }>`
  display: flex;
  justify-content: ${props => props.$align === 'left' ? 'flex-end' : 'flex-start'};
  padding-bottom: var(--spacing-16);
  position: relative;
  width: 50%;
  ${props => props.$align === 'left' ? 'margin-right: auto; padding-right: 40px;' : 'margin-left: auto; padding-left: 40px;'}

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    padding-left: 60px; /* Space for line */
    padding-right: 0;
    margin: 0;
    padding-bottom: var(--spacing-12);
  }
`;

export const Marker = styled(motion.div)<{ $align: 'left' | 'right' }>`
    position: absolute;
    top: 24px;
    width: 16px;
    height: 16px;
    background: var(--dark-950);
    border: 3px solid var(--accent-primary);
    border-radius: 50%;
    z-index: 5;
    box-shadow: 0 0 0 4px rgba(30, 41, 59, 0.5), 0 0 15px var(--accent-primary);
    
    /* Desktop Positioning */
    ${props => props.$align === 'left' ? 'right: -10px;' : 'left: -10px;'} /* -8px for perfect center + border adj */

    @media (max-width: 768px) {
        /* Mobile Positioning - Independent of align prop */
        left: 18px; /* Line is at 24px center. Marker 16px wide. 24 - 8 = 16. + visual tweak */
        right: auto;
    }
`;

export const JourneyCard = styled(motion.div)`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: var(--spacing-6);
  border-radius: var(--radius-xl);
  width: 100%;
  position: relative;
  overflow: hidden;
  /* Specific transitions to avoid conflict with Framer Motion */
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  will-change: transform, opacity;
  text-align: left; /* Force clear alignment */

  &:hover {
    background: rgba(30, 41, 59, 0.6);
    border-color: rgba(100, 255, 218, 0.3);
    box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background: var(--accent-gradient);
    opacity: 0.7;
  }
`;

export const JourneyYear = styled.span`
  display: inline-block;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--accent-primary);
  margin-bottom: var(--spacing-2);
  padding: 4px 12px;
  background: rgba(100, 255, 218, 0.1);
  border-radius: var(--radius-md);
  border: 1px solid rgba(100, 255, 218, 0.2);
`;

export const JourneyCardTitle = styled.h3`
  font-size: 1.25rem;
  color: var(--dark-50);
  margin-bottom: var(--spacing-2);
  font-weight: 700;
`;

export const JourneyCardRole = styled.h4`
  font-size: 1rem;
  color: var(--dark-200);
  margin-bottom: var(--spacing-3);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  
  &::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: var(--accent-secondary);
      border-radius: 50%;
  }
`;

export const JourneyDescription = styled.p`
  font-size: var(--text-base);
  color: var(--dark-400);
  line-height: 1.6;
`;

export const JourneyTechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: var(--spacing-4);
`;

export const TechTag = styled.span`
  font-size: 0.75rem;
  color: var(--dark-300);
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 8px;
  border-radius: 4px;
  transition: var(--transition-fast);

  &:hover {
      color: var(--accent-primary);
      background: rgba(100, 255, 218, 0.1);
  }
`;

// --- Skills Section ---

export const SkillsSection = styled(Section)`
  position: relative;
`;

export const SkillsHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-16);
`;

export const SkillsTitle = styled(motion.h2)`
  font-size: var(--text-4xl);
  color: var(--dark-100);
  margin-bottom: var(--spacing-4);
  display: inline-block;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: var(--accent-gradient);
    border-radius: var(--radius-sm);
  }
`;

export const SkillsSubtitle = styled(motion.p)`
  color: var(--dark-400);
  font-size: var(--text-lg);
  max-width: 500px;
  margin: 0 auto;
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-8);
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
  }
`;

export const SkillCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(30, 41, 59, 0.3) 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: var(--spacing-8);
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  will-change: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  &:hover {
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(30, 41, 59, 0.5) 100%);
    border-color: rgba(100, 255, 218, 0.3);
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(100, 255, 218, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--accent-gradient);
    opacity: 0.8;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: radial-gradient(circle at top right, rgba(100, 255, 218, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

export const SkillCategory = styled.h3`
  font-size: var(--text-xl);
  color: var(--dark-50);
  margin-bottom: var(--spacing-6);
  font-weight: var(--font-bold);
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  letter-spacing: -0.02em;

  &::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    background: var(--accent-gradient);
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.6);
  }
`;

export const SkillsList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
`;

export const SkillItem = styled.li`
  color: var(--dark-200);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  transition: var(--transition-fast);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  background: rgba(100, 255, 218, 0.08);
  border: 1px solid rgba(100, 255, 218, 0.15);
  cursor: default;

  &:hover {
    color: var(--accent-primary);
    background: rgba(100, 255, 218, 0.15);
    border-color: rgba(100, 255, 218, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(100, 255, 218, 0.2);
  }
`;

// --- Services Section ---

export const ServicesSection = styled(Section)`
  position: relative;
  background: rgba(15, 23, 42, 0.3);
`;

export const ServicesHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-16);
`;

export const ServicesTitle = styled(motion.h2)`
  font-size: var(--text-4xl);
  color: var(--dark-100);
  margin-bottom: var(--spacing-4);
  display: inline-block;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: var(--accent-gradient);
    border-radius: var(--radius-sm);
  }
`;

export const ServicesSubtitle = styled(motion.p)`
  color: var(--dark-400);
  font-size: var(--text-lg);
  max-width: 500px;
  margin: 0 auto;
`;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-8);
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
  }
`;

export const ServiceCard = styled(motion.div)`
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: var(--spacing-8);
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
  will-change: auto;

  &:hover {
    background: rgba(30, 41, 59, 0.7);
    border-color: rgba(100, 255, 218, 0.3);
    transform: translateY(-6px);
    box-shadow: 0 10px 40px -10px rgba(100, 255, 218, 0.2);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--accent-gradient);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export const ServiceIcon = styled.div`
  width: 56px;
  height: 56px;
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-5);
  font-size: 1.75rem;
  transition: var(--transition-normal);

  ${ServiceCard}:hover & {
    background: rgba(100, 255, 218, 0.15);
    border-color: rgba(100, 255, 218, 0.4);
    transform: scale(1.05);
  }
`;

export const ServiceTitle = styled.h3`
  font-size: var(--text-2xl);
  color: var(--dark-50);
  margin-bottom: var(--spacing-3);
  font-weight: var(--font-semibold);
`;

export const ServiceDescription = styled.p`
  color: var(--dark-400);
  font-size: var(--text-base);
  line-height: 1.7;
  margin-bottom: var(--spacing-4);
`;

export const ServiceFeatures = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
`;

export const ServiceFeature = styled.li`
  color: var(--dark-300);
  font-size: var(--text-sm);
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-2);

  &::before {
    content: '✓';
    color: var(--accent-primary);
    font-weight: var(--font-bold);
    margin-top: 2px;
  }
`;
