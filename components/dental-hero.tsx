"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const HERO_IMAGE = "/lab/hero-teeth1.png";

export function DentalHero() {
  return (
    <section className="hero-mobile-tune relative min-h-screen overflow-x-hidden bg-background max-md:min-h-0 max-md:pb-10 lg:min-h-screen lg:overflow-visible">
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

      {/* CONTENT
          ≤767px (max-md): заголовок → описание → изображение → кнопки (flex + order)
          768–1023 (md): заголовок → кнопки → изображение (1 колонка)
          ≥1024 (lg): прежняя двухколоночная вёрстка */}
      <div className="relative z-20 flex min-h-0 items-start justify-center overflow-x-hidden pt-4 pb-20 max-md:min-h-0 max-md:pb-16 max-md:pt-4 md:min-h-screen md:pb-28 md:pt-6 lg:items-center lg:overflow-visible lg:pb-12 lg:pt-0">
        <div className="container mx-auto w-full max-w-full overflow-x-hidden px-4 sm:px-5 lg:overflow-visible lg:pb-12">
          <div
            className="mx-auto max-w-7xl overflow-x-hidden max-md:flex max-md:flex-col max-md:gap-5 md:grid md:grid-cols-1 md:items-center md:gap-8 lg:grid lg:grid-cols-[1fr_1.3fr] lg:grid-rows-[auto_auto] lg:items-stretch lg:gap-24 lg:overflow-visible"
          >
            {/* Заголовок + описание */}
            <div className="w-full min-w-0 text-left max-md:order-1 md:order-1 lg:col-start-1 lg:row-start-1 lg:order-none">
              <h1 className="mb-3 font-normal text-foreground max-md:max-w-[18ch] max-md:text-[clamp(1.42rem,4.8vw,1.85rem)] max-md:leading-[1.1] max-md:tracking-tight md:mb-4 md:max-w-none md:text-6xl md:leading-tight lg:mb-8 lg:text-7xl lg:leading-tight">
                <span className="text-foreground block">ЦИФРОВАЯ</span>
                <span className="text-foreground block">ЗУБОТЕХНИЧЕСКАЯ</span>
                <span className="text-foreground block">ЛАБОРАТОРИЯ</span>
              </h1>

              <p className="max-w-xl font-light uppercase tracking-wider text-foreground/75 max-md:mb-0 max-md:max-w-full max-md:text-[10px] max-md:leading-snug md:mb-6 md:text-xs md:leading-normal md:tracking-widest lg:mb-10">
                <span className="max-md:inline md:block">
                  CAD/CAM, эстетика и стабильное качество для клиник и врачей.
                </span>{" "}
                <span className="max-md:block max-md:mt-1.5 md:inline md:mt-0">
                  Цифровой цикл от скана до готовой работы.
                </span>
              </p>
            </div>

            {/* Hero image — mobile: full-bleed stage, рука уходит за правый край (клип у viewport), статуя читается; md/lg без изменений логики */}
            <div className="max-md:order-2 md:order-3 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:order-none">
              {/* max-md: полоса на ширину viewport — overflow-x-clip режет вылет справа без горизонтального скролла страницы */}
              <div className="max-md:relative max-md:mt-1 max-md:ml-[calc(50%-50vw)] max-md:w-screen max-md:max-w-[100dvw] max-md:overflow-x-clip max-md:overflow-y-visible md:relative md:mx-auto md:mt-4 md:flex md:w-full md:max-w-[min(100%,360px)] md:justify-center md:overflow-visible lg:mx-0 lg:mt-0 lg:min-h-[640px] lg:max-w-none lg:justify-end">
                <div className="relative mx-auto w-full max-w-[260px] md:h-[280px] md:max-w-[320px] lg:pointer-events-none lg:absolute lg:right-[-120px] lg:top-1/2 lg:mx-0 lg:h-[800px] lg:max-w-none lg:w-[800px] lg:-translate-y-1/2 lg:overflow-visible max-md:z-0 max-md:mx-0 max-md:flex max-md:h-[clamp(218px,56vw,246px)] max-md:w-full max-md:max-w-[min(440px,calc(100vw+48px))] max-md:items-center max-md:justify-start max-md:overflow-visible max-md:pl-1 max-md:pr-0">
                  <Image
                    src={HERO_IMAGE}
                    alt="Hero"
                    width={800}
                    height={800}
                    className="h-full w-full object-contain md:translate-x-0 md:scale-100 lg:scale-125 lg:object-center lg:object-contain max-md:h-full max-md:max-h-[250px] max-md:w-[min(126%,460px)] max-md:max-w-none max-md:object-contain max-md:object-[38%_54%] max-md:[transform:translate3d(clamp(12px,3.8vw,30px),0,0)_scale(1.085)] max-md:[transform-origin:40%_56%]"
                    priority
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 320px, 800px"
                  />
                </div>
              </div>
            </div>

            {/* Кнопки — на ≤767px после изображения; на md перед изображением; на lg под текстом в левой колонке */}
            <div className="flex w-full max-w-md flex-col gap-3 max-md:relative max-md:z-10 max-md:order-3 max-md:max-w-full md:order-2 md:max-w-none md:flex-row md:gap-4 lg:col-start-1 lg:row-start-2 lg:max-w-none lg:flex-row lg:gap-4">
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