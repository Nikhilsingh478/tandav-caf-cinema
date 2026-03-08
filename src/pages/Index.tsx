import { useState, useEffect } from "react";
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
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <CustomCursor />
          <NoiseOverlay />
          <main className="bg-background min-h-screen cursor-none">
            <Navbar />
            <CinematicHero />
            <BeanSection />
            <GrindSection />
            <BrewSection />
            <LatteArtSection />
            <FloatingMenuSection />
            <HorizontalOrigins />
            <CafeExperience />
            <LocationSection />
            <ReservationSection />
            <FooterSection />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
