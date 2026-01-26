"use client";

import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Алексей Морозов",
    location: "Москва",
    rating: 5,
    text: "Отличный сервис! Арендовал Toyota Camry на неделю. Машина в идеальном состоянии, доставили прямо к отелю. Рекомендую!",
    date: "Август 2025",
  },
  {
    name: "Екатерина Соловьёва",
    location: "Санкт-Петербург",
    rating: 5,
    text: "Брали Hyundai Creta для поездки в горы. Всё прошло отлично — оформление быстрое, никаких проблем. Спасибо команде!",
    date: "Июль 2025",
  },
  {
    name: "Дмитрий Волков",
    location: "Краснодар",
    rating: 5,
    text: "Уже третий раз арендую здесь авто. Всегда чистые машины, адекватные цены и приятный персонал. Лучший прокат в Анапе!",
    date: "Июнь 2025",
  },
  {
    name: "Анна Петрова",
    location: "Ростов-на-Дону",
    rating: 5,
    text: "Забронировала онлайн за 5 минут. Цена полностью совпала с итоговой. Никаких доплат и сюрпризов. Очень довольна!",
    date: "Август 2025",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Отзывы клиентов</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            <span className="text-foreground">Нам </span>
            <span className="gold-text">доверяют</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Более 500 довольных клиентов за последний год
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reviews.map((review) => (
            <div key={review.name} className="glass-card rounded-xl p-6 relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-foreground mb-4 leading-relaxed">{review.text}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <div>
                  <div className="font-semibold text-foreground">{review.name}</div>
                  <div className="text-sm text-muted-foreground">{review.location}</div>
                </div>
                <div className="text-xs text-muted-foreground">{review.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
