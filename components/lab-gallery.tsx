"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const labImages = [
  {
    id: 1,
    src: "/lab/01.jpg",
    caption: "Сканирование",
  },
  {
    id: 2,
    src: "/lab/02.jpg",
    caption: "CAD/CAM",
  },
  {
    id: 3,
    src: "/lab/03.jpg",
    caption: "Фрезеровка",
  },
  {
    id: 4,
    src: "/lab/04.jpg",
    caption: "Керамика",
  },
  {
    id: 5,
    src: "/lab/05.jpg",
    caption: "Контроль качества",
  },
  {
    id: 6,
    src: "/lab/06.jpg",
    caption: "Упаковка",
  },
  {
    id: 7,
    src: "/lab/07.jpg",
    caption: "Лаборатория",
  },
  {
    id: 8,
    src: "/lab/08.jpg",
    caption: "Рабочее место",
  },
];

export function LabGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const currentIndexRef = useRef(0);

  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    if (!isHovered && !isDragging) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % labImages.length;
          currentIndexRef.current = next;
          return next;
        });
      }, 4000);
    }
  }, [isHovered, isDragging]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [startAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    currentIndexRef.current = index;
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      const next = (prev - 1 + labImages.length) % labImages.length;
      currentIndexRef.current = next;
      return next;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % labImages.length;
      currentIndexRef.current = next;
      return next;
    });
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const lightboxPrevious = () => {
    setLightboxIndex((prev) => (prev - 1 + labImages.length) % labImages.length);
  };

  const lightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % labImages.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        lightboxPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        lightboxNext();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, lightboxIndex]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setDragOffset(0);
    startXRef.current = e.pageX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const deltaX = e.pageX - startXRef.current;
    setDragOffset(deltaX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    const threshold = 100; // Minimum drag distance to change slide
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setDragOffset(0);
    startXRef.current = e.touches[0].pageX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const deltaX = e.touches[0].pageX - startXRef.current;
    setDragOffset(deltaX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <>
      <div
        className="relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Gallery Container */}
        <div className="relative overflow-hidden rounded-2xl">
          {/* Slides Container */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
            style={{
              transform: `translate3d(calc(-${currentIndex * 100}% + ${dragOffset}px), 0, 0)`,
              willChange: isDragging ? "transform" : "auto",
            }}
          >
            {labImages.map((image, index) => (
              <div
                key={image.id}
                className="flex-shrink-0 w-full relative group"
                style={{ width: "100%" }}
              >
                <div
                  className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden glass-card cursor-pointer"
                  onClick={() => !isDragging && openLightbox(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={index <= 1 ? "eager" : "lazy"}
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      const target = e.currentTarget as HTMLImageElement;
                      target.src = "/placeholder.jpg";
                    }}
                  />
                  {/* Gradient overlay for caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent pointer-events-none" />
                  
                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <p className="text-sm font-light text-foreground/90 uppercase tracking-wider">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
            aria-label="Предыдущее фото"
          >
            <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 text-foreground group-hover:text-foreground transition-colors duration-300" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
            aria-label="Следующее фото"
          >
            <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 text-foreground group-hover:text-foreground transition-colors duration-300" />
          </button>

          {/* Peek indicator for next slide (desktop only) */}
          <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none hidden lg:block overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-l from-background via-background/50 to-transparent z-10" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-20 h-20 rounded-xl overflow-hidden opacity-40 border border-white/10">
              <Image
                src={labImages[(currentIndex + 1) % labImages.length].src}
                alt="Next"
                fill
                className="object-cover"
                sizes="80px"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.src = "/placeholder.jpg";
                }}
              />
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {labImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-foreground"
                  : "w-2 bg-foreground/30 hover:bg-foreground/50"
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent 
          className="max-w-7xl w-full p-0 bg-background/95 backdrop-blur-xl border-white/10"
          showCloseButton={false}
        >
          <div className="relative w-full h-[90vh] flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-30 w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110"
              aria-label="Закрыть"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>

            {/* Lightbox Image */}
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <Image
                src={labImages[lightboxIndex].src}
                alt={labImages[lightboxIndex].caption}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.src = "/placeholder.jpg";
                }}
              />
            </div>

            {/* Lightbox Caption */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
              <p className="text-lg font-light text-foreground/90 uppercase tracking-wider text-center">
                {labImages[lightboxIndex].caption}
              </p>
            </div>

            {/* Lightbox Navigation Arrows */}
            <button
              onClick={lightboxPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="w-7 h-7 text-foreground" />
            </button>

            <button
              onClick={lightboxNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
              aria-label="Следующее фото"
            >
              <ChevronRight className="w-7 h-7 text-foreground" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
