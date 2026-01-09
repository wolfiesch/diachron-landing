import { useEffect } from 'react';
import Lenis from 'lenis';
import { Analytics } from '@vercel/analytics/react';

import HeroSection from './components/sections/HeroSection';
import ProblemSection from './components/sections/ProblemSection';
import SolutionSection from './components/sections/SolutionSection';
import DemoSection from './components/sections/DemoSection';
import PricingSection from './components/sections/PricingSection';
import CTASection from './components/sections/CTASection';

function App() {
  // Smooth scrolling with Lenis
  useEffect(() => {
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
  }, []);

  return (
    <>
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <DemoSection />
        <PricingSection />
        <CTASection />
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-[var(--color-border)]">
        <div className="container text-center">
          <p className="text-[var(--color-text-muted)] text-sm">
            © {new Date().getFullYear()} Diachron. Open source under MIT license.
          </p>
        </div>
      </footer>

      <Analytics />
    </>
  );
}

export default App;
