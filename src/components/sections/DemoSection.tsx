import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import {
  CalendarClock,
  ChartBar,
  Check,
  CheckSquare,
  CircleCheck,
  ClipboardPen,
  Clock,
  FileText,
  GitCommitHorizontal,
  Link2,
  MapPin,
  MessageCircle,
  PencilLine,
  Shield,
  Square,
  Terminal,
} from 'lucide-react';

type TabId = 'pr-narrative' | 'blame' | 'timeline' | 'verify';

const tabs: { id: TabId; label: string; icon: typeof FileText; command: string }[] = [
  { id: 'pr-narrative', label: 'PR Narrative', icon: FileText, command: 'diachron pr-comment --pr 142' },
  { id: 'blame', label: 'Blame', icon: Terminal, command: 'diachron blame src/auth/login.ts:42' },
  { id: 'timeline', label: 'Timeline', icon: Clock, command: 'diachron timeline --since "1 hour"' },
  { id: 'verify', label: 'Verify', icon: Shield, command: 'diachron verify' },
];

// PR Narrative evidence pack content
const prNarrativeContent = {
  title: 'PR #142: Add OAuth2 refresh token handling',
  filesChanged: [
    { file: 'src/auth/login.ts', additions: 45, deletions: 12 },
    { file: 'src/auth/token.ts', additions: 120, deletions: 0 },
    { file: 'src/auth/middleware.ts', additions: 28, deletions: 8 },
  ],
  intent: 'Fix the 401 errors on page refresh',
  verifications: [
    { label: 'Tests executed after changes', passed: true },
    { label: 'Build succeeded', passed: true },
    { label: 'No regressions detected', passed: true },
    { label: 'Human review', passed: false },
  ],
  evidence: {
    events: 12,
    commits: 3,
    coverage: 87,
    session: 'abc123',
  },
};

// Blame result content
const blameResult = {
  line: 42,
  file: 'src/auth/login.ts',
  code: 'const token = await refreshToken(user.id);',
  source: 'Claude Code',
  session: 'abc123',
  timestamp: '01/10/2026 10:32 AM PST',
  intent: 'Fix the 401 errors on page refresh',
  confidence: 'HIGH',
  confidenceReason: 'explicit tool call linkage',
  testResult: 'Tests passed after change',
  commit: 'a3f8c21',
};

// Timeline events
const timelineEvents = [
  {
    timestamp: '10:32 AM',
    icon: MessageCircle,
    type: 'intent',
    content: '"Fix the 401 errors on page refresh"',
    session: 'abc123',
  },
  {
    timestamp: '10:34 AM',
    icon: ClipboardPen,
    type: 'write',
    content: 'src/auth/token.ts (+120 lines)',
    tool: 'Write',
  },
  {
    timestamp: '10:35 AM',
    icon: PencilLine,
    type: 'edit',
    content: 'src/auth/login.ts (modified refreshToken)',
    tool: 'Edit',
  },
  {
    timestamp: '10:36 AM',
    icon: Terminal,
    type: 'bash',
    content: 'npm test → 47/47 passed',
    tool: 'Bash',
  },
  {
    timestamp: '10:38 AM',
    icon: GitCommitHorizontal,
    type: 'commit',
    content: 'Committed: a3f8c21',
    hash: 'a3f8c21',
  },
];

// Verify chain result
const verifyResult = {
  projectPath: '~/project',
  totalEvents: 296,
  checkpoints: 12,
  firstEvent: '2026-01-01 00:00:00',
  lastEvent: '2026-01-11 03:20:00',
  chainRoot: '8f3a2b9c4d5e6f7a...',
  segments: 'all valid',
  tamperedSegments: 0,
};

export default function DemoSection() {
  const isE2E = import.meta.env.VITE_E2E === 'true';
  const [activeTab, setActiveTab] = useState<TabId>('pr-narrative');
  const [visibleLines, setVisibleLines] = useState(isE2E ? 10 : 0);
  const [isInView, setIsInView] = useState(isE2E);

  // Reset and animate when tab changes or comes into view
  useEffect(() => {
    if (!isInView || isE2E) return;

    setVisibleLines(0);
    const maxLines =
      activeTab === 'pr-narrative'
        ? 8
        : activeTab === 'blame'
        ? 6
        : activeTab === 'timeline'
        ? timelineEvents.length
        : 7;

    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= maxLines) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 300);

    return () => clearInterval(timer);
  }, [isInView, isE2E, activeTab]);

  const renderPRNarrativeContent = () => (
    <div className="space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleLines > 0 ? 1 : 0 }}
        className="flex items-center gap-2 text-lg font-semibold text-[var(--color-text-primary)]"
      >
        <FileText className="w-4 h-4 text-[var(--color-accent)]" />
        <span>{prNarrativeContent.title}</span>
      </motion.div>

      {/* Files changed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleLines > 1 ? 1 : 0 }}
        className="space-y-1"
      >
        <div className="text-[var(--color-text-muted)] text-xs mb-2">### What Changed</div>
        {prNarrativeContent.filesChanged.map((file, i) => (
          <div key={i} className="text-sm">
            <span className="text-[var(--color-accent)]">{file.file}</span>
            <span className="text-emerald-400 ml-2">+{file.additions}</span>
            {file.deletions > 0 && (
              <span className="text-red-400 ml-1">-{file.deletions}</span>
            )}
          </div>
        ))}
      </motion.div>

      {/* Intent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleLines > 2 ? 1 : 0 }}
        className="space-y-1"
      >
        <div className="text-[var(--color-text-muted)] text-xs">### Why (Intent)</div>
        <div className="text-[var(--color-text-secondary)] italic">
          "{prNarrativeContent.intent}"
        </div>
      </motion.div>

      {/* Evidence */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleLines > 3 ? 1 : 0 }}
        className="space-y-1"
      >
        <div className="text-[var(--color-text-muted)] text-xs">### Evidence Trail</div>
        <div className="text-[var(--color-text-secondary)] text-sm space-y-1">
          <div className="flex items-center gap-2">
            <ChartBar className="w-4 h-4 text-[var(--color-accent)]" />
            <span>
              Matched <span className="text-[var(--color-accent)]">{prNarrativeContent.evidence.events} events</span> to{' '}
              <span className="text-[var(--color-accent)]">{prNarrativeContent.evidence.commits} commits</span>{' '}
              <span className="text-emerald-400">({prNarrativeContent.evidence.coverage}% coverage)</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-[var(--color-accent-secondary)]" />
            <span>
              Session: <span className="text-[var(--color-accent-secondary)]">{prNarrativeContent.evidence.session}</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Verification checklist */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleLines > 4 ? 1 : 0 }}
        className="space-y-1"
      >
        <div className="text-[var(--color-text-muted)] text-xs">### Verification</div>
        <div className="space-y-1">
          {prNarrativeContent.verifications.map((v, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              {v.passed ? (
                <CheckSquare className="w-4 h-4 text-emerald-400" />
              ) : (
                <Square className="w-4 h-4 text-[var(--color-text-muted)]" />
              )}
              <span className={v.passed ? 'text-emerald-400' : 'text-[var(--color-text-muted)]'}>
                {v.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Success message */}
      {visibleLines >= 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-emerald-400 mt-4 text-xs border-t border-[var(--color-border)] pt-4"
        >
          <Check className="w-4 h-4" />
          <span>Posted evidence pack to PR #{prNarrativeContent.title.match(/#(\d+)/)?.[1]}</span>
        </motion.div>
      )}
    </div>
  );

  const renderBlameContent = () => (
    <div className="space-y-4">
      {/* File and line info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleLines > 0 ? 1 : 0 }}
        className="text-[var(--color-text-secondary)]"
      >
        Line {blameResult.line}:{' '}
        <span className="text-[var(--color-text-primary)] font-mono">
          {blameResult.code}
        </span>
      </motion.div>

      {/* Blame details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleLines > 1 ? 1 : 0 }}
        className="border-l-2 border-[var(--color-accent-secondary)] pl-4 space-y-2"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[var(--color-accent-secondary)]" />
          <span className="text-[var(--color-text-primary)] font-medium">{blameResult.source}</span>
          <span className="text-[var(--color-text-muted)]">(Session {blameResult.session})</span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleLines > 2 ? 1 : 0 }}
          className="flex items-center gap-2"
        >
          <Clock className="w-4 h-4 text-[var(--color-text-muted)]" />
          <span className="text-[var(--color-text-muted)]">{blameResult.timestamp}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleLines > 3 ? 1 : 0 }}
          className="flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4 text-[var(--color-accent-secondary)]" />
          <span className="text-[var(--color-text-secondary)]">
            Intent: "{blameResult.intent}"
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleLines > 4 ? 1 : 0 }}
          className="flex items-center gap-2"
        >
          <CircleCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400">{blameResult.testResult}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleLines > 5 ? 1 : 0 }}
          className="flex items-center gap-2"
        >
          <ChartBar className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400">{blameResult.confidence} confidence</span>
          <span className="text-[var(--color-text-muted)]">({blameResult.confidenceReason})</span>
        </motion.div>
      </motion.div>

      {/* Actions */}
      {visibleLines >= 6 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-4 mt-4 text-xs"
        >
          <span className="text-[var(--color-accent)] underline cursor-pointer">View conversation →</span>
          <span className="text-[var(--color-accent-secondary)] underline cursor-pointer">View commit {blameResult.commit} →</span>
        </motion.div>
      )}
    </div>
  );

  const renderTimelineContent = () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-[var(--color-accent-secondary)] mb-4 text-sm">
        <CalendarClock className="w-4 h-4" />
        <span>Events from last hour (Session abc123)</span>
      </div>
      {timelineEvents.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{
            opacity: index < visibleLines ? 1 : 0,
            x: index < visibleLines ? 0 : -10,
          }}
          transition={{ duration: 0.25 }}
          className="group"
        >
          <div className="flex items-start gap-3">
            <span className="text-[var(--color-text-muted)] w-20 flex-shrink-0">
              {event.timestamp}
            </span>
            <span className="w-6 flex-shrink-0">
              <event.icon className="w-4 h-4 text-[var(--color-text-muted)]" />
            </span>
            <div className="flex-1 min-w-0">
              <span className={`${
                event.type === 'intent' ? 'text-[var(--color-accent-secondary)] italic' :
                event.type === 'commit' ? 'text-emerald-400' :
                'text-[var(--color-text-primary)]'
              }`}>
                {event.content}
              </span>
              {event.tool && (
                <span className="text-[var(--color-accent)] ml-2 text-xs">
                  [{event.tool}]
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
      {visibleLines >= timelineEvents.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[var(--color-text-muted)] mt-4 text-xs border-t border-[var(--color-border)] pt-4"
        >
          Showing {timelineEvents.length} events • Intent → Changes → Verification → Commit
        </motion.div>
      )}
    </div>
  );

  const renderVerifyContent = () => (
    <div className="space-y-3">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleLines > 0 ? 1 : 0 }}
        className="flex items-center gap-2 text-emerald-400"
      >
        <Check className="w-5 h-5" />
        <span className="font-medium">Chain integrity verified</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleLines > 1 ? 1 : 0 }}
        className="space-y-1.5 pl-7 text-sm"
      >
        <div className="text-[var(--color-text-muted)]">
          Project: <span className="text-[var(--color-text-secondary)]">{verifyResult.projectPath}</span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleLines > 2 ? 1 : 0 }}
          className="text-[var(--color-text-muted)]"
        >
          Events: <span className="text-[var(--color-text-secondary)]">{verifyResult.totalEvents}</span>
          <span className="text-[var(--color-text-muted)]"> ({verifyResult.checkpoints} checkpoints)</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleLines > 3 ? 1 : 0 }}
          className="text-[var(--color-text-muted)]"
        >
          First event: <span className="text-[var(--color-text-secondary)]">{verifyResult.firstEvent}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleLines > 4 ? 1 : 0 }}
          className="text-[var(--color-text-muted)]"
        >
          Last event: <span className="text-[var(--color-text-secondary)]">{verifyResult.lastEvent}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleLines > 5 ? 1 : 0 }}
          className="text-[var(--color-text-muted)]"
        >
          Chain root: <span className="text-[var(--color-accent)]">{verifyResult.chainRoot}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleLines > 6 ? 1 : 0 }}
          className="text-[var(--color-text-muted)]"
        >
          Segments: <span className="text-emerald-400">{verifyResult.segments}</span>
        </motion.div>
      </motion.div>

      {visibleLines >= 7 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-[rgba(34,211,238,0.05)] border border-[var(--color-accent)] rounded-lg text-xs"
        >
          <div className="flex items-center gap-2 text-[var(--color-accent)]">
            <Shield className="w-4 h-4" />
            <span className="font-medium">Tamper-evident audit trail</span>
          </div>
          <div className="text-[var(--color-text-secondary)] mt-1 pl-6">
            All {verifyResult.totalEvents} events are cryptographically linked. Any modification would break the chain.
          </div>
        </motion.div>
      )}
    </div>
  );

  return (
    <section className="section bg-[var(--color-surface)]" id="demo" data-testid="demo-section">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          onViewportEnter={() => setIsInView(true)}
          className="text-center mb-12"
        >
          <motion.span
            variants={staggerItem}
            className="text-mono text-[var(--color-text-muted)] text-sm uppercase tracking-wider mb-4 block"
          >
            In Action
          </motion.span>
          <motion.h2 variants={staggerItem} className="text-section mb-4">
            Trace, Verify, Trust
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
          >
            Generate PR evidence, trace any line, review your timeline, and verify chain integrity—all from the CLI.
          </motion.p>
        </motion.div>

        {/* Terminal container */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-xl border border-[var(--color-border)] overflow-hidden shadow-2xl shadow-black/50">
            {/* Terminal header with tabs */}
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-surface-elevated)] border-b border-[var(--color-border)]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-cyan-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>

              {/* Tab buttons */}
              <div className="flex gap-1 bg-[var(--color-void)] rounded-lg p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-[var(--color-surface-elevated)] text-[var(--color-accent)]'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <span className="text-mono text-xs text-[var(--color-text-muted)]">
                ~/project
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-6 bg-[var(--color-void)] min-h-[420px] font-mono text-xs sm:text-sm break-words">
              {/* Command prompt */}
              <div className="mb-6">
                <span className="text-[var(--color-accent)]">❯</span>
                <span className="text-[var(--color-text-primary)] ml-2">
                  {tabs.find((t) => t.id === activeTab)?.command}
                </span>
              </div>

              {/* Content area with transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'pr-narrative' && renderPRNarrativeContent()}
                  {activeTab === 'blame' && renderBlameContent()}
                  {activeTab === 'timeline' && renderTimelineContent()}
                  {activeTab === 'verify' && renderVerifyContent()}
                </motion.div>
              </AnimatePresence>

              {/* Cursor */}
              <div className="mt-6">
                <span className="text-[var(--color-accent)]">❯</span>
                <motion.span
                  className="ml-2 inline-block w-2 h-4 bg-[var(--color-text-primary)]"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
