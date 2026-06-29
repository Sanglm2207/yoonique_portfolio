export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  caseStudy: {
    problem: string;
    solution: string;
    impact: string;
    learnings: string;
  };
  technologies: string[];
  github: string;
  download?: string;
  liveDemo?: string;
  featured: boolean;
  icon: string;
  bgColor: string;
  image?: string;
}