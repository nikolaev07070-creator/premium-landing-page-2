"use client";

import { Cpu, Sparkles, Clock, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const pricePackages = [
  {
    icon: Cpu,
    title: "CAD/CAM (цирконий/PMMA)",
    price: "от 3 500 ₽",
    features: [
      "Фрезеровка из циркония",
      "Фрезеровка из PMMA",
      "CAD-моделирование",
      "Контроль качества",
      "Срок: от 24 часов",
    ],
  },
  {
    icon: Sparkles,
    title: "E.max / стеклокерамика",
    price: "от 4 500 ₽",
    features: [
      "Коронки E.max",
      "Виниры E.max",
      "Стеклокерамика",
      "Индивидуальная окраска",
      "Срок: от 3 дней",
    ],
  },
  {
    icon: Clock,
    title: "Временные конструкции",
    price: "от 1 500 ₽",
    features: [
      "Временные коронки",
      "Временные мосты",
      "Быстрое изготовление",
      "Биосовместимые материалы",
      "Срок: от 4 часов",
    ],
  },
  {
    icon: Package,
    title: "Доп. услуги",
    price: "от 500 ₽",
    features: [
      "Срочность (24 часа)",
      "Доставка по городу",
      "Скан-модели",
      "Консультации",
      "Индивидуальный подход",
    ],
  },
];

const priceTable = [
  {
    service: "Коронка из циркония",
    duration: "2-3 дня",
    price: "от 3 500 ₽",
    note: "CAD/CAM фрезеровка",
  },
  {
    service: "Коронка E.max",
    duration: "3-5 дней",
    price: "от 4 500 ₽",
    note: "Прессованная керамика",
  },
  {
    service: "Винир E.max",
    duration: "5-7 дней",
    price: "от 8 000 ₽",
    note: "Эстетическая реставрация",
  },
  {
    service: "Мостовидный протез (3 единицы)",
    duration: "5-7 дней",
    price: "от 12 000 ₽",
    note: "Цирконий",
  },
  {
    service: "Временная коронка",
    duration: "4-6 часов",
    price: "от 1 500 ₽",
    note: "PMMA",
  },
  {
    service: "Сканирование модели",
    duration: "1 день",
    price: "от 500 ₽",
    note: "3Shape",
  },
  {
    service: "Срочное изготовление",
    duration: "24 часа",
    price: "+30%",
    note: "К стоимости услуги",
  },
  {
    service: "Доставка по городу",
    duration: "В день готовности",
    price: "Бесплатно",
    note: "В пределах города",
  },
];

export function PriceSection() {
  return (
    <section id="price" className="relative py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute left-0 bottom-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-16 section-header">
          <span className="mb-4 inline-block text-xs font-light tracking-widest text-foreground/80 uppercase">
            Стоимость услуг
          </span>
          <h2 className="mb-6 text-3xl font-normal leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            <span className="text-foreground">ПРАЙС</span>
          </h2>
          <p className="max-w-2xl text-lg font-light text-muted-foreground">
            Прозрачные цены на все виды услуг. Индивидуальный расчет для каждого случая.
          </p>
        </div>

        {/* Variant A: Price Packages */}
        <div className="mb-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pricePackages.map((pkg, index) => (
              <div
                key={pkg.title}
                className="glass-card group rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                  <pkg.icon className="h-7 w-7 text-foreground" />
                </div>
                <h3 className="mb-3 text-xl font-normal text-foreground">
                  {pkg.title}
                </h3>
                <div className="mb-4">
                  <span className="text-2xl font-normal text-foreground">{pkg.price}</span>
                </div>
                <ul className="mb-6 space-y-2">
                  {pkg.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm font-light leading-relaxed text-muted-foreground"
                    >
                      <span className="text-primary mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full glow-button bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/contacts">
                    Оставить заявку
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Variant B: Price Table */}
        <div>
          <div className="mb-8 section-header">
            <h3 className="text-2xl font-normal text-foreground mb-2" style={{ letterSpacing: '0.02em' }}>
              Детальный <span className="text-foreground">прайс-лист</span>
            </h3>
            <p className="text-sm font-light text-muted-foreground">
              Подробная информация по всем услугам
            </p>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-4 px-4 md:px-6 text-sm font-medium text-foreground uppercase tracking-wider">
                      Услуга
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-sm font-medium text-foreground uppercase tracking-wider">
                      Срок
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-sm font-medium text-foreground uppercase tracking-wider">
                      Цена от
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-sm font-medium text-foreground uppercase tracking-wider">
                      Примечание
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {priceTable.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-border/10 hover:bg-white/5 transition-colors duration-300"
                    >
                      <td className="py-4 px-4 md:px-6 text-sm font-medium text-foreground">
                        {row.service}
                      </td>
                      <td className="py-4 px-4 md:px-6 text-sm font-light text-muted-foreground">
                        {row.duration}
                      </td>
                      <td className="py-4 px-4 md:px-6 text-sm font-normal text-foreground">
                        {row.price}
                      </td>
                      <td className="py-4 px-4 md:px-6 text-sm font-light text-muted-foreground">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm font-light text-muted-foreground mb-4">
              * Цены указаны ориентировочно. Точная стоимость рассчитывается индивидуально после консультации.
            </p>
            <Button
              asChild
              variant="outline"
              className="border-white/30 text-foreground hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              <Link href="/contacts">
                Получить индивидуальный расчет
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
