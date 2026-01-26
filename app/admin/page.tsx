"use client";

import Link from "next/link";
import { Car, Calendar, TrendingUp, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCars, getBookings } from "@/lib/db";
import { formatPrice } from "@/lib/pricing";

export default function AdminDashboard() {
  const cars = getCars();
  const bookings = getBookings();
  
  const activeBookings = bookings.filter(b => b.status === "paid" || b.status === "confirmed");
  const pendingBookings = bookings.filter(b => b.status === "pending");
  const totalRevenue = bookings
    .filter(b => b.status === "paid" || b.status === "completed")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const formatDateRu = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  const getCarName = (carId: string) => {
    const car = cars.find(c => c.id === carId);
    return car?.name || "Неизвестный автомобиль";
  };

  const statusLabels: Record<string, { label: string; className: string }> = {
    pending: { label: "Ожидает", className: "bg-amber-500/20 text-amber-400" },
    confirmed: { label: "Подтверждён", className: "bg-blue-500/20 text-blue-400" },
    paid: { label: "Оплачен", className: "bg-emerald-500/20 text-emerald-400" },
    completed: { label: "Завершён", className: "bg-muted text-muted-foreground" },
    canceled: { label: "Отменён", className: "bg-destructive/20 text-destructive" },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Обзор</h1>
        <p className="text-muted-foreground">Добро пожаловать в панель управления АнапаДрайв</p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">{cars.length}</span>
          </div>
          <div className="text-sm text-muted-foreground">Автомобилей в парке</div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-2xl font-bold text-foreground">{activeBookings.length}</span>
          </div>
          <div className="text-sm text-muted-foreground">Активных бронирований</div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-2xl font-bold text-foreground">{pendingBookings.length}</span>
          </div>
          <div className="text-sm text-muted-foreground">Ожидают оплаты</div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-2xl font-bold gold-text">{formatPrice(totalRevenue)}</span>
          </div>
          <div className="text-sm text-muted-foreground">Общая выручка</div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Последние бронирования</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/bookings">
              Все бронирования
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>

        {recentBookings.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Нет бронирований</p>
        ) : (
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
              >
                <div className="flex-1">
                  <div className="font-medium text-foreground">{booking.customerName}</div>
                  <div className="text-sm text-muted-foreground">
                    {getCarName(booking.carId)} • {formatDateRu(booking.pickupDate)} - {formatDateRu(booking.returnDate)}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${statusLabels[booking.status].className}`}>
                    {statusLabels[booking.status].label}
                  </span>
                  <span className="font-medium text-foreground">{formatPrice(booking.totalPrice)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/admin/cars" className="glass-card rounded-xl p-6 hover:bg-secondary/50 transition-colors">
          <Car className="w-8 h-8 text-primary mb-4" />
          <h3 className="font-semibold text-foreground mb-2">Управление автопарком</h3>
          <p className="text-sm text-muted-foreground">Добавляйте, редактируйте и удаляйте автомобили</p>
        </Link>

        <Link href="/admin/bookings" className="glass-card rounded-xl p-6 hover:bg-secondary/50 transition-colors">
          <Calendar className="w-8 h-8 text-primary mb-4" />
          <h3 className="font-semibold text-foreground mb-2">Бронирования</h3>
          <p className="text-sm text-muted-foreground">Просмотр и управление заказами клиентов</p>
        </Link>

        <Link href="/admin/pricing" className="glass-card rounded-xl p-6 hover:bg-secondary/50 transition-colors">
          <TrendingUp className="w-8 h-8 text-primary mb-4" />
          <h3 className="font-semibold text-foreground mb-2">Тарифы и сезоны</h3>
          <p className="text-sm text-muted-foreground">Настройка цен и сезонных коэффициентов</p>
        </Link>
      </div>
    </div>
  );
}
