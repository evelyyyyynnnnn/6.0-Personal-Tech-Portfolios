// DESIGN: Editorial Finance — main page assembling all sections
// Sections: Hero → Contents → Sectors → Company → Regions → Trends → About → Footer

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ContentsSection from '@/components/ContentsSection';
import SectorsSection from '@/components/SectorsSection';
import CompanySection from '@/components/CompanySection';
import RegionsSection from '@/components/RegionsSection';
import TrendsSection from '@/components/TrendsSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ContentsSection />
        <SectorsSection />
        <CompanySection />
        <RegionsSection />
        <TrendsSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
