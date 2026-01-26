"use client";

import { Search, CalendarCheck, CreditCard, Car } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Выберите автомобиль",
    description: "Укажите даты аренды и выберите подходящий автомобиль из нашего автопарка",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Забронируйте онлайн",
    description: "Заполните данные и выберите удобный способ оплаты",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Оплатите аренду",
    description: "Внесите оплату картой онлайн или при получении автомобиля",
  },
  {
    icon: Car,
    step: "04",
    title: "Получите авто",
    description: "Заберите автомобиль в офисе или закажите доставку по Анапе",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Простой процесс</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            <span className="text-foreground">Как это </span>
            <span className="gold-text">работает</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Четыре простых шага к вашему идеальному путешествию
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}
              
              <div className="glass-card rounded-xl p-6 text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
                  <step.icon className="w-7 h-7 text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
