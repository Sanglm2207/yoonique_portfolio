import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Button } from './GlobalStyle';

// --- Hero Section ---

export const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-top: 100px;
  padding-bottom: var(--spacing-12);
  
  /* Background Elements */
  &::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 50vw;
    height: 50vw;
    background: radial-gradient(circle, rgba(100, 255, 218, 0.05) 0%, transparent 70%);
    z-index: -1;
    pointer-events: none;
    filter: blur(60px);
  }

  @media (max-width: 968px) {
    /* Mobile: block display for natural page flow, overflow-x to clip background */
    display: block;
    min-height: 0;
    max-height: none;
    height: auto;
    padding-top: 120px;
    padding-bottom: var(--spacing-6);
    overflow-x: clip; /* Clip background gradient, but don't create scroll container */
    
    &::before {
      filter: blur(30px);
      opacity: 0.5;
    }
  }
`;

export const HeroContent = styled(Container)`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: var(--spacing-12);
  align-items: center;
  z-index: 2;
  position: relative;
  width: 100%;
  flex: 1; /* Allow content to take available space on desktop */
  
  @media (max-width: 968px) {
    display: flex;
    flex-direction: column-reverse;
    text-align: center;
    gap: var(--spacing-8);
    padding-bottom: var(--spacing-12);
    flex: none; /* Remove flex:1 on mobile to prevent scroll issues */
  }
`;

export const TextContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  overflow: hidden;
  
  @media (max-width: 968px) {
    align-items: center;
  }
`;

export const ProfileImageContainer = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  aspect-ratio: 1;
  position: relative;
  margin: 0 auto;
  
  @media (max-width: 968px) {
    width: 280px;
    margin-bottom: var(--spacing-4);
  }

  &::before {
    content: '';
    position: absolute;
    inset: -20px;
    background: radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, transparent 70%);
    z-index: -1;
    filter: blur(20px);
  }
`;

export const StylizedImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  
  /* Glass overlay effect */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
    pointer-events: none;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

// Resume Preview Container
export const ResumePreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: rgba(30, 41, 59, 0.98);
  padding: 20px;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: var(--radius-md);
  }
`;

export const ResumeHintText = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--accent-primary);
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px 18px;
  border-radius: var(--radius-lg);
  z-index: 10;
  border: 1px solid rgba(100, 255, 218, 0.2);
  font-weight: 500;
  letter-spacing: 0.5px;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

export const GreetingPill = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-6);
`;

export const GreetingText = styled.span`
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--accent-primary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const Headline = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 5rem); /* Slightly smaller min */
  font-weight: var(--font-extrabold);
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: var(--spacing-6);
  /* Solid fallback for browsers/contexts that don't support background-clip:text.
     Both --dark-50 (#fafafa) and --dark-300 (#d4d4d8) pass WCAG AA against
     the #09090b background at ~19.8:1 and ~13.8:1 respectively. */
  color: var(--dark-50);
  background: linear-gradient(180deg, var(--dark-50) 0%, var(--dark-300) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  span {
    color: var(--accent-primary); /* fallback for span accent text */
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const Subheadline = styled(motion.p)`
  font-size: clamp(1.1rem, 3vw, 1.25rem);
  color: var(--dark-400);
  line-height: 1.6;
  max-width: 540px;
  margin-bottom: var(--spacing-10);

  @media (max-width: 968px) {
    max-width: 100%;
    padding: 0 var(--spacing-2);
  }
`;

export const CTAContainer = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 968px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    
    /* Direct children buttons/links */
    > a, > button {
      width: 100%;
      text-align: center;
    }

    /* Wrapper div for ResumeDownload hover effect */
    > div {
      width: 100%;
      
      /* ResumeDownload internal wrapper (ResumeButtonWrapper) */
      > div {
        width: 100%;
        display: block;
        
        /* The actual download button inside ResumeDownload */
        a {
          width: 100%;
          justify-content: center;
        }
      }
    }
  }
`;

// --- Stats Bar ---

export const StatsBar = styled(motion.div)`
  position: relative;
  margin: var(--spacing-8) auto 0;
  max-width: calc(var(--breakpoint-lg) - var(--spacing-8));
  padding: var(--spacing-4) var(--spacing-6);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-2xl);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
  z-index: 10;
  
  /* Gradient overlay for extra flair */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius-2xl);
    padding: 1px;
    background: linear-gradient(135deg, 
      rgba(100, 255, 218, 0.3) 0%, 
      rgba(139, 92, 246, 0.3) 50%,
      rgba(100, 255, 218, 0.3) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0.5;
  }
  
  @media (max-width: 1200px) {
    padding: var(--spacing-4) var(--spacing-5);
  }
  
  @media (max-width: 968px) {
    /* Mobile: Keep visuals but reduce spacing for unity */
    max-width: 100%;
    margin: var(--spacing-6) auto 0; /* Tighter spacing for unified feel */
    padding: var(--spacing-4) var(--spacing-4);
    background: rgba(30, 41, 59, 0.4); /* Match About page glassmorphic style */
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 640px) {
    left: auto;
    right: auto;
    margin-top: var(--spacing-5); /* Even tighter on small screens */
    margin-left: var(--spacing-2);
    margin-right: var(--spacing-2);
    padding: var(--spacing-4) var(--spacing-3);
  }
`;

export const StatsContent = styled(Container)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: var(--spacing-8);
  
  @media (max-width: 768px) {
    gap: var(--spacing-6);
  }
  
  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-4);
    text-align: center;
  }
  
  @media (max-width: 480px) {
    gap: var(--spacing-3);
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-1);
  min-width: 100px;

  @media (max-width: 640px) {
    min-width: 0;
    width: 100%;
  }

  h3 {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--dark-100);
    line-height: 1;
    white-space: nowrap;
    
    @media (max-width: 768px) {
      font-size: var(--text-3xl);
    }
    
    @media (max-width: 640px) {
      font-size: var(--text-2xl);
    }
  }

  p {
    font-size: var(--text-sm);
    color: var(--dark-400);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    white-space: nowrap;
    
    @media (max-width: 768px) {
      font-size: var(--text-xs);
      letter-spacing: 0.05em;
    }
    
    @media (max-width: 640px) {
      font-size: 0.7rem;
      letter-spacing: 0.03em;
      white-space: normal;
    }
  }
`;

// --- Blog Section ---

export const BlogSection = styled.section`
  padding: var(--spacing-20) 0;
  position: relative;
  
  @media (max-width: 968px) {
    padding: var(--spacing-10) 0 var(--spacing-4) 0; /* Balanced spacing on mobile */
  }
  
  @media (max-width: 640px) {
    padding: var(--spacing-8) 0 var(--spacing-3) 0; /* Moderate spacing on small screens */
  }
`;

export const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-12);
`;

export const BlogTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--font-bold);
  /* Solid fallback — see Headline comment above for contrast rationale */
  color: var(--dark-50);
  background: linear-gradient(180deg, var(--dark-50) 0%, var(--dark-300) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-3);
`;

export const BlogSubtitle = styled(motion.p)`
  font-size: var(--text-base);
  color: var(--dark-400);
  max-width: 600px;
  margin: 0 auto var(--spacing-8);
`;

export const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: var(--spacing-8);
  margin-bottom: var(--spacing-10);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
  }
`;

export const ViewAllButton = styled(Button)`
  margin: 0 auto;
  display: block;
`;
