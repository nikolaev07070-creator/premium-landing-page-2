"use client";

import { LabGallery } from "@/components/lab-gallery";

export function DentalAbout() {
  return (
    <section id="about" className="relative overflow-x-hidden py-20 lg:overflow-x-visible lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mb-14 grid items-center gap-10 lg:mb-20 lg:grid-cols-2 lg:gap-24">
          <div className="section-header min-w-0">
            <span className="mb-3 inline-block text-[10px] font-light uppercase tracking-widest text-foreground/80 sm:text-xs lg:mb-4">
              О Нашей Лаборатории
            </span>
            <h2 className="mb-4 text-2xl font-normal leading-tight text-foreground text-balance sm:text-3xl md:text-4xl lg:mb-6 lg:text-5xl">
              Где инновации встречаются с{" "}
              <span className="text-foreground">традицией</span>
            </h2>
            <p className="mb-6 text-sm font-normal leading-relaxed text-foreground/90 sm:text-base lg:mb-8">
              Esthetic Dental Lab — это современная цифровая зуботехническая лаборатория, 
              которая сочетает передовые технологии CAD/CAM с проверенным мастерством. 
              Мы обеспечиваем полный цифровой цикл — от сканирования до готовой работы 
              с контролируемым результатом.
            </p>
            <p className="text-sm font-normal leading-relaxed text-foreground/90 sm:text-base">
              Наша приверженность совершенству сделала нас надежным партнером для 
              ведущих стоматологических клиник. Каждый случай получает персональное 
              внимание от нашей команды мастеров-техников.
            </p>
          </div>

          <div>
            <LabGallery />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-8">
          {[
            { value: "10+", label: "Лет опыта" },
            { value: "5000+", label: "Выполненных работ" },
            { value: "100+", label: "Довольных врачей" },
            { value: "24/7", label: "Поддержка" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-4 text-center md:p-6">
              <div className="mb-1 text-2xl font-normal text-foreground md:mb-2 md:text-4xl">{stat.value}</div>
              <div className="text-xs text-muted-foreground md:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
