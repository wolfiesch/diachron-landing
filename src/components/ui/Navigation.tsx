import { useEffect, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/#pricing', label: 'Pricing' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      const normalizedPath = path || '/';

      return location.pathname === normalizedPath && location.hash === `#${hash}`;
    }

    return location.pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-[var(--color-void)]/80 backdrop-blur-md border-b border-[var(--color-border)]" />

      <nav className="container relative flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-[var(--color-text-primary)] font-semibold text-lg">
          <span className="text-[var(--color-accent)]">◆</span>
          Diachron
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm transition-colors duration-200 ${isActive(link.href)
                  ? 'text-[var(--color-accent)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + GitHub */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/wolfiesch/diachron"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            aria-label="View on GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="/#waitlist"
            className="btn btn-primary text-sm"
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 text-[var(--color-text-muted)]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            id="mobile-menu"
            className="md:hidden absolute top-16 left-0 right-0 bg-[var(--color-surface)] border-b border-[var(--color-border)]"
          >
            <div className="container py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm py-2 transition-colors ${isActive(link.href)
                      ? 'text-[var(--color-accent)]'
                      : 'text-[var(--color-text-secondary)]'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)]">
                <a
                  href="https://github.com/wolfiesch/diachron"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[var(--color-text-muted)]"
                  aria-label="View on GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="/#waitlist"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary text-sm flex-1 text-center"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
