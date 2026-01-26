"use client";

import { Calendar, Percent, Gift, TrendingUp } from "lucide-react";
import { pricingConfig } from "@/lib/db";
import { formatPrice } from "@/lib/pricing";

export default function AdminPricingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Тарифы и сезоны</h1>
        <p className="text-muted-foreground">Настройка ценообразования и сезонных коэффициентов</p>
      </div>

      {/* Seasons */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Сезонные коэффициенты</h2>
            <p className="text-sm text-muted-foreground">Множители цен в зависимости от сезона</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Сезон</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Период</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Коэффициент</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Эффект</th>
              </tr>
            </thead>
            <tbody>
              {pricingConfig.seasons.map((season) => (
                <tr key={season.id} className="border-b border-border/20">
                  <td className="p-3 font-medium text-foreground">{season.nameRu}</td>
                  <td className="p-3 text-muted-foreground">
                    {season.startDate} — {season.endDate}
                  </td>
                  <td className="p-3">
                    <span className={`font-mono ${season.multiplier > 1 ? "text-amber-400" : season.multiplier < 1 ? "text-emerald-400" : "text-foreground"}`}>
                      x{season.multiplier.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">
                    {season.multiplier > 1 
                      ? `+${((season.multiplier - 1) * 100).toFixed(0)}% к базовой цене`
                      : season.multiplier < 1
                        ? `-${((1 - season.multiplier) * 100).toFixed(0)}% от базовой цены`
                        : "Базовая цена"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekend Multiplier */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Коэффициент выходных</h2>
            <p className="text-sm text-muted-foreground">Надбавка за субботу и воскресенье</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 bg-secondary/30 rounded-lg p-4">
            <div className="text-3xl font-bold text-amber-400">x{pricingConfig.weekendMultiplier.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground mt-1">
              +{((pricingConfig.weekendMultiplier - 1) * 100).toFixed(0)}% в выходные дни
            </div>
          </div>
          <div className="flex-1 bg-secondary/30 rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Пример для авто 3000 ₽/сут</div>
            <div className="font-medium text-foreground mt-1">
              Сб-Вс: {formatPrice(3000 * pricingConfig.weekendMultiplier)}/сут
            </div>
          </div>
        </div>
      </div>

      {/* Discount Tiers */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <Percent className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Скидки за длительную аренду</h2>
            <p className="text-sm text-muted-foreground">Автоматические скидки от количества дней</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {pricingConfig.discountTiers.map((tier) => (
            <div key={tier.minDays} className="bg-secondary/30 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-emerald-400">{(tier.discount * 100).toFixed(0)}%</div>
              <div className="font-medium text-foreground mt-2">от {tier.minDays} дней</div>
              <div className="text-xs text-muted-foreground mt-1">{tier.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Gift className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Дополнительные опции</h2>
            <p className="text-sm text-muted-foreground">Платные услуги для клиентов</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Услуга</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Цена</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Тип оплаты</th>
              </tr>
            </thead>
            <tbody>
              {pricingConfig.addOns.map((addOn) => (
                <tr key={addOn.id} className="border-b border-border/20">
                  <td className="p-3 font-medium text-foreground">{addOn.nameRu}</td>
                  <td className="p-3 gold-text font-medium">{formatPrice(addOn.price)}</td>
                  <td className="p-3 text-muted-foreground">
                    {addOn.priceType === "per_day" ? "За каждые сутки" : "Единоразово"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
