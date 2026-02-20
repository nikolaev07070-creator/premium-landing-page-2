import type { Metadata } from "next";
import Link from "next/link";
import { DentalHeader } from "@/components/dental-header";
import { DentalFooter } from "@/components/dental-footer";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Работа #${id} — Портфолио | Esthetic Dental Lab`,
    description: "Пример работы из портфолио лаборатории.",
  };
}

export default async function PortfolioWorkPage({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <DentalHeader />
      <main className="min-h-screen bg-background">
        <div className="pt-24 pb-16">
          <section className="relative py-20">
            <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
              <div className="section-header mb-12">
                <p className="mb-3 text-sm font-medium uppercase tracking-wider text-foreground/80">
                  Портфолио
                </p>
                <h1 className="mb-4 text-3xl font-normal text-foreground md:text-4xl lg:text-5xl">
                  Работа #{id}
                </h1>
                <p className="max-w-2xl text-muted-foreground">
                  Страница в разработке. Скоро здесь появится полное описание и фото этапов.
                </p>
              </div>
              <Link
                href="/#portfolio"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                ← Вернуться к портфолио
              </Link>
            </div>
          </section>
        </div>
      </main>
      <DentalFooter />
    </>
  );
}
