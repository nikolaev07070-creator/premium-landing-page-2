"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateTimeRangePicker } from "./date-time-range-picker";

export function Hero() {
  const router = useRouter();
  const [pickupDate, setPickupDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnTime, setReturnTime] = useState("10:00");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (pickupDate) params.set("pickup", pickupDate.toISOString().split("T")[0]);
    if (returnDate) params.set("return", returnDate.toISOString().split("T")[0]);
    params.set("pickupTime", pickupTime);
    params.set("returnTime", returnTime);
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-border/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-border/10 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Премиальный автопрокат в Анапе</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-foreground">Откройте дорогу </span>
            <br className="hidden md:block" />
            <span className="gold-text gold-glow">к незабываемому отдыху</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Премиальные автомобили для комфортного путешествия по Черноморскому побережью. 
            Прозрачные условия, онлайн-бронирование, доставка по городу.
          </p>

          {/* Booking Widget */}
          <div className="glass-card rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">Томск</span>
              <span className="text-muted-foreground text-sm">(доставка по городу)</span>
            </div>

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

            <Button
              onClick={handleSearch}
              size="lg"
              className="w-full mt-6 h-14 text-lg glow-button bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Подобрать автомобиль
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto">
            {[
              { value: "10+", label: "Автомобилей" },
              { value: "500+", label: "Довольных клиентов" },
              { value: "24/7", label: "Поддержка" },
              { value: "5★", label: "Рейтинг" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gold-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Листайте</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
