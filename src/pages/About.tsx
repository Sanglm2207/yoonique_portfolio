import React, { useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useSpring, Variants } from 'framer-motion';
import { Container, Section } from '../styles/GlobalStyle';
import SEO from '../components/SEO';

import aboutImage from '../assets/images/Aboutme.png';

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
const timelineData = [
  {
    year: 'Mar 2024 - Present',
    title: 'Fastlance.vn',
    role: 'Freelance Software Developer',
    description:
      'Working as a freelance Software Developer, delivering end-to-end software solutions for startups, small businesses, and individual clients. Specialized in designing, developing, and deploying scalable web applications with a focus on clean architecture, performance, and maintainability.',
    tags: [
      'Full-stack Development',
      'System Architecture',
      'API Development',
      'Frontend Implementation',
      'Cloud Services',
      'Performance Optimization'
    ]
  },
  {
    year: 'Apr 2022 - Jan 2024',
    title: 'FUNIX .,JSC ',
    role: 'Software Developer',
    description:
      'Worked on a Learning Management System serving over 20,000 active students. Built and integrated an AI-powered Q&A system to automate first-line support, optimized database queries, enhanced data modeling, and developed key interaction features such as mentor booking and assignment review. Helped reduce manual support workload by 60% and improved system response time by 25%.',
    tags: [
      'Node.js',
      'REST APIs',
      'AI Q&A System',
      'Database Optimization',
      'LMS',
      'System Performance'
    ]
  },
  {
    year: 'Mar 2020 - Mar 2022',
    title: 'ITSOL .,JSC',
    role: 'Java Software Engineer',
    description:
      'Worked in the financial and banking domain, focusing on digital signature integration and reliable asynchronous processing. Designed resilient callback mechanisms using Domain-Driven Design principles, implemented Apache Kafka for message queuing, and built secure connectors for external digital signature providers. Ensured reliable execution of async tasks and zero data loss under high-load scenarios.',
    tags: [
      'Java',
      'Domain-Driven Design',
      'Apache Kafka',
      'Async Processing',
      'Digital Signature',
      'Banking Domain'
    ]
  },
  {
    year: 'Sep 2019 - Dec 2019',
    title: 'THUAN THANH TECH Co., Ltd',
    role: 'Java Software Developer Intern',
    description:
      'Started professional software development as a Java intern. Designed and developed a Windows desktop application for managing and visualizing real-time logs, including complex log parsing, data validation, dashboard visualization, and FpML data processing.',
    tags: [
      'Java',
      'Angular',
      'Desktop Application',
      'Log Parsing',
      'Dashboard',
      'FpML'
    ]
  }
];

// Skills Data
const skillsData = [
  {
    category: 'Frontend',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML/CSS',
      'Tailwind CSS',
      'Styled Components',
      'Framer Motion',
      'Responsive Design'
    ]
  },
  {
    category: 'Mobile',
    skills: [
      'React Native',
      'Expo',
      'TypeScript',
      'Mobile UI Development',
      'Navigation',
      'API Integration',
      'Push Notifications',
      'Cross-platform Development'
    ]
  },
  {
    category: 'Backend',
    skills: [
      'Java',
      'Spring Boot',
      'Node.js',
      'REST APIs',
      'JWT Authentication',
      'Database Design',
      'Microservices',
      'Apache Kafka'
    ]
  },
  {
    category: 'Data Engineering',
    skills: [
      'Python',
      'Apache Spark',
      'Apache Airflow',
      'ETL Pipelines',
      'Data Modeling',
      'PostgreSQL',
      'MySQL',
      'MongoDB'
    ]
  },
  {
    category: 'DevOps & Tools',
    skills: [
      'Git & GitHub',
      'Docker',
      'AWS',
      'Redis',
      'Postman',
      'VS Code',
      'IntelliJ IDEA',
      'Linux'
    ]
  },
  {
    category: 'Other Skills',
    skills: [
      'Problem Solving',
      'Clean Code',
      'Debugging',
      'System Design',
      'Performance Optimization',
      'API Design',
      'Agile Collaboration',
      'Self-learning'
    ]
  }
];

// Services Data
const servicesData = [
  {
    icon: '🌐',
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with scalable and maintainable technologies.',
    features: [
      'Custom web applications',
      'E-commerce platforms',
      'Landing pages',
      'Admin dashboards'
    ]
  },
  {
    icon: '💻',
    title: 'Full-Stack Applications',
    description: 'End-to-end software solutions from database design and backend APIs to frontend implementation.',
    features: [
      'RESTful API development',
      'Database architecture',
      'User authentication',
      'Real-time features'
    ]
  },
  {
    icon: '📱',
    title: 'Mobile App Development',
    description: 'Cross-platform mobile applications built with React Native and Expo for fast delivery and smooth user experience.',
    features: [
      'React Native apps',
      'Expo development',
      'API integration',
      'Push notifications'
    ]
  },
  {
    icon: '☕',
    title: 'Backend & API Development',
    description: 'Robust backend systems designed for security, scalability, and long-term maintainability.',
    features: [
      'Java Spring Boot',
      'Node.js services',
      'JWT authentication',
      'Microservices architecture'
    ]
  },
  {
    icon: '📊',
    title: 'Data Engineering',
    description: 'Data pipelines and processing workflows for collecting, transforming, and loading data efficiently.',
    features: [
      'ETL pipelines',
      'Apache Spark processing',
      'Apache Airflow workflows',
      'Data modeling'
    ]
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    description: 'Deployment, infrastructure setup, and cloud service integration for reliable production systems.',
    features: [
      'Docker deployment',
      'AWS integration',
      'CI/CD setup',
      'Server configuration'
    ]
  },
  {
    icon: '🔒',
    title: 'Security Applications',
    description: 'Specialized tools and secure application features for data protection and safe file handling.',
    features: [
      'File encryption',
      'Secure authentication',
      'Role-based access control',
      'Secure data transmission'
    ]
  },
  {
    icon: '⚡',
    title: 'Performance Optimization',
    description: 'Improve application speed, stability, and reliability through practical engineering optimizations.',
    features: [
      'Code optimization',
      'Database query tuning',
      'Caching strategies',
      'Load time improvements'
    ]
  },
  {
    icon: '🛠️',
    title: 'Consultation & Support',
    description: 'Technical guidance and ongoing support for building, improving, and maintaining software projects.',
    features: [
      'Code review',
      'Architecture planning',
      'Technical mentoring',
      'Troubleshooting'
    ]
  },
  {
    icon: '🤖',
    title: 'AI Integration',
    description: 'Integrating AI-powered features into existing products to improve automation and user productivity.',
    features: [
      'AI chatbot integration',
      'Q&A automation',
      'OpenAI API integration',
      'RAG-based features'
    ]
  },
  {
    icon: '🗄️',
    title: 'Database Design & Optimization',
    description: 'Designing reliable database structures and improving query performance for scalable applications.',
    features: [
      'Schema design',
      'Query optimization',
      'Indexing strategy',
      'Data migration'
    ]
  },
  {
    icon: '🔁',
    title: 'Automation & Internal Tools',
    description: 'Building automation tools and internal systems to reduce manual work and improve business operations.',
    features: [
      'Admin tools',
      'Workflow automation',
      'Report generation',
      'Third-party integrations'
    ]
  }
];


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

