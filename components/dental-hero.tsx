"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const HERO_IMAGE = "/lab/hero-teeth1.png";

export function DentalHero() {
  return (
    <section className="relative min-h-screen overflow-x-hidden bg-background lg:overflow-visible">
      {/* BACKGROUND LAYERS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
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
      <div className="relative z-20 flex min-h-screen items-start justify-center overflow-x-hidden pt-6 pb-28 lg:items-center lg:overflow-visible lg:pb-12 lg:pt-0">
        <div className="container mx-auto w-full max-w-full overflow-x-hidden px-4 sm:px-5 lg:overflow-visible lg:pb-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 overflow-x-hidden lg:grid-cols-[1fr_1.3fr] lg:gap-24 lg:overflow-visible">
            {/* Left Content */}
            <div className="order-1 w-full min-w-0 text-left lg:order-none">
              <h1 className="mb-4 text-3xl font-normal leading-[1.12] text-foreground sm:text-4xl sm:leading-tight md:text-6xl md:leading-tight lg:mb-8 lg:text-7xl lg:leading-tight">
                <span className="text-foreground block">ЦИФРОВАЯ</span>
                <span className="text-foreground block">ЗУБОТЕХНИЧЕСКАЯ</span>
                <span className="text-foreground block">ЛАБОРАТОРИЯ</span>
              </h1>

              <p className="mb-6 max-w-xl text-[11px] font-light uppercase leading-relaxed tracking-wider text-foreground/80 sm:text-xs md:text-xs md:tracking-widest md:leading-normal lg:mb-10">
                Высокоточная CAD/CAM обработка, эстетика и стабильное качество для клиник и врачей.
                <br className="hidden sm:block lg:hidden" />
                <span className="max-lg:block">
                  Полный цифровой цикл — от скана до готовой работы с контролируемым результатом.
                </span>
              </p>

              <div className="flex w-full max-w-md flex-col gap-3 md:max-w-none md:flex-row md:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-12 w-full shrink-0 text-base glow-button bg-primary text-primary-foreground hover:bg-primary/90 px-6 md:h-14 md:w-auto md:text-lg md:px-8"
                >
                  <Link href="/contacts" className="inline-flex items-center justify-center">
                    ЗАКАЗАТЬ РАСЧЕТ
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 w-full shrink-0 text-base border-primary/30 text-foreground hover:bg-primary/10 px-6 md:h-14 md:w-auto md:text-lg md:px-8"
                >
                  <Link href="/#services" className="inline-flex items-center justify-center">
                    НАШИ УСЛУГИ
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Side - Hero Image: на mobile под текстом, без перекрытия; на lg — как раньше */}
            <div className="order-2 relative mx-auto mt-4 flex w-full max-w-[min(100%,320px)] justify-center sm:max-w-[360px] lg:order-none lg:mx-0 lg:mt-0 lg:min-h-[640px] lg:max-w-none lg:justify-end">
              <div className="relative h-[240px] w-full max-w-[280px] sm:h-[280px] sm:max-w-[320px] lg:pointer-events-none lg:absolute lg:right-[-120px] lg:top-1/2 lg:h-[800px] lg:max-w-none lg:w-[800px] lg:-translate-y-1/2">
                <Image
                  src={HERO_IMAGE}
                  alt="Hero"
                  width={800}
                  height={800}
                  className="h-full w-full object-contain lg:scale-125"
                  priority
                  sizes="(max-width: 1023px) 320px, 800px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator — только lg+, на телефоне не перекрывает CTA */}
      <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 animate-bounce lg:flex">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Листайте</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}