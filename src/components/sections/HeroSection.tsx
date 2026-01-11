import { motion } from 'framer-motion';
import { CirclePlay, Github, Link2 } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/motion';
import GridPattern from '../effects/GridPattern';
import WaitlistForm from '../ui/WaitlistForm';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="waitlist"
      data-testid="hero-section"
    >
      {/* Background grid */}
      <GridPattern />

      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-void)]"
        aria-hidden="true"
      />

      <div className="container relative z-10 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          {/* Eyebrow */}
          <motion.div variants={staggerItem} className="mb-6">
            <span className="text-mono inline-block px-4 py-1.5 rounded-full border border-[var(--color-accent)] bg-[rgba(34,211,238,0.05)] text-[var(--color-accent)] text-xs uppercase tracking-wider">
              Prompt → Patch → Merge
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={staggerItem} className="text-hero mb-6">
            Git for{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">Agent Actions</span>
              {/* Animated underline */}
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left' }}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={staggerItem}
            className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-4 max-w-2xl mx-auto leading-relaxed"
          >
            Provenance + verification for AI-written code.
          </motion.p>

          {/* Supporting hook */}
          <motion.p
            variants={staggerItem}
            className="text-lg text-[var(--color-text-muted)] mb-10 max-w-xl mx-auto"
          >
            AI is writing 30-50% of new code. There's no audit trail.{' '}
            <span className="text-[var(--color-accent)]">Until now.</span>
          </motion.p>

          {/* Waitlist form */}
          <motion.div variants={staggerItem} className="max-w-md mx-auto">
            <WaitlistForm variant="large" testId="waitlist-hero" />
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="mt-4 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="https://github.com/wolfiesch/diachron"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-sm"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
            <a href="/#demo" className="btn btn-secondary text-sm">
              <CirclePlay className="w-4 h-4" />
              See demo
            </a>
          </motion.div>

          {/* Metrics strip */}
          <motion.div
            variants={staggerItem}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-8"
          >
            <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm">
              <span className="text-mono text-[var(--color-accent)]">12ms</span>
              <span>hook latency</span>
            </div>
            <div className="w-px h-4 bg-[var(--color-border)] hidden md:block" />
            <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm">
              <Link2 className="w-4 h-4 text-[var(--color-accent-secondary)]" />
              <span>hash-chained audit</span>
            </div>
            <div className="w-px h-4 bg-[var(--color-border)] hidden md:block" />
            <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm">
              <span className="text-mono text-[var(--color-accent)]">0</span>
              <span>cloud required</span>
            </div>
            <div className="w-px h-4 bg-[var(--color-border)] hidden md:block" />
            <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm">
              <span className="text-mono text-[var(--color-accent)]">MIT</span>
              <span>open source</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-[var(--color-border)] flex items-start justify-center p-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-[var(--color-text-muted)]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
