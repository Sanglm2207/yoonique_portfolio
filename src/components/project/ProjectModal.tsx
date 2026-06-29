import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { TechTag } from "../../styles/AboutStyles";
import { Badge } from "../../styles/GlobalStyle";
import { ModalOverlay, ModalContent, CloseButton, ModalScroller, ModalImageBanner, ModalBody, ModalTitle, ModalDescription, SectionDivider, CaseStudyGrid, CaseStudyCard, CaseStudyLabel, CaseStudyText, ModalTech, ModalActions, ActionButton } from "../../styles/ProjectsStyles";
import { Project } from "../../types/Project";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const caseStudySections = [
  { key: 'problem', label: 'Problem', icon: '🎯', color: '#f87171' },
  { key: 'solution', label: 'Solution', icon: '💡', color: '#60a5fa' },
  { key: 'impact', label: 'Impact', icon: '📈', color: '#34d399' },
  { key: 'learnings', label: 'Learnings', icon: '🧠', color: '#a78bfa' },
] as const;

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll — position:fixed technique works on iOS Safari where overflow:hidden is ignored
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    // Lock scroll on both html and body — covers all browsers including modern iOS Safari
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <ModalOverlay
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            <CloseButton onClick={onClose} aria-label="Close">×</CloseButton>

            <ModalScroller>
              {project.image && (
                <ModalImageBanner>
                  {/*
               * loading="eager" — the image is fetched immediately when the
               * modal opens; lazy loading would defer the network request until
               * the element enters the viewport, which is what caused the flash.
               * decoding="async" lets the browser decode off the main thread so
               * the modal animation stays smooth.
               */}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="eager"
                    decoding="async"
                  />
                </ModalImageBanner>
              )}

              {/* All content below the banner */}
              <ModalBody>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-5)' }}>
                  <div style={{
                    fontSize: 'var(--text-2xl)',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: 'var(--spacing-3)',
                    borderRadius: 'var(--radius-xl)',
                    minWidth: '56px',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {project.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <ModalTitle>{project.title}</ModalTitle>
                    <div style={{ display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap', alignItems: 'center', marginTop: 'var(--spacing-1)' }}>
                      <Badge variant="info">{project.category}</Badge>
                      {project.featured && <Badge variant="success">⭐ Featured</Badge>}
                    </div>
                  </div>
                </div>

                {/* Short description */}
                <ModalDescription>{project.description}</ModalDescription>

                <SectionDivider />

                {/* Case study sections */}
                <div style={{ marginBottom: 'var(--spacing-6)' }}>
                  <h4 style={{
                    color: 'var(--dark-100)',
                    fontSize: '0.7rem',
                    fontWeight: 'var(--font-bold)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--spacing-4)',
                    opacity: 0.6
                  }}>Case Study</h4>

                  <CaseStudyGrid>
                    {caseStudySections.map(({ key, label, icon, color }) => (
                      <CaseStudyCard key={key} $accentColor={color}>
                        <CaseStudyLabel $color={color}>
                          <span className="icon">{icon}</span>
                          {label}
                        </CaseStudyLabel>
                        <CaseStudyText>{project.caseStudy[key]}</CaseStudyText>
                      </CaseStudyCard>
                    ))}
                  </CaseStudyGrid>
                </div>

                <SectionDivider />

                {/* Tech stack */}
                <div style={{ marginBottom: 'var(--spacing-6)' }}>
                  <h4 style={{
                    color: 'var(--dark-100)',
                    fontSize: '0.7rem',
                    fontWeight: 'var(--font-bold)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--spacing-3)',
                    opacity: 0.6
                  }}>Tech Stack</h4>
                  <ModalTech>
                    {project.technologies.map((tech: string) => (
                      <TechTag key={tech}>{tech}</TechTag>
                    ))}
                  </ModalTech>
                </div>

                {/* Actions */}
                <ModalActions>

                  <ActionButton
                    as="a"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                  >
                    📂 View Code
                  </ActionButton>
                  {project.liveDemo && (
                    <ActionButton
                      as="a"
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                    >
                      🚀 Live Demo
                    </ActionButton>
                  )}
                  {project.download && (
                    <ActionButton
                      as="a"
                      href={project.download}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                    >
                      💾 Download
                    </ActionButton>
                  )}
                </ModalActions>
              </ModalBody>
            </ModalScroller>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};