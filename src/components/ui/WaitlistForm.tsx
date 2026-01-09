import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

// Replace with your Formspree endpoint
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface WaitlistFormProps {
  className?: string;
  variant?: 'default' | 'large';
}

export default function WaitlistForm({ className = '', variant = 'default' }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isLarge = variant === 'large';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email.trim()) return;

    setState('loading');
    setErrorMessage('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setState('success');
        setEmail('');
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (err) {
      setState('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to submit');
    }
  }

  if (state === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center gap-3 ${className}`}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-accent-muted)]">
          <Check className="w-5 h-5 text-[var(--color-accent)]" />
        </div>
        <div>
          <p className="font-medium text-[var(--color-text-primary)]">You're on the list!</p>
          <p className="text-sm text-[var(--color-text-muted)]">We'll be in touch soon.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${className}`}>
      <div
        className={`flex gap-3 ${isLarge ? 'flex-col sm:flex-row' : 'flex-row'}`}
      >
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={state === 'loading'}
            className={`input w-full ${isLarge ? 'py-4 px-5 text-base' : ''}`}
          />
        </div>

        <button
          type="submit"
          disabled={state === 'loading' || !email.trim()}
          className={`btn btn-primary whitespace-nowrap ${isLarge ? 'py-4 px-8' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <AnimatePresence mode="wait">
            {state === 'loading' ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Joining...</span>
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <span>Join Waitlist</span>
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {state === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-[var(--color-error)]"
          >
            {errorMessage || 'Something went wrong. Please try again.'}
          </motion.p>
        )}
      </AnimatePresence>

      <p className="mt-3 text-xs text-[var(--color-text-muted)]">
        Free forever for open source projects. No spam, ever.
      </p>
    </form>
  );
}
