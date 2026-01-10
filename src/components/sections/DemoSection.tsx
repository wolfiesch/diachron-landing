import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

// Simulated timeline events
const timelineEvents = [
  {
    timestamp: '10:42 AM',
    icon: '📝',
    tool: 'Write',
    file: 'src/auth/middleware.ts',
    branch: 'feat/oauth2',
    summary: 'Add OAuth2 middleware with token validation',
  },
  {
    timestamp: '10:43 AM',
    icon: '✏️',
    tool: 'Edit',
    file: 'src/routes/index.ts',
    branch: 'feat/oauth2',
    summary: 'Wire up auth middleware to protected routes',
  },
  {
    timestamp: '10:45 AM',
    icon: '🖥️',
    tool: 'Bash',
    file: 'npm test',
    branch: 'feat/oauth2',
    summary: 'Run test suite (12 passed, 0 failed)',
  },
  {
    timestamp: '10:47 AM',
    icon: '📝',
    tool: 'Write',
    file: 'src/auth/refresh.ts',
    branch: 'feat/oauth2',
    summary: 'Implement token refresh flow with 7-day expiry',
  },
  {
    timestamp: '10:50 AM',
    icon: '✏️',
    tool: 'Edit',
    file: 'src/config/auth.ts',
    branch: 'feat/oauth2',
    summary: 'Add refresh token configuration options',
  },
];

export default function DemoSection() {
  const isE2E = import.meta.env.VITE_E2E === 'true';
  const [visibleLines, setVisibleLines] = useState(
    isE2E ? timelineEvents.length : 0,
  );
  const [isInView, setIsInView] = useState(isE2E);

  // Typing animation effect
  useEffect(() => {
    if (!isInView || isE2E) return;

    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= timelineEvents.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [isInView, isE2E]);

  return (
    <section className="section bg-[var(--color-surface)]" data-testid="demo-section">
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
            Your Project's Complete Timeline
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
          >
            Every change, every decision, every file—captured and queryable.
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
                /timeline --since "1 hour ago"
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-6 bg-[var(--color-void)] min-h-[400px] font-mono text-sm">
              {/* Command */}
              <div className="mb-6">
                <span className="text-[var(--color-accent)]">❯</span>
                <span className="text-[var(--color-text-primary)] ml-2">/timeline --since "1 hour ago"</span>
              </div>

              {/* Header */}
              <div className="text-[var(--color-text-muted)] mb-4 pb-2 border-b border-[var(--color-border)]">
                <span className="inline-block w-20">Time</span>
                <span className="inline-block w-8">•</span>
                <span className="inline-block w-16">Tool</span>
                <span className="inline-block">File / Summary</span>
              </div>

              {/* Timeline entries */}
              <div className="space-y-3">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: index < visibleLines ? 1 : 0,
                      x: index < visibleLines ? 0 : -10,
                    }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <div className="flex items-start">
                      <span className="text-[var(--color-text-muted)] w-20 flex-shrink-0">
                        {event.timestamp}
                      </span>
                      <span className="w-8 flex-shrink-0">{event.icon}</span>
                      <span className="text-[var(--color-accent)] w-16 flex-shrink-0">
                        {event.tool}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-[var(--color-text-primary)]">
                          {event.file}
                        </span>
                        <span className="text-[var(--color-text-muted)] ml-2">
                          [{event.branch}]
                        </span>
                      </div>
                    </div>
                    <div className="ml-[144px] mt-1 text-[var(--color-text-secondary)] text-xs">
                      ↳ {event.summary}
                    </div>
                  </motion.div>
                ))}

                {/* Cursor */}
                {visibleLines >= timelineEvents.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6"
                  >
                    <span className="text-[var(--color-text-muted)]">
                      Showing 5 events from the last hour
                    </span>
                    <div className="mt-4">
                      <span className="text-[var(--color-accent)]">❯</span>
                      <motion.span
                        className="ml-2 inline-block w-2 h-4 bg-[var(--color-text-primary)]"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    </div>
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
