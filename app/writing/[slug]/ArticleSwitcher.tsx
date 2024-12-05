'use client';

import Link from 'next/link';
import { AdjacentArticle } from '@/lib/types';
import styles from './article.module.css';

interface ArticleSwitcherProps {
  prev: AdjacentArticle | null;
  next: AdjacentArticle | null;
}

export default function ArticleSwitcher({ prev, next }: ArticleSwitcherProps) {
  return (
    <nav className={styles.navigation} aria-label="Article navigation">
      <div className={styles.navContainer}>
        {prev && (
          <Link href={`/writing/${prev.slug}`} className={styles.navLink}>
            <div className={styles.navContent}>
              <span className={styles.navDirection}>
                <svg
                  className={styles.navIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 12H5M12 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </span>
              <span className={styles.navTitle}>{prev.title}</span>
            </div>
          </Link>
        )}
        {next && (
          <Link
            href={`/writing/${next.slug}`}
            className={`${styles.navLink} ${styles.navLinkRight}`}
          >
            <div className={styles.navContent}>
              <span className={styles.navDirection}>
                Next
                <svg
                  className={styles.navIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </span>
              <span className={styles.navTitle}>{next.title}</span>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}
