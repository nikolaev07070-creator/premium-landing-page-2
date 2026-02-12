"use client";

import { LabGallery } from "@/components/lab-gallery";

export function DentalAbout() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center mb-20">
          <div className="section-header">
            <span className="mb-4 inline-block text-xs font-light tracking-widest text-foreground/80 uppercase">
              О Нашей Лаборатории
            </span>
            <h2 className="mb-6 text-3xl font-normal leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
              Где инновации встречаются с{" "}
              <span className="text-foreground">традицией</span>
            </h2>
            <p className="mb-8 text-base font-normal text-foreground/90 leading-relaxed">
              Esthetic Dental Lab — это современная цифровая зуботехническая лаборатория, 
              которая сочетает передовые технологии CAD/CAM с проверенным мастерством. 
              Мы обеспечиваем полный цифровой цикл — от сканирования до готовой работы 
              с контролируемым результатом.
            </p>
            <p className="text-base font-normal text-foreground/90 leading-relaxed">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "10+", label: "Лет опыта" },
            { value: "5000+", label: "Выполненных работ" },
            { value: "100+", label: "Довольных врачей" },
            { value: "24/7", label: "Поддержка" },
          ].map((stat) => (
            <div key={stat.label} className="text-center glass-card rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-normal text-foreground mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
