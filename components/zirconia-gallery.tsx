"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type ZirconiaImage = {
  src: string;
  alt: string;
};

const zirconiaImages: ZirconiaImage[] = [
  {
    src: "/portfolio/zirconia/00.jpg",
    alt: "Портфолио: цирконий — Esthetic Dental Lab, Томск (общий вид работы)",
  },
  {
    src: "/portfolio/zirconia/01.ipg.png",
    alt: "Портфолио: цирконий — Esthetic Dental Lab, Томск (пример работы 1)",
  },
  {
    src: "/portfolio/zirconia/02.ipg.png",
    alt: "Портфолио: цирконий — Esthetic Dental Lab, Томск (пример работы 2)",
  },
  {
    src: "/portfolio/zirconia/03.ipg.png",
    alt: "Портфолио: цирконий — Esthetic Dental Lab, Томск (пример работы 3)",
  },
  {
    src: "/portfolio/zirconia/04.ipg.png",
    alt: "Портфолио: цирконий — Esthetic Dental Lab, Томск (пример работы 4)",
  },
  {
    src: "/portfolio/zirconia/05.ipg.png",
    alt: "Портфолио: цирконий — Esthetic Dental Lab, Томск (пример работы 5)",
  },
];

export function ZirconiaGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + zirconiaImages.length) % zirconiaImages.length,
    );
  }, [activeIndex]);

  const showNext = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % zirconiaImages.length,
    );
  }, [activeIndex]);

  // Keyboard controls for Esc / arrows
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, closeLightbox, showPrev, showNext]);

  const hasImages = zirconiaImages.length > 0;
  const heroImage = hasImages ? zirconiaImages[0] : null;

  return (
    <section className="relative py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-12 section-header">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-foreground/80">
            Портфолио / Цирконий
          </p>
          <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
            Цирконий — работы
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Примеры работ из диоксида циркония: коронки, мосты и полные реабилитации,
            выполненные с акцентом на точность посадки и эстетику.
          </p>
        </div>

        {/* Hero image */}
        {heroImage && (
          <div className="mb-10">
            <div
              className="glass-card relative overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => setActiveIndex(0)}
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              </div>
              <div className="absolute inset-0 flex items-end">
                <div className="p-6 md:p-8 lg:p-10">
                  <h2 className="text-xl md:text-2xl font-normal text-foreground mb-2">
                    Полная реабилитация в цирконии
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                    Демонстрация общей работы в цирконии: стабильный цвет, точная анатомия
                    и плавные переходы между единицами.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {zirconiaImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className="group relative overflow-hidden rounded-xl glass-card focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-70" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeIndex !== null && zirconiaImages[activeIndex] && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={closeLightbox}
        >
          <div
            className="relative mx-auto max-w-5xl px-4 md:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              className="absolute right-2 top-2 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors"
              onClick={closeLightbox}
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev / Next */}
            <button
              type="button"
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors"
              onClick={showPrev}
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors"
              onClick={showNext}
              aria-label="Следующее фото"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image */}
            <div className="relative mx-auto mt-8 aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-2xl bg-black/40">
              <Image
                src={zirconiaImages[activeIndex].src}
                alt={zirconiaImages[activeIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 70vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

