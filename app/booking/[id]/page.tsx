"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  CheckCircle2, Clock, XCircle, Calendar, MapPin, 
  Phone, Mail, Car, CreditCard, AlertCircle, Copy, Check
} from "lucide-react";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { getBookingById, getCarById, updateBookingStatus } from "@/lib/db";
import { formatPrice } from "@/lib/pricing";

const statusConfig = {
  pending: {
    icon: Clock,
    label: "Ожидает оплаты",
    color: "text-amber-400",
    bgColor: "bg-amber-500/20",
  },
  confirmed: {
    icon: CheckCircle2,
    label: "Подтверждено",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  paid: {
    icon: CheckCircle2,
    label: "Оплачено",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20",
  },
  completed: {
    icon: CheckCircle2,
    label: "Завершено",
    color: "text-muted-foreground",
    bgColor: "bg-secondary",
  },
  canceled: {
    icon: XCircle,
    label: "Отменено",
    color: "text-destructive",
    bgColor: "bg-destructive/20",
  },
};

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const booking = getBookingById(id);
  const car = booking ? getCarById(booking.carId) : null;
  const [copied, setCopied] = useState(false);
  const [cancelRequested, setCancelRequested] = useState(false);

  const copyBookingId = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const requestCancellation = () => {
    if (booking && booking.status !== "canceled" && booking.status !== "completed") {
      updateBookingStatus(booking.id, "canceled");
      setCancelRequested(true);
    }
  };

  if (!booking || !car) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Бронирование не найдено</h1>
          <p className="text-muted-foreground mb-6">Проверьте номер бронирования или свяжитесь с нами</p>
          <Button asChild>
            <Link href="/">На главную</Link>
          </Button>
        </div>
        <SiteFooter />
      </main>
    );
  }

  const status = cancelRequested ? statusConfig.canceled : statusConfig[booking.status];
  const StatusIcon = status.icon;

  const formatDateRu = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className={`w-20 h-20 rounded-full ${status.bgColor} flex items-center justify-center mx-auto mb-6`}>
              <StatusIcon className={`w-10 h-10 ${status.color}`} />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {booking.status === "paid" || booking.status === "confirmed" 
                ? "Бронирование подтверждено!" 
                : booking.status === "pending"
                  ? "Ожидает оплаты"
                  : cancelRequested 
                    ? "Бронирование отменено"
                    : status.label}
            </h1>
            <p className="text-muted-foreground">
              {booking.status === "paid" || booking.status === "confirmed"
                ? "Детали бронирования отправлены на вашу почту"
                : booking.status === "pending"
                  ? "Оплатите бронирование при получении автомобиля"
                  : ""}
            </p>
          </div>

          {/* Booking ID */}
          <div className="glass-card rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Номер бронирования</span>
              <div className="font-mono text-lg text-foreground">{booking.id}</div>
            </div>
            <Button variant="ghost" size="sm" onClick={copyBookingId}>
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>

          {/* Car Info */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Автомобиль</h2>
            <div className="flex gap-4">
              <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-secondary/30">
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
                <p className="text-sm text-muted-foreground">{car.year} • {car.transmission} • {car.fuel}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {car.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dates & Location */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Даты и место</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">Получение</div>
                  <div className="text-foreground font-medium">{formatDateRu(booking.pickupDate)}</div>
                  <div className="text-sm text-muted-foreground">{booking.pickupTime}</div>
                </div>
              </div>
              <div className="flex gap-3">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">Возврат</div>
                  <div className="text-foreground font-medium">{formatDateRu(booking.returnDate)}</div>
                  <div className="text-sm text-muted-foreground">{booking.returnTime}</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border/30">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="text-sm text-muted-foreground">Место получения</div>
                  <div className="text-foreground">
                    {booking.deliveryAddress || "г. Томск, ул. Ферганская, 15 (офис)"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Оплата</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Стоимость аренды</span>
                <span className="text-foreground font-medium">{formatPrice(booking.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Залог (возвращаемый)</span>
                <span className="text-foreground">{formatPrice(booking.depositAmount)}</span>
              </div>
              {booking.addOns.length > 0 && (
                <div className="pt-3 border-t border-border/30">
                  <div className="text-sm text-muted-foreground mb-2">Дополнительные опции:</div>
                  {booking.addOns.map((addOn) => (
                    <div key={addOn.id} className="text-sm text-muted-foreground">• {addOn.nameRu}</div>
                  ))}
                </div>
              )}
              <div className="pt-3 border-t border-border/30 flex justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">
                    {booking.paymentMethod === "card" ? "Банковская карта" :
                     booking.paymentMethod === "yukassa" ? "ЮKassa" : "При получении"}
                  </span>
                </div>
                <span className={`font-medium ${status.color}`}>{status.label}</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Контактные данные</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Car className="w-4 h-4 text-primary" />
                <span className="text-foreground">{booking.customerName}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-foreground">{booking.customerPhone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-foreground">{booking.customerEmail}</span>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Политика отмены</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Бесплатная отмена за 24 часа до начала аренды. При отмене менее чем за 24 часа 
                  удерживается 50% стоимости. При неявке — полная стоимость.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="outline" className="flex-1 border-border/50 bg-transparent">
              <Link href="/">На главную</Link>
            </Button>
            {!cancelRequested && booking.status !== "canceled" && booking.status !== "completed" && (
              <Button 
                variant="outline" 
                className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10 bg-transparent"
                onClick={requestCancellation}
              >
                Отменить бронирование
              </Button>
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
