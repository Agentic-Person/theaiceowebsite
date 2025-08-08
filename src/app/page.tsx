import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import TechnologySection from '@/components/sections/TechnologySection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import OutcomesSection from '@/components/sections/OutcomesSection';
import SuccessStoriesSection from '@/components/sections/SuccessStoriesSection';
import PricingSection from '@/components/sections/PricingSection';
import ResourcesSection from '@/components/sections/ResourcesSection';
import TeamSection from '@/components/sections/TeamSection';

export default function HomePage() {
  return (
    <main style={{ backgroundColor: 'var(--background)' }}>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <TechnologySection />
      <HowItWorksSection />
      <OutcomesSection />
      <SuccessStoriesSection />
      <PricingSection />
      <ResourcesSection />
      <TeamSection />
    </main>
  );
}