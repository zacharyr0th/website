import React from 'react';
import Image from 'next/image';

const About: React.FC = () => (
  <section className="w-full py-24 px-8" style={{ backgroundColor: 'var(--color-background)' }}>
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
        These Are Some of The
        <br />
        Companies We Work With:
      </h2>
      <p className="text-lg mb-16 max-w-3xl" style={{ color: 'var(--color-text-secondary)' }}>
        We have invested in companies as early as Pre-Seed up to Series C with a ticket size ranging
        from $1M to $40M. We provide our portfolio founders with solid and reliable support from the
        beginning of their journey.
      </p>
      <div className="flex justify-between items-center">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div
            key={index}
            className="w-24 h-24 flex items-center justify-center"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--border-radius-md)',
              boxShadow: 'var(--box-shadow)',
              padding: 'var(--spacing-sm)',
              margin: 'var(--spacing-xs)',
            }}
          >
            <Image
              src="/placeholder.jpg"
              alt={`Company logo ${index}`}
              width={80}
              height={80}
              objectFit="contain"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
