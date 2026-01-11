import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { ChevronRight, Target, Search, Lightbulb } from 'lucide-react';

const pillars = [
  { icon: Target, label: 'Track', color: 'cyan' },
  { icon: Search, label: 'Search', color: 'magenta' },
  { icon: Lightbulb, label: 'Understand', color: 'gradient' },
];

export default function FeatureHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[var(--color-accent)] opacity-5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-accent-secondary)] opacity-5 rounded-full blur-[120px]" />

      <div className="container">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8"
        >
          <Link to="/" className="hover:text-[var(--color-text-secondary)] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[var(--color-text-secondary)]">Features</span>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.div variants={staggerItem} className="mb-6">
            <span className="text-mono inline-block px-4 py-1.5 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent-muted)] text-[var(--color-accent)] text-xs uppercase tracking-wider">
              Deep Dive
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={staggerItem} className="text-hero mb-6">
            Everything You Need to{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">
                Track AI Development
              </span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={staggerItem}
            className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-12 max-w-3xl leading-relaxed"
          >
            From automatic capture to semantic understanding—explore every capability
            that makes Diachron the definitive provenance tool for AI-assisted development.
          </motion.p>

          {/* Three pillars */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap gap-4"
          >
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.label}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 ${
                  pillar.color === 'cyan'
                    ? 'border-[var(--color-accent)] bg-[rgba(34,211,238,0.05)] hover:bg-[rgba(34,211,238,0.1)]'
                    : pillar.color === 'magenta'
                    ? 'border-[var(--color-accent-secondary)] bg-[rgba(217,70,239,0.05)] hover:bg-[rgba(217,70,239,0.1)]'
                    : 'border-[var(--color-border)] bg-gradient-to-r from-[rgba(34,211,238,0.05)] to-[rgba(217,70,239,0.05)] hover:from-[rgba(34,211,238,0.1)] hover:to-[rgba(217,70,239,0.1)]'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <pillar.icon
                  className={`w-5 h-5 ${
                    pillar.color === 'cyan'
                      ? 'text-[var(--color-accent)]'
                      : pillar.color === 'magenta'
                      ? 'text-[var(--color-accent-secondary)]'
                      : 'text-[var(--color-text-primary)]'
                  }`}
                />
                <span className="font-medium text-[var(--color-text-primary)]">
                  {pillar.label}
                </span>
                <span className="text-mono text-xs text-[var(--color-text-muted)]">
                  0{index + 1}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
