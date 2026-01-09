# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server (http://localhost:5173)
npm run build    # TypeScript check + Vite production build
npm run lint     # ESLint
npm run preview  # Preview production build locally
vercel --prod    # Deploy to production
```

## Architecture

**Stack:** Vite + React 19 + TypeScript + Tailwind CSS 4.x

**Page Structure:** Single-page landing with ordered sections in `App.tsx`:
- Hero → Problem → Solution → QuickStart → Demo → Pricing → CTA

**Key Patterns:**

1. **Framer Motion Animations** - Reusable variants in `src/lib/motion.ts`:
   - Use `staggerContainer` + `staggerItem` for sequential reveals
   - Use `viewportOnce` for scroll-triggered animations
   - All sections use `initial="hidden"` + `whileInView="visible"`

2. **Design Tokens** - CSS custom properties defined in `src/index.css` under `@theme`:
   - Backgrounds: `--color-void`, `--color-surface`, `--color-surface-elevated`
   - Text: `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`
   - Primary Accent: `--color-accent` (cyan #22D3EE) - interactive states
   - Secondary Accent: `--color-accent-secondary` (magenta #D946EF) - highlights
   - Gradient utilities: `.gradient-accent`, `.gradient-accent-text`
   - Use `var(--color-*)` syntax, not Tailwind color classes

3. **Component Classes** - Base styles for `.btn`, `.btn-primary`, `.btn-secondary`, `.card`, `.input` defined in `src/index.css`

4. **Path Alias** - `@/` maps to `src/` (configured in `vite.config.ts`)

5. **Smooth Scroll** - Lenis initialized in `App.tsx` for buttery scroll

## Waitlist Form

The waitlist uses Formspree. The endpoint is in `src/components/ui/WaitlistForm.tsx`:
```typescript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnjjaajp';
```

## Fonts

- **Display:** Outfit (headings, body)
- **Mono:** JetBrains Mono (code, stats)

Load via CSS: `font-family: var(--font-display)` or `var(--font-mono)`
