export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { zirconiaCases } from "@/lib/portfolio/zirconiaCases";

export const metadata: Metadata = {
  title: "Цирконий — портфолио | Esthetic Dental Lab",
  description:
    "Работы из диоксида циркония: примеры реставраций и коронок. Esthetic Dental Lab.",
};

export default function ZirconiaPortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <section className="relative py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
            {/* Header */}
            <div className="mb-12 section-header">
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-foreground/80">
                Портфолио / Цирконий
              </p>
              <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
                Цирконий — работы
              </h1>
              <p className="max-w-2xl text-muted-foreground">
                Примеры работ из диоксида циркония: коронки, мосты и полные реабилитации,
                выполненные с акцентом на точность посадки и эстетику.
              </p>
            </div>

            {/* Cases Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {zirconiaCases.map((case_) => (
                <Link
                  key={case_.id}
                  href={`/portfolio/zirconia/${case_.id}`}
                  className="group glass relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.25),0_0_40px_rgba(255,255,255,0.15)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={case_.cover}
                      alt={`Кейс ${case_.id}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
