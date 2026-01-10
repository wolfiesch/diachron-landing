import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { Check, ArrowRight } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'For individual developers and open source projects',
    features: [
      'Unlimited local events',
      'Full timeline CLI',
      'Git integration',
      'SQLite storage',
      'Export to JSON/Markdown',
    ],
    cta: 'Get Started',
    ctaStyle: 'btn-secondary',
    badge: 'Current',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$19',
    period: 'per seat / month',
    description: 'For teams who need visibility across projects',
    features: [
      'Everything in Free',
      'Cloud sync',
      'Team dashboard',
      'Shared timelines',
      'Priority support',
    ],
    cta: 'Coming Soon',
    ctaStyle: 'btn-secondary',
    badge: null,
    highlighted: false,
    disabled: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with compliance requirements',
    features: [
      'Everything in Team',
      'SSO / SAML',
      'Audit logs',
      'Custom integrations',
      'Dedicated support',
      'On-premise option',
    ],
    cta: 'Contact Us',
    ctaStyle: 'btn-secondary',
    badge: null,
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section className="section" data-testid="pricing-section">
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
            Pricing
          </motion.span>
          <motion.h2 variants={staggerItem} className="text-section mb-4">
            Start Free, Scale When Ready
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
          >
            Diachron is free and open source for individual use.
            Team features are coming soon.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {tiers.map((tier) => {
            const tierId = tier.name.toLowerCase().replace(/\s+/g, '-');

            return (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className={`relative rounded-xl p-6 flex flex-col ${
                  tier.highlighted
                    ? 'border-2 border-[var(--color-accent)] bg-[var(--color-surface)]'
                    : 'border border-[var(--color-border)] bg-[var(--color-surface)]'
                } ${tier.disabled ? 'opacity-60' : ''}`}
                data-testid={`pricing-${tierId}`}
              >
                {/* Badge */}
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--color-accent)] text-[var(--color-void)]">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold text-[var(--color-text-primary)]">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-[var(--color-text-muted)] text-sm">
                        {tier.period}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-3 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0" />
                      <span className="text-[var(--color-text-secondary)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`btn ${tier.ctaStyle} w-full mt-8 ${tier.disabled ? 'cursor-not-allowed' : ''}`}
                  disabled={tier.disabled}
                  data-testid={`pricing-${tierId}-cta`}
                >
                  {tier.cta}
                  {!tier.disabled && <ArrowRight className="w-4 h-4" />}
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
