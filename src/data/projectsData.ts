import taskcoverImg from '../assets/images/TaskCover.png';
import commerceDataProductImg from '../assets/images/Commerce_Data_Product.png';
import { Project } from '../types/Project';


export const projectsData: Project[] = [
  {
    id: 1,
    title: 'TaskCover',
    category: 'Full-Stack SaaS Platform',

    description: 'Enterprise productivity platform with AI-powered workflow management across Web, Mobile, and Desktop. Built using Next.js, Node.js, Flutter, and Electron with real-time collaboration, scalable microservices, and customizable workspaces.',

    longDescription: 'TaskCover is a comprehensive enterprise productivity platform designed to streamline project management, team collaboration, and business operations across multiple platforms.\n\nThe system delivers a unified experience on Web, Mobile, and Desktop through a shared backend powered by Node.js microservices. It includes task management, real-time collaboration, AI-assisted productivity features, customizable workspaces, user management, payment integration, and business analytics.\n\nBuilt with scalability in mind, TaskCover supports thousands of concurrent users while maintaining high availability through a modular microservice architecture. The platform enables organizations to centralize workflows, automate repetitive tasks, and improve operational efficiency.',

    caseStudy: {
      problem: 'Businesses often rely on disconnected tools for project management, communication, reporting, and administration, resulting in fragmented workflows, duplicated work, and limited visibility across teams.',

      solution: 'Developed a unified SaaS platform that combines project management, real-time collaboration, AI-powered productivity tools, cross-platform applications, and customizable branding. A shared backend powers Web, Mobile, and Desktop clients while maintaining consistent business logic and synchronized data.',

      impact: 'Delivered a scalable enterprise platform capable of supporting over 1,000 concurrent users with 99.9% uptime. Reduced operational complexity by consolidating multiple business tools into a single ecosystem while improving collaboration and workflow automation.',

      learnings: 'Building a cross-platform SaaS highlighted the importance of modular architecture, API consistency, state synchronization, and scalable deployment. Future improvements would include event-driven communication with Kafka, Kubernetes orchestration, advanced observability, and AI-powered workflow automation using LLM agents.'
    },

    technologies: [
      'Node.js',
      'Next.js',
      'TypeScript',
      'Flutter',
      'Electron',
      'Firebase',
      'Material UI',
      'REST API',
      'Microservices',
      'WebSocket',
      'PayPal'
    ],

    github: 'PRIVATE',
    liveDemo: 'http://taskcover.com/',

    featured: true,

    icon: '🚀',
    bgColor: '#101827',

    image: taskcoverImg
  },
  {
    id: 2,
    title: 'Reliable Commerce Data Product',
    category: 'Data Engineering',
    description: 'End-to-end commerce data platform that ingests raw CSV orders, validates data quality, versions historical changes, transforms datasets with dbt, orchestrates pipelines using Airflow, and delivers analytics through Metabase dashboards.',

    longDescription: 'Reliable Commerce Data Product is a modern end-to-end data engineering pipeline designed to transform raw commerce data into reliable, analytics-ready datasets.\n\nThe platform ingests CSV order files into a PostgreSQL raw layer, performs automated data quality validation, tracks historical order changes through versioning, and models business-ready data marts using dbt. Airflow orchestrates the entire workflow with automated scheduling and dependency management, while Metabase provides interactive dashboards for business users.\n\nBuilt following modern DataOps principles, the project emphasizes data reliability, reproducibility, lineage, and scalable analytics workflows suitable for production environments.',

    caseStudy: {
      problem: 'Raw commerce order data arrived as CSV files with inconsistent quality, duplicated records, and no historical tracking, making reporting unreliable and difficult to maintain.',

      solution: 'Designed a complete ELT pipeline using PostgreSQL, Python, dbt, and Airflow. The pipeline validates incoming data, creates versioned order history, builds dimensional analytics marts, automates orchestration, and exposes business metrics through Metabase dashboards.',

      impact: 'Delivered a fully automated analytics pipeline with reliable data quality checks, reproducible transformations, historical data lineage, and near real-time business reporting. Reduced manual reporting effort while improving confidence in analytical metrics.',

      learnings: 'Building the project highlighted that reliable analytics depend more on data quality, lineage, and orchestration than transformation logic alone. Future improvements would include incremental dbt models, automated data testing with Great Expectations, CI/CD deployment, and cloud-native storage such as BigQuery or Snowflake.'
    },

    technologies: [
      'Python',
      'PostgreSQL',
      'Apache Airflow',
      'dbt',
      'Metabase',
      'SQL',
      'Data Modeling',
      'Data Validation',
      'ETL/ELT'
    ],

    github: 'https://github.com/sanglm2207/reliable-commerce-data-product',
    download: 'http://github.com/Sanglm2207/reliable-commerce-data-product/releases',
    featured: true,

    icon: '📊',
    bgColor: '#7b0f53',

    image: commerceDataProductImg
  },
  
];

export const categories = ['All', 'Full-Stack SaaS Platform', "Data Engineering"];
