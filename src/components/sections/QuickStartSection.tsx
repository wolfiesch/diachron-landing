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
  { type: 'prompt', content: '❯ /diachron init' },
  { type: 'tool', content: '⏺ Bash(mkdir -p .diachron && echo \'{"version": 1, ...}\' > .diachron/config.json)' },
  { type: 'output', content: '  ⎿  {', indent: 1 },
  { type: 'output', content: '       "version": 1,', indent: 2 },
  { type: 'output', content: '       "created": "2026-01-08T22:23:56-08:00"', indent: 2 },
  { type: 'output', content: '     }', indent: 1 },
  { type: 'success', content: '  ⎿  PostToolUse:Bash hook succeeded' },
  { type: 'tool', content: '⏺ Diachron initialized. AI-assisted changes will now be tracked automatically.' },
  { type: 'info', content: '  Reminder: Add .diachron/ to your .gitignore:' },
  { type: 'output', content: '  echo ".diachron/" >> .gitignore' },
];

// Timeline sequence content
const timelineSequence: TerminalLine[] = [
  { type: 'prompt', content: '❯ /timeline' },
  { type: 'tool', content: '⏺ Bash(python3 ~/.claude/skills/diachron/lib/timeline_cli.py --limit 20)' },
  { type: 'output', content: '  ⎿  📍 Timeline for ~/project' },
  { type: 'divider', content: '     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
  { type: 'output', content: '     🕐 01/08/2026 10:23 PM PST' },
  { type: 'output', content: '        ├─ Tool: 🖥️ Bash [file_ops]' },
  { type: 'output', content: '        ├─ Branch: 🌿 master' },
  { type: 'output', content: '        ├─ Operation: create' },
  { type: 'output', content: '        └─ (no details)' },
  { type: 'divider', content: '     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
  { type: 'info', content: '     Showing 1 events • Session: 1888fbea' },
  { type: 'success', content: '  ⎿  PostToolUse:Bash hook succeeded' },
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

export default function QuickStartSection() {
  const [phase, setPhase] = useState<'init' | 'pause' | 'timeline' | 'complete'>('init');
  const [initLineIndex, setInitLineIndex] = useState(0);
  const [timelineLineIndex, setTimelineLineIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  // Animation state machine
  useEffect(() => {
    if (!isInView) return;

    // Phase 1: Init sequence
    if (phase === 'init') {
      const timer = setInterval(() => {
        setInitLineIndex((prev) => {
          if (prev >= initSequence.length) {
            clearInterval(timer);
            setPhase('pause');
            return prev;
          }
          return prev + 1;
        });
      }, 150);
      return () => clearInterval(timer);
    }

    // Pause between phases
    if (phase === 'pause') {
      const timer = setTimeout(() => setPhase('timeline'), 1200);
      return () => clearTimeout(timer);
    }

    // Phase 2: Timeline sequence
    if (phase === 'timeline') {
      const timer = setInterval(() => {
        setTimelineLineIndex((prev) => {
          if (prev >= timelineSequence.length) {
            clearInterval(timer);
            setPhase('complete');
            return prev;
          }
          return prev + 1;
        });
      }, 120);
      return () => clearInterval(timer);
    }
  }, [isInView, phase]);

  return (
    <section className="section bg-[var(--color-surface)]">
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
            Two Commands. Zero Config.
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
          >
            Initialize Diachron in any project and immediately start tracking AI-assisted changes.
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
            <div className="p-6 bg-[var(--color-void)] font-mono text-sm overflow-x-auto">
              <div className="min-w-[580px]">
                {/* Init sequence */}
                <div className="space-y-1">
                  {initSequence.map((line, index) => (
                    <motion.div
                      key={`init-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: index < initLineIndex ? 1 : 0,
                        x: index < initLineIndex ? 0 : -10,
                      }}
                      transition={{ duration: 0.2 }}
                      className={getLineStyle(line.type)}
                    >
                      {line.content}
                    </motion.div>
                  ))}
                </div>

                {/* Spacer between phases */}
                {initLineIndex >= initSequence.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="h-6"
                  />
                )}

                {/* Timeline sequence */}
                <div className="space-y-1">
                  {timelineSequence.map((line, index) => (
                    <motion.div
                      key={`timeline-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: index < timelineLineIndex ? 1 : 0,
                        x: index < timelineLineIndex ? 0 : -10,
                      }}
                      transition={{ duration: 0.2 }}
                      className={getLineStyle(line.type)}
                    >
                      {line.content}
                    </motion.div>
                  ))}
                </div>

                {/* Blinking cursor */}
                {phase === 'complete' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4"
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
