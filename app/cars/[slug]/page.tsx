"use client";

import { use, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, Users, Fuel, Settings2, Luggage, 
  Snowflake, Check, Shield, MapPin, Clock
} from "lucide-react";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import { DateTimeRangePicker } from "@/components/date-time-range-picker";
import { PriceBreakdownComponent } from "@/components/price-breakdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { getCarBySlug, pricingConfig } from "@/lib/db";
import { calculatePrice, formatPrice, getBestValueHint } from "@/lib/pricing";
import { getCarAvailabilityStatus, checkAvailability } from "@/lib/availability";
import type { AddOn } from "@/lib/types";

const categoryLabels = {
  econom: "Эконом",
  comfort: "Комфорт",
  business: "Бизнес",
  crossover: "Кроссовер",
  minivan: "Минивэн",
};

const trunkSizeLabels = {
  small: "Малый",
  medium: "Средний",
  large: "Большой",
};

function CarDetailContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const car = getCarBySlug(slug);

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
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  if (!car) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Автомобиль не найден</h1>
          <Button asChild>
            <Link href="/cars">Вернуться к автопарку</Link>
          </Button>
        </div>
        <SiteFooter />
      </main>
    );
  }

  const availability = getCarAvailabilityStatus(car.id);
  
  const pickupStr = pickupDate?.toISOString().split("T")[0];
  const returnStr = returnDate?.toISOString().split("T")[0];
  
  const priceBreakdown = pickupStr && returnStr 
    ? calculatePrice(car, pickupStr, returnStr, selectedAddOns)
    : null;

  const availabilityCheck = pickupStr && returnStr
    ? checkAvailability(car.id, pickupStr, returnStr)
    : { available: true };

  const bestValueHint = priceBreakdown ? getBestValueHint(priceBreakdown.baseDays) : null;

  const toggleAddOn = (addOn: AddOn) => {
    setSelectedAddOns(prev => {
      const exists = prev.find(a => a.id === addOn.id);
      if (exists) {
        return prev.filter(a => a.id !== addOn.id);
      }
      return [...prev, addOn];
    });
  };

  const checkoutParams = new URLSearchParams();
  checkoutParams.set("car", car.slug);
  if (pickupStr) checkoutParams.set("pickup", pickupStr);
  if (returnStr) checkoutParams.set("return", returnStr);
  checkoutParams.set("pickupTime", pickupTime);
  checkoutParams.set("returnTime", returnTime);
  if (selectedAddOns.length > 0) {
    checkoutParams.set("addons", selectedAddOns.map(a => a.id).join(","));
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link 
            href="/cars" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к автопарку
          </Link>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Image & Details */}
            <div>
              {/* Main Image */}
              <div className="glass-card rounded-xl overflow-hidden mb-6">
                <div className="relative aspect-[4/3] bg-secondary/30">
                  <Image
                    src={car.images[0] || "/placeholder-car.jpg"}
                    alt={car.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-foreground">
                      {categoryLabels[car.category]}
                    </Badge>
                  </div>
                  <div className={`absolute top-4 right-4 text-sm font-medium px-3 py-1.5 rounded-full ${
                    availability.className === 'text-emerald-500' 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {availability.status}
                  </div>
                </div>
              </div>

              {/* Car Info */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">{car.name}</h1>
                    <p className="text-muted-foreground">{car.year} год • {car.brand}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold gold-text">{formatPrice(car.dailyPrice)}</div>
                    <div className="text-sm text-muted-foreground">в сутки</div>
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-border/30">
                  <div className="text-center">
                    <Users className="w-5 h-5 mx-auto text-primary mb-2" />
                    <div className="text-sm font-medium text-foreground">{car.seats} мест</div>
                    <div className="text-xs text-muted-foreground">Пассажиры</div>
                  </div>
                  <div className="text-center">
                    <Settings2 className="w-5 h-5 mx-auto text-primary mb-2" />
                    <div className="text-sm font-medium text-foreground">{car.transmission}</div>
                    <div className="text-xs text-muted-foreground">Коробка</div>
                  </div>
                  <div className="text-center">
                    <Fuel className="w-5 h-5 mx-auto text-primary mb-2" />
                    <div className="text-sm font-medium text-foreground">{car.fuel}</div>
                    <div className="text-xs text-muted-foreground">Топливо</div>
                  </div>
                  <div className="text-center">
                    <Luggage className="w-5 h-5 mx-auto text-primary mb-2" />
                    <div className="text-sm font-medium text-foreground">{trunkSizeLabels[car.trunkSize]}</div>
                    <div className="text-xs text-muted-foreground">Багажник</div>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-6">
                  <h3 className="font-semibold text-foreground mb-4">Оснащение</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {car.ac && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Snowflake className="w-4 h-4 text-primary" />
                        Кондиционер
                      </div>
                    )}
                    {car.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {car.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Included */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Включено в стоимость</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">ОСАГО</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">300 км пробега в сутки</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Техподдержка 24/7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking */}
            <div>
              <div className="glass-card rounded-xl p-6 sticky top-28">
                <h2 className="text-xl font-bold text-foreground mb-6">Забронировать</h2>

                {/* Date Picker */}
                <div className="mb-6">
                  <DateTimeRangePicker
                    pickupDate={pickupDate}
                    pickupTime={pickupTime}
                    returnDate={returnDate}
                    returnTime={returnTime}
                    onPickupDateChange={setPickupDate}
                    onPickupTimeChange={setPickupTime}
                    onReturnDateChange={setReturnDate}
                    onReturnTimeChange={setReturnTime}
                    compact
                  />
                </div>

                {/* Best Value Hint */}
                {bestValueHint && (
                  <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-3 mb-6">
                    <p className="text-sm text-primary font-medium">{bestValueHint}</p>
                  </div>
                )}

                {/* Availability Warning */}
                {!availabilityCheck.available && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-3 mb-6">
                    <p className="text-sm text-amber-400 font-medium">
                      Автомобиль занят до {availabilityCheck.busyUntil}
                    </p>
                    {availabilityCheck.nextAvailableDate && (
                      <p className="text-xs text-amber-400/70 mt-1">
                        Ближайшая доступная дата: {availabilityCheck.nextAvailableDate}
                      </p>
                    )}
                  </div>
                )}

                {/* Add-ons */}
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-4">Дополнительные опции</h3>
                  <div className="space-y-3">
                    {pricingConfig.addOns.map((addOn) => (
                      <label
                        key={addOn.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedAddOns.some(a => a.id === addOn.id)}
                            onCheckedChange={() => toggleAddOn(addOn)}
                          />
                          <span className="text-sm text-foreground">{addOn.nameRu}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatPrice(addOn.price)}{addOn.priceType === "per_day" ? "/сут" : ""}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                {priceBreakdown && (
                  <PriceBreakdownComponent breakdown={priceBreakdown} />
                )}

                {/* Deposit Info */}
                <div className="bg-secondary/30 rounded-lg px-4 py-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Залог (возвращаемый)</span>
                    <span className="text-foreground font-medium">{formatPrice(car.deposit)}</span>
                  </div>
                </div>

                {/* Book Button */}
                <Button
                  asChild
                  size="lg"
                  className="w-full h-14 text-lg glow-button bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!pickupDate || !returnDate || !availabilityCheck.available}
                >
                  <Link href={`/checkout?${checkoutParams.toString()}`}>
                    {!pickupDate || !returnDate 
                      ? "Выберите даты" 
                      : !availabilityCheck.available 
                        ? "Недоступен" 
                        : "Забронировать"}
                  </Link>
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Бесплатная отмена за 24 часа до начала аренды
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}

export default function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Загрузка...</div>
      </div>
    }>
      <CarDetailContent params={params} />
    </Suspense>
  );
}
