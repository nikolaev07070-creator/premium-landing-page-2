import type { Car, AddOn, PriceBreakdown } from './types';
import { pricingConfig } from './db';

function parseDate(dateStr: string): Date {
  return new Date(dateStr);
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function getSeasonMultiplier(date: Date): number {
  const monthDay = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  
  for (const season of pricingConfig.seasons) {
    if (monthDay >= season.startDate && monthDay <= season.endDate) {
      return season.multiplier;
    }
  }
  return 1.0;
}

function getSeasonName(date: Date): string {
  const monthDay = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  
  for (const season of pricingConfig.seasons) {
    if (monthDay >= season.startDate && monthDay <= season.endDate) {
      return season.nameRu;
    }
  }
  return 'Стандартный';
}

function calculateDays(pickupDate: string, returnDate: string): number {
  const pickup = parseDate(pickupDate);
  const returnD = parseDate(returnDate);
  const diffTime = Math.abs(returnD.getTime() - pickup.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(diffDays, 1); // Minimum 1 day
}

function getApplicableDiscount(days: number): { discount: number; label?: string } {
  let result = { discount: 0, label: undefined as string | undefined };
  
  for (const tier of pricingConfig.discountTiers) {
    if (days >= tier.minDays) {
      result = { discount: tier.discount, label: tier.label };
    }
  }
  
  return result;
}

export function calculatePrice(
  car: Car,
  pickupDate: string,
  returnDate: string,
  selectedAddOns: AddOn[]
): PriceBreakdown {
  const days = calculateDays(pickupDate, returnDate);
  const basePrice = car.dailyPrice * days;
  
  // Calculate seasonal adjustment
  let seasonalTotal = 0;
  const pickup = parseDate(pickupDate);
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(pickup);
    currentDate.setDate(currentDate.getDate() + i);
    const multiplier = getSeasonMultiplier(currentDate);
    seasonalTotal += car.dailyPrice * (multiplier - 1);
  }
  
  // Calculate weekend adjustment
  let weekendDays = 0;
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(pickup);
    currentDate.setDate(currentDate.getDate() + i);
    if (isWeekend(currentDate)) {
      weekendDays++;
    }
  }
  const weekendAdjustment = weekendDays * car.dailyPrice * (pricingConfig.weekendMultiplier - 1);
  
  // Calculate discount
  const { discount, label: discountLabel } = getApplicableDiscount(days);
  const subtotalBeforeDiscount = basePrice + seasonalTotal + weekendAdjustment;
  const discountAmount = subtotalBeforeDiscount * discount;
  
  // Calculate add-ons
  let addOnsTotal = 0;
  const addOnDetails: { name: string; price: number }[] = [];
  
  for (const addOn of selectedAddOns) {
    const addOnPrice = addOn.priceType === 'per_day' ? addOn.price * days : addOn.price;
    addOnsTotal += addOnPrice;
    addOnDetails.push({ name: addOn.nameRu, price: addOnPrice });
  }
  
  const subtotal = subtotalBeforeDiscount - discountAmount + addOnsTotal;
  
  return {
    baseDays: days,
    basePrice,
    seasonalAdjustment: Math.round(seasonalTotal),
    weekendAdjustment: Math.round(weekendAdjustment),
    discountAmount: Math.round(discountAmount),
    discountLabel,
    addOnsTotal,
    addOnDetails,
    subtotal: Math.round(subtotal),
    deposit: car.deposit,
    total: Math.round(subtotal),
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

export function getSeasonInfo(date: Date): { name: string; multiplier: number } {
  return {
    name: getSeasonName(date),
    multiplier: getSeasonMultiplier(date),
  };
}

export function getBestValueHint(days: number): string | null {
  if (days >= 14) return 'Лучшая цена! Скидка 15%';
  if (days >= 7) return 'Выгодно! Скидка 10%';
  if (days >= 3) return 'Хорошая цена! Скидка 5%';
  if (days === 2) return 'Добавьте ещё день для скидки 5%';
  return null;
}
