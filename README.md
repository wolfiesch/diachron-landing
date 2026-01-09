# Diachron Landing Page

Minimal, sleek landing page for [diachron.ai](https://diachron.ai) - automatic provenance tracking for AI-assisted development.

## Tech Stack

- **Framework:** Vite + React 19 + TypeScript
- **Styling:** Tailwind CSS 4.x
- **Animation:** Framer Motion + Lenis (smooth scroll)
- **Fonts:** Outfit (display) + JetBrains Mono (code)
- **Analytics:** Vercel Analytics
- **Waitlist:** Formspree

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Setup Waitlist

1. Create a form at [Formspree](https://formspree.io)
2. Get your form endpoint (e.g., `https://formspree.io/f/xyzabc`)
3. Update `FORMSPREE_ENDPOINT` in `src/components/ui/WaitlistForm.tsx`

## Deployment

Deploy to Vercel:

```bash
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-void` | `#000000` | Primary background |
| `--color-surface` | `#0a0a0a` | Elevated sections |
| `--color-accent` | `#facc15` | Interactive states only |
| `--color-text-primary` | `#ffffff` | Main text |
| `--color-text-secondary` | `#a3a3a3` | Supporting text |

## License

MIT
