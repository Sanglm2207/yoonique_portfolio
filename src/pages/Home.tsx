import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, Container } from '../styles/GlobalStyle';
import SEO from '../components/SEO';
import {
  HeroSection,
  HeroContent,
  TextContent,
  ProfileImageContainer,
  StylizedImage,
  ResumePreviewContainer,
  ResumeHintText,
  GreetingPill,
  GreetingText,
  Headline,
  Subheadline,
  CTAContainer,
  StatsBar,
  StatsContent,
  StatItem,
  BlogSection,
  BlogHeader,
  BlogTitle,
  BlogSubtitle,
  BlogGrid,
  ViewAllButton,
} from '../styles/HomeStyles';

import { getLatestPosts, BlogPost } from '../utils/devto';

// Profile image served from /public so it can be used directly without additional scaling.
const profileImage = '/images/Home_dp.jpg';

// Lazy load components to reduce initial bundle size
const BlogCard = lazy(() => import('../components/BlogCard'));
const ResumeDownload = lazy(() => import('../components/ResumeDownload'));

// --- Variant Definitions ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  }
};

// --- Component ---

const Home: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [showResumePreview, setShowResumePreview] = useState(false);



  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await getLatestPosts(3);
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoadingBlog(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <>
      <SEO
        title="Lại Minh Sáng (YOO) - Full Stack Developer | Building Digital Experiences"
        description="I'm Lai Minh Sang (YOO), a Full Stack Developer specializing in building exceptional digital experiences, software, and mobile apps. Explore my portfolio of projects, skills, and services."
        image="https://yoonique.netlify.app/yoo-lobo-home.png"
        url="https://yoonique.netlify.app/"
      />

      <HeroSection>
        <HeroContent
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <TextContent>
            <GreetingPill variants={itemVariants}>
              <span style={{ fontSize: '1.2em' }}>👋</span>
              <GreetingText>Hi, I am Lại Minh Sáng</GreetingText>
            </GreetingPill>

            <Headline variants={itemVariants}>
              Building digital experiences<br />
              <span>that matter.</span>
            </Headline>

            <Subheadline variants={itemVariants}>
              I craft accessible web experiences, software, and mobile apps using modern technologies. Let's turn your ideas into reality.
            </Subheadline>

            <CTAContainer variants={itemVariants}>
              <Button
                as={Link}
                to="/projects"
                variant="primary"
                size="lg"
              >
                View My Work
              </Button>
              <Button
                as={Link}
                to="/contact"
                variant="outline"
                size="lg"
              >
                Contact Me
              </Button>
              <div
                onMouseEnter={() => {
                  // Only show preview on desktop (screen width > 968px)
                  if (window.innerWidth > 968) {
                    setShowResumePreview(true);
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth > 968) {
                    setShowResumePreview(false);
                  }
                }}
              >
                <Suspense fallback={null}>
                  <ResumeDownload variant="outline" size="lg" showTooltip={false} />
                </Suspense>
              </div>
            </CTAContainer>
          </TextContent>

          <ProfileImageContainer variants={itemVariants}>
            <AnimatePresence mode="wait">
              {!showResumePreview ? (
                <StylizedImage
                  as={motion.div}
                  key="profile"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={profileImage}
                    alt="Lại Minh Sáng (YOO) - Full Stack Developer"
                  />
                </StylizedImage>
              ) : (
                <StylizedImage
                  as={motion.div}
                  key="resume"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ResumePreviewContainer>
                    <img src="/Resume_preview.png" alt="Resume Preview" />
                  </ResumePreviewContainer>
                  <ResumeHintText>
                    Click button to download full resume
                  </ResumeHintText>
                </StylizedImage>
              )}
            </AnimatePresence>
          </ProfileImageContainer>
        </HeroContent>

        <StatsBar
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <StatsContent>
            <StatItem>
              <h3>3+</h3>
              <p>Years Experience</p>
            </StatItem>
            <StatItem>
              <h3>10+</h3>
              <p>Projects Built</p>
            </StatItem>
            <StatItem>
              <h3>100%</h3>
              <p>Commitment</p>
            </StatItem>
          </StatsContent>
        </StatsBar>
      </HeroSection>

      {/* Blog Section */}
      {!loadingBlog && blogPosts.length > 0 && (
        <BlogSection>
          <Container>
            <BlogHeader>
              <BlogTitle
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Latest from my blog
              </BlogTitle>
              <BlogSubtitle
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Thoughts, tutorials, and insights on development and technology
              </BlogSubtitle>
            </BlogHeader>

            <BlogGrid>
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Suspense fallback={<div style={{ height: '400px' }} />}>
                    <BlogCard post={post} />
                  </Suspense>
                </motion.div>
              ))}
            </BlogGrid>

            <ViewAllButton
              as={Link}
              to="/blog"
              variant="outline"
              size="md"
            >
              View All Posts →
            </ViewAllButton>
          </Container>
        </BlogSection>
      )}
    </>
  );
};

export default Home;
