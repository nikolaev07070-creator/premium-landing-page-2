"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  description: string;
  before?: string;
  after?: string;
  cover?: string;
  slug?: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Полная реабилитация",
    category: "Цирконий",
    before: "/placeholder.jpg",
    after: "/placeholder.jpg",
    description:
      "Полная реабилитация верхней и нижней челюсти с использованием циркониевых коронок",
    cover: "/portfolio/07.png",
    slug: "zirconia/07",
  },
  {
    id: 7,
    title: "Полная реабилитация — второй кейс",
    category: "Цирконий",
    before: "/placeholder.jpg",
    after: "/placeholder.jpg",
    description:
      "Второй кейс полной реабилитации из диоксида циркония",
    cover: "/portfolio/08.png",
    slug: "zirconia/08",
  },
  {
    id: 2,
    title: "Эстетическая реставрация",
    category: "E-max",
    before: "/placeholder.jpg",
    after: "/placeholder.jpg",
    description: "Передние зубы восстановлены с максимальной эстетикой",
    cover: "/portfolio/zirconia/1Y7A.jpg",
    slug: "zirconia/09",
  },
  {
    id: 3,
    title: "Имплант-протезирование",
    category: "Импланты",
    before: "/placeholder.jpg",
    after: "/placeholder.jpg",
    description: "Коронки на имплантах с индивидуальными абатментами",
    cover: "/portfolio/zirconia/1Q7A.jpg",
    slug: "zirconia/10",
  },
  {
    id: 4,
    title: "Виниры",
    category: "E-max",
    before: "/placeholder.jpg",
    after: "/placeholder.jpg",
    description: "Керамические виниры для создания идеальной улыбки",
  },
  {
    id: 5,
    title: "Мостовидный протез",
    category: "Цирконий",
    before: "/placeholder.jpg",
    after: "/placeholder.jpg",
    description: "Мостовидный протез из диоксида циркония",
  },
  {
    id: 6,
    title: "Съемное протезирование",
    category: "Акрил",
    before: "/placeholder.jpg",
    after: "/placeholder.jpg",
    description: "Полный съемный протез с премиальными зубами",
  },
];

const featuredCount = 3;

const PORTFOLIO_CAROUSEL_COUNT = 24;

/** Слайды карусели «Портфолио»: kar1.JPG … kar24.JPG в public/portfolio/ */
const portfolioCarouselSlides = Array.from({ length: PORTFOLIO_CAROUSEL_COUNT }, (_, i) => {
  const n = i + 1;
  const cacheBust = n >= 22 ? "?v=2" : "";
  return {
    id: 3000 + n,
    src: `/portfolio/kar${n}.JPG${cacheBust}`,
  };
});

const PORTFOLIO_CARD_WIDTH = 320;
const PORTFOLIO_CARD_GAP = 24;

export function DentalPortfolio() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const featured = portfolioItems.slice(0, featuredCount);
  const caseItems = portfolioItems;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    checkScrollability();
    container.addEventListener("scroll", checkScrollability);
    window.addEventListener("resize", checkScrollability);
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaY !== 0) {
        const { scrollWidth, clientWidth } = container;
        if (scrollWidth > clientWidth) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("scroll", checkScrollability);
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  const scrollPortfolio = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const first = container.querySelector<HTMLElement>("[data-portfolio-card]");
    const cardWidth = first?.offsetWidth ?? PORTFOLIO_CARD_WIDTH;
    const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
    const multiplier = isDesktop ? 1.5 : 1;
    const scrollAmount = (cardWidth + PORTFOLIO_CARD_GAP) * multiplier;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleStart = () => setIsDragging(true);
    const handleEnd = () => setIsDragging(false);
    container.addEventListener("mousedown", handleStart);
    container.addEventListener("touchstart", handleStart);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchend", handleEnd);
    return () => {
      container.removeEventListener("mousedown", handleStart);
      container.removeEventListener("touchstart", handleStart);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchend", handleEnd);
    };
  }, []);

  const caseItemsDisplay: PortfolioItem[] = [featured[0], ...caseItems.slice(1)];

  return (
    <>
      <section id="portfolio" className="relative overflow-x-hidden py-20 lg:overflow-x-visible lg:py-32">
        {/* Background effect */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
          <div className="mb-10 section-header lg:mb-16">
            <h2 className="mb-3 text-2xl font-normal leading-tight text-foreground text-balance sm:text-3xl md:text-4xl lg:mb-4 lg:text-5xl">
              <span className="text-foreground">Портфолио</span>
            </h2>
            <p className="max-w-2xl text-xs font-light tracking-widest text-foreground/80 uppercase leading-normal">
              Примеры наших работ, демонстрирующие качество и эстетику.
            </p>
          </div>

          <div className="relative mb-14 px-11 lg:mb-20 lg:px-0">
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scrollPortfolio("left")}
                className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full glass-card transition-all duration-300 hover:scale-110 hover:bg-white/10 lg:left-0 lg:h-14 lg:w-14 lg:-translate-x-8"
                aria-label="Прокрутить влево"
              >
                <ChevronLeft className="h-5 w-5 text-foreground lg:h-7 lg:w-7" />
              </button>
            )}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => scrollPortfolio("right")}
                className="absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full glass-card transition-all duration-300 hover:scale-110 hover:bg-white/10 lg:right-0 lg:h-14 lg:w-14 lg:translate-x-8"
                aria-label="Прокрутить вправо"
              >
                <ChevronRight className="h-5 w-5 text-foreground lg:h-7 lg:w-7" />
              </button>
            )}
            <div
              ref={scrollContainerRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide sm:gap-6 lg:px-1"
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-x pan-y pinch-zoom",
                overscrollBehaviorX: "contain",
              }}
            >
              {portfolioCarouselSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  data-portfolio-card
                  className={`glass-card group relative w-[min(280px,calc(100vw-5.5rem))] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 sm:w-[min(300px,calc(100vw-6rem))] md:w-[320px] md:snap-start lg:w-[320px] ${
                    !isDragging ? "hover:border-white/20 hover:shadow-[0_0_24px_rgba(255,255,255,0.08)] hover:scale-[1.02]" : ""
                  }`}
                  style={{
                    willChange: isDragging ? "transform" : "auto",
                    transform: isDragging ? "translateZ(0)" : undefined,
                  }}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/35">
                    <Image
                      src={slide.src}
                      alt={`Работа ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 280px, 320px"
                      loading={index < 4 ? "eager" : "lazy"}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="border-t border-white/10 px-5 py-4">
                    <p className="text-sm font-medium text-foreground/90">
                      Работа #{index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Кейсы block */}
          <div className="mb-8 section-header lg:mb-10">
            <h2 className="mb-3 text-2xl font-normal leading-tight text-foreground text-balance sm:text-3xl md:text-4xl lg:mb-4 lg:text-5xl">
              <span className="text-foreground">Кейсы</span>
            </h2>
            <p className="max-w-2xl text-xs font-light tracking-widest text-foreground/80 uppercase leading-normal">
              Подробные примеры работ с этапами и результатом.
            </p>
          </div>

          {/* Mini-cards grid — компактный размер (~50% от прежнего) */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {caseItemsDisplay.map((item, index) => {
              const isAlbum = !!item.slug && !!item.cover;
              const cardContent = (
                <>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg bg-black/35 flex items-center justify-center p-1.5">
                    {item.cover ? (
                      <Image
                        src={item.cover}
                        alt=""
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16.67vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="border-t border-white/10 px-2 py-1.5">
                    <p className="text-xs font-medium text-foreground/90">
                      Кейс #{index + 1}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 truncate leading-tight">
                      {item.title}
                    </p>
                  </div>
                </>
              );

              return (
                <div
                  key={item.id}
                  className="glass-card group relative overflow-hidden rounded-lg border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                >
                  {isAlbum ? (
                    <Link href={`/portfolio/${item.slug}`} className="block">
                      {cardContent}
                      <span className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
                          Смотреть
                          <ExternalLink className="h-3 w-3" />
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="block w-full text-left"
                      onClick={() => setSelectedItem(item)}
                    >
                      {cardContent}
                      <span className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
                          Подробнее
                        </span>
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Optional SEO link block - keep subtle */}
          <div className="mt-12 max-w-2xl">
            <span className="text-xs font-light tracking-widest text-foreground/80 uppercase leading-normal">
              Хотите обсудить проект или заказать расчёт?{" "}
              <Link href="/contacts" className="underline underline-offset-4 hover:text-foreground transition-colors">
                Связаться с нами
              </Link>
              {" · "}
              <Link href="/#services" className="underline underline-offset-4 hover:text-foreground transition-colors">
                Услуги
              </Link>
            </span>
          </div>
        </div>
      </section>

      {/* Modal for items without dedicated page */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl border-border/50 bg-background/95 backdrop-blur-xl">
          {selectedItem && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wider text-primary">
                    {selectedItem.category}
                  </span>
                  <h3 className="mb-2 text-2xl font-bold text-foreground">
                    {selectedItem.title}
                  </h3>
                  <p className="text-muted-foreground">{selectedItem.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="rounded-lg p-2 transition-colors hover:bg-secondary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase text-muted-foreground">
                    До
                  </p>
                  <div className="flex aspect-video items-center justify-center rounded-lg bg-secondary/50">
                    <span className="text-muted-foreground">Изображение до</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase text-muted-foreground">
                    После
                  </p>
                  <div className="flex aspect-video items-center justify-center rounded-lg bg-secondary/50">
                    <span className="text-muted-foreground">Изображение после</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
