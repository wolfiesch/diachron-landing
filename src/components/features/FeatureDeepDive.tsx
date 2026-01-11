import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import {
  Clock,
  Search,
  Brain,
  Sparkles,
  GitBranch,
  FileJson,
  ChevronDown,
  Terminal,
} from 'lucide-react';

interface Feature {
  id: string;
  icon: typeof Clock;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  codeExample?: {
    command: string;
    output: string[];
  };
  color: 'cyan' | 'magenta';
}

const features: Feature[] = [
  {
    id: 'timeline',
    icon: Clock,
    title: 'Timeline Tracking',
    tagline: 'Every change, timestamped and organized',
    description:
      'Automatic capture of every file modification made by AI agents. PostToolUse hooks ensure real-time tracking with ~12ms latency—zero manual logging required.',
    highlights: [
      'Captures Write, Edit, and Bash operations',
      'Session grouping in 1-hour windows',
      'Automatic session ID persistence',
      'Dual timestamp format (ISO + human-readable)',
    ],
    codeExample: {
      command: '/timeline --since "1 hour ago"',
      output: [
        '📍 Timeline for ~/project',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '🕐 10:42 PM · Write · auth/middleware.ts',
        '   "Add OAuth2 token validation"',
        '🕐 10:43 PM · Edit · routes/api.ts',
        '   "Wire up auth middleware"',
      ],
    },
    color: 'cyan',
  },
  {
    id: 'search',
    icon: Search,
    title: 'Semantic Search',
    tagline: 'Find by meaning, not just keywords',
    description:
      'Hybrid vector + full-text search across all code changes. Uses all-MiniLM-L6 embeddings for semantic understanding with relevance scoring.',
    highlights: [
      '384-dimensional vector embeddings',
      'Hybrid relevance scoring',
      'Filter by file, tool, or time',
      '~30ms search response time',
    ],
    codeExample: {
      command: '/search "authentication flow"',
      output: [
        '🔍 Semantic search: "authentication flow"',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '[0.94] auth/middleware.ts',
        '[0.87] routes/protected.ts',
        '[0.82] lib/tokens.ts',
        '✓ Found 3 matches in 31ms',
      ],
    },
    color: 'magenta',
  },
  {
    id: 'memory',
    icon: Brain,
    title: 'Conversation Memory',
    tagline: 'Recall past decisions and discussions',
    description:
      'Search across your entire conversation history with AI agents. Find the reasoning behind decisions made weeks or months ago.',
    highlights: [
      'Cross-session search capability',
      'JSONL archive parsing',
      'Incremental indexing',
      'Project context preservation',
    ],
    codeExample: {
      command: '/memory "why did we use JWT"',
      output: [
        '🧠 Searching conversation memory...',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '[0.91] 01/07 — Planning session',
        '   "JWT allows stateless auth..."',
        '[0.85] 01/05 — Architecture discussion',
        '   "Session tokens require DB..."',
      ],
    },
    color: 'cyan',
  },
  {
    id: 'summaries',
    icon: Sparkles,
    title: 'AI Summaries',
    tagline: 'Understand changes at a glance',
    description:
      'On-demand AI-powered summaries using gpt-4o-mini. Transform raw events into concise, actionable descriptions. Bring your own API key.',
    highlights: [
      'Batch processing (50 events/call)',
      '~$0.03 per 1000 events',
      'Skips already-summarized events',
      'Configurable in .diachron/config.json',
    ],
    codeExample: {
      command: '/timeline --summarize',
      output: [
        '⏳ Summarizing 12 events...',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '✨ auth/middleware.ts',
        '   "Implemented OAuth2 middleware..."',
        '✨ routes/api.ts',
        '   "Added protected route guards..."',
      ],
    },
    color: 'magenta',
  },
  {
    id: 'git',
    icon: GitBranch,
    title: 'Git Integration',
    tagline: 'Track branches, commits, and diffs',
    description:
      'Automatic git branch and commit SHA capture for every event. Correlate changes with version control history effortlessly.',
    highlights: [
      'Branch name on every event',
      'Commit SHA extraction from bash',
      'Diff summary (+/- lines)',
      'Semantic bash categorization',
    ],
    codeExample: {
      command: '/timeline --file routes/',
      output: [
        '📍 Timeline for routes/',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '🌿 feat/oauth2 · abc123',
        '   routes/api.ts (+45/-12)',
        '🌿 main · def456',
        '   routes/index.ts (+8/-3)',
      ],
    },
    color: 'cyan',
  },
  {
    id: 'export',
    icon: FileJson,
    title: 'Export & Reporting',
    tagline: 'Take your data anywhere',
    description:
      'Export your timeline to Markdown or JSON. Generate changelogs, create reports, or integrate with other tools in your workflow.',
    highlights: [
      'Markdown export with dates',
      'JSON for programmatic access',
      'Stats and analytics',
      'Session-organized output',
    ],
    codeExample: {
      command: '/timeline --export markdown',
      output: [
        '📄 Exporting to TIMELINE.md...',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '## 01/10/2026',
        '- [10:42 PM] Write auth/middleware.ts',
        '- [10:43 PM] Edit routes/api.ts',
        '✓ Exported 24 events',
      ],
    },
    color: 'magenta',
  },
];

export default function FeatureDeepDive() {
  const [expandedId, setExpandedId] = useState<string | null>('timeline');

  return (
    <section className="section" data-testid="feature-deep-dive">
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
            Capabilities
          </motion.span>
          <motion.h2 variants={staggerItem} className="text-section mb-4">
            Feature Deep Dive
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
          >
            Explore each feature in detail with real examples and use cases.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-4xl mx-auto space-y-4"
        >
          {features.map((feature) => {
            const isExpanded = expandedId === feature.id;
            const colorStyles =
              feature.color === 'cyan'
                ? {
                    border: 'border-[var(--color-accent)]',
                    bg: 'bg-[rgba(34,211,238,0.05)]',
                    text: 'text-[var(--color-accent)]',
                  }
                : {
                    border: 'border-[var(--color-accent-secondary)]',
                    bg: 'bg-[rgba(217,70,239,0.05)]',
                    text: 'text-[var(--color-accent-secondary)]',
                  };

            return (
              <motion.div
                key={feature.id}
                variants={staggerItem}
                className={`rounded-xl border transition-all duration-300 ${
                  isExpanded
                    ? `${colorStyles.border} ${colorStyles.bg}`
                    : 'border-[var(--color-border)] hover:border-[var(--color-border-hover)]'
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : feature.id)}
                  className="w-full flex items-center gap-4 p-6 text-left"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isExpanded ? colorStyles.bg : 'bg-[var(--color-surface-elevated)]'
                    }`}
                  >
                    <feature.icon
                      className={`w-6 h-6 ${isExpanded ? colorStyles.text : 'text-[var(--color-text-muted)]'}`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)]">{feature.tagline}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-[var(--color-text-muted)]" />
                  </motion.div>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Description + Highlights */}
                          <div>
                            <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                              {feature.description}
                            </p>
                            <ul className="space-y-2">
                              {feature.highlights.map((highlight, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                  <span className={colorStyles.text}>•</span>
                                  <span className="text-[var(--color-text-secondary)]">
                                    {highlight}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Code example */}
                          {feature.codeExample && (
                            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-void)] overflow-hidden">
                              <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                                <Terminal className="w-4 h-4 text-[var(--color-text-muted)]" />
                                <span className="text-mono text-xs text-[var(--color-text-muted)]">
                                  Terminal
                                </span>
                              </div>
                              <div className="p-4 font-mono text-sm">
                                <div className="mb-3">
                                  <span className="text-[var(--color-accent)]">❯</span>
                                  <span className="text-[var(--color-text-primary)] ml-2">
                                    {feature.codeExample.command}
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  {feature.codeExample.output.map((line, i) => (
                                    <div
                                      key={i}
                                      className={
                                        line.startsWith('━')
                                          ? 'text-[var(--color-text-muted)]'
                                          : line.startsWith('[')
                                          ? colorStyles.text
                                          : line.startsWith('✓') || line.startsWith('✨')
                                          ? 'text-emerald-400'
                                          : 'text-[var(--color-text-secondary)]'
                                      }
                                    >
                                      {line}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
