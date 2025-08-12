import HeroSection from '@/components/sections/HeroSection';
import SolutionSection from '@/components/sections/SolutionSection';
import WorkflowSection from '@/components/sections/WorkflowSection';
import OutcomesSection from '@/components/sections/OutcomesSection';
import ResourcesSection from '@/components/sections/ResourcesSection';
import DemoSection from '@/components/sections/DemoSection';
import TeamSection from '@/components/sections/TeamSection';
import FloatingNav from '@/components/animations/FloatingNav';

export default function HomePage() {
  return (
    <main style={{ backgroundColor: 'var(--background)' }}>
      <HeroSection />
      <SolutionSection />
      <WorkflowSection />
      <OutcomesSection />
      <ResourcesSection />
      <DemoSection />
      <TeamSection />
      <FloatingNav />
    </main>
  );
}