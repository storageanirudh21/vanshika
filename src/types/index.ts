export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'FinTech' | 'AI & ML' | 'Design Systems' | 'Mobile Apps' | 'Web3' | 'SaaS';
  year: string;
  role: string;
  duration: string;
  impactMetrics: { label: string; value: string }[];
  overview: string;
  problem: string;
  solution: string;
  tags: string[];
  accentColor: string;
  gradient: string;
  featured: boolean;
  demoUrl?: string;
  figmaUrl?: string;
  behanceUrl?: string;
  deliverables: string[];
  showcase?: ProjectShowcase;
}

export interface ShowcaseCursor {
  label: string;
  color: string;
  // Position of the pointer tip inside the frame, in percent
  x: number;
  y: number;
  // Which side of the pointer the name tag hangs on
  side: 'left' | 'right';
}

export interface ProjectShowcase {
  summary: string;
  emoji: string;
  // UI screenshot shown inside the laptop browser (16:10)
  screen?: string;
  // Transparent artwork that bursts out of the frame
  art?: string;
  cursors: ShowcaseCursor[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type: 'Freelance' | 'Internship' | 'Full-time';
  location: string;
  period: string;
  description: string;
  highlights: string[];
  skills: string[];
}

export interface Company {
  name: string;
  type: 'Freelance' | 'Internship';
  // Optional logo in /public; the name is shown as a wordmark until it exists
  logo?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Service {
  title: string;
  desc: string;
  tools: string[];
}

export interface Experiment {
  id: string;
  title: string;
  kicker: string;
  desc: string;
  tags: string[];
  link?: string;
  visual: 'storybook' | 'design-system';
}

export interface ArchiveItem {
  year: string;
  title: string;
  type: 'Landing page' | 'Figma exploration' | 'Visual design' | 'Case study';
  platform: 'Behance' | 'Figma' | 'Live' | 'Dribbble';
  url: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
}
