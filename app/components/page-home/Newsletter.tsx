import React, { useState, useCallback, memo } from 'react';

interface NewsletterFormState {
  email: string;
  isSubmitting: boolean;
}

const initialState: NewsletterFormState = {
  email: '',
  isSubmitting: false,
};

const Newsletter: React.FC = memo(() => {
  const [{ email, isSubmitting }, setState] = useState<NewsletterFormState>(initialState);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState((prev) => ({ ...prev, email: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email || isSubmitting) return;

      try {
        setState((prev) => ({ ...prev, isSubmitting: true }));
        // TODO: Implement actual newsletter signup
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        console.log('Signing up with email:', email);
        setState(initialState);
      } catch (error) {
        console.error('Newsletter signup failed:', error);
        setState((prev) => ({ ...prev, isSubmitting: false }));
      }
    },
    [email, isSubmitting]
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
              placeholder="Coming Soon"
              aria-label="Email address"
              value={email}
              onChange={handleEmailChange}
              required
              disabled={isSubmitting}
              data-np-autofill-field-type="email"
            />
            <button
              className="bg-[var(--color-accent)] text-[var(--color-text-primary)] px-4 py-2 rounded text-sm transition-colors duration-200 hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
});

Newsletter.displayName = 'Newsletter';

export default Newsletter;
