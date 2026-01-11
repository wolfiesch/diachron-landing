import { useEffect } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import Lenis from 'lenis';
import { Analytics } from '@vercel/analytics/react';
import { MotionConfig } from 'framer-motion';
import AmbientBackdrop from '@/components/effects/AmbientBackdrop';
import Navigation from '@/components/ui/Navigation';

function RootLayout() {
  const isE2E = import.meta.env.VITE_E2E === 'true';

  // Smooth scrolling with Lenis
  useEffect(() => {
    if (isE2E) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isE2E]);

  return (
    <MotionConfig reducedMotion={isE2E ? 'always' : 'user'}>
      <AmbientBackdrop />
      <Navigation />

      <div className="page-content">
        <Outlet />

        {/* Footer */}
        <footer className="py-8 border-t border-[var(--color-border)]">
          <div className="container text-center">
            <p className="text-[var(--color-text-muted)] text-sm">
              © {new Date().getFullYear()} Diachron. Open source under MIT license.
            </p>
          </div>
        </footer>
      </div>

      <Analytics />
    </MotionConfig>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
