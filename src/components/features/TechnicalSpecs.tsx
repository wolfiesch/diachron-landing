import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { Cpu, HardDrive, Zap, Clock, Database, ChevronRight } from 'lucide-react';

const metrics = [
  { icon: Zap, label: 'Daemon Start', value: '~7ms', description: 'Cold start time' },
  { icon: Clock, label: 'Hook Latency', value: '~12ms', description: 'Per-capture overhead' },
  { icon: Cpu, label: 'Search Response', value: '~30ms', description: 'End-to-end query' },
  { icon: HardDrive, label: 'Memory', value: '142MB', description: 'Runtime footprint' },
];

const architectureSteps = [
  { label: 'Claude Code', sublabel: 'Write / Edit / Bash', color: 'default' },
  { label: 'PostToolUse Hook', sublabel: '~12ms latency', color: 'cyan' },
  { label: 'diachrond', sublabel: 'Rust Daemon', color: 'magenta' },
  { label: 'SQLite', sublabel: 'FTS5 + Vectors', color: 'default' },
  { label: 'CLI Tools', sublabel: '/timeline /search /memory', color: 'cyan' },
];

const techStack = [
  { category: 'Core', items: ['Python 3.8+', 'Rust (optional)', 'SQLite'] },
  { category: 'Search', items: ['FTS5 full-text', 'all-MiniLM-L6 vectors', 'usearch HNSW'] },
  { category: 'Integration', items: ['Claude Code hooks', 'OpenAI API (summaries)', 'Git'] },
  { category: 'Platform', items: ['macOS (primary)', 'Linux', 'Windows (untested)'] },
];

export default function TechnicalSpecs() {
  return (
    <section className="section" data-testid="technical-specs">
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
            className="text-mono text-text-muted text-sm uppercase tracking-wider mb-4 block"
          >
            Under the Hood
          </motion.span>
          <motion.h2 variants={staggerItem} className="text-section mb-4">
            Technical Specifications
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            Built for performance and reliability. Rust daemon for speed, SQLite for durability.
          </motion.p>
        </motion.div>

        {/* Performance metrics */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={staggerItem}
              className="relative p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-center group hover:border-[var(--color-accent)] hover:translate-y-[-4px] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-radial-gradient(var(--color-accent-muted) 0%, transparent 70%) opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
              <metric.icon className="w-6 h-6 text-[var(--color-accent)] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-mono text-[var(--color-text-primary)] mb-1">
                {metric.value}
              </div>
              <div className="text-sm font-medium text-[var(--color-text-secondary)]">
                {metric.label}
              </div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-5xl mx-auto mb-20"
        >
          <motion.h3
            variants={staggerItem}
            className="text-lg font-semibold text-center mb-12 md:mb-14 text-[var(--color-text-primary)]"
          >
            Architecture Flow
          </motion.h3>
          <motion.div
            variants={staggerItem}
            className="relative mt-4 md:mt-5 p-6 md:p-8 lg:p-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2">
              {architectureSteps.map((step, index) => (
                <div key={step.label} className="flex flex-col md:flex-row items-center gap-3">
                  <motion.div
                    className={`relative p-4 rounded-xl border flex flex-col justify-center min-h-[80px] min-w-[110px] max-w-[150px] text-center ${step.color === 'cyan'
                        ? 'border-[var(--color-accent)] bg-[rgba(34,211,238,0.06)]'
                        : step.color === 'magenta'
                          ? 'border-[var(--color-accent-secondary)] bg-[rgba(217,70,239,0.06)]'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)]'
                      } transition-colors group cursor-default`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div
                      className={`text-sm font-bold tracking-tight ${step.color === 'cyan'
                          ? 'text-[var(--color-accent)]'
                          : step.color === 'magenta'
                            ? 'text-[var(--color-accent-secondary)]'
                            : 'text-[var(--color-text-primary)]'
                        }`}
                    >
                      {step.label}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-mono leading-snug break-words text-[var(--color-text-muted)] mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      {step.sublabel}
                    </div>
                  </motion.div>

                  {/* Flow Arrow */}
                  {index < architectureSteps.length - 1 && (
                    <div className="relative flex items-center justify-center">
                      {/* Desktop Line */}
                      <div className="hidden md:block w-6 md:w-8 h-[2px] relative overflow-visible">
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(to right, ${step.color === 'cyan' ? 'var(--color-accent)' :
                                step.color === 'magenta' ? 'var(--color-accent-secondary)' :
                                  'var(--color-border-hover)'
                              }, ${architectureSteps[index + 1].color === 'cyan' ? 'var(--color-accent)' :
                                architectureSteps[index + 1].color === 'magenta' ? 'var(--color-accent-secondary)' :
                                  'var(--color-border-hover)'
                              })`
                          }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ delay: 0.1 * index, duration: 0.5 }}
                          viewport={{ once: true }}
                        />
                        <ChevronRight className="absolute -right-1.5 transform -translate-y-1/2 top-1/2 w-3.5 h-3.5 text-[var(--color-text-muted)] opacity-50" />
                      </div>
                      {/* Mobile Arrow */}
                      <div className="md:hidden">
                        <motion.div
                          className="w-[2px] h-8"
                          style={{
                            background: `linear-gradient(to bottom, ${step.color === 'cyan' ? 'var(--color-accent)' :
                                step.color === 'magenta' ? 'var(--color-accent-secondary)' :
                                  'var(--color-border)'
                              }, ${architectureSteps[index + 1].color === 'cyan' ? 'var(--color-accent)' :
                                architectureSteps[index + 1].color === 'magenta' ? 'var(--color-accent-secondary)' :
                                  'var(--color-border)'
                              })`
                          }}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          transition={{ delay: 0.1 * index, duration: 0.5 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-4xl mx-auto"
        >
          <motion.h3
            variants={staggerItem}
            className="text-lg font-semibold text-center mb-12 text-[var(--color-text-primary)]"
          >
            Technology Stack
          </motion.h3>
          <motion.div
            variants={staggerItem}
            className="mt-4 md:mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {techStack.map((category) => (
              <div
                key={category.category}
                className="p-7 md:p-9 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-hover)] transition-colors"
              >
                <div className="text-xs font-bold text-mono uppercase tracking-widest text-[var(--color-accent)] mb-5">
                  {category.category}
                </div>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li key={item} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2 leading-relaxed group">
                      <span className="w-2 h-[2px] bg-[var(--color-text-muted)] mt-2 group-hover:bg-[var(--color-accent)] transition-colors" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Database schema snippet */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-xl mx-auto mt-16"
        >
          <motion.div
            variants={staggerItem}
            className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-void)] font-mono text-[13px] shadow-lg relative group"
          >
            <div className="absolute top-4 right-4 text-[10px] text-[var(--color-text-muted)] uppercase tracking-tighter">PostgreSQL Schema</div>
            <div className="flex items-center gap-2 mb-6 border-b border-[var(--color-border)] pb-4">
              <Database className="w-4 h-4 text-[var(--color-accent)]" />
              <span className="text-[var(--color-text-primary)] font-bold">events_log</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-y-2.5">
              <div className="text-accent">id</div>
              <div className="text-text-secondary">SERIAL PRIMARY KEY</div>

              <div className="text-accent">timestamp</div>
              <div className="text-text-secondary">TIMESTAMPTZ DEFAULT NOW()</div>

              <div className="text-accent">tool_name</div>
              <div className="text-text-secondary">TEXT CHECK (tool_name IN ('Write', 'Edit', 'Bash'))</div>

              <div className="text-accent">file_path</div>
              <div className="text-text-secondary">TEXT NOT NULL</div>

              <div className="text-accent">operation</div>
              <div className="text-text-secondary">TEXT CHECK (operation IN ('create', 'modify', 'delete', 'commit'))</div>

              <div className="text-accent">diff_summary</div>
              <div className="text-text-secondary">TEXT</div>

              <div className="text-accent">session_id</div>
              <div className="text-text-secondary">UUID NOT NULL</div>

              <div className="col-span-2 text-text-muted mt-2 italic">+ 5 additional metadata columns</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
