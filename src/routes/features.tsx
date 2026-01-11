import { createFileRoute } from '@tanstack/react-router';
import FeatureHero from '@/components/features/FeatureHero';
import FeatureDeepDive from '@/components/features/FeatureDeepDive';
import ComparisonTable from '@/components/features/ComparisonTable';
import TechnicalSpecs from '@/components/features/TechnicalSpecs';
import FeatureCTA from '@/components/features/FeatureCTA';

function FeaturesPage() {
  return (
    <main data-testid="features-content">
      <FeatureHero />
      <FeatureDeepDive />
      <ComparisonTable />
      <TechnicalSpecs />
      <FeatureCTA />
    </main>
  );
}

export const Route = createFileRoute('/features')({
  component: FeaturesPage,
});
