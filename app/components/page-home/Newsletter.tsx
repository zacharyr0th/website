import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log('Signing up with email:', email);
    // Reset the email input
    setEmail('');
  };

  return (
    <section className="py-16" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl font-bold text-center mb-8"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Subscribe for Updates
        </h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div
            className="flex items-center border-b py-2"
            style={{ borderColor: 'var(--color-secondary)' }}
          >
            <input
              className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
              style={{ color: 'var(--color-text-primary)' }}
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              className="flex-shrink-0 text-sm border-4 rounded transition-colors duration-200"
              style={{
                backgroundColor: 'var(--color-accent)',
                borderColor: 'var(--color-accent)',
                color: 'var(--color-text-primary)',
              }}
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
