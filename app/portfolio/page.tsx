import type { Metadata } from "next";
import { DentalHeader } from "@/components/dental-header";
import { DentalPortfolio } from "@/components/dental-portfolio";
import { DentalFooter } from "@/components/dental-footer";

export const metadata: Metadata = {
  title: "Портфолио работ — Esthetic Dental Lab (Томск)",
  description:
    "Портфолио работ Esthetic Dental Lab в Томске: цирконий, E-MAX, виниры, коронки и имплант-протезирование. Примеры готовых реставраций.",
  alternates: {
    canonical: "https://edentlab.ru/portfolio",
  },
  openGraph: {
    title: "Портфолио работ — Esthetic Dental Lab (Томск)",
    description:
      "Портфолио работ Esthetic Dental Lab в Томске: цирконий, E-MAX, виниры, коронки и имплант-протезирование. Примеры готовых реставраций.",
    url: "https://edentlab.ru/portfolio",
    type: "website",
    locale: "ru_RU",
    siteName: "Esthetic Dental Lab",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Esthetic Dental Lab — Томск",
      },
    ],
  },
};

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
