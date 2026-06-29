import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Badge } from '../styles/GlobalStyle';
import SEO from '../components/SEO';
import {
  ActionButton,
  FilterButton,
  FilterSection,
  HeroSubtitle,
  HeroTitle,
  ProjectActions,
  ProjectCard,
  ProjectContent,
  ProjectDescription,
  ProjectFallbackIcon,
  ProjectImage,
  ProjectImageContainer,
  ProjectTech,
  ProjectTitle,
  ProjectsGrid,
  ProjectsHero,
  ProjectsSection,
  TechTag,
} from '../styles/ProjectsStyles';

import { categories, projectsData } from '../data/projectsData';
import { Project } from '../types/Project';
import { ProjectModal } from '../components/project/ProjectModal';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      return selectedCategory === 'All' || project.category === selectedCategory;
    });
  }, [selectedCategory]);

  return (
    <>
      <SEO
        title="Projects - Lại Minh Sáng (Lại Minh Sáng YOO) | Steganography, Security Tools & Web Apps"
        description="Explore my portfolio of innovative software projects: InvisioVault (steganography & polyglot files), YT-Downloader (free YouTube video & audio downloader), BAR (secure file management), Sortify, and more full-stack web/desktop applications."
        keywords="Steganography, Polyglot Files, Hide Files in Images, YouTube Downloader, Video Downloader, YouTube to MP3, File Encryption, Security Tools, InvisioVault, BAR, Sortify, React Projects, Python Projects, Flask, Full Stack Developer, Lại Minh Sáng, Lại Minh Sáng YOO"
        url="https://yoonique.netlify.app/projects"
      />
      <ProjectsHero>
        <Container>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            My Projects
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A curated showcase of applications, tools, and experiments.
            <br />
            Built with a focus on performance, security, and user experience.
          </HeroSubtitle>

          <FilterSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {categories.map((category) => (
              <FilterButton
                key={category}
                $active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </FilterButton>
            ))}
          </FilterSection>
        </Container>
      </ProjectsHero>

      <ProjectsSection>
        <Container>
          <AnimatePresence mode="wait">
            {(
              <ProjectsGrid
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={selectedCategory} // Force re-render on category change for stagger effect
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    onClick={() => {
                      setSelectedProject(project);
                      setIsModalOpen(true);
                    }}
                  >
                    <ProjectImageContainer $bgColor={project.bgColor} className="project-image">
                      {project.image ? (
                        <ProjectImage
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <ProjectFallbackIcon>{project.icon}</ProjectFallbackIcon>
                      )}
                    </ProjectImageContainer>

                    <ProjectContent>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <ProjectDescription>{project.description}</ProjectDescription>

                      <ProjectTech>
                        {project.technologies.slice(0, 4).map((tech: string) => (
                          <TechTag key={tech}>{tech}</TechTag>
                        ))}
                        {project.technologies.length > 4 && (
                          <TechTag>+{project.technologies.length - 4}</TechTag>
                        )}
                      </ProjectTech>

                      <ProjectActions>
                        <ActionButton
                          as="a"
                          href={project.github}
                          target="_blank"
                          variant="secondary"
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                          GitHub
                        </ActionButton>
                        {project.liveDemo && (
                          <ActionButton
                            as="a"
                            href={project.liveDemo}
                            target="_blank"
                            variant="primary"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          >
                            Live Demo
                          </ActionButton>
                        )}
                        {!project.liveDemo && project.download && (
                          <ActionButton
                            as="a"
                            href={project.download}
                            target="_blank"
                            variant="primary"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          >
                            Download
                          </ActionButton>
                        )}
                      </ProjectActions>
                    </ProjectContent>
                  </ProjectCard>
                ))}
              </ProjectsGrid>
            )}
          </AnimatePresence>
        </Container>
      </ProjectsSection>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Projects;
