import type { Car, Booking, PricingConfig } from './types';

// Mock Cars Database
export const cars: Car[] = [
  {
    id: '1',
    slug: 'kia-rio',
    name: 'Kia Rio',
    brand: 'Kia',
    year: 2023,
    transmission: 'АКПП',
    fuel: 'Бензин',
    seats: 5,
    ac: true,
    trunkSize: 'medium',
    dailyPrice: 2500,
    deposit: 10000,
    images: ['/cars/kia-rio.jpg'],
    category: 'econom',
    tags: ['Экономичный', 'Популярный'],
    features: ['Кондиционер', 'Электростеклоподъёмники', 'ABS', 'Подушки безопасности'],
  },
  {
    id: '2',
    slug: 'hyundai-solaris',
    name: 'Hyundai Solaris',
    brand: 'Hyundai',
    year: 2023,
    transmission: 'АКПП',
    fuel: 'Бензин',
    seats: 5,
    ac: true,
    trunkSize: 'medium',
    dailyPrice: 2500,
    deposit: 10000,
    images: ['/cars/hyundai-solaris.jpg'],
    category: 'econom',
    tags: ['Экономичный', 'Надёжный'],
    features: ['Кондиционер', 'Мультимедиа', 'ABS', 'Круиз-контроль'],
  },
  {
    id: '3',
    slug: 'vw-polo',
    name: 'Volkswagen Polo',
    brand: 'Volkswagen',
    year: 2023,
    transmission: 'АКПП',
    fuel: 'Бензин',
    seats: 5,
    ac: true,
    trunkSize: 'medium',
    dailyPrice: 2800,
    deposit: 12000,
    images: ['/cars/vw-polo.jpg'],
    category: 'econom',
    tags: ['Немецкое качество', 'Экономичный'],
    features: ['Кондиционер', 'Apple CarPlay', 'ABS', 'ESP'],
  },
  {
    id: '4',
    slug: 'toyota-camry',
    name: 'Toyota Camry',
    brand: 'Toyota',
    year: 2023,
    transmission: 'АКПП',
    fuel: 'Бензин',
    seats: 5,
    ac: true,
    trunkSize: 'large',
    dailyPrice: 5500,
    deposit: 25000,
    images: ['/cars/toyota-camry.jpg'],
    category: 'comfort',
    tags: ['Комфорт', 'Бизнес-класс'],
    features: ['Климат-контроль', 'Кожаный салон', 'Камера заднего вида', 'Навигация'],
  },
  {
    id: '5',
    slug: 'kia-k5',
    name: 'Kia K5',
    brand: 'Kia',
    year: 2024,
    transmission: 'АКПП',
    fuel: 'Бензин',
    seats: 5,
    ac: true,
    trunkSize: 'large',
    dailyPrice: 5000,
    deposit: 20000,
    images: ['/cars/kia-k5.jpg'],
    category: 'comfort',
    tags: ['Комфорт', 'Стильный'],
    features: ['Климат-контроль', 'Панорамная крыша', 'Подогрев сидений', 'Bose аудио'],
  },
  {
    id: '6',
    slug: 'bmw-3-series',
    name: 'BMW 3 Series',
    brand: 'BMW',
    year: 2023,
    transmission: 'АКПП',
    fuel: 'Бензин',
    seats: 5,
    ac: true,
    trunkSize: 'medium',
    dailyPrice: 8000,
    deposit: 50000,
    images: ['/cars/bmw-3.jpg'],
    category: 'business',
    tags: ['Премиум', 'Спортивный'],
    features: ['Спортивный режим', 'Harman Kardon', 'Адаптивный круиз', 'M пакет'],
  },
  {
    id: '7',
    slug: 'mercedes-c-class',
    name: 'Mercedes-Benz C-Class',
    brand: 'Mercedes-Benz',
    year: 2023,
    transmission: 'АКПП',
    fuel: 'Бензин',
    seats: 5,
    ac: true,
    trunkSize: 'medium',
    dailyPrice: 8500,
    deposit: 50000,
    images: ['/cars/mercedes-c.jpg'],
    category: 'business',
    tags: ['Премиум', 'Люкс'],
    features: ['MBUX', 'Burmester аудио', 'Массаж сидений', 'Ambient освещение'],
  },
  {
    id: '8',
    slug: 'hyundai-creta',
    name: 'Hyundai Creta',
    brand: 'Hyundai',
    year: 2024,
    transmission: 'АКПП',
    fuel: 'Бензин',
    seats: 5,
    ac: true,
    trunkSize: 'large',
    dailyPrice: 4000,
    deposit: 15000,
    images: ['/cars/hyundai-creta.jpg'],
    category: 'crossover',
    tags: ['Кроссовер', 'Семейный'],
    features: ['Полный привод', 'Высокий клиренс', 'Камера 360°', 'Подогрев руля'],
  },
  {
    id: '9',
    slug: 'kia-sportage',
    name: 'Kia Sportage',
    brand: 'Kia',
    year: 2024,
    transmission: 'АКПП',
    fuel: 'Бензин',
    seats: 5,
    ac: true,
    trunkSize: 'large',
    dailyPrice: 4500,
    deposit: 18000,
    images: ['/cars/kia-sportage.jpg'],
    category: 'crossover',
    tags: ['Кроссовер', 'Новинка'],
    features: ['Полный привод', 'Панорамный дисплей', 'Вентиляция сидений', 'ADAS'],
  },
  {
    id: '10',
    slug: 'hyundai-staria',
    name: 'Hyundai Staria',
    brand: 'Hyundai',
    year: 2024,
    transmission: 'АКПП',
    fuel: 'Дизель',
    seats: 7,
    ac: true,
    trunkSize: 'large',
    dailyPrice: 6000,
    deposit: 30000,
    images: ['/cars/hyundai-staria.jpg'],
    category: 'minivan',
    tags: ['Минивэн', '7 мест'],
    features: ['7 мест', 'Раздельный климат', 'Электродвери', 'Большой багажник'],
  },
];

// Mock Bookings Database (in-memory)
let bookings: Booking[] = [
  {
    id: 'demo-1',
    carId: '1',
    customerName: 'Иван Петров',
    customerPhone: '+7 (918) 123-45-67',
    customerEmail: 'ivan@example.com',
    pickupDate: '2026-02-01',
    pickupTime: '10:00',
    returnDate: '2026-02-05',
    returnTime: '10:00',
    addOns: [],
    totalPrice: 10000,
    depositAmount: 10000,
    status: 'confirmed',
    paymentMethod: 'card',
    createdAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'demo-2',
    carId: '4',
    customerName: 'Мария Сидорова',
    customerPhone: '+7 (918) 987-65-43',
    customerEmail: 'maria@example.com',
    pickupDate: '2026-01-28',
    pickupTime: '12:00',
    returnDate: '2026-02-02',
    returnTime: '12:00',
    addOns: [{ id: 'child-seat', name: 'child-seat', nameRu: 'Детское кресло', price: 300, priceType: 'per_day' }],
    totalPrice: 29000,
    depositAmount: 25000,
    status: 'paid',
    paymentMethod: 'yukassa',
    createdAt: '2026-01-22T14:30:00Z',
  },
];

// Pricing Configuration
export const pricingConfig: PricingConfig = {
  seasons: [
    { id: 'low', name: 'low', nameRu: 'Низкий сезон', startDate: '01-01', endDate: '04-30', multiplier: 0.9 },
    { id: 'medium', name: 'medium', nameRu: 'Средний сезон', startDate: '05-01', endDate: '05-31', multiplier: 1.0 },
    { id: 'high', name: 'high', nameRu: 'Высокий сезон', startDate: '06-01', endDate: '09-15', multiplier: 1.3 },
    { id: 'medium2', name: 'medium', nameRu: 'Средний сезон', startDate: '09-16', endDate: '10-31', multiplier: 1.0 },
    { id: 'low2', name: 'low', nameRu: 'Низкий сезон', startDate: '11-01', endDate: '12-31', multiplier: 0.9 },
  ],
  weekendMultiplier: 1.1,
  discountTiers: [
    { minDays: 3, discount: 0.05, label: 'Скидка 5% за 3+ дней' },
    { minDays: 7, discount: 0.10, label: 'Скидка 10% за 7+ дней' },
    { minDays: 14, discount: 0.15, label: 'Скидка 15% за 14+ дней' },
  ],
  addOns: [
    { id: 'delivery', name: 'delivery', nameRu: 'Доставка по Анапе', price: 1000, priceType: 'fixed' },
    { id: 'child-seat', name: 'child-seat', nameRu: 'Детское кресло', price: 300, priceType: 'per_day' },
    { id: 'extra-driver', name: 'extra-driver', nameRu: 'Дополнительный водитель', price: 500, priceType: 'per_day' },
    { id: 'full-insurance', name: 'full-insurance', nameRu: 'Полная страховка', price: 800, priceType: 'per_day' },
    { id: 'unlimited-mileage', name: 'unlimited-mileage', nameRu: 'Без ограничения пробега', price: 500, priceType: 'per_day' },
  ],
};

// Database functions
export function getCars(): Car[] {
  return cars;
}

export function getCarBySlug(slug: string): Car | undefined {
  return cars.find(c => c.slug === slug);
}

export function getCarById(id: string): Car | undefined {
  return cars.find(c => c.id === id);
}

export function getBookings(): Booking[] {
  return bookings;
}

export function getBookingById(id: string): Booking | undefined {
  return bookings.find(b => b.id === id);
}

export function getBookingsForCar(carId: string): Booking[] {
  return bookings.filter(b => b.carId === carId && b.status !== 'canceled');
}

export function createBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
  const newBooking: Booking = {
    ...booking,
    id: `booking-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  bookings.push(newBooking);
  return newBooking;
}

export function updateBookingStatus(id: string, status: Booking['status']): Booking | undefined {
  const booking = bookings.find(b => b.id === id);
  if (booking) {
    booking.status = status;
  }
  return booking;
}

export function addCar(car: Omit<Car, 'id'>): Car {
  const newCar: Car = {
    ...car,
    id: `car-${Date.now()}`,
  };
  cars.push(newCar);
  return newCar;
}

export function updateCar(id: string, updates: Partial<Car>): Car | undefined {
  const index = cars.findIndex(c => c.id === id);
  if (index !== -1) {
    cars[index] = { ...cars[index], ...updates };
    return cars[index];
  }
  return undefined;
}
