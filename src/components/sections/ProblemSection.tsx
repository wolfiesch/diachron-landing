import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { LineChart, GitCommit, AlertTriangle, RotateCcw, Layers } from 'lucide-react';

const problems = [
  {
    icon: LineChart,
    title: 'Langfuse shows what the AI said. Not what it did.',
    description: 'LLM observability tracks tokens and latency—but not the code changes that actually shipped.',
    highlight: true,
  },
  {
    icon: GitCommit,
    title: 'Git blame shows who. Not why.',
    description: 'Commits from AI sessions are black boxes. You see the diff, not the intent.',
  },
  {
    icon: AlertTriangle,
    title: "When AI code breaks production, you're blind.",
    description: 'No link from error → AI session → original prompt → diff. Just guessing.',
  },
  {
    icon: RotateCcw,
    title: 'Rollback means "git revert" and hope.',
    description: 'No scoped undo per AI change. You revert entire commits or nothing.',
  },
  {
    icon: Layers,
    title: 'Multi-assistant = fragmented history.',
    description: 'Claude Code, Codex, Cursor—each has its own silo. No unified view.',
  },
];

export default function ProblemSection() {
  return (
    <section className="section bg-[var(--color-surface)]" data-testid="problem-section">
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
          <motion.h2 variants={staggerItem} className="text-section mb-4">
            Observability Is Not Enough
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
          >
            You can trace LLM calls. But can you trace what they did to your codebase?
          </motion.p>
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
              className={`card group ${
                problem.highlight
                  ? 'md:col-span-2 border-[var(--color-accent)] bg-gradient-to-r from-[rgba(34,211,238,0.08)] via-[rgba(34,211,238,0.03)] to-transparent'
                  : ''
              }`}
            >
              <div className={`flex items-start gap-4 ${problem.highlight ? 'md:flex-row md:items-center' : ''}`}>
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                  problem.highlight
                    ? 'bg-[rgba(34,211,238,0.1)] border-[var(--color-accent)] group-hover:bg-[rgba(34,211,238,0.15)]'
                    : 'bg-[var(--color-surface-elevated)] border-[var(--color-border)] group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent-muted)]'
                }`}>
                  <problem.icon className={`w-5 h-5 transition-colors duration-300 ${
                    problem.highlight
                      ? 'text-[var(--color-accent)]'
                      : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]'
                  }`} />
                </div>
                <div className="flex-1">
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
