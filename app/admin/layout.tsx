"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  Calendar,
  CreditCard,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { AdminGuard } from "@/components/admin-guard";
import { Button } from "@/components/ui/button";

const adminNavItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Обзор" },
  { href: "/admin/cars", icon: Car, label: "Автомобили" },
  { href: "/admin/bookings", icon: Calendar, label: "Бронирования" },
  { href: "/admin/pricing", icon: CreditCard, label: "Тарифы" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    window.location.reload();
  };

  // Высоты фиксированных панелей (подгони если нужно)
  const MOBILE_HEADER_H = 64; // px
  const MOBILE_NAV_H = 48; // px

  return (
    <AdminGuard>
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border/30 bg-secondary/20 hidden lg:block relative">
          <div className="p-6">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="gold-text font-bold text-sm">А</span>
              </div>
              <span className="text-lg font-semibold">
                <span className="gold-text">Анапа</span>
                <span className="text-foreground">Драйв</span>
              </span>
            </Link>

            <nav className="space-y-1">
              {adminNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="border-t border-border/30 pt-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Mobile Header (FIXED) */}
          <header className="lg:hidden glass border-b border-border/30 px-4 h-[64px] flex items-center justify-between fixed top-0 left-0 right-0 z-50">
            <Link href="/" className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">На сайт</span>
            </Link>
            <span className="font-semibold gold-text">Админ-панель</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </header>

          {/* Mobile Nav (FIXED under header) */}
          <nav className="lg:hidden flex border-b border-border/30 overflow-x-auto fixed left-0 right-0 z-40 bg-background/60 backdrop-blur-md"
               style={{ top: MOBILE_HEADER_H }}>
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Main: add top padding on mobile so fixed bars don't overlap */}
          <main
            className="flex-1 p-6"
            style={{
              paddingTop: `calc(${MOBILE_HEADER_H + MOBILE_NAV_H}px + 1.5rem)`,
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}