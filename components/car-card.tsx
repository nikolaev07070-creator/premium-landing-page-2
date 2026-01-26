"use client";

import Link from "next/link";
import Image from "next/image";
import { Users, Fuel, Settings2, Luggage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Car } from "@/lib/types";
import { formatPrice } from "@/lib/pricing";
import { getCarAvailabilityStatus } from "@/lib/availability";

interface CarCardProps {
  car: Car;
  pickupDate?: string;
  returnDate?: string;
}

const trunkSizeLabels = {
  small: "Малый",
  medium: "Средний",
  large: "Большой",
};

const categoryLabels = {
  econom: "Эконом",
  comfort: "Комфорт",
  business: "Бизнес",
  crossover: "Кроссовер",
  minivan: "Минивэн",
};

export function CarCard({ car, pickupDate, returnDate }: CarCardProps) {
  const availability = getCarAvailabilityStatus(car.id);
  
  const searchParams = new URLSearchParams();
  if (pickupDate) searchParams.set("pickup", pickupDate);
  if (returnDate) searchParams.set("return", returnDate);
  const queryString = searchParams.toString();

  return (
    <div className="glass-card rounded-xl overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 bg-secondary/30 overflow-hidden">
        <Image
          src={car.images[0] || "/placeholder-car.jpg"}
          alt={car.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-foreground">
            {categoryLabels[car.category]}
          </Badge>
        </div>
        <div className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full ${
          availability.className === 'text-emerald-500' 
            ? 'bg-emerald-500/20 text-emerald-400' 
            : 'bg-amber-500/20 text-amber-400'
        }`}>
          {availability.status}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{car.name}</h3>
            <p className="text-sm text-muted-foreground">{car.year} год</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold gold-text">{formatPrice(car.dailyPrice)}</div>
            <div className="text-xs text-muted-foreground">в сутки</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-4 gap-2 py-4 border-y border-border/30">
          <div className="text-center">
            <Users className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">{car.seats} мест</span>
          </div>
          <div className="text-center">
            <Settings2 className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">{car.transmission}</span>
          </div>
          <div className="text-center">
            <Fuel className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">{car.fuel}</span>
          </div>
          <div className="text-center">
            <Luggage className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">{trunkSizeLabels[car.trunkSize]}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-4 mb-4">
          {car.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
            className="flex-1 border-border/50 bg-transparent hover:bg-secondary"
          >
            <Link href={`/cars/${car.slug}${queryString ? `?${queryString}` : ""}`}>
              Подробнее
            </Link>
          </Button>
          <Button
            asChild
            className="flex-1 glow-button bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href={`/checkout?car=${car.slug}${queryString ? `&${queryString}` : ""}`}>
              Забронировать
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
