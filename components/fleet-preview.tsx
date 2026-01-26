"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarCard } from "./car-card";
import { getCars } from "@/lib/db";

const categories = [
  { id: "all", label: "Все" },
  { id: "econom", label: "Эконом" },
  { id: "comfort", label: "Комфорт" },
  { id: "business", label: "Бизнес" },
  { id: "crossover", label: "Кроссоверы" },
];

export function FleetPreview() {
  const [activeCategory, setActiveCategory] = useState("all");
  const cars = getCars();

  const filteredCars = activeCategory === "all" 
    ? cars.slice(0, 6) 
    : cars.filter(car => car.category === activeCategory).slice(0, 6);

  return (
    <section id="fleet" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Автопарк</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
              <span className="text-foreground">Выберите </span>
              <span className="gold-text">свой автомобиль</span>
            </h2>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary/50 text-foreground hover:bg-primary/10 bg-transparent"
          >
            <Link href="/cars">
              Смотреть все автомобили
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
