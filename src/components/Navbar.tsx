import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollOptimizer } from '../utils/performance';

// Fixed container ensuring it stays on top
const FixedContainer = styled.div<{ $vertical: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: var(--spacing-4);
  pointer-events: none; /* Let clicks pass through the padding area */
  display: flex;
  justify-content: center;
  transition: left 0.4s ease, right 0.4s ease, justify-content 0.4s ease, padding 0.4s ease, transform 0.4s ease;

  ${props => props.$vertical && `
    top: 50%;
    left: var(--spacing-4);
    right: auto;
    transform: translateY(-50%);
    justify-content: flex-start;
    padding: 0;
  `}

  @media (max-width: 768px) {
    padding: 0;
    left: 0;
    right: 0;
    top: 0;
    transform: none;
    justify-content: center;
  }
`;

// The actual "Island" navbar
const NavbarIsland = styled(motion.nav) <{ $scrolled: boolean; $vertical: boolean }>`
  pointer-events: auto; /* Re-enable clicks */
  width: 100%;
  max-width: var(--breakpoint-lg);
  background: rgba(9, 9, 11, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-3) var(--spacing-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  /* Desktop: Floating Island */
  @media (min-width: 769px) {
    margin-top: ${props => props.$vertical ? '0' : (props.$scrolled ? 'var(--spacing-2)' : 'var(--spacing-4)')};
    background: ${props => props.$scrolled ? 'rgba(9, 9, 11, 0.8)' : 'rgba(9, 9, 11, 0.5)'};
    width: ${props => props.$vertical ? 'auto' : (props.$scrolled ? 'auto' : '100%')};
    min-width: ${props => props.$vertical ? '56px' : '600px'};
    flex-direction: ${props => props.$vertical ? 'column' : 'row'};
    align-items: ${props => props.$vertical ? 'center' : 'center'};
    justify-content: ${props => props.$vertical ? 'center' : 'space-between'};
    padding: ${props => props.$vertical ? 'var(--spacing-3)' : 'var(--spacing-3) var(--spacing-6)'};
    border-radius: ${props => props.$vertical ? 'var(--radius-3xl)' : 'var(--radius-2xl)'};
  }

  /* Mobile: Full width top bar */
  @media (max-width: 768px) {
    border-radius: 0;
    border-top: none;
    border-left: none;
    border-right: none;
    background: rgba(9, 9, 11, 0.95); /* Higher opacity for mobile */
    backdrop-filter: blur(10px); /* Reduced blur for performance */
    -webkit-backdrop-filter: blur(10px);
    padding: var(--spacing-3) var(--spacing-4);
  }
`;

const Logo = styled(Link)`
  font-size: var(--text-lg);
  font-weight: var(--font-extrabold);
  color: var(--dark-100);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  z-index: 10;
  position: relative;
  
  span {
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const NavLinks = styled.div<{ $vertical: boolean }>`
  display: flex;
  gap: var(--spacing-1);
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  padding: 4px;
  border-radius: var(--radius-lg); // Changed from radius-full
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s ease;

  @media (min-width: 769px) {
    flex-direction: ${props => props.$vertical ? 'column' : 'row'};
    align-items: center;
    width: ${props => props.$vertical ? 'auto' : 'auto'};
    gap: ${props => props.$vertical ? 'var(--spacing-2)' : 'var(--spacing-1)'};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavIcon = styled.span<{ $vertical: boolean }>`
  display: ${props => props.$vertical ? 'inline-flex' : 'none'};
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 1rem;
`;

const NavLabel = styled.span<{ $vertical: boolean }>`
  display: ${props => props.$vertical ? 'none' : 'inline-flex'};
  align-items: center;
  white-space: nowrap;
  transition: opacity 0.25s ease, width 0.25s ease, margin 0.25s ease, transform 0.25s ease;
`;

const NavTooltip = styled.span`
  position: absolute;
  top: 50%;
  left: calc(100% + 10px);
  transform: translateY(-50%) translateX(4px);
  padding: 8px 12px;
  border-radius: var(--radius-lg);
  background: rgba(8, 9, 13, 0.95);
  color: var(--dark-100);
  font-size: 0.92rem;
  white-space: nowrap;
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.32);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.24s ease, transform 0.24s ease, visibility 0.24s ease;
  pointer-events: none;
  z-index: 2;
`;

const NavItem = styled(Link) <{ $active: boolean; $vertical: boolean }>`
  position: relative;
  padding: ${props => props.$vertical ? '8px' : '8px 8px'};
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: ${props => props.$active ? 'var(--accent-primary)' : 'var(--dark-400)'};
  text-decoration: none;
  transition: color 0.3s ease, background 0.3s ease;
  z-index: 1;
  border-radius: var(--radius-md);
  display: flex; // Ensure block model
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: auto;
  overflow: visible;

  &:hover {
    color: var(--dark-100);
    background: rgba(255, 255, 255, 0.06);

    ${NavTooltip} {
      opacity: 1;
      visibility: visible;
      transform: translateY(-50%) translateX(8px);
    }
  }
`;

const ActivePill = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.08);
  z-index: -1; // Behind content
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--dark-100);
  padding: var(--spacing-2);
  cursor: pointer;
  z-index: 20;
  font-size: 1.5rem; // Adjusted size

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--dark-950);
  z-index: 15;
  padding: 80px var(--spacing-6) var(--spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
`;

const MobileLink = styled(Link)`
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--dark-200);
  text-decoration: none;
  padding: var(--spacing-4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:active {
    color: var(--accent-primary);
    background: rgba(255, 255, 255, 0.02);
  }
`;

const navItems = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/about', label: 'About', icon: '👤' },
  { path: '/projects', label: 'Projects', icon: '💼' },
  { path: '/blog', label: 'Blog', icon: '📝' },
  { path: '/contact', label: 'Contact', icon: '📧' }
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [vertical, setVertical] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isBlogDetail = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';

    const handleScrollUpdate = ({ scrollY, direction }: { scrollY: number; direction: 'up' | 'down'; isScrolling: boolean }) => {
      setScrolled(scrollY > 20);

      if (!isBlogDetail) {
        setVertical(false);
        return;
      }

      if (direction === 'down' && scrollY > 80) {
        setVertical(true);
      }

      if (direction === 'up' || scrollY < 60) {
        setVertical(false);
      }
    };

    const unsubscribe = scrollOptimizer.subscribe(handleScrollUpdate);
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <FixedContainer $vertical={vertical}>
        <NavbarIsland
          $scrolled={scrolled}
          $vertical={vertical}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Logo to="/" onClick={() => setMobileMenuOpen(false)}>
            <span>YOO</span>
          </Logo>

          <NavLinks $vertical={vertical}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <div key={item.path} style={{ position: 'relative' }}>
                  <NavItem
                    to={item.path}
                    $active={isActive}
                    $vertical={vertical}
                  >
                    <NavIcon $vertical={vertical}>{item.icon}</NavIcon>
                    <NavLabel $vertical={vertical}>{item.label}</NavLabel>
                    {vertical && <NavTooltip>{item.label}</NavTooltip>}
                    {isActive && (
                      <ActivePill
                        layoutId="nav-pill"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{ inset: 0 }} // Ensure pill covers the item area
                      />
                    )}
                  </NavItem>
                </div>
              );
            })}
          </NavLinks>

          <MobileToggle
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </MobileToggle>
        </NavbarIsland>
      </FixedContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MobileLink to={item.path} onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.span layoutId="mobile-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-primary)' }} />
                  )}
                </MobileLink>
              </motion.div>
            ))}

            <motion.div
              style={{ marginTop: 'auto', textAlign: 'center', color: 'var(--dark-400)', fontSize: '0.9rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              © {new Date().getFullYear()} Lại Minh Sáng
            </motion.div>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
