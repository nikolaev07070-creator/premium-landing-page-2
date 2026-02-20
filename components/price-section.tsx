"use client";

import { FileText, UserRound, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PRICE_SEP = " — ";

function parsePriceItem(item: string): { label: string; price: string; note: string | null } {
  const i = item.indexOf(PRICE_SEP);
  const name = i >= 0 ? item.slice(0, i) : item;
  const price = i >= 0 ? item.slice(i + PRICE_SEP.length) : "";
  const parenMatch = name.match(/\s*(\([^)]+\))\s*$/);
  const label = parenMatch ? name.slice(0, name.length - parenMatch[0].length).trim() : name;
  const note = parenMatch ? parenMatch[1] : null;
  return { label, price, note };
}

interface PriceRowProps {
  label: string;
  price: string;
  note?: string | null;
  showBullet?: boolean;
}

function PriceRow({ label, price, note, showBullet = true }: PriceRowProps) {
  return (
    <li>
      <div className="flex flex-col items-start gap-0 sm:flex-row sm:justify-between sm:items-start sm:gap-6">
        <div className="flex min-w-0 flex-col sm:max-w-[80%]">
          <div className="flex items-baseline gap-3 min-w-0">
            {showBullet && (
              <span className="text-primary shrink-0 text-base leading-none" aria-hidden>
                •
              </span>
            )}
            <span className="text-sm text-foreground/90 leading-snug min-w-0">{label}</span>
          </div>
          {note ? (
            <span className="text-xs text-muted-foreground/80 leading-snug mt-1 pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-muted-foreground/60">
              {note}
            </span>
          ) : null}
        </div>
        {price ? (
          <span className="text-sm font-semibold text-primary whitespace-nowrap shrink-0 mt-2 sm:mt-0 sm:pt-[2px]">
            {price}
          </span>
        ) : null}
      </div>
    </li>
  );
}

const standardGroups = [
  {
    title: "Коронки из диоксида циркония",
    items: [
      "Корона полная анатомия — 5 000 ₽",
      "Корона с нанесением керамики — 8 000 ₽",
      "Корона на импланте Dentium — 7 500 ₽",
      "Корона на импланте Straumann — 11 500 ₽",
    ],
  },
  {
    title: "Коронки из дисиликата лития, e.max (пресс)",
    items: [
      "Корона полной анатомии e.max — 7 000 ₽",
      "Корона e.max с нанесением керамики — 9 000 ₽",
      "Корона дисиликат лития полная анатомия — 6 000 ₽",
    ],
  },
  {
    title: "Коронки металлокерамика",
    items: [
      "Корона металлокерамическая (литой каркас) — 3 500 ₽",
      "Корона металлокерамическая (фрезерованный каркас) — 5 200 ₽",
      "Корона цельнолитая, полированная — 2 200 ₽",
      "Искусственная керамическая десна — 1 500 ₽",
    ],
  },
  {
    title: "Коронки PMMA временные",
    items: [
      "Корона временная PMMA с шахтой — 2 200 ₽",
      "Корона временная PMMA — 2 000 ₽",
      "Корона временная PMMA на импланте Dentium — 4 500 ₽",
    ],
  },
  {
    title: "Коронки в системе «Всё на 4/6»",
    items: [
      "Коронки из диоксида циркония на титановой балке (4 опоры, без десны) — 100 000 ₽",
      "Коронки из диоксида циркония на титановой балке (6 опор, без десны) — 120 000 ₽",
      "Коронки из диоксида циркония на балке (4 опоры, с десной) — 120 000 ₽",
      "Коронки из диоксида циркония на титановой балке (6 опор, с десной) — 140 000 ₽",
    ],
  },
];

const personalPriceItems = [
  "Коронка из диоксида циркония — 7 000 ₽",
  "Коронка из диоксида циркония с нанесением керамики — 9 000 ₽",
  "Коронка на импланте Dentium — 9 500 ₽",
  "Коронка на импланте Straumann — 12 500 ₽",
  "Керамические виниры e.max — 10 000–15 000 ₽",
  "Коронки из диоксида циркония на титановой балке (4 опоры, без десны) — 110 000 ₽",
  "Коронки из диоксида циркония на титановой балке (6 опор, без десны) — 125 000 ₽",
  "Коронки из диоксида циркония на балке (4 опоры, с десной) — 130 000 ₽",
  "Коронки из диоксида циркония на титановой балке (6 опор, с десной) — 145 000 ₽",
];

const priceCards = [
  {
    icon: FileText,
    title: "Стандартные виды работ",
    type: "grouped" as const,
    groups: standardGroups,
  },
  {
    icon: UserRound,
    title: "Личный прайс Арсена Хачатряна",
    type: "flat" as const,
    items: personalPriceItems,
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
          <h2 className="mb-4 text-3xl font-normal leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            <span className="text-foreground">ПРАЙС</span>
          </h2>
          <p className="max-w-2xl text-xs font-light tracking-widest text-foreground/80 uppercase leading-normal">
            Прозрачные цены на все виды услуг. Индивидуальный расчет для каждого случая.
          </p>
        </div>

        {/* Two cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {priceCards.map((card) => (
            <div
              key={card.title}
              className="glass-card group flex flex-col rounded-2xl p-6 md:p-8 transition-all duration-300 hover:scale-[1.01] min-h-0"
            >
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/5 transition-colors duration-300 group-hover:bg-white/10">
                <card.icon className="h-7 w-7 text-foreground" />
              </div>
              <h3 className="mb-5 text-xl font-normal text-foreground md:text-2xl">
                {card.title}
              </h3>

              <div className="flex-1 min-h-0 flex flex-col">
                {card.type === "grouped" ? (
                  <ul className="space-y-5 text-sm leading-relaxed">
                    {card.groups.map((grp) => (
                      <li key={grp.title}>
                        <div className="mt-4 first:mt-0 text-foreground/95 font-semibold text-[0.95rem]">
                          {grp.title}
                        </div>
                        <ul className="mt-3 space-y-4 pl-0">
                          {grp.items.map((item, idx) => {
                            const { label, price, note } = parsePriceItem(item);
                            return (
                              <PriceRow
                                key={idx}
                                label={label}
                                price={price}
                                note={note}
                                showBullet={true}
                              />
                            );
                          })}
                        </ul>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-4 text-sm leading-relaxed">
                    {card.items.map((item, idx) => {
                      const { label, price, note } = parsePriceItem(item);
                      return (
                        <PriceRow
                          key={idx}
                          label={label}
                          price={price}
                          note={note}
                          showBullet={true}
                        />
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 shrink-0">
                <Button
                  asChild
                  className="w-full glow-button bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/contacts">
                    Оставить заявку
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm font-light text-muted-foreground">
            * Цены указаны ориентировочно. Точная стоимость рассчитывается индивидуально после консультации.
          </p>
        </div>
      </div>
    </section>
  );
}
