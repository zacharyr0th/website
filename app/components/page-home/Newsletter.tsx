import React, { useState, useCallback, memo } from 'react';

const Newsletter: React.FC = memo(() => {
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Signing up with email:', email);
      setEmail('');
    },
    [email]
  );

  return (
    <section className="bg-[var(--color-background)] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[var(--color-text-primary)]">
          Subscribe for Updates
        </h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex items-center border-b border-[var(--color-secondary)] py-2">
            <input
              className="flex-grow bg-transparent text-[var(--color-text-primary)] mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-np-autofill-field-type="email"
            />
            <button
              className="bg-[var(--color-accent)] text-[var(--color-text-primary)] px-4 py-2 rounded text-sm transition-colors duration-200 hover:bg-opacity-80"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
});

Newsletter.displayName = 'Newsletter';

export default Newsletter;