import fs from 'fs/promises';
import { GET } from '../articles/route';
import type { Article } from '../../writing/types';

// Mock fs/promises
jest.mock('fs/promises', () => ({
  access: jest.fn(),
  readdir: jest.fn(),
  readFile: jest.fn(),
}));

// Mock next/server
jest.mock('next/server', () => {
  const json = jest.fn((data, init) => ({
    json: async () => data,
    status: init?.status,
  }));
  return {
    NextResponse: { json },
  };
});

describe('Articles API', () => {
  const mockArticleContent = `---
title: Test Article
description: A test article
date: 2024-01-07
tags: [technology, finance]
draft: false
---

# Test Content`;

  const mockDraftArticleContent = `---
title: Draft Article
description: A draft article
date: 2024-01-07
tags: [crypto, defi]
draft: true
---

# Draft Content`;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Reset environment
    process.env.NODE_ENV = 'production';
    
    // Default mock implementations
    (fs.access as jest.Mock).mockResolvedValue(undefined);
    (fs.readdir as jest.Mock).mockResolvedValue(['test.md', 'draft.md']);
    (fs.readFile as jest.Mock).mockImplementation((path: string) => {
      if (path.includes('test.md')) {
        return Promise.resolve(mockArticleContent);
      }
      if (path.includes('draft.md')) {
        return Promise.resolve(mockDraftArticleContent);
      }
      return Promise.reject(new Error('File not found'));
    });
  });

  it('returns articles successfully', async () => {
    const response = await GET();
    const data = await response.json();

    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBe(1); // Only non-draft article in production
    
    const article = data[0];
    expect(article).toMatchObject({
      title: 'Test Article',
      description: 'A test article',
      tags: ['technology', 'finance'],
      slug: 'test',
    });
  });

  it('includes draft articles in development', async () => {
    process.env.NODE_ENV = 'development';

    const response = await GET();
    const data = await response.json();

    expect(data.length).toBe(2); // Both articles in development
    expect(data.some((article: Article) => article.title === 'Draft Article')).toBe(true);
  });

  it('handles missing articles directory', async () => {
    (fs.access as jest.Mock).mockRejectedValue(new Error('Directory not found'));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({ error: 'Articles directory not found' });
  });

  it('handles invalid article files', async () => {
    (fs.readFile as jest.Mock).mockRejectedValue(new Error('Invalid file'));

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual([]); // Should return empty array for invalid files
  });

  it('filters non-markdown files', async () => {
    (fs.readdir as jest.Mock).mockResolvedValue(['test.md', 'test.txt', 'test.json']);

    const response = await GET();
    const data = await response.json();

    expect(fs.readFile).toHaveBeenCalledTimes(1); // Only called for .md file
    expect(data.length).toBe(1);
  });

  it('sorts articles by date in descending order', async () => {
    const olderArticle = `---
title: Older Article
description: An older article
date: 2024-01-01
tags: [test]
draft: false
---

# Old Content`;

    const newerArticle = `---
title: Newer Article
description: A newer article
date: 2024-01-07
tags: [test]
draft: false
---

# New Content`;

    (fs.readdir as jest.Mock).mockResolvedValue(['older.md', 'newer.md']);
    (fs.readFile as jest.Mock).mockImplementation((path: string) => {
      if (path.includes('older.md')) return Promise.resolve(olderArticle);
      if (path.includes('newer.md')) return Promise.resolve(newerArticle);
      return Promise.reject(new Error('File not found'));
    });

    const response = await GET();
    const data = await response.json();

    expect(data[0].title).toBe('Newer Article');
    expect(data[1].title).toBe('Older Article');
  });

  it('handles invalid frontmatter', async () => {
    const invalidArticle = `---
invalid_field: test
---

# Invalid Content`;

    (fs.readdir as jest.Mock).mockResolvedValue(['invalid.md']);
    (fs.readFile as jest.Mock).mockResolvedValue(invalidArticle);

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual([]); // Should filter out invalid articles
  });
}); 