export interface Car {
  id: string;
  slug: string;
  name: string;
  brand: string;
  year: number;
  transmission: 'АКПП' | 'МКПП';
  fuel: 'Бензин' | 'Дизель' | 'Гибрид' | 'Электро';
  seats: number;
  ac: boolean;
  trunkSize: 'small' | 'medium' | 'large';
  dailyPrice: number;
  deposit: number;
  images: string[];
  category: 'econom' | 'comfort' | 'business' | 'crossover' | 'minivan';
  tags: string[];
  features: string[];
}

export interface Booking {
  id: string;
  carId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  deliveryAddress?: string;
  addOns: AddOn[];
  totalPrice: number;
  depositAmount: number;
  status: 'pending' | 'confirmed' | 'paid' | 'completed' | 'canceled';
  paymentMethod: 'card' | 'yukassa' | 'cash';
  createdAt: string;
}

export interface AddOn {
  id: string;
  name: string;
  nameRu: string;
  price: number;
  priceType: 'per_day' | 'fixed';
}

export interface Season {
  id: string;
  name: string;
  nameRu: string;
  startDate: string;
  endDate: string;
  multiplier: number;
}

export interface PricingConfig {
  seasons: Season[];
  weekendMultiplier: number;
  discountTiers: DiscountTier[];
  addOns: AddOn[];
}

export interface DiscountTier {
  minDays: number;
  discount: number;
  label: string;
}

export interface PriceBreakdown {
  baseDays: number;
  basePrice: number;
  seasonalAdjustment: number;
  weekendAdjustment: number;
  discountAmount: number;
  discountLabel?: string;
  addOnsTotal: number;
  addOnDetails: { name: string; price: number }[];
  subtotal: number;
  deposit: number;
  total: number;
}

export interface AvailabilityResult {
  available: boolean;
  nextAvailableDate?: string;
  busyUntil?: string;
  conflictingBookings?: Booking[];
}

export interface BookingFormData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  driverLicense?: string;
  passport?: string;
  deliveryAddress?: string;
  agreeToTerms: boolean;
  paymentMethod: 'card' | 'yukassa' | 'cash';
}
