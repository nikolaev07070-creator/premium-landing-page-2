"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    name: "Антон Ковалев",
    position: "CAD/CAM техник",
    description: "Специалист по цифровому моделированию и фрезеровке",
    image: "/team/anton-kovalev.jpg",
  },
  {
    id: 2,
    name: "Мария Жукова",
    position: "Керамист",
    description: "Мастер эстетической реставрации и цветопередачи",
    image: "/team/maria-zhukova.jpg",
  },
  {
    id: 3,
    name: "Сергей Ильин",
    position: "Техник по цирконию",
    description: "Эксперт по работе с диоксидом циркония",
    image: "/team/sergey-ilyin.jpg",
  },
  {
    id: 4,
    name: "Екатерина Орлова",
    position: "Контроль качества",
    description: "Обеспечивает безупречное качество каждой работы",
    image: "/team/ekaterina-orlova.jpg",
  },
  {
    id: 5,
    name: "Дмитрий Павлов",
    position: "3D печать",
    description: "Специалист по аддитивным технологиям",
    image: "/team/dmitry-pavlov.jpg",
  },
  {
    id: 6,
    name: "Алина Смирнова",
    position: "Координатор клиник",
    description: "Связующее звено между лабораторией и клиниками",
    image: "/team/alina-smirnova.jpg",
  },
];

export function TeamCarousel() {
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
    const cardWidth = 320;
    const gap = 24;
    const scrollAmount = (cardWidth + gap) * 1.5;
    
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
    <section id="team" className="relative py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute left-0 bottom-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-16 section-header">
          <span className="mb-4 inline-block text-xs font-light tracking-widest text-foreground/80 uppercase">
            Команда и атмосфера
          </span>
            <h2 className="mb-6 text-3xl font-normal leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
              <span className="text-foreground">НАША КОМАНДА</span>
          </h2>
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
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className={`group flex-shrink-0 w-[280px] md:w-[320px] h-[420px] rounded-2xl overflow-hidden relative snap-start cursor-pointer transition-all duration-300 ${
                  isDragging ? "" : "hover:scale-[1.02]"
                }`}
                style={{
                  willChange: isDragging ? "transform" : "auto",
                  transform: isDragging ? "translateZ(0)" : undefined,
                }}
              >
                {/* Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/80">
                  {/* Try to load team member image from /public/team/ */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 280px, 320px"
                    onError={(e) => {
                      // Hide image on error, gradient background will show
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>

                {/* Gradient Overlay (bottom) for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-xl font-normal text-foreground mb-1 group-hover:text-foreground transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm font-normal text-foreground/90 mb-2 uppercase tracking-wider">
                    {member.position}
                  </p>
                  <p className="text-xs font-light text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </div>

                {/* Hover Border Glow - disabled during drag */}
                {!isDragging && (
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/30 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.25),0_0_40px_rgba(255,255,255,0.15)] transition-all duration-300 pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
