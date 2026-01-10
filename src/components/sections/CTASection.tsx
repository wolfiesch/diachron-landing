import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import WaitlistForm from '../ui/WaitlistForm';
import { Github } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section bg-[var(--color-surface)]" data-testid="cta-section">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2 variants={staggerItem} className="text-section mb-4">
            Ready to Track Your AI's Work?
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="text-[var(--color-text-secondary)] text-lg mb-8"
          >
            Join the waitlist for early access to team features,
            or install the free CLI tool today.
          </motion.p>

          {/* Waitlist form */}
          <motion.div variants={staggerItem} className="mb-8">
            <WaitlistForm variant="large" className="max-w-md mx-auto" testId="waitlist-cta" />
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={staggerItem}
            className="flex items-center gap-4 my-8"
          >
            <div className="flex-1 h-px bg-[var(--color-border)]" />
            <span className="text-[var(--color-text-muted)] text-sm">or</span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </motion.div>

          {/* GitHub link */}
          <motion.div variants={staggerItem}>
            <a
              href="https://github.com/wolfiesch/diachron"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary inline-flex"
              data-testid="github-link"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={staggerItem}
            className="mt-12 pt-8 border-t border-[var(--color-border)]"
          >
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]">
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-accent)]">✓</span>
                <span>MIT Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-accent)]">✓</span>
                <span>100% Local Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-accent)]">✓</span>
                <span>No Telemetry</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
