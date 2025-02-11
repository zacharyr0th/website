import React from 'react';
import type { Metadata } from 'next';
import { SECTION_METADATA } from '@/lib/metadata';
import BioPageClient from './components/BioPageClient';

export const metadata: Metadata = {
  title: SECTION_METADATA.bio.title,
  description: SECTION_METADATA.bio.description,
};

export default function BioPage() {
  return <BioPageClient />;
}
