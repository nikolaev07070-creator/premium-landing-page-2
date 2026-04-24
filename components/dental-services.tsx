"use client";

import { Cpu, Clock, Shield, Users, CheckCircle, Sparkles } from "lucide-react";

const services = [
  {
    icon: Cpu,
    title: "Полный цикл CAD/CAM производства",
    description: "Высокоточная цифровая обработка материалов с использованием передовых технологий",
  },
  {
    icon: Sparkles,
    title: "Диоксид циркония, Дисиликат лития, PMMA, Титан, Кобальт-хром (CoCr)",
    description: "Максимальная эстетика и прочность",
  },
  {
    icon: Clock,
    title: "Сроки от 24 часов",
    description: "Быстрое выполнение заказов без компромиссов в качестве",
  },
  {
    icon: Users,
    title: "Поддержка врача на каждом этапе",
    description: "Тесное взаимодействие и консультации на всех стадиях работы",
  },
  {
    icon: Shield,
    title: "Контроль качества",
    description: "Многоуровневая система проверки для гарантии безупречного результата",
  },
  {
    icon: CheckCircle,
    title: "Индивидуальный подход",
    description: "Персонализированные решения для каждого клинического случая",
  },
];

export function DentalServices() {
  return (
    <section id="services" className="relative overflow-x-hidden py-20 lg:overflow-x-visible lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute left-0 bottom-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mb-10 section-header lg:mb-16">
          <h2 className="mb-4 text-2xl font-normal leading-tight text-foreground text-balance sm:text-3xl md:text-4xl lg:mb-6 lg:text-5xl">
            Комплексные <span className="text-foreground">решения</span>
          </h2>
          <p className="max-w-2xl text-xs font-light tracking-widest text-foreground/80 uppercase leading-normal">
            От простых реставраций до сложных полных реабилитаций — мы обеспечиваем превосходство на каждом уровне.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="glass-card group cursor-pointer rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] md:p-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition-colors duration-300 group-hover:bg-white/10 md:mb-6 md:h-14 md:w-14">
                <service.icon className="h-6 w-6 text-foreground md:h-7 md:w-7" />
              </div>
              <h3 className="mb-2 text-lg font-normal leading-snug text-foreground md:mb-3 md:text-xl">
                {service.title === "Диоксид циркония, Дисиликат лития, PMMA, Титан, Кобальт-хром (CoCr)" ? (
                  <span className="block space-y-1 leading-relaxed">
                    <span className="block">Диоксид циркония</span>
                    <span className="block">Дисиликат лития</span>
                    <span className="block">PMMA</span>
                    <span className="block">Титан</span>
                    <span className="block">Кобальт-хром (CoCr)</span>
                  </span>
                ) : (
                  service.title
                )}
              </h3>
              <p className="text-sm font-normal leading-relaxed text-foreground/90 md:text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
