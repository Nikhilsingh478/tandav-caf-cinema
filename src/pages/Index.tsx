import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollStorySection from "@/components/ScrollStorySection";
import MenuSection from "@/components/MenuSection";
import SpecialtyBrewsSection from "@/components/SpecialtyBrewsSection";
import OurStorySection from "@/components/OurStorySection";
import LocationSection from "@/components/LocationSection";
import ReservationSection from "@/components/ReservationSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <ScrollStorySection />
      <MenuSection />
      <SpecialtyBrewsSection />
      <OurStorySection />
      <LocationSection />
      <ReservationSection />
      <FooterSection />
    </main>
  );
};

export default Index;
