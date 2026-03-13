import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import CinematicHero from "@/components/CinematicHero";
import BeanSection from "@/components/BeanSection";
import GrindSection from "@/components/GrindSection";
import BrewSection from "@/components/BrewSection";
import LatteArtSection from "@/components/LatteArtSection";
import FloatingMenuSection from "@/components/FloatingMenuSection";
import HorizontalOrigins from "@/components/HorizontalOrigins";
import CafeExperience from "@/components/CafeExperience";
import LocationSection from "@/components/LocationSection";
import ReservationSection from "@/components/ReservationSection";
import FooterSection from "@/components/FooterSection";
import LoadingScreen from "@/components/LoadingScreen";

const SectionDivider = () => (
  <div className="section-divider mx-4 sm:mx-6 md:mx-12 lg:mx-24" />
);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && (
        <main className="bg-background min-h-screen">
          <Navbar />
          <CinematicHero />
          <BeanSection />
          <SectionDivider />
          <GrindSection />
          <SectionDivider />
          <BrewSection />
          <SectionDivider />
          <LatteArtSection />
          <SectionDivider />
          <FloatingMenuSection />
          <SectionDivider />
          <HorizontalOrigins />
          <SectionDivider />
          <CafeExperience />
          <SectionDivider />
          <LocationSection />
          <SectionDivider />
          <ReservationSection />
          <FooterSection />
        </main>
      )}
    </>
  );
};

export default Index;
