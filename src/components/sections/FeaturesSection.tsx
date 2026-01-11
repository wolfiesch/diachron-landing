import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { FileText, Terminal, Shield, Check, Square, CheckSquare } from 'lucide-react';

const features = [
  {
    title: 'PR Narrative',
    subtitle: 'The Wedge',
    icon: FileText,
    color: 'cyan',
    description: 'Auto-generated PR descriptions with full evidence trail',
  },
  {
    title: 'Semantic Blame',
    subtitle: 'Beyond git blame',
    icon: Terminal,
    color: 'magenta',
    description: 'Trace any line back to the AI session that created it',
  },
  {
    title: 'Hash-Chain Audit',
    subtitle: 'Tamper-evident',
    icon: Shield,
    color: 'gradient',
    description: 'Cryptographic proof of provenance for enterprise compliance',
  },
];

const colorStyles = {
  cyan: {
    border: 'border-[var(--color-accent)]',
    bg: 'bg-[rgba(34,211,238,0.05)]',
    iconBg: 'bg-[rgba(34,211,238,0.1)]',
    iconColor: 'text-[var(--color-accent)]',
    glow: 'shadow-[0_0_40px_rgba(34,211,238,0.15)]',
  },
  magenta: {
    border: 'border-[var(--color-accent-secondary)]',
    bg: 'bg-[rgba(217,70,239,0.05)]',
    iconBg: 'bg-[rgba(217,70,239,0.1)]',
    iconColor: 'text-[var(--color-accent-secondary)]',
    glow: 'shadow-[0_0_40px_rgba(217,70,239,0.15)]',
  },
  gradient: {
    border: 'border-transparent',
    bg: 'bg-[rgba(34,211,238,0.03)]',
    iconBg: 'bg-gradient-to-br from-[rgba(34,211,238,0.15)] to-[rgba(217,70,239,0.15)]',
    iconColor: 'text-[var(--color-text-primary)]',
    glow: 'shadow-[0_0_40px_rgba(34,211,238,0.1),0_0_40px_rgba(217,70,239,0.1)]',
  },
};

// GitHub-style PR comment demo
function PRNarrativeDemo() {
  return (
    <div className="rounded-lg border border-[var(--color-border)] overflow-hidden bg-[var(--color-void)] text-xs">
      {/* GitHub-style header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-surface-elevated)] border-b border-[var(--color-border)]">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)]" />
        <span className="text-[var(--color-text-primary)] font-medium">diachron-bot</span>
        <span className="text-[var(--color-text-muted)]">commented just now</span>
      </div>

      <div className="p-4 space-y-4 font-mono">
        <div>
          <div className="text-[var(--color-text-primary)] font-semibold mb-2">## PR #142: Add OAuth2 refresh token handling</div>
        </div>

        <div>
          <div className="text-[var(--color-text-muted)] mb-1">### What Changed</div>
          <div className="text-[var(--color-text-secondary)]">
            <div>• <span className="text-[var(--color-accent)]">src/auth/login.ts</span> (+45 lines)</div>
            <div>• <span className="text-[var(--color-accent)]">src/auth/token.ts</span> (+120 lines)</div>
          </div>
        </div>

        <div>
          <div className="text-[var(--color-text-muted)] mb-1">### Why (Intent)</div>
          <div className="text-[var(--color-text-secondary)]">
            User asked: <span className="italic">"Fix the 401 errors on page refresh"</span>
          </div>
        </div>

        <div>
          <div className="text-[var(--color-text-muted)] mb-1">### Verification</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Tests executed after changes</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Build succeeded</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
              <Square className="w-3.5 h-3.5" />
              <span>Human review pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Semantic blame terminal demo
function SemanticBlameDemo() {
  return (
    <div className="rounded-lg border border-[var(--color-border)] overflow-hidden bg-[var(--color-void)] font-mono text-xs">
      <div className="p-4 space-y-2">
        <div className="text-[var(--color-accent)]">$ diachron blame src/auth/login.ts:42</div>
        <div className="mt-4 space-y-3">
          <div className="text-[var(--color-text-secondary)]">
            Line 42: <span className="text-[var(--color-text-primary)]">const token = await refreshToken(user.id);</span>
          </div>
          <div className="border-l-2 border-[var(--color-accent-secondary)] pl-3 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-accent-secondary)]">📍</span>
              <span className="text-[var(--color-text-primary)]">Claude Code</span>
              <span className="text-[var(--color-text-muted)]">(Session abc123)</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⏰</span>
              <span className="text-[var(--color-text-muted)]">01/10/2026 10:32 AM PST</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💬</span>
              <span className="text-[var(--color-text-secondary)]">Intent: "Fix the 401 errors on page refresh"</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📊</span>
              <span className="text-emerald-400">HIGH confidence</span>
              <span className="text-[var(--color-text-muted)]">(explicit tool call linkage)</span>
            </div>
          </div>
          <div className="flex gap-4 mt-3">
            <span className="text-[var(--color-accent)] underline cursor-pointer">View conversation →</span>
            <span className="text-[var(--color-accent-secondary)] underline cursor-pointer">Rollback this change →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hash chain verification demo
function HashChainDemo() {
  return (
    <div className="rounded-lg border border-[var(--color-border)] overflow-hidden bg-[var(--color-void)] font-mono text-xs">
      <div className="p-4 space-y-2">
        <div className="text-[var(--color-accent)]">$ diachron verify</div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <Check className="w-4 h-4" />
            <span>Chain integrity verified</span>
          </div>
          <div className="space-y-1 text-[var(--color-text-muted)] pl-6">
            <div>Project: <span className="text-[var(--color-text-secondary)]">~/project</span></div>
            <div>Events: <span className="text-[var(--color-text-secondary)]">296</span> (12 checkpoints)</div>
            <div>First event: <span className="text-[var(--color-text-secondary)]">2026-01-01 00:00:00</span></div>
            <div>Last event: <span className="text-[var(--color-text-secondary)]">2026-01-11 03:20:00</span></div>
            <div>Chain root: <span className="text-[var(--color-accent)]">8f3a2b...</span></div>
            <div>Segments: <span className="text-emerald-400">all valid</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="section" data-testid="features-section">
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
            Three Pillars of AI Provenance
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
          >
            From automatic capture to cryptographic verification—everything you need
            to trust and trace AI-generated code.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch"
        >
          {features.map((feature, index) => {
            const styles = colorStyles[feature.color as keyof typeof colorStyles];
            const Demo = index === 0 ? PRNarrativeDemo : index === 1 ? SemanticBlameDemo : HashChainDemo;

            return (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="group relative h-full"
              >
                {/* Gradient border wrapper for the "gradient" color type */}
                <div
                  className={`relative rounded-2xl p-[1px] h-full ${
                    feature.color === 'gradient'
                      ? 'bg-gradient-to-br from-[var(--color-accent)] via-[var(--color-accent-secondary)] to-[var(--color-accent)]'
                      : ''
                  }`}
                >
                  <div
                    className={`relative rounded-2xl p-6 h-full bg-[var(--color-surface)] flex flex-col ${
                      feature.color !== 'gradient' ? `border ${styles.border}` : ''
                    } ${styles.glow} transition-all duration-500 group-hover:scale-[1.02]`}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        className={`w-12 h-12 rounded-xl ${styles.iconBg} flex items-center justify-center`}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <feature.icon className={`w-6 h-6 ${styles.iconColor}`} />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                          {feature.title}
                        </h3>
                        <span className={`text-xs ${styles.iconColor}`}>
                          {feature.subtitle}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                      {feature.description}
                    </p>

                    {/* Demo component */}
                    <div className="mt-auto">
                      <Demo />
                    </div>

                    {/* Decorative corner accent */}
                    <div
                      className={`absolute top-0 right-0 w-20 h-20 opacity-20 pointer-events-none ${
                        feature.color === 'cyan'
                          ? 'bg-gradient-to-bl from-[var(--color-accent)] to-transparent'
                          : feature.color === 'magenta'
                          ? 'bg-gradient-to-bl from-[var(--color-accent-secondary)] to-transparent'
                          : 'bg-gradient-to-bl from-[var(--color-accent)] via-[var(--color-accent-secondary)] to-transparent'
                      } rounded-tr-2xl`}
                    />
                  </div>
                </div>

                {/* Floating number indicator */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex items-center justify-center text-mono text-xs text-[var(--color-text-muted)]">
                  {index + 1}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
