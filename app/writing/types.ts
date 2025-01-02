export interface ArticleImage {
  src: string;
  alt: string;
}

export interface ArticleFrontmatter {
  title: string;
  date: string;
  description?: string;
  category?: string;
  tags?: string[];
  image?: ArticleImage;
  featured?: boolean;
  draft?: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  date: string;
  description?: string;
  category?: string;
  tags?: string[];
  image?: ArticleImage;
  link: string;
  frontmatter: ArticleFrontmatter;
}
