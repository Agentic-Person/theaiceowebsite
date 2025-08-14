import HeroSection from '@/components/sections/HeroSection';
import AIProblemsSection from '@/components/sections/AIProblemsSection';
import SolutionSection from '@/components/sections/SolutionSection';
import OutcomesSection from '@/components/sections/OutcomesSection';
import VoiceAgentsSection from '@/components/sections/VoiceAgentsSection';
import TeamSection from '@/components/sections/TeamSection';
import FloatingNav from '@/components/animations/FloatingNav';

export default function HomePage() {
  return (
    <main style={{ backgroundColor: 'var(--background)' }}>
      <HeroSection />
      <AIProblemsSection />
      <OutcomesSection />
      <SolutionSection />
      <VoiceAgentsSection />
      <TeamSection />
      <FloatingNav />
    </main>
  );
}