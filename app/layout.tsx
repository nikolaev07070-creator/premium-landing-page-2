import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Poiret_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const poiretOne = Poiret_One({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
  fallback: ["Forum", "serif"],
});

const siteUrl = "https://edentlab.ru";

export const metadata: Metadata = {
  metadataBase: new URL("https://edentlab.ru"),
  title:
    "Esthetic Dental Lab — цифровая зуботехническая лаборатория в Томске",
  description:
    "Цифровая зуботехническая лаборатория в Томске. CAD/CAM, цирконий, E-MAX, виниры, коронки, имплант-протезирование. Полный цифровой цикл — от скана до готовой работы.",
  keywords: [
    "зуботехническая лаборатория Томск",
    "CAD/CAM Томск",
    "цирконий Томск",
    "E-MAX Томск",
    "виниры Томск",
    "коронки Томск",
    "импланты Томск",
    "цифровая лаборатория Томск",
    "Esthetic Dental Lab",
  ],
  alternates: {
    canonical: "https://edentlab.ru/",
  },
  openGraph: {
    title:
      "Esthetic Dental Lab — цифровая зуботехническая лаборатория в Томске",
    description:
      "Цифровая зуботехническая лаборатория в Томске. CAD/CAM, цирконий, E-MAX, виниры, коронки, имплант-протезирование. Полный цифровой цикл — от скана до готовой работы.",
    type: "website",
    locale: "ru_RU",
    siteName: "Esthetic Dental Lab",
    url: "https://edentlab.ru/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Esthetic Dental Lab",
  description:
    "Цифровая зуботехническая лаборатория в Томске. CAD/CAM, цирконий, E-MAX, виниры, коронки, имплант-протезирование. Полный цифровой цикл — от скана до готовой работы.",
  areaServed: "Томск",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ферганская 80А",
    addressLocality: "Томск",
    addressCountry: "RU",
    // TODO: добавить postalCode
  },
  url: "https://edentlab.ru/",
  telephone: "+79234444141",
  // TODO: добавить geo (координаты лаборатории)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${poiretOne.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <Script
          id="ld-json-local-business"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </body>
    </html>
  );
}

