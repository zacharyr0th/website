export interface LearningProject {
  slug: string;
  title: string;
  description: string;
  technologies?: string[];
  features?: string[];
  githubLink?: string;
}

const projects: LearningProject[] = [
  {
    slug: 'simple-os',
    title: 'SimpleOS',
    description:
      'A minimalist operating system built from scratch to understand low-level system architecture.',
    technologies: ['C', 'Assembly', 'QEMU', 'Make'],
    features: ['Bootloader', 'Kernel', 'Basic shell', 'Memory management', 'Interrupt handling'],
    githubLink: 'https://github.com/zacharyr0th/simple-os',
  },
  {
    slug: 'casino-time',
    title: 'CasinoTime',
    description: 'Provably fair, permissionless gambling platform on the Aptos blockchain.',
    technologies: ['Move', 'React', 'Aptos SDK', 'Aptos Randomness', 'Zero-knowledge proofs'],
    features: [
      'Smart contracts',
      'Random number generation',
      'User-friendly interface',
      'Multiple game types',
    ],
  },
  // Add more projects here
];

export function getLearningProjectBySlug(slug: string): LearningProject | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllLearningProjects(): LearningProject[] {
  return projects;
}
