import { notFound } from "next/navigation";
import { zirconiaCases } from "@/lib/portfolio/zirconiaCases";
import { CaseGallery } from "@/components/case-gallery";

type Props = {
  params: Promise<{ caseId: string }>;
};

export default async function ZirconiaCasePage({ params }: Props) {
  const { caseId } = await params;
  const case_ = zirconiaCases.find((c) => c.id === caseId);

  if (!case_) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <section className="relative py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
            <CaseGallery images={case_.images} layout={case_.layout} />
          </div>
        </section>
      </div>
    </main>
  );
}
