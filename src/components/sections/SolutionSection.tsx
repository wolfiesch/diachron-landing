import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import {
  ArrowRight,
  Check,
  CircleCheck,
  ClipboardPen,
  FileCode,
  GitPullRequest,
  Link2,
  MessageCircle,
  TestTube,
  X,
} from 'lucide-react';

const competitors = [
  {
    name: 'Langfuse / LangSmith',
    traces: 'LLM calls, tokens, latency, evals',
    missing: 'No software state change',
    highlight: false,
  },
  {
    name: 'Helicone / AgentOps',
    traces: 'API calls, cost tracking',
    missing: 'No repo context',
    highlight: false,
  },
  {
    name: 'Diachron',
    traces: 'Prompt → Patch → Verify → Merge',
    missing: null,
    highlight: true,
  },
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
            Trace Software State, Not Just LLM Calls
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
          >
            We capture the full pipeline: what the AI intended, what it changed,
            whether it was verified, and when it merged.
          </motion.p>
        </motion.div>

        {/* Competitor comparison table */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-4xl mx-auto mb-16"
        >
          <motion.div
            variants={staggerItem}
            className="rounded-xl border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]"
          >
            {/* Table header */}
            <div className="hidden sm:grid grid-cols-3 gap-4 p-4 bg-[var(--color-surface-elevated)] border-b border-[var(--color-border)] text-sm font-medium">
              <div className="text-[var(--color-text-muted)]">Tool</div>
              <div className="text-[var(--color-text-muted)]">What it traces</div>
              <div className="text-[var(--color-text-muted)]">Missing</div>
            </div>

            {/* Table rows */}
            {competitors.map((comp, index) => (
              <motion.div
                key={comp.name}
                variants={staggerItem}
                className={`grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 items-center text-sm ${
                  comp.highlight
                    ? 'bg-gradient-to-r from-[rgba(34,211,238,0.1)] to-transparent border-l-2 border-l-[var(--color-accent)]'
                    : index < competitors.length - 1 ? 'border-b border-[var(--color-border)]' : ''
                }`}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wide text-[var(--color-text-muted)] sm:hidden">Tool</span>
                  <span className={`font-medium ${comp.highlight ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]'}`}>
                    {comp.name}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wide text-[var(--color-text-muted)] sm:hidden">What it traces</span>
                  <span className={comp.highlight ? 'text-[var(--color-text-primary)] font-medium' : 'text-[var(--color-text-secondary)]'}>
                    {comp.traces}
                  </span>
                </div>
                <div className="flex flex-col gap-2 sm:gap-2">
                  <span className="text-xs uppercase tracking-wide text-[var(--color-text-muted)] sm:hidden">Missing</span>
                  <div className="flex items-center gap-2">
                    {comp.missing ? (
                      <>
                        <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span className="text-[var(--color-text-muted)]">{comp.missing}</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-emerald-400">Full coverage</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Linking graph visualization */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            variants={staggerItem}
            className="text-center mb-8"
          >
            <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">
              The Linking Graph
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Every AI action is chained from intent to merge
            </p>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="relative p-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            {/* Flow diagram */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-center">
              {/* Session/Exchange */}
              <motion.div
                className="flex flex-col items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full max-w-[140px] h-20 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex flex-col items-center justify-center p-2">
                  <span className="text-mono text-xs text-[var(--color-text-muted)]">Session</span>
                  <ArrowRight className="w-3 h-3 text-[var(--color-text-muted)] my-1" />
                  <span className="text-mono text-sm text-[var(--color-text-primary)]">Exchange</span>
                </div>
                <span className="text-xs text-[var(--color-accent)] flex items-center gap-2">
                  <MessageCircle className="w-3 h-3" />
                  Intent captured
                </span>
              </motion.div>

              {/* Tool Call / Event */}
              <motion.div
                className="flex flex-col items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full max-w-[140px] h-20 rounded-lg bg-gradient-to-br from-[var(--color-accent-muted)] to-[rgba(217,70,239,0.1)] border border-[var(--color-accent)] flex flex-col items-center justify-center p-2">
                  <FileCode className="w-4 h-4 text-[var(--color-accent)] mb-1" />
                  <span className="text-mono text-sm text-[var(--color-accent)]">Tool Call</span>
                  <span className="text-mono text-[10px] text-[var(--color-accent-secondary)]">→ Event</span>
                </div>
                <span className="text-xs text-[var(--color-accent)] flex items-center gap-2">
                  <ClipboardPen className="w-3 h-3" />
                  Diff recorded
                </span>
              </motion.div>

              {/* Verification */}
              <motion.div
                className="flex flex-col items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full max-w-[140px] h-20 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex flex-col items-center justify-center p-2">
                  <TestTube className="w-4 h-4 text-emerald-400 mb-1" />
                  <span className="text-mono text-sm text-[var(--color-text-primary)]">Verification</span>
                  <span className="text-mono text-[10px] text-emerald-400">Tests + Build</span>
                </div>
                <span className="text-xs text-emerald-400 flex items-center gap-2">
                  <CircleCheck className="w-3 h-3" />
                  Evidence linked
                </span>
              </motion.div>

              {/* Git / PR */}
              <motion.div
                className="flex flex-col items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full max-w-[140px] h-20 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex flex-col items-center justify-center p-2">
                  <GitPullRequest className="w-4 h-4 text-[var(--color-accent-secondary)] mb-1" />
                  <span className="text-mono text-sm text-[var(--color-text-primary)]">Commit</span>
                  <span className="text-mono text-[10px] text-[var(--color-accent-secondary)]">→ PR</span>
                </div>
                <span className="text-xs text-[var(--color-accent-secondary)] flex items-center gap-2">
                  <Link2 className="w-3 h-3" />
                  Hash-chained
                </span>
              </motion.div>
            </div>

            {/* Connecting lines (desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-[18%] right-[18%] h-px bg-gradient-to-r from-[var(--color-border)] via-[var(--color-accent)] to-[var(--color-accent-secondary)] -translate-y-1/2 pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
