import React from "react"
import type { Metadata } from 'next'
import { Inter, Poiret_One } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter',
  display: 'swap',
});

const poiretOne = Poiret_One({ 
  weight: "400",
  subsets: ["latin", "cyrillic"],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Forum', 'serif'],
});

export const metadata: Metadata = {
  title: 'Esthetic Dental Lab | Цифровая зуботехническая лаборатория',
  description: 'Высокоточная CAD/CAM обработка, эстетика и стабильное качество для клиник и врачей. Полный цифровой цикл — от скана до готовой работы.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${poiretOne.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
