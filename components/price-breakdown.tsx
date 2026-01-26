"use client";

import type { PriceBreakdown } from "@/lib/types";
import { formatPrice } from "@/lib/pricing";

interface PriceBreakdownComponentProps {
  breakdown: PriceBreakdown;
  showDeposit?: boolean;
}

export function PriceBreakdownComponent({ breakdown, showDeposit = false }: PriceBreakdownComponentProps) {
  return (
    <div className="space-y-3 mb-6">
      <h3 className="font-semibold text-foreground">Расчёт стоимости</h3>
      
      <div className="space-y-2 text-sm">
        {/* Base Price */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Базовая стоимость ({breakdown.baseDays} {breakdown.baseDays === 1 ? "день" : breakdown.baseDays < 5 ? "дня" : "дней"})
          </span>
          <span className="text-foreground">{formatPrice(breakdown.basePrice)}</span>
        </div>

        {/* Seasonal Adjustment */}
        {breakdown.seasonalAdjustment !== 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Сезонная корректировка</span>
            <span className={breakdown.seasonalAdjustment > 0 ? "text-amber-400" : "text-emerald-400"}>
              {breakdown.seasonalAdjustment > 0 ? "+" : ""}{formatPrice(breakdown.seasonalAdjustment)}
            </span>
          </div>
        )}

        {/* Weekend Adjustment */}
        {breakdown.weekendAdjustment > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Выходные дни</span>
            <span className="text-amber-400">+{formatPrice(breakdown.weekendAdjustment)}</span>
          </div>
        )}

        {/* Discount */}
        {breakdown.discountAmount > 0 && (
          <div className="flex justify-between">
            <span className="text-emerald-400">{breakdown.discountLabel}</span>
            <span className="text-emerald-400">-{formatPrice(breakdown.discountAmount)}</span>
          </div>
        )}

        {/* Add-ons */}
        {breakdown.addOnDetails.map((addOn) => (
          <div key={addOn.name} className="flex justify-between">
            <span className="text-muted-foreground">{addOn.name}</span>
            <span className="text-foreground">+{formatPrice(addOn.price)}</span>
          </div>
        ))}

        {/* Divider */}
        <div className="border-t border-border/30 pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span className="text-foreground">Итого</span>
            <span className="gold-text text-lg">{formatPrice(breakdown.total)}</span>
          </div>
        </div>

        {/* Deposit */}
        {showDeposit && (
          <div className="flex justify-between text-muted-foreground">
            <span>+ Залог (возвращаемый)</span>
            <span>{formatPrice(breakdown.deposit)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
