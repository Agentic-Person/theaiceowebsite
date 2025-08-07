import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import WorkflowSection from '@/components/sections/WorkflowSection';
import ToolkitSection from '@/components/sections/ToolkitSection';
import OutcomesSection from '@/components/sections/OutcomesSection';
import SuccessStoriesSection from '@/components/sections/SuccessStoriesSection';
import ResourcesSection from '@/components/sections/ResourcesSection';
import TeamSection from '@/components/sections/TeamSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <WorkflowSection />
      <ToolkitSection />
      <OutcomesSection />
      <SuccessStoriesSection />
      <ResourcesSection />
      <TeamSection />
    </main>
  );
}