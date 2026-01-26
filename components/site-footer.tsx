"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";

const footerLinks = {
  cars: [
    { label: "Эконом класс", href: "/cars?category=econom" },
    { label: "Комфорт класс", href: "/cars?category=comfort" },
    { label: "Бизнес класс", href: "/cars?category=business" },
    { label: "Кроссоверы", href: "/cars?category=crossover" },
    { label: "Минивэны", href: "/cars?category=minivan" },
  ],
  company: [
    { label: "О компании", href: "/#benefits" },
    { label: "Условия аренды", href: "/terms" },
    { label: "Политика конфиденциальности", href: "/privacy" },
    { label: "Контакты", href: "/#contacts" },
  ],
  services: [
    { label: "Онлайн-бронирование", href: "/cars" },
    { label: "Доставка по городу", href: "/#contacts" },
    { label: "Трансфер из аэропорта", href: "/#contacts" },
    { label: "Долгосрочная аренда", href: "/cars" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-border/30 bg-secondary/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="gold-text font-bold text-xl">А</span>
              </div>
              <span className="text-xl font-semibold tracking-tight">
                <span className="gold-text">Томск</span>
                <span className="text-foreground">Драйв</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Премиальный прокат автомобилей в Анапе. Большой выбор авто, прозрачные условия, онлайн-бронирование и доставка по городу.
            </p>
            <div className="space-y-3">
              <a href="tel:+79181234567" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                +7 (918) 123-45-67
              </a>
              <a href="mailto:info@anapadrive.ru" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                info@anapadrive.ru
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                г. Томск, ул. Ферганская, 15
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Автопарк</h4>
            <ul className="space-y-3">
              {footerLinks.cars.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Компания</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Услуги</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 АнапаДрайв. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/79181234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/30 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="https://t.me/anapadrive"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500/30 transition-colors"
            >
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
