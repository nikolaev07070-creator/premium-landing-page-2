"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { SITE } from "@/lib/site";

const footerLinks = {
  services: [
    { label: "CAD/CAM фрезеровка", href: "/#services" },
    { label: "Цирконий, E-max, PMMA", href: "/#services" },
    { label: "Имплант-протезирование", href: "/#services" },
    { label: "Съемное протезирование", href: "/#services" },
  ],
  company: [
    { label: "О лаборатории", href: "/#about" },
    { label: "Портфолио", href: "/portfolio" },
    { label: "Политика конфиденциальности", href: "/privacy" },
    { label: "Контакты", href: "/contacts" },
  ],
  info: [
    { label: "Условия работы", href: "/terms" },
    { label: "Сроки выполнения", href: "/#services" },
    { label: "Контроль качества", href: "/#about" },
    { label: "Поддержка врачей", href: "/contacts" },
  ],
};

export function DentalFooter() {
  return (
    <footer className="border-t border-border/30 bg-secondary/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="text-foreground font-normal text-2xl">E</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-normal tracking-tight leading-tight">
                  <span className="text-foreground">ESTHETIC</span>
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Dental Lab
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Цифровая зуботехническая лаборатория. Высокоточная CAD/CAM обработка, эстетика и стабильное качество для клиник и врачей.
            </p>
            <div className="space-y-3">
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                {SITE.phoneDisplay}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                {SITE.email}
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                {SITE.fullAddress}
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Услуги</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={`${link.label}-${link.href}-${index}`}>
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
              {footerLinks.company.map((link, index) => (
                <li key={`${link.label}-${link.href}-${index}`}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Информация</h4>
            <ul className="space-y-3">
              {footerLinks.info.map((link, index) => (
                <li key={`${link.label}-${link.href}-${index}`}>
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
            © 2026 Esthetic Dental Lab. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/30 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href={SITE.telegramHref}
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
