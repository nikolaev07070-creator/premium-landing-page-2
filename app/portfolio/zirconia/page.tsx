import type { Metadata } from "next";
import { ZirconiaGallery } from "@/components/zirconia-gallery";

export const metadata: Metadata = {
  title: "Цирконий — портфолио | Esthetic Dental Lab",
  description:
    "Работы из диоксида циркония: примеры реставраций и коронок. Esthetic Dental Lab.",
};

export default function ZirconiaPortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <ZirconiaGallery />
      </div>
    </main>
  );
}

