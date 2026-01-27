import type { Metadata } from "next";
import { DentalHeader } from "@/components/dental-header";
import { DentalContact } from "@/components/dental-contact";
import { DentalFooter } from "@/components/dental-footer";

export const metadata: Metadata = {
  title: "Контакты — Esthetic Dental Lab (Томск)",
  description:
    "Контакты зуботехнической лаборатории Esthetic Dental Lab в Томске. Адрес: Ферганская 80А. Телефон: +7 (923) 444-41-41.",
  alternates: {
    canonical: "https://edentlab.ru/contacts",
  },
  openGraph: {
    title: "Контакты — Esthetic Dental Lab (Томск)",
    description:
      "Контакты зуботехнической лаборатории Esthetic Dental Lab в Томске. Адрес: Ферганская 80А. Телефон: +7 (923) 444-41-41.",
    url: "https://edentlab.ru/contacts",
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

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-background">
      <DentalHeader />
      <div className="pt-24">
        <DentalContact />
      </div>
      <DentalFooter />
    </main>
  );
}
