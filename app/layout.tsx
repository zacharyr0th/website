import type { ReactNode } from 'react';
import './styles/globals.css';
import { metadata } from './lib/metadata';
import RootLayoutClient from './components/RootLayoutClient';

export { metadata };

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
