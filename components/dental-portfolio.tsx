"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
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
    cover: "/portfolio/zirconia/00.jpg",
    slug: "zirconia",
  },
  {
    id: 2,
    title: "Эстетическая реставрация",
    category: "E-max",
    before: "/placeholder.jpg",
    after: "/placeholder.jpg",
    description: "Передние зубы восстановлены с максимальной эстетикой",
  },
  {
    id: 3,
    title: "Имплант-протезирование",
    category: "Импланты",
    before: "/placeholder.jpg",
    after: "/placeholder.jpg",
    description: "Коронки на имплантах с индивидуальными абатментами",
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

export function DentalPortfolio() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <>
      <section id="portfolio" className="relative py-24">
        {/* Background effect */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
          <div className="mb-16 section-header">
            <h2 className="mb-4 text-3xl font-normal text-foreground md:text-4xl lg:text-5xl">
              <span className="text-foreground">Портфолио</span>
            </h2>
            <p className="max-w-2xl text-xs font-light tracking-widest text-foreground/80 uppercase leading-normal">
              Примеры наших работ, демонстрирующие качество и эстетику выполненных реставраций.
            </p>
          </div>

          {/* Внутренняя перелинковка для SEO */}
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-light tracking-widest text-foreground/80 uppercase leading-normal">
              Если вы хотите обсудить сотрудничество или заказать расчёт, вы можете{" "}
              <Link href="/contacts" className="underline underline-offset-4 hover:text-foreground transition-colors">
                связаться с нами
              </Link>{" "}
              или посмотреть список
              {" "}
              <Link href="/#services" className="underline underline-offset-4 hover:text-foreground transition-colors">
                услуг лаборатории
              </Link>
              .
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item) => {
              const isAlbum = !!item.slug && !!item.cover;

              const cardContent = (
                <>
                  {/* Cover image or gradient placeholder */}
                  {isAlbum ? (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.cover as string}
                        alt="Пример реставрации в цирконии — Esthetic Dental Lab, Томск"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                      <div className="relative z-10 flex h-full items-end p-6">
                        <div>
                          <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wider text-primary">
                            {item.category}
                          </span>
                          <h3 className="mb-2 text-xl font-normal text-foreground">
                            {item.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/20 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="relative z-10 text-center p-6">
                        <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wider text-primary">
                          {item.category}
                        </span>
                        <h3 className="mb-2 text-xl font-normal text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    {isAlbum ? (
                      <span className="flex items-center gap-2 text-primary">
                        <span className="font-medium">Смотреть детали</span>
                        <ExternalLink className="h-5 w-5" />
                      </span>
                    ) : (
                      <div className="flex items-center gap-2 text-primary">
                        <span className="font-medium">Смотреть детали</span>
                        <ExternalLink className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </>
              );

              return (
                <div
                  key={item.id}
                  className="glass group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.25),0_0_40px_rgba(255,255,255,0.15)]"
                  onClick={
                    isAlbum ? undefined : () => setSelectedItem(item)
                  }
                >
                  {isAlbum ? (
                    <Link href={`/portfolio/${item.slug}`}>{cardContent}</Link>
                  ) : (
                    cardContent
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-xl border-border/50">
          {selectedItem && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wider text-primary">
                    {selectedItem.category}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {selectedItem.title}
                  </h3>
                  <p className="text-muted-foreground">{selectedItem.description}</p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase">До</p>
                  <div className="aspect-video bg-secondary/50 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Изображение до</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase">После</p>
                  <div className="aspect-video bg-secondary/50 rounded-lg flex items-center justify-center">
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
