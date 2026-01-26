import { DentalHeader } from "@/components/dental-header";
import { DentalPortfolio } from "@/components/dental-portfolio";
import { DentalFooter } from "@/components/dental-footer";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <DentalHeader />
      <div className="pt-24">
        <DentalPortfolio />
      </div>
      <DentalFooter />
    </main>
  );
}
