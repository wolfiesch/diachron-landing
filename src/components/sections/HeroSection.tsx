import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion';
import GridPattern from '../effects/GridPattern';
import WaitlistForm from '../ui/WaitlistForm';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
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
            <span className="text-mono inline-block px-4 py-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
              Agentic Provenance
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={staggerItem} className="text-hero mb-6">
            Know What Your{' '}
            <span className="relative">
              <span className="relative z-10">AI Built</span>
              {/* Subtle underline accent */}
              <motion.span
                className="absolute bottom-2 left-0 w-full h-3 bg-[var(--color-accent-muted)] -z-0"
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
            className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Diachron automatically tracks every code change made by AI agents.
            A queryable timeline of your project's evolution.
          </motion.p>

          {/* Waitlist form */}
          <motion.div variants={staggerItem} className="max-w-md mx-auto">
            <WaitlistForm variant="large" testId="waitlist-hero" />
          </motion.div>

          {/* Social proof placeholder */}
          <motion.div
            variants={staggerItem}
            className="mt-16 flex items-center justify-center gap-8"
          >
            <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm">
              <span className="text-mono text-[var(--color-accent)]">~12ms</span>
              <span>latency per capture</span>
            </div>
            <div className="w-px h-4 bg-[var(--color-border)]" />
            <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm">
              <span className="text-mono text-[var(--color-accent)]">0</span>
              <span>config needed</span>
            </div>
            <div className="w-px h-4 bg-[var(--color-border)]" />
            <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm">
              <span className="text-mono text-[var(--color-accent)]">100%</span>
              <span>local</span>
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
