import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

interface TerminalLine {
  type: 'prompt' | 'tool' | 'output' | 'success' | 'info' | 'divider';
  content: string;
  indent?: number;
}

// Init sequence content
const initSequence: TerminalLine[] = [
  { type: 'prompt', content: '❯ diachron init' },
  { type: 'success', content: '  ✓ Installed Claude Code hooks' },
  { type: 'success', content: '  ✓ Created .diachron/events.db' },
  { type: 'info', content: '  Ready to capture AI-assisted changes.' },
];

// Work sequence content (AI does its thing)
const workSequence: TerminalLine[] = [
  { type: 'prompt', content: '❯ claude "Fix the 401 errors on page refresh"' },
  { type: 'output', content: '  Analyzing codebase...' },
  { type: 'tool', content: '  ⏺ Edit(src/auth/login.ts)' },
  { type: 'tool', content: '  ⏺ Write(src/auth/token.ts)' },
  { type: 'tool', content: '  ⏺ Bash(npm test)' },
  { type: 'success', content: '  ✓ All tests passed (47/47)' },
  { type: 'info', content: '  Captured 4 events to .diachron/events.db' },
];

// PR comment sequence content
const prSequence: TerminalLine[] = [
  { type: 'prompt', content: '❯ diachron pr-comment --pr 142' },
  { type: 'output', content: '  📝 Correlating events to commits...' },
  { type: 'success', content: '  ✓ Matched 12 events to 3 commits (87% coverage)' },
  { type: 'success', content: '  ✓ Posted evidence pack to PR #142' },
  { type: 'info', content: '  View: https://github.com/you/project/pull/142' },
];

// Blame sequence content
const blameSequence: TerminalLine[] = [
  { type: 'prompt', content: '❯ diachron blame src/auth/login.ts:42' },
  { type: 'output', content: '  📍 Claude Code (Session abc123)' },
  { type: 'output', content: '  💬 Intent: "Fix the 401 errors on page refresh"' },
  { type: 'success', content: '  ✅ Tests passed after change' },
  { type: 'info', content: '  📊 HIGH confidence (explicit tool call linkage)' },
];

// Style mapping for different line types
const getLineStyle = (type: TerminalLine['type']): string => {
  switch (type) {
    case 'prompt':
      return 'text-[var(--color-accent)]';
    case 'tool':
      return 'text-cyan-400';
    case 'output':
      return 'text-[var(--color-text-primary)]';
    case 'success':
      return 'text-emerald-400';
    case 'info':
      return 'text-[var(--color-text-secondary)]';
    case 'divider':
      return 'text-[var(--color-text-muted)]';
    default:
      return 'text-[var(--color-text-primary)]';
  }
};

type Phase = 'init' | 'pause1' | 'work' | 'pause2' | 'pr' | 'pause3' | 'blame' | 'complete';

export default function QuickStartSection() {
  const isE2E = import.meta.env.VITE_E2E === 'true';
  const [phase, setPhase] = useState<Phase>(isE2E ? 'complete' : 'init');
  const [initLineIndex, setInitLineIndex] = useState(isE2E ? initSequence.length : 0);
  const [workLineIndex, setWorkLineIndex] = useState(isE2E ? workSequence.length : 0);
  const [prLineIndex, setPrLineIndex] = useState(isE2E ? prSequence.length : 0);
  const [blameLineIndex, setBlameLineIndex] = useState(isE2E ? blameSequence.length : 0);
  const [isInView, setIsInView] = useState(isE2E);

  // Animation state machine
  useEffect(() => {
    if (!isInView || isE2E) return;

    // Phase 1: Init sequence
    if (phase === 'init') {
      const timer = setInterval(() => {
        setInitLineIndex((prev) => {
          if (prev >= initSequence.length) {
            clearInterval(timer);
            setPhase('pause1');
            return prev;
          }
          return prev + 1;
        });
      }, 120);
      return () => clearInterval(timer);
    }

    // Pause between init and work
    if (phase === 'pause1') {
      const timer = setTimeout(() => setPhase('work'), 800);
      return () => clearTimeout(timer);
    }

    // Phase 2: Work sequence (AI doing its thing)
    if (phase === 'work') {
      const timer = setInterval(() => {
        setWorkLineIndex((prev) => {
          if (prev >= workSequence.length) {
            clearInterval(timer);
            setPhase('pause2');
            return prev;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(timer);
    }

    // Pause between work and pr
    if (phase === 'pause2') {
      const timer = setTimeout(() => setPhase('pr'), 800);
      return () => clearTimeout(timer);
    }

    // Phase 3: PR comment sequence
    if (phase === 'pr') {
      const timer = setInterval(() => {
        setPrLineIndex((prev) => {
          if (prev >= prSequence.length) {
            clearInterval(timer);
            setPhase('pause3');
            return prev;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(timer);
    }

    // Pause between pr and blame
    if (phase === 'pause3') {
      const timer = setTimeout(() => setPhase('blame'), 800);
      return () => clearTimeout(timer);
    }

    // Phase 4: Blame sequence
    if (phase === 'blame') {
      const timer = setInterval(() => {
        setBlameLineIndex((prev) => {
          if (prev >= blameSequence.length) {
            clearInterval(timer);
            setPhase('complete');
            return prev;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isInView, isE2E, phase]);

  return (
    <section className="section bg-[var(--color-surface)]" data-testid="quickstart-section">
      <div className="container">
        {/* Section header */}
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
            Get Started
          </motion.span>
          <motion.h2 variants={staggerItem} className="text-section mb-4">
            From Init to PR in Minutes
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
          >
            Initialize, let AI work, generate evidence, and trace any line—all from the CLI.
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
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[var(--color-surface-elevated)] border-b border-[var(--color-border)]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-cyan-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-mono text-xs text-[var(--color-text-muted)] ml-4">
                ~/project
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-6 bg-[var(--color-void)] font-mono text-xs sm:text-sm">
              <div className="space-y-4">
                {/* Init sequence */}
                <div className="space-y-0.5">
                  {initSequence.map((line, index) => (
                    <motion.div
                      key={`init-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: index < initLineIndex ? 1 : 0,
                        x: index < initLineIndex ? 0 : -10,
                      }}
                      transition={{ duration: 0.15 }}
                      className={`${getLineStyle(line.type)} break-words`}
                    >
                      {line.content}
                    </motion.div>
                  ))}
                </div>

                {/* Work sequence (AI doing its thing) */}
                {initLineIndex >= initSequence.length && (
                  <div className="space-y-0.5">
                    {workSequence.map((line, index) => (
                      <motion.div
                        key={`work-${index}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: index < workLineIndex ? 1 : 0,
                          x: index < workLineIndex ? 0 : -10,
                        }}
                        transition={{ duration: 0.15 }}
                        className={`${getLineStyle(line.type)} break-words`}
                      >
                        {line.content}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* PR comment sequence */}
                {workLineIndex >= workSequence.length && (
                  <div className="space-y-0.5">
                    {prSequence.map((line, index) => (
                      <motion.div
                        key={`pr-${index}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: index < prLineIndex ? 1 : 0,
                          x: index < prLineIndex ? 0 : -10,
                        }}
                        transition={{ duration: 0.15 }}
                        className={`${getLineStyle(line.type)} break-words`}
                      >
                        {line.content}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Blame sequence */}
                {prLineIndex >= prSequence.length && (
                  <div className="space-y-0.5">
                    {blameSequence.map((line, index) => (
                      <motion.div
                        key={`blame-${index}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: index < blameLineIndex ? 1 : 0,
                          x: index < blameLineIndex ? 0 : -10,
                        }}
                        transition={{ duration: 0.15 }}
                        className={`${getLineStyle(line.type)} break-words`}
                      >
                        {line.content}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Blinking cursor */}
                {phase === 'complete' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="pt-2"
                  >
                    <span className="text-[var(--color-accent)]">❯</span>
                    <motion.span
                      className="ml-2 inline-block w-2 h-4 bg-[var(--color-text-primary)]"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
