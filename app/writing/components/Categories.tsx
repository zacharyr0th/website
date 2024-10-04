import React, { useCallback } from 'react';
import { Category, CategoriesProps } from '@/lib/types';

const categories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'article', name: 'Articles' },
  { id: 'review', name: 'Reviews' },
  { id: 'interview', name: 'Interviews' },
];

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ activeCategory, setActiveCategory }) => {
    const handleCategoryClick = useCallback(
      (categoryId: string) => {
        setActiveCategory(categoryId);
      },
      [setActiveCategory]
    );

    return (
      <section className="py-6">
        <div className="tabs-container" role="tablist">
          {categories.map(({ id, name }, index) => (
            <button
              key={id}
              onClick={() => handleCategoryClick(id)}
              className={`tab-button ${activeCategory === id ? 'active' : ''}`}
              role="tab"
              aria-selected={activeCategory === id}
              aria-controls={`${id}-content`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {name}
            </button>
          ))}
        </div>
        <style jsx>{`
          .tabs-container {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            position: relative;
            opacity: 0;
            animation: fadeIn 0.5s ease-out forwards;
            animation-delay: 0.2s;
          }

          .tabs-container::before,
          .tabs-container::after {
            content: '';
            flex: 1;
          }

          .tab-button {
            padding: 0.75rem 1.5rem;
            font-size: 1.1rem;
            font-weight: 500;
            border: 2px solid transparent;
            border-radius: 2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            opacity: 0;
            animation: fadeInDown 0.5s ease-out forwards;
            position: relative;
            overflow: hidden;
          }

          .tab-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.4s ease-out, height 0.4s ease-out;
          }

          .tab-button:hover::before {
            width: 300px;
            height: 300px;
          }

          .tab-button.active {
            background-color: var(--color-accent);
            color: white;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            transform: translateY(-2px);
          }

          .tab-button:not(.active) {
            background-color: transparent;
            color: var(--color-secondary);
            border-color: var(--color-secondary);
          }

          .tab-button:not(.active):hover {
            background-color: var(--color-secondary);
            color: white;
          }

          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </section>
    );
  }
);

Categories.displayName = 'Categories';

export default Categories;
