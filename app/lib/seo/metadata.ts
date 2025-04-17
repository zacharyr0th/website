import { type Metadata } from 'next';
import { SECTION_METADATA, metadata as baseMetadata } from '../config/seo.config';
import { SITE_INFO } from '../config/site.config';

export type SectionKey = keyof typeof SECTION_METADATA;

/**
 * Builds metadata for a specific section by combining base metadata with section-specific overrides
 */
export function buildSectionMetadata(section: SectionKey): Metadata {
  const sectionMeta = SECTION_METADATA[section];

  return {
    ...baseMetadata,
    title: sectionMeta.title,
    description: sectionMeta.description,
    keywords: [...(sectionMeta.keywords || [])],
    openGraph: {
      ...baseMetadata.openGraph,
      title: sectionMeta.title,
      description: sectionMeta.description,
      images: [
        {
          url: sectionMeta.ogImage,
          width: 1200,
          height: 630,
          alt: `${sectionMeta.title} - ${SITE_INFO.name}`,
        },
      ],
      ...('openGraph' in sectionMeta ? sectionMeta.openGraph : {}),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: sectionMeta.title,
      description: sectionMeta.description,
      images: [sectionMeta.ogImage],
    },
  };
}

/**
 * Builds metadata for a specific article
 */
export function buildArticleMetadata({
  title,
  description,
  date,
  image,
  tags,
}: {
  title: string;
  description: string;
  date: string;
  image?: string;
  tags?: string[];
}): Metadata {
  const pageTitle = `${title} | ${SITE_INFO.name}`;

  return {
    ...baseMetadata,
    title: pageTitle,
    description,
    keywords: tags,
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'article',
      title: pageTitle,
      description,
      publishedTime: date,
      modifiedTime: date,
      authors: [SITE_INFO.url + '/bio'],
      tags,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : baseMetadata.openGraph?.images,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: pageTitle,
      description,
      images: image ? [image] : baseMetadata.twitter?.images,
    },
  };
}

/**
 * Builds metadata for dynamic routes (e.g. tag pages, category pages)
 */
export function buildDynamicMetadata({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const pageTitle = `${title} | ${SITE_INFO.name}`;

  return {
    ...baseMetadata,
    title: pageTitle,
    description,
    openGraph: {
      ...baseMetadata.openGraph,
      title: pageTitle,
      description,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : baseMetadata.openGraph?.images,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: pageTitle,
      description,
      images: image ? [image] : baseMetadata.twitter?.images,
    },
  };
}
