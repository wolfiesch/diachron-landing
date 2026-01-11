import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { Check, X, ArrowRight, Zap, Brain } from 'lucide-react';

interface ComparisonRow {
  aspect: string;
  diachron: string | boolean;
  episodicMemory: string | boolean;
}

const comparisonData: ComparisonRow[] = [
  { aspect: 'Primary Question', diachron: '"What changed?"', episodicMemory: '"Why did we decide that?"' },
  { aspect: 'Data Captured', diachron: 'File modifications, diffs', episodicMemory: 'Conversation exchanges' },
  { aspect: 'Capture Method', diachron: 'Real-time hooks (~12ms)', episodicMemory: 'Session-end indexing' },
  { aspect: 'Search Type', diachron: 'Time/file/tool filters', episodicMemory: 'Semantic vector search' },
  { aspect: 'Storage Location', diachron: 'Per-project (.diachron/)', episodicMemory: 'Global (~/.config/)' },
  { aspect: 'Git Integration', diachron: 'Branch + commit + diffs', episodicMemory: 'Branch name only' },
  { aspect: 'Diff Tracking', diachron: true, episodicMemory: false },
  { aspect: 'Semantic Search', diachron: false, episodicMemory: true },
  { aspect: 'Real-Time Capture', diachron: true, episodicMemory: false },
  { aspect: 'Conversation Context', diachron: false, episodicMemory: true },
];

const useCases = [
  {
    scenario: 'Debugging a regression',
    diachron: 'See exactly which files changed and when',
    episodicMemory: 'Find the discussion where we made that decision',
    recommendation: 'diachron',
  },
  {
    scenario: 'Understanding past decisions',
    diachron: 'View the timeline of changes',
    episodicMemory: 'Search conversations by topic',
    recommendation: 'episodic',
  },
  {
    scenario: 'Code review preparation',
    diachron: 'Export changes as changelog',
    episodicMemory: 'Recall the rationale',
    recommendation: 'both',
  },
  {
    scenario: 'Onboarding new team members',
    diachron: 'Show project evolution',
    episodicMemory: 'Surface institutional knowledge',
    recommendation: 'both',
  },
];

export default function ComparisonTable() {
  return (
    <section className="section bg-[var(--color-surface)]" data-testid="comparison-section">
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
            Better Together
          </motion.span>
          <motion.h2 variants={staggerItem} className="text-section mb-4">
            Diachron + Episodic Memory
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
          >
            Two complementary tools for complete AI development provenance.
            Diachron tracks <em>what changed</em>, Episodic Memory explains <em>why</em>.
          </motion.p>
        </motion.div>

        {/* Visual representation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-4xl mx-auto mb-16"
        >
          <motion.div
            variants={staggerItem}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            {/* Diachron card */}
            <div className="flex-1 max-w-sm p-6 rounded-2xl border border-[var(--color-accent)] bg-[rgba(34,211,238,0.05)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-muted)] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">Diachron</h3>
                  <p className="text-xs text-[var(--color-accent)]">Your Change Log</p>
                </div>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Tracks every file modification in real-time. Know exactly what changed, when, and by which tool.
              </p>
              <div className="text-mono text-xs text-[var(--color-text-muted)]">
                "What happened to auth.ts yesterday?"
              </div>
            </div>

            {/* Plus sign */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] text-[var(--color-void)] font-bold text-xl">
              +
            </div>

            {/* Episodic Memory card */}
            <div className="flex-1 max-w-sm p-6 rounded-2xl border border-[var(--color-accent-secondary)] bg-[rgba(217,70,239,0.05)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(217,70,239,0.1)] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-[var(--color-accent-secondary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">Episodic Memory</h3>
                  <p className="text-xs text-[var(--color-accent-secondary)]">Your Institutional Memory</p>
                </div>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Semantic search across all conversations. Find the reasoning behind any decision.
              </p>
              <div className="text-mono text-xs text-[var(--color-text-muted)]">
                "Why did we choose JWT over sessions?"
              </div>
            </div>
          </motion.div>

          {/* Arrow to result */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col items-center mt-8"
          >
            <ArrowRight className="w-6 h-6 text-[var(--color-text-muted)] rotate-90 mb-4" />
            <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-[rgba(34,211,238,0.1)] to-[rgba(217,70,239,0.1)] border border-[var(--color-border)]">
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                Complete AI Development Provenance
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Comparison table */}
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
            <div className="relative">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px]">
                  <thead>
                    <tr className="bg-[var(--color-surface-elevated)]">
                      <th className="text-left px-6 py-4 text-sm font-medium text-[var(--color-text-muted)]">
                        Aspect
                      </th>
                      <th className="text-center px-6 py-4 text-sm font-medium text-[var(--color-accent)]">
                        Diachron
                      </th>
                      <th className="text-center px-6 py-4 text-sm font-medium text-[var(--color-accent-secondary)]">
                        Episodic Memory
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr
                        key={row.aspect}
                        className={`border-t border-[var(--color-border)] ${
                          index % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-void)]'
                        }`}
                      >
                        <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">
                          {row.aspect}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {typeof row.diachron === 'boolean' ? (
                            row.diachron ? (
                              <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-[var(--color-text-muted)] mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-[var(--color-text-primary)]">{row.diachron}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {typeof row.episodicMemory === 'boolean' ? (
                            row.episodicMemory ? (
                              <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-[var(--color-text-muted)] mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-[var(--color-text-primary)]">{row.episodicMemory}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[var(--color-surface)] to-transparent sm:hidden"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--color-surface)] to-transparent sm:hidden"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Use cases */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.h3
            variants={staggerItem}
            className="text-xl font-semibold text-center mb-8 text-[var(--color-text-primary)]"
          >
            When to Use Each
          </motion.h3>
          <motion.div
            variants={staggerItem}
            className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            {useCases.map((useCase) => (
              <div
                key={useCase.scenario}
                className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-void)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">
                    {useCase.scenario}
                  </span>
                  {useCase.recommendation === 'both' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] text-[var(--color-void)]">
                      Both
                    </span>
                  )}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)]">◆</span>
                    <span className="text-[var(--color-text-secondary)]">{useCase.diachron}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[var(--color-accent-secondary)]">◆</span>
                    <span className="text-[var(--color-text-secondary)]">{useCase.episodicMemory}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
