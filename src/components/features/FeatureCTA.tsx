import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { ArrowRight, Github, Terminal } from 'lucide-react';

export default function FeatureCTA() {
  return (
    <section className="section bg-[var(--color-surface)]" data-testid="feature-cta">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2 variants={staggerItem} className="text-section mb-6">
            Ready to Track Your AI's Work?
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-[var(--color-text-secondary)] text-lg mb-10"
          >
            Install Diachron in seconds and start capturing every change.
            Free forever for individual developers.
          </motion.p>

          {/* Install command */}
          <motion.div
            variants={staggerItem}
            className="mb-10 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-void)] max-w-xl mx-auto"
          >
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-[var(--color-accent)]" />
              <code className="flex-1 text-left text-sm text-[var(--color-text-primary)] font-mono">
                curl -fsSL https://diachron.ai/install.sh | bash
              </code>
              <button
                onClick={() => navigator.clipboard.writeText('curl -fsSL https://diachron.ai/install.sh | bash')}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
              >
                Copy
              </button>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="/#waitlist"
              className="btn btn-primary"
            >
              Join Waitlist
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/wolfiesch/diachron"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={staggerItem}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              MIT Licensed
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              100% Local Storage
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-secondary)]" />
              No Telemetry
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
