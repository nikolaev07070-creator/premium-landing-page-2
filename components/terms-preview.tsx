"use client";

import Link from "next/link";
import { Shield, Gauge, Banknote, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const terms = [
  {
    icon: Banknote,
    title: "Залог",
    description: "Возвращаемый залог от 10 000 до 50 000 ₽ в зависимости от класса авто. Возврат в течение 3 дней после окончания аренды.",
  },
  {
    icon: Shield,
    title: "Страховка",
    description: "ОСАГО включено в стоимость. КАСКО с франшизой 15 000 ₽. Полная страховка без франшизы — опция.",
  },
  {
    icon: Gauge,
    title: "Пробег",
    description: "300 км/сутки включено в стоимость. Каждый дополнительный км — 10 ₽. Безлимитный пробег доступен как опция.",
  },
  {
    icon: FileText,
    title: "Документы",
    description: "Паспорт РФ и водительское удостоверение (стаж от 2 лет). Возраст водителя от 21 года.",
  },
];

export function TermsPreview() {
  return (
    <section id="terms" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Условия аренды</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            <span className="text-foreground">Прозрачные </span>
            <span className="gold-text">условия</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Никаких скрытых платежей. Все условия известны заранее.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {terms.map((term) => (
            <div key={term.title} className="glass-card rounded-xl p-6 flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <term.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{term.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{term.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            className="border-border/50 text-foreground hover:bg-secondary bg-transparent"
          >
            <Link href="/terms">
              Полные условия аренды
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
