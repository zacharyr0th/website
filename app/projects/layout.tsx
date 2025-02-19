import { type PropsWithChildren } from 'react';

export default function ProjectsLayout({ children }: PropsWithChildren) {
  return <section className="w-full max-w-5xl mx-auto px-4 py-8">{children}</section>;
}
