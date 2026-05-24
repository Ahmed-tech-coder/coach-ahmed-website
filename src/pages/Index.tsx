import { HeroSection } from "@/components/sections/HeroSection";
import { StepsSection } from "@/components/sections/StepsSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { StoriesSection } from "@/components/sections/StoriesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { OffersSection } from "@/components/sections/OffersSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden relative">

      <main>
        <HeroSection />
        <StepsSection />
        <ResultsSection />
        <StoriesSection />
        <AboutSection />
        <ServicesSection />
        <OffersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
