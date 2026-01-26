"use client";

import React from "react"

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CreditCard, Landmark, Banknote, Loader2 } from "lucide-react";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import { PriceBreakdownComponent } from "@/components/price-breakdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getCarBySlug, pricingConfig, createBooking } from "@/lib/db";
import { calculatePrice, formatPrice } from "@/lib/pricing";
import { checkAvailability } from "@/lib/availability";
import type { AddOn } from "@/lib/types";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const carSlug = searchParams.get("car");
  const pickupStr = searchParams.get("pickup");
  const returnStr = searchParams.get("return");
  const pickupTime = searchParams.get("pickupTime") || "10:00";
  const returnTime = searchParams.get("returnTime") || "10:00";
  const addonsParam = searchParams.get("addons");

  const car = carSlug ? getCarBySlug(carSlug) : null;
  
  const selectedAddOns: AddOn[] = addonsParam
    ? addonsParam.split(",").map(id => pricingConfig.addOns.find(a => a.id === id)).filter(Boolean) as AddOn[]
    : [];

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    driverLicense: "",
    deliveryAddress: "",
    agreeToTerms: false,
    paymentMethod: "card" as "card" | "yukassa" | "cash",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!car || !pickupStr || !returnStr) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Неверные параметры бронирования</h1>
          <p className="text-muted-foreground mb-6">Пожалуйста, выберите автомобиль и даты аренды</p>
          <Button asChild>
            <Link href="/cars">Выбрать автомобиль</Link>
          </Button>
        </div>
        <SiteFooter />
      </main>
    );
  }

  const availability = checkAvailability(car.id, pickupStr, returnStr);
  const priceBreakdown = calculatePrice(car, pickupStr, returnStr, selectedAddOns);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = "Введите ваше имя";
    }
    
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "Введите номер телефона";
    } else if (!/^[\d\s\+\-\(\)]{10,}$/.test(formData.customerPhone)) {
      newErrors.customerPhone = "Неверный формат телефона";
    }
    
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Введите email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Неверный формат email";
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Необходимо согласиться с условиями";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create booking
    const booking = createBooking({
      carId: car.id,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      pickupDate: pickupStr,
      pickupTime,
      returnDate: returnStr,
      returnTime,
      deliveryAddress: formData.deliveryAddress || undefined,
      addOns: selectedAddOns,
      totalPrice: priceBreakdown.total,
      depositAmount: car.deposit,
      status: formData.paymentMethod === "cash" ? "pending" : "paid",
      paymentMethod: formData.paymentMethod,
    });
    
    router.push(`/booking/${booking.id}`);
  };

  const formatDateRu = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  if (!availability.available) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Автомобиль недоступен</h1>
          <p className="text-muted-foreground mb-6">
            К сожалению, {car.name} занят в выбранные даты.
            {availability.nextAvailableDate && (
              <> Ближайшая доступная дата: {formatDateRu(availability.nextAvailableDate)}</>
            )}
          </p>
          <Button asChild>
            <Link href={`/cars/${car.slug}`}>Выбрать другие даты</Link>
          </Button>
        </div>
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link 
            href={`/cars/${car.slug}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к автомобилю
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-8">Оформление бронирования</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Info */}
                <div className="glass-card rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Контактные данные</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя и фамилия *</Label>
                      <Input
                        id="name"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        placeholder="Иван Иванов"
                        className="bg-secondary/50 border-border/50"
                      />
                      {errors.customerName && <p className="text-sm text-destructive">{errors.customerName}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.customerPhone}
                        onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                        placeholder="+7 (918) 123-45-67"
                        className="bg-secondary/50 border-border/50"
                      />
                      {errors.customerPhone && <p className="text-sm text-destructive">{errors.customerPhone}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.customerEmail}
                        onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                        placeholder="ivan@example.com"
                        className="bg-secondary/50 border-border/50"
                      />
                      {errors.customerEmail && <p className="text-sm text-destructive">{errors.customerEmail}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="license">Водительское удостоверение</Label>
                      <Input
                        id="license"
                        value={formData.driverLicense}
                        onChange={(e) => setFormData({ ...formData, driverLicense: e.target.value })}
                        placeholder="Серия и номер"
                        className="bg-secondary/50 border-border/50"
                      />
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Label htmlFor="delivery">Адрес доставки (опционально)</Label>
                    <Input
                      id="delivery"
                      value={formData.deliveryAddress}
                      onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                      placeholder="Адрес отеля или другое место в Анапе"
                      className="bg-secondary/50 border-border/50"
                    />
                    <p className="text-xs text-muted-foreground">Оставьте пустым для самовывоза из офиса</p>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="glass-card rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Способ оплаты</h2>
                  
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value as "card" | "yukassa" | "cash" })}
                    className="space-y-3"
                  >
                    <label className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <div className="font-medium text-foreground">Банковская карта</div>
                        <div className="text-sm text-muted-foreground">Visa, Mastercard, МИР</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors">
                      <RadioGroupItem value="yukassa" id="yukassa" />
                      <Landmark className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <div className="font-medium text-foreground">ЮKassa</div>
                        <div className="text-sm text-muted-foreground">SberPay, СБП, электронные кошельки</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors">
                      <RadioGroupItem value="cash" id="cash" />
                      <Banknote className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <div className="font-medium text-foreground">При получении</div>
                        <div className="text-sm text-muted-foreground">Наличные или карта при получении авто</div>
                      </div>
                    </label>
                  </RadioGroup>
                </div>

                {/* Terms Agreement */}
                <div className="glass-card rounded-xl p-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: !!checked })}
                      className="mt-1"
                    />
                    <span className="text-sm text-muted-foreground">
                      Я согласен с{" "}
                      <Link href="/terms" className="text-primary hover:underline" target="_blank">
                        условиями аренды
                      </Link>{" "}
                      и{" "}
                      <Link href="/privacy" className="text-primary hover:underline" target="_blank">
                        политикой конфиденциальности
                      </Link>
                    </span>
                  </label>
                  {errors.agreeToTerms && <p className="text-sm text-destructive mt-2">{errors.agreeToTerms}</p>}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg glow-button bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Обработка...
                    </>
                  ) : (
                    `Оплатить ${formatPrice(priceBreakdown.total)}`
                  )}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="glass-card rounded-xl p-6 sticky top-28">
                <h2 className="text-xl font-semibold text-foreground mb-6">Ваш заказ</h2>

                {/* Car Info */}
                <div className="flex gap-4 mb-6 pb-6 border-b border-border/30">
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-secondary/30">
                    <Image
                      src={car.images[0] || "/placeholder-car.jpg"}
                      alt={car.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{car.name}</h3>
                    <p className="text-sm text-muted-foreground">{car.year} • {car.transmission}</p>
                  </div>
                </div>

                {/* Dates */}
                <div className="space-y-3 mb-6 pb-6 border-b border-border/30">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Получение</span>
                    <span className="text-foreground">{formatDateRu(pickupStr)}, {pickupTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Возврат</span>
                    <span className="text-foreground">{formatDateRu(returnStr)}, {returnTime}</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <PriceBreakdownComponent breakdown={priceBreakdown} showDeposit />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Загрузка...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
