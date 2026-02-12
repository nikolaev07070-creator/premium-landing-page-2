"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const HERO_IMAGE = "/lab/hero-teeth1.png";

export function DentalHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* BACKGROUND LAYERS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Чистые соты */}
        <div className="heroHoneycomb absolute inset-0">
          <div className="heroHoneycombBase absolute inset-0" />
          <div className="heroHoneycombPatch heroHoneycombPatch1 absolute inset-0" />
          <div className="heroHoneycombPatch heroHoneycombPatch2 absolute inset-0" />
          <div className="heroHoneycombPatch heroHoneycombPatch3 absolute inset-0" />
          <div className="heroHoneycombPatch heroHoneycombPatch4 absolute inset-0" />
        </div>

        {/* (Опционально) мягкая подсветка — очень слабая, чтобы не мутнить hero */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

        {/* зерно (если нужно) — но лёгкое */}
        <div className="grain-overlay opacity-20" />
      </div>

      {/* HONEYCOMB COVER: перекрывает соты слева, плавно исчезает справа, с "окном" внизу */}
      <div className="heroHoneycombCover absolute inset-0 z-10 pointer-events-none" />

      {/* Vertical Label */}
      <div className="hero-vertical-label z-10 pointer-events-none" aria-hidden="true">
        E<br />
        S<br />
        T<br />
        H<br />
        E<br />
        T<br />
        <span className="fix-i">I</span><br />
        C<br />
        <br />
        D<br />
        E<br />
        N<br />
        T<br />
        A<br />
        L<br />
        <br />
        L<br />
        A<br />
        B
      </div>

      {/* CONTENT */}
      <div className="relative z-20 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 pb-12">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal leading-tight mb-8">
                <span className="text-foreground block">ЦИФРОВАЯ</span>
                <span className="text-foreground block">ЗУБОТЕХНИЧЕСКАЯ</span>
                <span className="text-foreground block">ЛАБОРАТОРИЯ</span>
              </h1>

              <p className="max-w-xl mb-10 text-xs font-light tracking-widest text-foreground/80 uppercase leading-normal">
                Высокоточная CAD/CAM обработка, эстетика и стабильное качество для клиник и врачей.
                <br className="hidden md:block" />
                Полный цифровой цикл — от скана до готовой работы с контролируемым результатом.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-14 text-lg glow-button bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                >
                  <Link href="/contacts">
                    ЗАКАЗАТЬ РАСЧЕТ
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 text-lg border-primary/30 text-foreground hover:bg-primary/10 px-8"
                >
                  <Link href="/#services">НАШИ УСЛУГИ</Link>
                </Button>
              </div>
            </div>

            {/* Right Side - Hero Image */}
            <div className="relative flex items-center justify-center lg:justify-end lg:ml-12 xl:ml-16">
              <div className="relative w-[280px] md:w-[360px] lg:w-[600px] xl:w-[720px] h-auto lg:-translate-x-[190px] lg:-translate-y-10 lg:scale-110 origin-center">
                <Image
                  src="/lab/hero-teeth1.png"
                  alt="Dental art sculpture"
                  width={720}
                  height={936}
                  className="object-contain w-full h-auto drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                  priority
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 360px, (max-width: 1280px) 600px, 720px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Листайте</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}