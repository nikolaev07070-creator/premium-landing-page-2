import { DentalHeader } from "@/components/dental-header";
import { DentalHero } from "@/components/dental-hero";
import { DentalServices } from "@/components/dental-services";
import { EquipmentCarousel } from "@/components/equipment-carousel";
import { TeamCarousel } from "@/components/team-carousel";
import { DentalPortfolio } from "@/components/dental-portfolio";
import { DentalAbout } from "@/components/dental-about";
import { PriceSection } from "@/components/price-section";
import { DentalContact } from "@/components/dental-contact";
import { DentalFooter } from "@/components/dental-footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      {/* Grain texture overlay */}
      <div className="grain-overlay fixed inset-0 pointer-events-none z-0" />
      
      <div className="relative z-10">
        <DentalHeader />
        <DentalHero />
        <DentalAbout />
        <DentalServices />
        <EquipmentCarousel />
        <TeamCarousel />
        <DentalPortfolio />
        <PriceSection />
        <DentalContact />
        <DentalFooter />
      </div>
    </main>
  );
}
