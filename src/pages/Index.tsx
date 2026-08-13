import Navbar from "@/components/Navbar";
import CinematicHero from "@/components/CinematicHero";
import StorySection from "@/components/StorySection";
import FloatingMenuSection from "@/components/FloatingMenuSection";
import CafeExperience from "@/components/CafeExperience";
import LocationSection from "@/components/LocationSection";
import ReservationSection from "@/components/ReservationSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <CinematicHero />
      <StorySection />
      <FloatingMenuSection />
      <CafeExperience />
      <LocationSection />
      <ReservationSection />
      <FooterSection />
    </main>
  );
};

export default Index;
