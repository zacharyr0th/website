'use client';

import { useState, useCallback, memo, useMemo } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface NewsletterFormState {
  email: string;
  status: FormStatus;
  message: string;
}

const BUTTON_STATES = {
  idle: 'Sign Up',
  submitting: 'Signing up...',
  success: '✓ Signed Up',
  error: 'Try Again',
} as const;

const initialState: NewsletterFormState = {
  email: '',
  status: 'idle',
  message: '',
};

export const Newsletter = memo(() => {
  const [{ email, status, message }, setState] = useState<NewsletterFormState>(initialState);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState((prev) => ({ ...prev, email: value, status: 'idle', message: '' }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || status === 'submitting') return;

      try {
        setState((prev) => ({
          ...prev,
          status: 'submitting',
          message: 'Signing up...',
        }));

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setState({
          ...initialState,
          status: 'success',
          message: 'Thanks for signing up!',
        });
      } catch (error) {
        console.error('Newsletter signup failed:', error);
        setState((prev) => ({
          ...prev,
          status: 'error',
          message: 'Failed to sign up. Please try again.',
        }));
      }
    },
    [email, status]
  );

  const isDisabled = useMemo(() => status === 'submitting' || status === 'success', [status]);

  const messageClassName = useMemo(() => {
    if (!message) return '';
    return `text-xs sm:text-sm text-center ${
      status === 'error'
        ? 'text-[var(--color-error)]'
        : status === 'success'
          ? 'text-[var(--color-success)]'
          : 'text-[var(--color-text-secondary)]'
    } animate-fade-in`;
  }, [message, status]);

  return (
    <section className="bg-[var(--color-background)] py-8 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-[var(--color-text-primary)]">
          Subscribe for Updates
        </h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center border-b border-[var(--color-secondary)] py-2 transition-colors duration-200 focus-within:border-accent">
              <input
                className="flex-grow bg-transparent text-[var(--color-text-primary)] mb-3 sm:mb-0 sm:mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-text-secondary/50"
                type="email"
                placeholder="Coming Soon"
                aria-label="Email address"
                value={email}
                onChange={handleEmailChange}
                required
                disabled={isDisabled}
                data-np-autofill-field-type="email"
              />
              <button
                className={`px-4 py-2 rounded text-sm transition-all duration-200 whitespace-nowrap ${
                  status === 'success'
                    ? 'bg-[var(--color-success)] text-white'
                    : 'bg-[var(--color-accent)] text-[var(--color-text-primary)] hover:bg-opacity-80'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                type="submit"
                disabled={isDisabled}
              >
                {BUTTON_STATES[status] || BUTTON_STATES.idle}
              </button>
            </div>
            {message && <p className={messageClassName}>{message}</p>}
          </div>
        </form>
      </div>
    </section>
  );
});

Newsletter.displayName = 'Newsletter';
