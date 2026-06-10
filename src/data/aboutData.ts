export interface TimelineEntry {
  year: string;
  title: string;
  role: string;
  description: string;
  tags: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ServiceData {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export const timelineData: TimelineEntry[] = [
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

export const skillsData: SkillGroup[] = [
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

export const servicesData: ServiceData[] = [
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
