"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import { CarCard } from "@/components/car-card";
import { DateTimeRangePicker } from "@/components/date-time-range-picker";
import { Button } from "@/components/ui/button";
import { getCars } from "@/lib/db";
import type { Car } from "@/lib/types";

const categories = [
  { id: "all", label: "Все автомобили" },
  { id: "econom", label: "Эконом" },
  { id: "comfort", label: "Комфорт" },
  { id: "business", label: "Бизнес" },
  { id: "crossover", label: "Кроссоверы" },
  { id: "minivan", label: "Минивэны" },
];

const sortOptions = [
  { id: "price-asc", label: "Сначала дешевле" },
  { id: "price-desc", label: "Сначала дороже" },
  { id: "name", label: "По названию" },
];

function CarsContent() {
  const searchParams = useSearchParams();
  const [cars] = useState<Car[]>(getCars());
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [sortBy, setSortBy] = useState("price-asc");
  const [showFilters, setShowFilters] = useState(false);
  
  const [pickupDate, setPickupDate] = useState<Date | undefined>(() => {
    const pickup = searchParams.get("pickup");
    return pickup ? new Date(pickup) : undefined;
  });
  const [returnDate, setReturnDate] = useState<Date | undefined>(() => {
    const ret = searchParams.get("return");
    return ret ? new Date(ret) : undefined;
  });
  const [pickupTime, setPickupTime] = useState(searchParams.get("pickupTime") || "10:00");
  const [returnTime, setReturnTime] = useState(searchParams.get("returnTime") || "10:00");

  // Update URL when dates change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (pickupDate) params.set("pickup", pickupDate.toISOString().split("T")[0]);
    if (returnDate) params.set("return", returnDate.toISOString().split("T")[0]);
    if (pickupTime) params.set("pickupTime", pickupTime);
    if (returnTime) params.set("returnTime", returnTime);
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [pickupDate, returnDate, pickupTime, returnTime]);

  const filteredCars = cars
    .filter(car => activeCategory === "all" || car.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.dailyPrice - b.dailyPrice;
      if (sortBy === "price-desc") return b.dailyPrice - a.dailyPrice;
      return a.name.localeCompare(b.name);
    });

  const pickupStr = pickupDate?.toISOString().split("T")[0];
  const returnStr = returnDate?.toISOString().split("T")[0];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">Наш </span>
              <span className="gold-text">автопарк</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Выберите идеальный автомобиль для вашего путешествия по Черноморскому побережью
            </p>
          </div>

          {/* Date Picker Bar */}
          <div className="glass-card rounded-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-end gap-6">
              <div className="flex-1">
                <DateTimeRangePicker
                  pickupDate={pickupDate}
                  pickupTime={pickupTime}
                  returnDate={returnDate}
                  returnTime={returnTime}
                  onPickupDateChange={setPickupDate}
                  onPickupTimeChange={setPickupTime}
                  onReturnDateChange={setReturnDate}
                  onReturnTimeChange={setReturnTime}
                />
              </div>
              {(pickupDate || returnDate) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setPickupDate(undefined);
                    setReturnDate(undefined);
                  }}
                  className="text-muted-foreground"
                >
                  <X className="w-4 h-4 mr-1" />
                  Сбросить даты
                </Button>
              )}
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            {/* Categories */}
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

            {/* Sort & Filter Toggle */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden border-border/50"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Фильтры
              </Button>
              
              <div className="hidden md:flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden glass-card rounded-xl p-4 mb-6">
              <label className="text-sm text-muted-foreground mb-2 block">Сортировка</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </div>
          )}

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Найдено {filteredCars.length} автомобилей
          </p>

          {/* Cars Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                pickupDate={pickupStr}
                returnDate={returnStr}
              />
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Автомобили в данной категории не найдены</p>
            </div>
          )}
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Загрузка...</div>
      </div>
    }>
      <CarsContent />
    </Suspense>
  );
}
