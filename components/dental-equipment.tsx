"use client";

import { useEffect, useRef, useState } from "react";
import { Cpu, Printer, Scan, Flame } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const equipment = [
  {
    icon: Cpu,
    emoji: "🦷",
    title: "CAD/CAM фрезерный центр",
    model: "Roland DWX-52D",
    features: [
      "Высокоточная 5-осевая обработка",
      "Цирконий, PMMA, воск, композиты",
      "Микронная точность",
      "Стабильная геометрия изделий",
    ],
    specs: {
      "Оси обработки": "5 осей",
      "Точность позиционирования": "±1 мкм",
      "Материалы": "Цирконий, PMMA, воск, композиты",
      "Размер заготовки": "до 98 мм",
      "Скорость шпинделя": "до 60,000 об/мин",
    },
  },
  {
    icon: Printer,
    emoji: "🖨️",
    title: "3D-принтер лабораторный",
    model: "Formlabs Form 3B+",
    features: [
      "Биосовместимые смолы",
      "Печать хирургических шаблонов",
      "Высокая детализация",
      "Медицинский стандарт качества",
    ],
    specs: {
      "Технология": "SLA (стереолитография)",
      "Точность слоя": "25-100 мкм",
      "Разрешение": "25 мкм (XY), 25-100 мкм (Z)",
      "Область печати": "145 × 145 × 185 мм",
      "Материалы": "Биосовместимые смолы",
    },
  },
  {
    icon: Scan,
    emoji: "📷",
    title: "Интраоральный и лабораторный сканер",
    model: "3Shape TRIOS / лабораторный сканер",
    features: [
      "Максимальная точность сканирования",
      "Быстрый цифровой поток",
      "Идеальная передача анатомии",
      "Минимизация ошибок",
    ],
    specs: {
      "Точность": "до 5 мкм",
      "Скорость сканирования": "до 60 сек на челюсть",
      "Разрешение": "до 20 мкм",
      "Формат данных": "STL, PLY, OBJ",
      "Интеграция": "Полная интеграция с CAD/CAM",
    },
  },
  {
    icon: Flame,
    emoji: "🔥",
    title: "Печь спекания и прессования",
    model: "Ivoclar / Zirkonzahn",
    features: [
      "Контроль температуры",
      "Стабильный цвет",
      "Прочность конструкций",
      "Повторяемость результата",
    ],
    specs: {
      "Максимальная температура": "до 1600°C",
      "Точность температуры": "±1°C",
      "Объем камеры": "до 2000 см³",
      "Программы": "Спекание, прессование, отжиг",
      "Контроль атмосферы": "Вакуум, инертный газ",
    },
  },
];

export function DentalEquipment() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="equipment"
      className={`relative py-32 px-6 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute left-0 bottom-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-light tracking-widest text-foreground/80 uppercase">
            Наше Оборудование
          </span>
          <h2 className="mb-6 text-3xl font-light leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Профессиональное <span className="text-foreground">цифровое оборудование</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-muted-foreground">
            Профессиональное цифровое оборудование для точности, эстетики и стабильного качества.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {equipment.map((item, index) => (
            <div
              key={item.title}
              className="glass-card group cursor-pointer rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`,
              }}
            >
              {/* Header */}
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300 flex-shrink-0">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-2xl">{item.emoji}</span>
                    <h3 className="text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-primary mb-4">
                    {item.model}
                  </p>
                </div>
              </div>

              {/* Features List */}
              <ul className="mb-6 space-y-2">
                {item.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm font-light leading-relaxed text-muted-foreground"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Technical Specs Accordion */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={`specs-${index}`} className="border-0">
                  <AccordionTrigger className="text-xs font-medium text-foreground hover:no-underline py-2 [&>svg]:text-foreground [&>svg]:h-3 [&>svg]:w-3">
                    Технические характеристики
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-0">
                    <div className="space-y-2 rounded-lg bg-secondary/30 p-4">
                      {Object.entries(item.specs).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-start gap-4 text-xs"
                        >
                          <span className="text-muted-foreground font-light">
                            {key}:
                          </span>
                          <span className="text-foreground font-medium text-right">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
