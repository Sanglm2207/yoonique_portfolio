import React, { useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useSpring, Variants } from 'framer-motion';
import { Container } from '../styles/GlobalStyle';
import SEO from '../components/SEO';

import aboutImage from '../assets/images/Aboutme.png';
import { timelineData, skillsData, servicesData } from '../data/aboutData';

// Lazy load ResumeDownload to reduce initial bundle size
const ResumeDownload = lazy(() => import('../components/ResumeDownload'));

import {
  AboutHero,
  HeroTitle,
  HeroSubtitle,
  ResumeButtonWrapper,
  AboutImageSection,
  AboutImageContainer,
  AboutImage,
  JourneySection,
  JourneyHeader,
  JourneyTitle,
  JourneySubtitle,
  JourneyContainer,
  ProgressLineContainer,
  ProgressLine,
  JourneyItemWrapper,
  Marker,
  JourneyCard,
  JourneyYear,
  JourneyCardTitle,
  JourneyCardRole,
  JourneyDescription,
  JourneyTechStack,
  TechTag,
  SkillsSection,
  SkillsHeader,
  SkillsTitle,
  SkillsSubtitle,
  SkillsGrid,
  SkillCard,
  SkillCategory,
  SkillsList,
  SkillItem,
  ServicesSection,
  ServicesHeader,
  ServicesTitle,
  ServicesSubtitle,
  ServicesGrid,
  ServiceCard,
  ServiceIcon,
  ServiceTitle,
  ServiceDescription,
  ServiceFeatures,
  ServiceFeature
} from '../styles/AboutStyles';

const About: React.FC = () => {
  const journeyRef = useRef(null);

  // Scroll Progress Animation for Journey
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start end", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants: Variants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <>
      <SEO
        title="About Lai Minh Sang (YOO) - Full Stack Developer & Software Engineer"
        description="Learn about Lai Minh Sang (YOO), a passionate freelance software engineer from Karnataka, India. Specializing in security applications (steganography, file encryption, polyglot files), web development (React, Flask), and desktop applications. Journey through education, work experience, skills, and professional freelance services."
        keywords="About Lai Minh Sang, YOO, Lai Minh Sang, Software Engineer India, Full Stack Developer India, Freelance Developer India, Karnataka Developer, Freelance Web Developer, Security Software Developer, Steganography Developer, Polyglot Files Developer, React Developer India, Python Developer India"
        image="https://yoonique.netlify.app/about-yoo.png"
        url="https://yoonique.netlify.app/about"
      />
      {/* Hero Section */}
      <AboutHero>
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <HeroTitle variants={itemVariants}>
              About Me
            </HeroTitle>
            <HeroSubtitle variants={itemVariants}>
              I'm Lai Minh Sang, an aspiring software engineer and freelancer from Hanoi, Vietnam.
              I'm passionate about creating innovative, functional, and visually appealing digital solutions
              that solve real-world problems.
            </HeroSubtitle>

            <ResumeButtonWrapper variants={itemVariants}>
              <Suspense fallback={null}>
                <ResumeDownload variant="primary" size="lg" tooltipPosition="right" />
              </Suspense>
            </ResumeButtonWrapper>

            <AboutImageSection variants={itemVariants}>
              <AboutImageContainer>
                <AboutImage
                  src={aboutImage}
                  alt="About Lai Minh Sang (YOO)"
                />
              </AboutImageContainer>
            </AboutImageSection>
          </motion.div>
        </Container>
      </AboutHero>

      {/* RE-DESIGNED Journey Section */}
      <JourneySection ref={journeyRef}>
        <JourneyHeader>
          <JourneyTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            My Story
          </JourneyTitle>
          <br />
          <JourneySubtitle
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            A timeline of my professional growth and milestones.
          </JourneySubtitle>
        </JourneyHeader>

        <JourneyContainer>
          <ProgressLineContainer>
            <ProgressLine style={{ scaleY }} />
          </ProgressLineContainer>

          {timelineData.map((item, index) => (
            <JourneyItemWrapper key={index} $align={index % 2 === 0 ? 'left' : 'right'}>
              <Marker $align={index % 2 === 0 ? 'left' : 'right'} />
              <JourneyCard
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.1, margin: "-50px" }}
                variants={cardVariants}
              >
                <JourneyYear>{item.year}</JourneyYear>
                <JourneyCardTitle>{item.title}</JourneyCardTitle>
                <JourneyCardRole>{item.role}</JourneyCardRole>
                <JourneyDescription>{item.description}</JourneyDescription>
                <JourneyTechStack>
                  {item.tags.map(tag => (
                    <TechTag key={tag}>{tag}</TechTag>
                  ))}
                </JourneyTechStack>
              </JourneyCard>
            </JourneyItemWrapper>
          ))}
        </JourneyContainer>
      </JourneySection>

      {/* Skills Section */}
      <SkillsSection>
        <Container>
          <SkillsHeader>
            <SkillsTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Skills & Technologies
            </SkillsTitle>
            <br />
            <SkillsSubtitle
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Tools and technologies I use to bring ideas to life
            </SkillsSubtitle>
          </SkillsHeader>

          <SkillsGrid>
            {skillsData.map((skillGroup, index) => (
              <SkillCard
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut'
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <SkillCategory>{skillGroup.category}</SkillCategory>
                <SkillsList>
                  {skillGroup.skills.map((skill) => (
                    <SkillItem key={skill}>{skill}</SkillItem>
                  ))}
                </SkillsList>
              </SkillCard>
            ))}
          </SkillsGrid>
        </Container>
      </SkillsSection>

      {/* Services Section */}
      <ServicesSection>
        <Container>
          <ServicesHeader>
            <ServicesTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Services Offered
            </ServicesTitle>
            <br />
            <ServicesSubtitle
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Professional services tailored to your needs
            </ServicesSubtitle>
          </ServicesHeader>

          <ServicesGrid>
            {servicesData.map((service, index) => (
              <ServiceCard
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut'
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceFeatures>
                  {service.features.map((feature) => (
                    <ServiceFeature key={feature}>{feature}</ServiceFeature>
                  ))}
                </ServiceFeatures>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </Container>
      </ServicesSection>

    </>
  );
};

export default About;

