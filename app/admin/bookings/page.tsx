"use client";

import { useState } from "react";
import { Search, Download, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCars, getBookings, updateBookingStatus } from "@/lib/db";
import { formatPrice } from "@/lib/pricing";
import type { Booking } from "@/lib/types";

const statusConfig = {
  pending: { label: "Ожидает", className: "bg-amber-500/20 text-amber-400", icon: Clock },
  confirmed: { label: "Подтверждён", className: "bg-blue-500/20 text-blue-400", icon: CheckCircle },
  paid: { label: "Оплачен", className: "bg-emerald-500/20 text-emerald-400", icon: CheckCircle },
  completed: { label: "Завершён", className: "bg-muted text-muted-foreground", icon: CheckCircle },
  canceled: { label: "Отменён", className: "bg-destructive/20 text-destructive", icon: XCircle },
};

export default function AdminBookingsPage() {
  const cars = getCars();
  const [bookings, setBookings] = useState(getBookings());
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getCarName = (carId: string) => {
    const car = cars.find(c => c.id === carId);
    return car?.name || "Неизвестный автомобиль";
  };

  const formatDateRu = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleStatusChange = (bookingId: string, newStatus: Booking["status"]) => {
    updateBookingStatus(bookingId, newStatus);
    setBookings(getBookings());
  };

  const exportToCSV = () => {
    const headers = ["ID", "Клиент", "Email", "Телефон", "Автомобиль", "Получение", "Возврат", "Сумма", "Статус"];
    const rows = filteredBookings.map(b => [
      b.id,
      b.customerName,
      b.customerEmail,
      b.customerPhone,
      getCarName(b.carId),
      `${b.pickupDate} ${b.pickupTime}`,
      `${b.returnDate} ${b.returnTime}`,
      b.totalPrice,
      statusConfig[b.status].label,
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `bookings_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Бронирования</h1>
          <p className="text-muted-foreground">Всего: {bookings.length} • Показано: {filteredBookings.length}</p>
        </div>
        <Button variant="outline" onClick={exportToCSV} className="border-border/50 bg-transparent">
          <Download className="w-4 h-4 mr-2" />
          Экспорт CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по имени, email или ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-border/50"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-secondary/50 border border-border/50 rounded-lg text-foreground"
          >
            <option value="all">Все статусы</option>
            <option value="pending">Ожидает оплаты</option>
            <option value="confirmed">Подтверждён</option>
            <option value="paid">Оплачен</option>
            <option value="completed">Завершён</option>
            <option value="canceled">Отменён</option>
          </select>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => {
          const status = statusConfig[booking.status];
          const StatusIcon = status.icon;
          
          return (
            <div key={booking.id} className="glass-card rounded-xl p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Booking Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${status.className}`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">{booking.id}</span>
                  </div>
                  
                  <div className="font-semibold text-foreground">{booking.customerName}</div>
                  <div className="text-sm text-muted-foreground">
                    {booking.customerEmail} • {booking.customerPhone}
                  </div>
                </div>

                {/* Car & Dates */}
                <div className="flex-1 space-y-2">
                  <div className="font-medium text-foreground">{getCarName(booking.carId)}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDateRu(booking.pickupDate)} {booking.pickupTime} → {formatDateRu(booking.returnDate)} {booking.returnTime}
                  </div>
                  {booking.deliveryAddress && (
                    <div className="text-xs text-muted-foreground">Доставка: {booking.deliveryAddress}</div>
                  )}
                </div>

                {/* Price & Actions */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-semibold gold-text">{formatPrice(booking.totalPrice)}</div>
                    <div className="text-xs text-muted-foreground">Залог: {formatPrice(booking.depositAmount)}</div>
                  </div>
                  
                  {booking.status !== "completed" && booking.status !== "canceled" && (
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value as Booking["status"])}
                      className="px-3 py-2 text-sm bg-secondary/50 border border-border/50 rounded-lg text-foreground"
                    >
                      <option value="pending">Ожидает</option>
                      <option value="confirmed">Подтверждён</option>
                      <option value="paid">Оплачен</option>
                      <option value="completed">Завершён</option>
                      <option value="canceled">Отменён</option>
                    </select>
                  )}
                </div>
              </div>

              {/* Add-ons */}
              {booking.addOns.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border/30">
                  <span className="text-xs text-muted-foreground">Опции: </span>
                  {booking.addOns.map((addOn, idx) => (
                    <span key={addOn.id} className="text-xs text-foreground">
                      {addOn.nameRu}{idx < booking.addOns.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filteredBookings.length === 0 && (
          <div className="glass-card rounded-xl p-12 text-center text-muted-foreground">
            Бронирования не найдены
          </div>
        )}
      </div>
    </div>
  );
}
