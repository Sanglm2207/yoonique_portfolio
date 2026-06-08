import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, Grid } from './GlobalStyle';

// ── Case Study Components ──────────────────────────────────────────────────

export const CaseStudyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-3);
  }
`;

export const CaseStudyCard = styled.div<{ $accentColor: string }>`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${props => props.$accentColor}33;
  border-radius: var(--radius-xl);
  padding: var(--spacing-5);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.$accentColor};
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  }

  @media (max-width: 640px) {
    padding: var(--spacing-4);
  }
`;

export const CaseStudyLabel = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: 0.7rem;
  font-weight: var(--font-bold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${props => props.$color};
  margin-bottom: var(--spacing-3);

  span.icon {
    font-size: 0.9rem;
  }
`;

export const CaseStudyText = styled.p`
  color: var(--dark-300);
  font-size: clamp(0.85rem, 1.3vw, 0.95rem);
  line-height: 1.7;
  margin: 0;
`;

export const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  margin: var(--spacing-6) 0;
`;

export const ModalImageBanner = styled.div`
  /* Full-width, flush with the modal's rounded top edge */
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
  flex-shrink: 0;
  /* Dark placeholder prevents the white flash while the image decodes */
  background: #0a0f1e;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block; /* kills inline baseline gap */
  }

  /* Fade bottom into modal background */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 35%, rgba(15, 23, 42, 0.95) 100%);
  }

  @media (max-width: 768px) {
    height: 170px;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  }

  @media (max-width: 640px) {
    height: 150px;
    border-radius: 0;
  }
`;

// ── Hero Section ─────────────────────────────────────────────────────────

export const ProjectsHero = styled(Section)`
  padding-top: 140px;
  padding-bottom: 40px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding-top: 120px;
    padding-bottom: 20px;
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
  margin: 0 auto var(--spacing-10);
  line-height: 1.7;
`;

// ── Filter ────────────────────────────────────────────────────────────────

export const FilterSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-8);
  flex-wrap: wrap;
`;

export const FilterButton = styled(motion.button)<{ $active: boolean }>`
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  transition: var(--transition-normal);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.02em;
  
  ${props => props.$active ? `
    background: var(--accent-gradient);
    color: var(--dark-950);
    border: 1px solid transparent;
    box-shadow: 0 4px 12px rgba(100, 255, 218, 0.3);
  ` : `
    background: rgba(30, 41, 59, 0.3);
    color: var(--dark-300);
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    
    &:hover {
      border-color: var(--accent-primary);
      color: var(--accent-primary);
      background: rgba(30, 41, 59, 0.5);
      transform: translateY(-2px);
    }
  `}
`;

// ── Projects Grid ─────────────────────────────────────────────────────────

export const ProjectsGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: var(--spacing-8);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-8);
  }
`;

export const ProjectCard = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(30, 41, 59, 0.3);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  transition: border-color 0.3s ease;
  
  /* Hover State for Card */
  &:hover {
    border-color: rgba(100, 255, 218, 0.3);
    
    .project-image {
      transform: scale(1.05);
    }
    
    .project-overlay {
      opacity: 1;
    }
  }
`;

export const ProjectImageContainer = styled.div<{ $bgColor: string }>`
  width: 100%;
  height: 240px;
  position: relative;
  overflow: hidden;
  background: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, transparent 100%);
    opacity: 0.6;
  }
`;

export const ProjectContent = styled.div`
  padding: var(--spacing-6);
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark-50);
  margin-bottom: var(--spacing-2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  a {
    transition: color 0.3s ease;
    &:hover {
      color: var(--accent-primary);
    }
  }
`;

export const ProjectDescription = styled.p`
  color: var(--dark-300);
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: var(--spacing-6);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
  margin-bottom: var(--spacing-6);
`;

export const TechTag = styled.span`
  font-size: 0.75rem;
  color: var(--dark-200);
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 10px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;

  &:hover {
    color: var(--accent-primary);
    background: rgba(100, 255, 218, 0.1);
    border-color: rgba(100, 255, 218, 0.2);
  }
`;

export const ProjectActions = styled.div`
  display: flex;
  gap: var(--spacing-4);
  margin-top: var(--spacing-2);
`;

export const ActionButton = styled.a<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: 10px 16px;
  border-radius: var(--radius-lg);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;

  ${props => props.variant === 'primary' && `
    background: var(--accent-gradient);
    color: var(--dark-950);
    box-shadow: 0 4px 14px rgba(100, 255, 218, 0.2);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(100, 255, 218, 0.3);
    }
  `}

  ${props => props.variant === 'secondary' && `
    background: rgba(255, 255, 255, 0.05);
    color: var(--dark-100);
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--dark-100);
      transform: translateY(-2px);
    }
  `}
`;

// ── Modal Styles ──────────────────────────────────────────────────────────

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  /*
   * No backdrop-filter and no will-change here.
   * will-change: transform on a full-screen fixed layer forces the browser
   * to composite a 100vw×100vh GPU surface that must be repainted on every
   * scroll frame — the exact cause of the scroll jank.
   * The compositing boundary lives on ModalContent (translateZ(0)) instead,
   * so only the card area is promoted, not the entire viewport.
   */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-4);
  overflow: hidden;

  @media (max-width: 768px) {
    background: rgba(0, 0, 0, 0.92);
  }

  @media (max-width: 640px) {
    align-items: flex-start;
    padding: 0;
  }

  /* Respect OS reduced-motion preference */
  @media (prefers-reduced-motion: reduce) {
    transition: none !important;
  }
`;

export const ModalContent = styled(motion.div)`
  background: linear-gradient(135deg,
    rgba(30, 41, 59, 0.98) 0%,
    rgba(15, 23, 42, 0.98) 100%);
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: var(--radius-2xl);
  padding: 0;
  max-width: 900px;
  width: 100%;
  position: relative;
  overflow: hidden;
  /*
   * backface-visibility: hidden + will-change: transform create a GPU
   * compositing boundary scoped to just this card. Framer Motion safely
   * overrides the transform property with its animated value, so there
   * is no conflict. DO NOT set transform here — Framer Motion owns it.
   */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  will-change: transform;
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(100, 255, 218, 0.1),
    inset 0  0  0   1px rgba(0, 0, 0, 0.6),
    inset 0  0  30px 4px rgba(0, 0, 0, 0.45),
    inset 0  1px 0   0   rgba(255, 255, 255, 0.08);

  /* Corner-blur overlay — sits on top of everything, pointers pass through */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 9998;
    background:
      radial-gradient(ellipse 60px 60px at top right,    rgba(9,9,11,0.55) 0%, transparent 100%),
      radial-gradient(ellipse 60px 60px at top left,     rgba(9,9,11,0.35) 0%, transparent 100%),
      radial-gradient(ellipse 60px 60px at bottom right, rgba(9,9,11,0.25) 0%, transparent 100%),
      radial-gradient(ellipse 60px 60px at bottom left,  rgba(9,9,11,0.25) 0%, transparent 100%);
  }

  @media (max-width: 1024px) {
    max-width: 95vw;
  }

  @media (max-width: 768px) {
    max-width: 90vw;
    border-radius: var(--radius-xl);
    /* Lighter shadow stack on mobile */
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.6),
      0 0 0 1px rgba(100, 255, 218, 0.12),
      inset 0 0 0 1px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 640px) {
    max-width: 100vw;
    border-radius: 0;
    border: none;
  }

  /* Zero transforms for users who prefer reduced motion */
  @media (prefers-reduced-motion: reduce) {
    transition: none !important;
    animation: none !important;
  }
`;

/* Scroll container — nested inside ModalContent so border-radius isn't broken */
export const ModalScroller = styled.div`
  overflow-y: auto;
  max-height: 90vh;
  border-radius: inherit;
  /* Prevent scroll chaining to the page on ALL browsers incl. Chrome Android */
  overscroll-behavior: contain;
  /* Allow vertical touch scrolling inside; block horizontal to avoid page swipe */
  touch-action: pan-y;
  /*
   * will-change: scroll-position tells the compositor this element scrolls,
   * letting it pre-promote the scroll layer and skip main-thread work.
   * contain: layout style isolates layout recalculation to this subtree only,
   * preventing scroll from triggering reflows in the rest of the document.
   */
  will-change: scroll-position;
  contain: layout style;

  /* Custom slim scrollbar */
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 255, 218, 0.3) transparent;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(100, 255, 218, 0.25);
    border-radius: 99px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(100, 255, 218, 0.45);
  }

  @media (max-width: 768px) {
    max-height: 85vh;
  }

  @media (max-width: 640px) {
    max-height: 100vh;
  }

  @media (max-height: 600px) {
    max-height: 95vh;
  }
`;

/* Inner padded wrapper — sits below the image banner */
export const ModalBody = styled.div`
  padding: var(--spacing-6) var(--spacing-8) var(--spacing-8);

  @media (max-width: 1024px) {
    padding: var(--spacing-5) var(--spacing-6) var(--spacing-6);
  }

  @media (max-width: 768px) {
    padding: var(--spacing-4) var(--spacing-5) var(--spacing-5);
  }

  @media (max-width: 640px) {
    padding: var(--spacing-4);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--dark-200);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-normal);
  font-size: 20px;
  font-weight: normal;
  z-index: 10;
  /* No backdrop-filter — would be a third composited layer inside the modal */
  
  /* Refined mobile design */
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 18px;
    top: var(--spacing-4);
    right: var(--spacing-4);
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: var(--accent-primary);
    border-color: var(--accent-primary);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.2);
  }
  
  /* Touch-friendly on mobile */
  @media (hover: none) and (pointer: coarse) {
    &:active {
      background: rgba(255, 255, 255, 0.2);
      color: var(--accent-primary);
    }
  }
`;

export const ModalTitle = styled.h2`
  font-size: clamp(1.5rem, 3vw, 1.875rem);
  color: var(--dark-50);
  margin-bottom: var(--spacing-2);
  font-weight: var(--font-bold);
  letter-spacing: -0.025em;
  line-height: 1.2;
`;

export const ModalDescription = styled.p`
  color: var(--dark-300);
  line-height: 1.8; /* Increased line-height for better readability */
  margin-bottom: var(--spacing-6);
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  white-space: pre-line; /* Allows newline characters to create paragraphs */
`;

export const ModalTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-8);
`;

export const ModalActions = styled.div`
  display: flex;
  gap: var(--spacing-4);
  flex-wrap: wrap;
`;
