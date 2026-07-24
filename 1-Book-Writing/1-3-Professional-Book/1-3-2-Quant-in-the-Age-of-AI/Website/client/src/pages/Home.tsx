/*
 * DESIGN PHILOSOPHY: Editorial Finance
 * Main page: assembles all sections in order
 * Navbar → Hero → Curriculum → Why → Topics → CTA → Footer
 */
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TickerStrip from '@/components/TickerStrip';
import CurriculumSection from '@/components/CurriculumSection';
import WhySection from '@/components/WhySection';
import CtaSection from '@/components/CtaSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <TickerStrip />
        <CurriculumSection />
        <hr className="section-rule" />
        <WhySection />
        <CtaSection />
      </main>
    </div>
  );
}
