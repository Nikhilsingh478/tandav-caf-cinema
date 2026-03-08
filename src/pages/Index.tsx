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

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
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
  );
};

export default Index;
