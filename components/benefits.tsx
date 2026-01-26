"use client";

import { Shield, Clock, CreditCard, Truck, Headphones, Award } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Полная страховка",
    description: "КАСКО и ОСАГО включены. Дополнительная защита от всех рисков по желанию.",
  },
  {
    icon: Clock,
    title: "Быстрое оформление",
    description: "Онлайн-бронирование за 5 минут. Минимум документов при получении.",
  },
  {
    icon: CreditCard,
    title: "Прозрачные цены",
    description: "Никаких скрытых платежей. Итоговая стоимость известна сразу.",
  },
  {
    icon: Truck,
    title: "Доставка по Анапе",
    description: "Привезём автомобиль в аэропорт, отель или любой адрес в городе.",
  },
  {
    icon: Headphones,
    title: "Поддержка 24/7",
    description: "Круглосуточная помощь на дороге и консультации по телефону.",
  },
  {
    icon: Award,
    title: "Гарантия качества",
    description: "Все автомобили проходят техосмотр перед каждой арендой.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Наши преимущества</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            <span className="text-foreground">Премиальный </span>
            <span className="gold-text">прокат авто в Анапе</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Мы создали сервис, в котором каждая деталь продумана для вашего комфорта
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="glass-card rounded-xl p-6 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
