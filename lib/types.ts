export interface Content {
    id: string;
    slug: string;
    title: string;
    image: string;
    pageViews: number;
    type: 'article' | 'review' | 'interview';
    description?: string;
  }
  
  export interface WritingPageClientProps {
    initialContent: Content[];
    contentType?: 'article' | 'review' | 'interview';
  }
  