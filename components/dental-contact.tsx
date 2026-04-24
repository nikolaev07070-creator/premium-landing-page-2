"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const contactInfo = [
  {
    icon: MapPin,
    title: "АДРЕС",
    value: SITE.fullAddress,
    subvalue: "Офис работает по предварительной договоренности",
  },
  {
    icon: Phone,
    title: "ТЕЛЕФОН",
    value: SITE.phoneDisplay,
    subvalue: "Для клиник и врачей",
  },
  {
    icon: Mail,
    title: "EMAIL",
    value: SITE.email,
    subvalue: "Ответим в рабочее время",
  },
  {
    icon: Clock,
    title: "РЕЖИМ РАБОТЫ",
    value: "Ежедневно 08:00 – 22:00",
    subvalue: "Техподдержка 24/7",
  },
];

export function DentalContact() {
  return (
    <section id="contacts" className="relative overflow-x-hidden py-16 lg:overflow-x-visible lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="section-header mb-10 lg:mb-16">
          <h2 className="mb-3 text-2xl font-normal leading-tight sm:text-3xl md:text-4xl lg:mb-4 lg:text-5xl">
            <span className="text-foreground">Контакты и </span>
            <span className="text-foreground">расположение</span>
          </h2>
          <p className="max-w-2xl text-xs font-light tracking-widest text-foreground/80 uppercase leading-normal">
            Смотрите примеры выполненных работ в{" "}
            <Link href="/portfolio" className="underline underline-offset-4 hover:text-foreground transition-colors">
              портфолио
            </Link>
            .
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info) => (
                <div key={info.title} className="glass-card rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{info.title}</div>
                      <div className="font-medium text-foreground">{info.value}</div>
                      <div className="text-sm text-muted-foreground">{info.subvalue}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Messenger Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 w-full bg-emerald-600 text-foreground hover:bg-emerald-700 sm:flex-1"
              >
                <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                className="h-12 w-full bg-blue-500 text-foreground hover:bg-blue-600 sm:flex-1"
              >
                <a href={SITE.telegramHref} target="_blank" rel="noopener noreferrer">
                  <Send className="w-4 h-4 mr-2" />
                  Telegram
                </a>
              </Button>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative min-h-0 overflow-hidden rounded-xl glass-card h-[min(420px,55dvh)] sm:h-[480px] lg:h-[500px]">
            <div className="absolute inset-0 bg-secondary/50 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-foreground/60 mx-auto mb-4" />
                <p className="text-foreground font-medium">Карта загружается...</p>
                <p className="text-sm text-muted-foreground mt-2">{SITE.fullAddress}</p>
                <a
                  href="https://yandex.ru/maps/?ll=84.964582,56.520315&z=17&pt=84.964582,56.520315,pm2rdl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full border border-white/20 text-xs text-foreground hover:bg-white/5 transition-colors"
                >
                  Открыть в Яндекс Картах
                </a>
              </div>
            </div>
            {/* Actual map embedded via Yandex widget */}
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=84.964582%2C56.520315&z=17&pt=84.964582%2C56.520315%2Cpm2rdl"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта — Esthetic Dental Lab"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
