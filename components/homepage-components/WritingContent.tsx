import React from 'react';
import Link from 'next/link';

const WritingContent: React.FC = () => {
  const articles = [
    {
      title: "The Future of AI in Web Development",
      excerpt: "Exploring how artificial intelligence is shaping the landscape of web development and what it means for developers.",
      date: "2023-05-15",
      link: "/blog/future-of-ai-in-web-development"
    },
    {
      title: "Mastering TypeScript: Tips and Tricks",
      excerpt: "A deep dive into advanced TypeScript features that can improve your code quality and developer experience.",
      date: "2023-04-22",
      link: "/blog/mastering-typescript-tips-and-tricks"
    },
    {
      title: "Building Scalable React Applications",
      excerpt: "Best practices and architectural patterns for creating large-scale React applications that stand the test of time.",
      date: "2023-03-10",
      link: "/blog/building-scalable-react-applications"
    }
  ];

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Recent Articles</h2>
      <div className="space-y-6">
        {articles.map((article, index) => (
          <article key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">
              <Link href={article.link} className="text-blue-600 hover:underline">
                {article.title}
              </Link>
            </h3>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{article.date}</span>
              <Link href={article.link} className="text-blue-500 hover:underline">
                Read more
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WritingContent;
