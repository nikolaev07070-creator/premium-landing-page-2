"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Cpu, Printer, Scan, Flame, Settings, Package } from "lucide-react";
import Image from "next/image";

const equipmentItems = [
  {
    id: 1,
    name: "Roland DWX-52D",
    category: "Фрезерный центр",
    image: "/lab/redon-hybrid.png",
    icon: Cpu,
  },
  {
    id: 2,
    name: "Formlabs Form 3B+",
    category: "3D-принтер",
    image: "/lab/10.jpg",
    icon: Printer,
  },
  {
    id: 3,
    name: "3Shape TRIOS",
    category: "Интраоральный сканер",
    image: "/lab/09.jpg",
    icon: Scan,
  },
  {
    id: 4,
    name: "3Shape E-series",
    category: "Лабораторный сканер",
    image: "/lab/scanner.png",
    icon: Scan,
  },
  {
    id: 5,
    name: "Amann Girrbach",
    category: "Артикуляторы",
    image: "/lab/15.jpg",
    icon: Settings,
  },
  {
    id: 6,
    name: "Programat",
    category: "Печь керамики",
    image: "/lab/programat-p710.png",
    icon: Flame,
  },
  {
    id: 7,
    name: "Dekema",
    category: "Печь спекания",
    image: "/lab/sintering-furnace.png",
    icon: Flame,
  },
  {
    id: 8,
    name: "Asiga Max UV",
    category: "3D-принтер",
    image: "/lab/11.jpg",
    icon: Printer,
  },
  {
    id: 9,
    name: "VHF K5",
    category: "Фрезер",
    image: "/lab/milling-vhf-k5.png",
    icon: Cpu,
  },
  {
    id: 10,
    name: "Ivoclar",
    category: "Материалы",
    image: "/lab/16.jpg",
    icon: Package,
  },
  {
    id: 11,
    name: "VHF E5",
    category: "Фрезерный центр",
    image: "/lab/vhf-e5.png",
    icon: Cpu,
  },
];

export function EquipmentCarousel() {
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

    // Horizontal scroll with mouse wheel - only convert vertical scroll to horizontal
    const handleWheel = (e: WheelEvent) => {
      // Only handle if scrolling vertically and container can scroll horizontally
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaY !== 0) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        const canScroll = scrollWidth > clientWidth;
        if (canScroll) {
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

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = 280;
    const gap = 24;
    const scrollAmount = (cardWidth + gap) * 2;
    
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Track dragging state for visual feedback only
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isInteracting = false;

    const handleInteractionStart = () => {
      isInteracting = true;
      setIsDragging(true);
    };

    const handleInteractionEnd = () => {
      isInteracting = false;
      setIsDragging(false);
    };

    container.addEventListener("mousedown", handleInteractionStart);
    container.addEventListener("touchstart", handleInteractionStart);
    document.addEventListener("mouseup", handleInteractionEnd);
    document.addEventListener("touchend", handleInteractionEnd);

    return () => {
      container.removeEventListener("mousedown", handleInteractionStart);
      container.removeEventListener("touchstart", handleInteractionStart);
      document.removeEventListener("mouseup", handleInteractionEnd);
      document.removeEventListener("touchend", handleInteractionEnd);
    };
  }, []);

  return (
    <section id="equipment" className="relative py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute left-0 bottom-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
        <div className="mb-16 section-header">
          <h2 className="mb-4 text-3xl font-normal leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            <span className="text-foreground">НАШЕ ОБОРУДОВАНИЕ</span>
          </h2>
          <p className="max-w-2xl text-xs font-light tracking-widest text-foreground/80 uppercase leading-normal">
            Современный парк цифрового и лабораторного оборудования для высокой точности и стабильного качества.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 -translate-x-4 lg:-translate-x-8 w-12 h-12 lg:w-14 lg:h-14 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
              aria-label="Прокрутить влево"
            >
              <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 text-foreground group-hover:text-foreground transition-colors duration-300" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 translate-x-4 lg:translate-x-8 w-12 h-12 lg:w-14 lg:h-14 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
              aria-label="Прокрутить вправо"
            >
              <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 text-foreground group-hover:text-foreground transition-colors duration-300" />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide pb-4 px-1"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-x pan-y pinch-zoom",
              overscrollBehaviorX: "contain",
            }}
          >
            {equipmentItems.map((item) => (
              <div
                key={item.id}
                className={`group flex-shrink-0 w-[240px] md:w-[280px] p-6 flex flex-col items-center snap-start cursor-pointer relative transition-all duration-300 ${
                  isDragging ? "" : "hover:scale-105"
                }`}
                style={{
                  willChange: isDragging ? "transform" : "auto",
                  transform: isDragging ? "translateZ(0)" : undefined,
                }}
              >
                {/* Image/Icon Container - empty container for image */}
                <div className="w-full h-[160px] mb-4 flex items-center justify-center relative">
                  {item.id === 1 || item.id === 2 || item.id === 3 || item.id === 4 || item.id === 5 || item.id === 6 || item.id === 7 || item.id === 8 || item.id === 9 || item.id === 10 || item.id === 11 ? (
                    // Roland DWX-52D (id: 1), Formlabs Form 3B+ (id: 2), 3Shape TRIOS (id: 3), 3Shape E-series (id: 4), Amann Girrbach (id: 5), Programat (id: 6), Dekema (id: 7), Asiga Max UV (id: 8), VHF K5 (id: 9), Ivoclar (id: 10), and VHF E5 (id: 11) - show real image without cropping
                    <Image
                      src={item.image}
                      alt={
                        item.id === 1
                          ? "Roland DWX-52D milling machine (Redon Hybrid)"
                          : item.id === 2
                          ? "Formlabs Form 3B+ 3D printer"
                          : item.id === 3
                          ? "3Shape TRIOS intraoral scanner"
                          : item.id === 4
                          ? "3Shape E-series laboratory scanner"
                          : item.id === 5
                          ? "Amann Girrbach articulators"
                          : item.id === 8
                          ? "Asiga Max UV 3D printer"
                          : item.id === 10
                          ? "Ivoclar materials"
                          : item.id === 11
                          ? "VHF E5 milling machine"
                          : item.name
                      }
                      width={240}
                      height={160}
                      className="object-contain w-full h-full max-w-full"
                      style={{ maxWidth: item.id === 1 || item.id === 2 || item.id === 11 ? '280px' : '100%' }}
                      loading="lazy"
                      sizes="(max-width: 768px) 240px, 280px"
                      onError={(e) => {
                        // Fallback to icon if image fails to load
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  ) : (
                    // Other items - show icon
                    <div className="flex items-center justify-center">
                      <item.icon className="w-16 h-16 text-white/40 group-hover:text-white/60 transition-colors duration-300" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-lg font-normal text-foreground mb-2 group-hover:text-foreground transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-xs font-light text-muted-foreground uppercase tracking-wider">
                    {item.category}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
