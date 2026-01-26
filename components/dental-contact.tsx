"use client";

import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: MapPin,
    title: "АДРЕС",
    value: "г. Томск, ул. Ферганская, 15",
    subvalue: "Офис работает ежедневно",
  },
  {
    icon: Phone,
    title: "ТЕЛЕФОН",
    value: "+7 (918) 123-45-67",
    subvalue: "Звонок бесплатный",
  },
  {
    icon: Mail,
    title: "EMAIL",
    value: "info@estheticlab.ru",
    subvalue: "Ответим в течение часа",
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
    <section id="contacts" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
        <div className="section-header mb-16">
          <span className="text-foreground/80 text-sm font-medium uppercase tracking-wider">Связаться с нами</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal mt-4 mb-6">
            <span className="text-foreground">Контакты и </span>
            <span className="text-foreground">расположение</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
            <div className="flex gap-3">
              <Button
                asChild
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-foreground h-12"
              >
                <a href="https://wa.me/79181234567" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-foreground h-12"
              >
                <a href="https://t.me/estheticlab" target="_blank" rel="noopener noreferrer">
                  <Send className="w-4 h-4 mr-2" />
                  Telegram
                </a>
              </Button>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="glass-card rounded-xl overflow-hidden h-[500px] relative">
            <div className="absolute inset-0 bg-secondary/50 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-foreground/60 mx-auto mb-4" />
                <p className="text-foreground font-medium">Карта загружается...</p>
                <p className="text-sm text-muted-foreground mt-2">г. Томск, ул. Ферганская, 15</p>
              </div>
            </div>
            {/* Actual map would be embedded here with Yandex Maps or similar */}
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A0&amp;source=constructor&amp;ll=84.95%2C56.5&amp;z=15"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              title="Карта офиса Esthetic Dental Lab"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
