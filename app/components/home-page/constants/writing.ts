interface WritingProject {
  title: string;
  description: string;
  link: string;
}

export const WRITING_PROJECTS: WritingProject[] = [
  {
    title: "A Bird's Eye View",
    description: 'Seeing the forest through the trees.',
    link: '/writing/a-birds-eye-view',
  },
  {
    title: 'Web 1',
    description: 'A cross generational perspective on the internet.',
    link: '/writing/web-1',
  },
  {
    title: 'Easy Money and Veblen Goods',
    description: 'The Reflexivity of Value',
    link: '/writing/easy-money-and-veblen-goods',
  },
] as const;
