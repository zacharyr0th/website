import React from 'react';
import ProfileImage from '../../components/misc/ProfileImage';
import { SOCIAL_LINKS } from '../../lib/social';
import { BIO } from '../constants';

export const Hero = React.memo(() => (
  <div className="flex flex-col md:flex-row gap-6 items-center">
    <div className="relative w-24 md:w-28">
      <ProfileImage size="sm" clickable={false} />
    </div>

    <div className="flex-1 text-center md:text-left">
      <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-text-primary">
        {BIO.name}
      </h1>
      <p className="text-xl sm:text-2xl mb-4 text-text-secondary">
        {BIO.title}
      </p>
      <div className="flex gap-4 justify-center md:justify-start">
        {Object.values(SOCIAL_LINKS).map(({ icon: Icon, url, label }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-text-secondary hover:text-accent transition-colors"
            aria-label={label}
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>
  </div>
));

Hero.displayName = 'Hero';
