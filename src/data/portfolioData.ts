import type {
  Project,
  ExperienceItem,
  Company,
  Stat,
  Service,
  Experiment,
  ArchiveItem,
  Education,
} from '../types';

/*
 * Everything text-based on the site lives in this file.
 * Anything marked TODO is placeholder copy: swap in your real details.
 */

export const PERSONAL_INFO = {
  name: 'Vanshika Gupta',
  title: 'Product Designer',
  avatar: '/images/avatar.png',
  location: 'India · Remote', // TODO
  email: 'vanshika.design@gmail.com', // TODO
  resumeUrl: '/resume.pdf', // TODO: drop your resume PDF in /public/resume.pdf
  socials: {
    linkedin: 'https://www.linkedin.com/', // TODO
    behance: 'https://www.behance.net/', // TODO
  },
  heroTags: ['Product designer', 'Design Systems'],
};

export const PROJECTS: Project[] = [
  {
    id: 'papertrail',
    title: 'Papertrail AI',
    subtitle: 'Next-Gen Intelligent Document Workspace',
    tagline: 'Transforming chaotic workflows into structured visual thinking',
    category: 'AI & ML',
    year: '2026',
    role: 'Lead Product Designer',
    duration: '6 Months',
    impactMetrics: [
      { label: 'Weekly Active Users', value: '450K+' },
      { label: 'Task Completion Rate', value: '+68%' },
      { label: 'User Retention', value: '84%' },
      { label: 'App Store Rating', value: '4.9 ★' },
    ],
    overview:
      'Papertrail is an AI-native canvas for research teams, combining multimodal generation, live real-time graph reasoning, and friction-free markdown editing in one unified interface.',
    problem:
      'Users were constantly context-switching between 5+ browser tabs, note apps, and generative chat boxes, losing their train of thought and critical insights.',
    solution:
      'Designed an infinite context-aware canvas where documents automatically generate smart semantic relations, dynamic side-drawers, and spatial summaries without clutter.',
    tags: ['AI Interface', 'Canvas UI', 'Design System', 'React / TS', 'Micro-interactions'],
    accentColor: '#6366F1',
    gradient: 'from-indigo-500/20 via-purple-500/10 to-pink-500/20',
    featured: true,
    // TODO: replace with your real links
    figmaUrl: 'https://www.figma.com/',
    behanceUrl: 'https://www.behance.net/',
    demoUrl: 'https://example.com/',
    showcase: {
      summary: 'How we helped {emoji} research teams swap five scattered tabs for one AI canvas that thinks alongside them',
      emoji: '🧠',
      screen: '/images/projects/papertrail-screen.jpg',
      art: '/images/projects/papertrail-art.png',
      cursors: [
        { label: 'Researcher', color: '#f59e0b', x: 24, y: 84, side: 'left' },
        { label: 'PM', color: '#6366f1', x: 72, y: 82, side: 'right' },
      ],
    },
    deliverables: [
      'Design System with 120+ Components',
      'Interactive Canvas Engine Prototypes',
      'Multi-modal Input Gestures',
      'Full End-to-End Usability Testing',
    ],
  },
  {
    id: 'lumina-wealth',
    title: 'Lumina Wealth',
    subtitle: 'Frictionless Mobile Investment & Portfolio Platform',
    tagline: 'Making institutional-grade wealth intelligence accessible to everyone',
    category: 'FinTech',
    year: '2025',
    role: 'Staff Product Designer',
    duration: '8 Months',
    impactMetrics: [
      { label: 'Assets Under Management', value: '$1.4B' },
      { label: 'Onboarding Drop-off', value: '-42%' },
      { label: 'Daily Session Time', value: '14.2 min' },
      { label: 'Industry Award', value: 'Fintech Design of the Year' },
    ],
    overview:
      'Lumina re-imagines personal wealth management by turning complex financial data into beautiful, actionable visual stories and automated rebalancing routines.',
    problem:
      'Legacy fintech apps overload consumers with dense candlestick tables, jargon, and high-friction verification barriers.',
    solution:
      'Created a progressive disclosure architecture with intuitive visual sliders, gesture-based portfolio adjustments, and predictive cash flow timelines.',
    tags: ['FinTech', 'iOS & Android', 'Data Visualization', 'Haptics', 'Design Tokens'],
    accentColor: '#10B981',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
    featured: true,
    // TODO: replace with your real links
    figmaUrl: 'https://www.figma.com/',
    behanceUrl: 'https://www.behance.net/',
    demoUrl: 'https://example.com/',
    showcase: {
      summary: 'How we made {emoji} institutional-grade wealth tools feel simple enough for a first-time investor',
      emoji: '💸',
      screen: '/images/projects/lumina-wealth-screen.jpg',
      art: '/images/projects/lumina-wealth-art.png',
      cursors: [
        { label: 'Investor', color: '#10b981', x: 22, y: 80, side: 'left' },
        { label: 'Advisor', color: '#6366f1', x: 74, y: 84, side: 'right' },
      ],
    },
    deliverables: [
      'iOS & Android native apps',
      'Custom Financial Charting Engine',
      'Haptic Design Guidelines',
      'Biometric Quick-Pay Flows',
    ],
  },
  {
    id: 'aura-system',
    title: 'Aura Design System',
    subtitle: 'Cross-Platform Multi-Brand Token Architecture',
    tagline: 'A living design system powering 18 web & mobile product suites',
    category: 'Design Systems',
    year: '2025',
    role: 'Principal Design Technologist',
    duration: 'Ongoing',
    impactMetrics: [
      { label: 'Engineering Velocity', value: '+310%' },
      { label: 'WCAG Compliance', value: 'AAA 100%' },
      { label: 'Components', value: '240+' },
      { label: 'Adopted Teams', value: '28 Squads' },
    ],
    overview:
      'A comprehensive, tokenized design system built with strict accessibility standards, fluid typography scales, spring animations, and automatic Figma-to-Code synchronization.',
    problem:
      'Fragmented UI libraries across 4 business units led to inconsistent brand identity and redundant engineering cycles.',
    solution:
      'Architected a single-source-of-truth token repository with semantic theme switching, accessible high-contrast modes, and automated component testing.',
    tags: ['Figma Variables', 'Tokens Studio', 'React / Tailwind', 'Accessibility', 'Documentation'],
    accentColor: '#EC4899',
    gradient: 'from-pink-500/20 via-rose-500/10 to-amber-500/20',
    featured: true,
    // TODO: replace with your real links
    figmaUrl: 'https://www.figma.com/',
    behanceUrl: 'https://www.behance.net/',
    demoUrl: 'https://example.com/',
    showcase: {
      summary: 'How one {emoji} token architecture ended up powering 18 web and mobile products across four brands',
      emoji: '🧩',
      screen: '/images/projects/aura-system-screen.jpg',
      art: '/images/projects/aura-system-art.png',
      cursors: [
        { label: 'Engineer', color: '#ec4899', x: 25, y: 82, side: 'left' },
        { label: 'Designer', color: '#8b5cf6', x: 73, y: 80, side: 'right' },
      ],
    },
    deliverables: [
      'Token Engine & Style Dictionary',
      'Figma Community UI Kit',
      'Storybook Interactive Documentation',
      'Automated Visual Regression Pipelines',
    ],
  },
];

export const COMPANIES: Company[] = [
  { name: 'Aavtor AI', type: 'Freelance' },
  { name: 'My Hub Retail', type: 'Internship' },
  { name: 'Tanzcorp', type: 'Internship' },
];

export const INTRO = {
  // TODO: tweak to your voice
  statement:
    "I'm a product designer who turns messy, half-formed ideas into interfaces that feel obvious. Over the last year I've designed with freelance and internship teams, mostly at the 0 → 1 stage, where every screen is still a question.",
};

export const STATS: Stat[] = [
  { value: '1 yr', label: 'Of freelance & internship experience' },
  { value: '1000+', label: 'Users on products I designed' },
  { value: '0 → 1', label: 'Stage products, designed from the first sketch' },
  { value: '4+', label: 'Projects shipped to real users' },
];

// TODO: the domains you have worked in
export const DOMAINS = ['AI tools', 'Retail & e-commerce', 'SaaS dashboards', 'Consumer apps'];

export const SERVICES: Service[] = [
  {
    title: 'Product design',
    desc: 'Research, user flows and wireframes that turn a fuzzy problem into a clear product direction.',
    tools: ['User research', 'Flows', 'Wireframes'],
  },
  {
    title: 'UI & visual design',
    desc: 'Polished, accessible interfaces with a visual language that holds up past the first screen.',
    tools: ['Figma', 'Typography', 'Accessibility'],
  },
  {
    title: 'Design systems',
    desc: 'Tokens, components and docs so teams design and ship faster without drifting apart.',
    tools: ['Tokens', 'Components', 'Docs'],
  },
  {
    title: 'Prototyping & vibe coding',
    desc: 'Interactive prototypes and real front-end builds, made quickly with AI coding tools.',
    tools: ['Prototypes', 'React', 'AI tools'],
  },
];

// TODO: real roles, dates and highlights
export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'aavtor',
    company: 'Aavtor AI',
    role: 'Product Designer',
    type: 'Freelance',
    location: 'Remote',
    period: '2025 — Present',
    description: 'Designing the core product experience for an AI startup, from first flows to a shippable UI.',
    highlights: [
      'Took the product from idea to a launch-ready 0 → 1 design',
      'Set up the component library the team now builds with',
    ],
    skills: ['0 → 1', 'AI UX', 'Design system'],
  },
  {
    id: 'myhub',
    company: 'My Hub Retail',
    role: 'UI/UX Design Intern',
    type: 'Internship',
    location: 'India',
    period: '2025',
    description: 'Worked on the shopping and store-management experience for a growing retail platform.',
    highlights: [
      'Redesigned key purchase flows used by 1000+ customers',
      'Ran quick usability tests to validate changes before handoff',
    ],
    skills: ['E-commerce', 'Usability testing', 'Handoff'],
  },
  {
    id: 'tanzcorp',
    company: 'Tanzcorp',
    role: 'Product Design Intern',
    type: 'Internship',
    location: 'India',
    period: '2024',
    description: 'My first product team: learning to design with engineers, deadlines and real constraints.',
    highlights: ['Designed dashboard screens and landing pages', 'Built my first reusable UI kit in Figma'],
    skills: ['Dashboards', 'Landing pages', 'Figma'],
  },
];

export const EXPERIMENTS: Experiment[] = [
  {
    id: 'storybook',
    title: 'Design Storybook',
    kicker: 'Vibe-coded',
    desc: 'A living Storybook of my UI components, built by pairing with AI coding tools. Every component is documented, interactive and themeable.',
    tags: ['React', 'Storybook', 'AI pair-coding'],
    link: '#', // TODO
    visual: 'storybook',
  },
  {
    id: 'ai-design-system',
    title: 'AI-made Design System',
    kicker: 'Experiment',
    desc: 'How far can AI take a design system? Tokens, colour ramps, a type scale and components, generated with AI and then refined by hand.',
    tags: ['Figma', 'Design tokens', 'Generative AI'],
    link: '#', // TODO
    visual: 'design-system',
  },
];

// TODO: your landing pages and explorations
export const ARCHIVE: ArchiveItem[] = [
  { year: '2025', title: 'SaaS product landing page', type: 'Landing page', platform: 'Live', url: '#' },
  { year: '2025', title: 'AI assistant onboarding', type: 'Figma exploration', platform: 'Figma', url: '#' },
  { year: '2025', title: 'Retail app redesign', type: 'Case study', platform: 'Behance', url: '#' },
  { year: '2024', title: 'Fintech dashboard concept', type: 'Figma exploration', platform: 'Figma', url: '#' },
  { year: '2024', title: 'Agency landing page', type: 'Landing page', platform: 'Live', url: '#' },
  { year: '2024', title: 'Poster & visual series', type: 'Visual design', platform: 'Behance', url: '#' },
];

// TODO: your education
export const EDUCATION: Education[] = [
  { degree: 'Bachelor of Design', school: 'Your University', period: '2021 — 2025' },
];

export const SKILLS = {
  design: ['Product design', 'UX research', 'Interaction design', 'Design systems', 'Prototyping'],
  tools: ['Figma', 'FigJam', 'Framer', 'Notion', 'Cursor / Claude'],
  code: ['HTML & CSS', 'React basics', 'Tailwind'],
};

// TODO: this is your story, so rewrite it in your own words
export const ABOUT = {
  chapters: [
    {
      title: 'How it started',
      body: 'I used to redesign apps in my head while using them. One day I opened Figma to prove a point, and I never really closed it.',
    },
    {
      title: "What I've learned",
      body: 'Good design is mostly listening. My best screens came from asking one more question, not from adding one more feature.',
    },
    {
      title: 'Who I am',
      body: "Curious, a little obsessive about details, and happiest when a teammate says 'oh, that was easy'. I like building things as much as designing them.",
    },
  ],
  hobbies: [
    { emoji: '🍜', label: 'Ramen hunting' },
    { emoji: '🐈‍⬛', label: 'Cat person' },
    { emoji: '✏️', label: 'Sketching' },
    { emoji: '🎧', label: 'Lo-fi playlists' },
    { emoji: '📚', label: 'Design books' },
    { emoji: '☕', label: 'Café hopping' },
  ],
};
