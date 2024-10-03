import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';
import { useTranslation } from 'next-i18next';
import LanguageSelector from './LanguageSelector';

export const Footer: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-[var(--color-surface)] text-sm py-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4">
        <div className="flex items-center justify-center w-full">
          {[
            { href: 'https://x.com/zacharyr0th', Icon: FaXTwitter, label: t('footer.x_profile') },
            {
              href: 'https://www.linkedin.com/in/zacharyr0th',
              Icon: FaLinkedin,
              label: t('footer.linkedin_profile'),
            },
            { href: 'https://www.github.com/zacharyr0th', Icon: FaGithub, label: t('footer.github_profile') },
          ].map(({ href, Icon, label }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors mx-2"
            >
              <Icon size={32} />
            </Link>
          ))}
          <LanguageSelector />
        </div>
        <p className="text-[var(--color-text-secondary)]">
          &copy; {new Date().getFullYear()} {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
