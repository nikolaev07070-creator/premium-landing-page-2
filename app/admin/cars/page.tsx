"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getCars } from "@/lib/db";
import { formatPrice } from "@/lib/pricing";
import { getCarAvailabilityStatus } from "@/lib/availability";

const categoryLabels = {
  econom: "Эконом",
  comfort: "Комфорт",
  business: "Бизнес",
  crossover: "Кроссовер",
  minivan: "Минивэн",
};

export default function AdminCarsPage() {
  const cars = getCars();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || car.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Автомобили</h1>
          <p className="text-muted-foreground">Управление автопарком</p>
        </div>
        <Button className="glow-button bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Добавить автомобиль
        </Button>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию или марке..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-border/50"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-secondary/50 border border-border/50 rounded-lg text-foreground"
          >
            <option value="all">Все категории</option>
            <option value="econom">Эконом</option>
            <option value="comfort">Комфорт</option>
            <option value="business">Бизнес</option>
            <option value="crossover">Кроссоверы</option>
            <option value="minivan">Минивэны</option>
          </select>
        </div>
      </div>

      {/* Cars Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Автомобиль</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Категория</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Характеристики</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Цена/сутки</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Статус</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map((car) => {
                const availability = getCarAvailabilityStatus(car.id);
                return (
                  <tr key={car.id} className="border-b border-border/20 hover:bg-secondary/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-secondary/30">
                          <Image
                            src={car.images[0] || "/placeholder-car.jpg"}
                            alt={car.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{car.name}</div>
                          <div className="text-sm text-muted-foreground">{car.year}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <Badge variant="secondary">{categoryLabels[car.category]}</Badge>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="text-sm text-muted-foreground">
                        {car.seats} мест • {car.transmission} • {car.fuel}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium gold-text">{formatPrice(car.dailyPrice)}</div>
                      <div className="text-xs text-muted-foreground">Залог: {formatPrice(car.deposit)}</div>
                    </td>
                    <td className="p-4">
                      <span className={`text-sm ${availability.className}`}>
                        {availability.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Автомобили не найдены
          </div>
        )}
      </div>
    </div>
  );
}
