import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { Zap, Shield, GitBranch, Timer } from 'lucide-react';

const features = [
  { icon: Zap, label: 'Zero Config' },
  { icon: Shield, label: 'Privacy First' },
  { icon: GitBranch, label: 'Git Integration' },
  { icon: Timer, label: '~12ms Latency' },
];

export default function SolutionSection() {
  return (
    <section className="section" data-testid="solution-section">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <motion.span
            variants={staggerItem}
            className="text-mono text-[var(--color-text-muted)] text-sm uppercase tracking-wider mb-4 block"
          >
            The Solution
          </motion.span>
          <motion.h2 variants={staggerItem} className="text-section mb-4">
            Automatic Provenance for AI Development
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
          >
            Diachron hooks into your AI coding assistant and captures every file modification
            with timestamps, diffs, and context—automatically.
          </motion.p>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-4xl mx-auto mb-16"
        >
          <motion.div
            variants={staggerItem}
            className="relative p-6 md:p-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            {/* Flow diagram */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-mono text-sm">
              {/* Claude Code */}
              <motion.div
                className="flex flex-col items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-24 md:w-28 h-12 md:h-14 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex items-center justify-center">
                  <span className="text-[var(--color-text-primary)]">Claude Code</span>
                </div>
                <span className="text-[var(--color-text-muted)] text-xs">Write / Edit / Bash</span>
              </motion.div>

              {/* Arrow */}
              <motion.div
                className="flex flex-col md:flex-row items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-px md:w-10 h-6 md:h-px bg-gradient-to-b md:bg-gradient-to-r from-[var(--color-border)] to-[var(--color-accent)]" />
                <motion.div
                  className="w-2 h-2 rounded-full bg-[var(--color-accent)]"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>

              {/* Hook */}
              <motion.div
                className="flex flex-col items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-24 md:w-28 h-12 md:h-14 rounded-lg bg-[var(--color-accent-muted)] border border-[var(--color-accent)] flex items-center justify-center">
                  <span className="text-[var(--color-accent)]">Hook</span>
                </div>
                <span className="text-[var(--color-accent)] text-xs">~12ms</span>
              </motion.div>

              {/* Arrow */}
              <motion.div
                className="flex flex-col md:flex-row items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-[var(--color-accent-secondary)]"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
                <div className="w-px md:w-10 h-6 md:h-px bg-gradient-to-b md:bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-border)]" />
              </motion.div>

              {/* SQLite */}
              <motion.div
                className="flex flex-col items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-24 md:w-28 h-12 md:h-14 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex items-center justify-center">
                  <span className="text-[var(--color-text-primary)]">SQLite</span>
                </div>
                <span className="text-[var(--color-text-muted)] text-xs">.diachron/events.db</span>
              </motion.div>

              {/* Arrow */}
              <motion.div
                className="flex flex-col md:flex-row items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="w-px md:w-10 h-6 md:h-px bg-[var(--color-border)]" />
              </motion.div>

              {/* Timeline */}
              <motion.div
                className="flex flex-col items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-24 md:w-28 h-12 md:h-14 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex items-center justify-center">
                  <span className="text-[var(--color-text-primary)]">/timeline</span>
                </div>
                <span className="text-[var(--color-text-muted)] text-xs">Query & Export</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.label}
              variants={staggerItem}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              <feature.icon className="w-4 h-4" />
              <span>{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
