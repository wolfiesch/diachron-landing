import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { GitCommit, Brain, Clock, Bug } from 'lucide-react';

const problems = [
  {
    icon: GitCommit,
    title: 'Git commits full of jargon',
    description: 'AI commits say "Implemented feature" without explaining the why or how.',
  },
  {
    icon: Brain,
    title: 'AI reasoning disappears',
    description: 'The context behind decisions vanishes the moment the session ends.',
  },
  {
    icon: Clock,
    title: 'No timeline of changes',
    description: 'Hours of AI-assisted work become an opaque blob in your git history.',
  },
  {
    icon: Bug,
    title: 'Bugs without trace',
    description: "When AI introduces bugs, there's no breadcrumb trail to find the root cause.",
  },
];

export default function ProblemSection() {
  return (
    <section className="section bg-[var(--color-surface)]">
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
            The Problem
          </motion.span>
          <motion.h2 variants={staggerItem} className="text-section">
            When AI Agents Touch Your Code...
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={staggerItem}
              className="card group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent-muted)] transition-all duration-300">
                  <problem.icon className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-[var(--color-text-primary)]">
                    {problem.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
