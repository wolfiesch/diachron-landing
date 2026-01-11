import { createFileRoute } from '@tanstack/react-router';
import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import QuickStartSection from '@/components/sections/QuickStartSection';
import DemoSection from '@/components/sections/DemoSection';
import PricingSection from '@/components/sections/PricingSection';
import CTASection from '@/components/sections/CTASection';

function HomePage() {
  return (
    <main data-testid="main-content">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <QuickStartSection />
      <DemoSection />
      <PricingSection />
      <CTASection />
    </main>
  );
}

export const Route = createFileRoute('/')({
  component: HomePage,
});
