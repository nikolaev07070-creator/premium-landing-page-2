import type { AvailabilityResult, Booking } from './types';
import { getBookingsForCar } from './db';

function parseDate(dateStr: string): Date {
  return new Date(dateStr);
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function datesOverlap(
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean {
  const s1 = parseDate(start1);
  const e1 = parseDate(end1);
  const s2 = parseDate(start2);
  const e2 = parseDate(end2);
  
  return s1 < e2 && s2 < e1;
}

export function checkAvailability(
  carId: string,
  pickupDate: string,
  returnDate: string
): AvailabilityResult {
  const bookings = getBookingsForCar(carId);
  
  const conflictingBookings = bookings.filter(booking =>
    datesOverlap(pickupDate, returnDate, booking.pickupDate, booking.returnDate)
  );
  
  if (conflictingBookings.length === 0) {
    return { available: true };
  }
  
  // Find next available date
  const sortedBookings = [...conflictingBookings].sort(
    (a, b) => parseDate(a.returnDate).getTime() - parseDate(b.returnDate).getTime()
  );
  
  const lastConflict = sortedBookings[sortedBookings.length - 1];
  const nextAvailable = new Date(parseDate(lastConflict.returnDate));
  nextAvailable.setDate(nextAvailable.getDate() + 1);
  
  return {
    available: false,
    busyUntil: lastConflict.returnDate,
    nextAvailableDate: formatDate(nextAvailable),
    conflictingBookings,
  };
}

export function getCarAvailabilityStatus(
  carId: string,
  checkDate: string = formatDate(new Date())
): { status: string; nextDate?: string; className: string } {
  const bookings = getBookingsForCar(carId);
  const today = parseDate(checkDate);
  
  // Check if car is currently booked
  for (const booking of bookings) {
    const pickup = parseDate(booking.pickupDate);
    const returnD = parseDate(booking.returnDate);
    
    if (today >= pickup && today <= returnD) {
      const nextAvailable = new Date(returnD);
      nextAvailable.setDate(nextAvailable.getDate() + 1);
      return {
        status: `Занят до ${formatDateRu(returnD)}`,
        nextDate: formatDate(nextAvailable),
        className: 'text-amber-500',
      };
    }
  }
  
  // Check if there's an upcoming booking
  const upcomingBookings = bookings
    .filter(b => parseDate(b.pickupDate) > today)
    .sort((a, b) => parseDate(a.pickupDate).getTime() - parseDate(b.pickupDate).getTime());
  
  if (upcomingBookings.length > 0) {
    const nextBooking = upcomingBookings[0];
    return {
      status: 'Доступен',
      nextDate: nextBooking.pickupDate,
      className: 'text-emerald-500',
    };
  }
  
  return {
    status: 'Доступен',
    className: 'text-emerald-500',
  };
}

function formatDateRu(date: Date): string {
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  return `${date.getDate()} ${months[date.getMonth()]}`;
}

export function getOccupancyCalendar(
  carId: string,
  startDate: string,
  days: number
): { date: string; booked: boolean; bookingId?: string }[] {
  const bookings = getBookingsForCar(carId);
  const calendar: { date: string; booked: boolean; bookingId?: string }[] = [];
  const start = parseDate(startDate);
  
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(currentDate.getDate() + i);
    const dateStr = formatDate(currentDate);
    
    let isBooked = false;
    let bookingId: string | undefined;
    
    for (const booking of bookings) {
      const pickup = parseDate(booking.pickupDate);
      const returnD = parseDate(booking.returnDate);
      
      if (currentDate >= pickup && currentDate <= returnD) {
        isBooked = true;
        bookingId = booking.id;
        break;
      }
    }
    
    calendar.push({ date: dateStr, booked: isBooked, bookingId });
  }
  
  return calendar;
}

export function findNextAvailablePeriod(
  carId: string,
  desiredDays: number,
  startFrom: string = formatDate(new Date())
): { startDate: string; endDate: string } | null {
  const bookings = getBookingsForCar(carId);
  const sortedBookings = [...bookings].sort(
    (a, b) => parseDate(a.pickupDate).getTime() - parseDate(b.pickupDate).getTime()
  );
  
  let checkDate = parseDate(startFrom);
  const maxLookAhead = 365; // Look up to 1 year ahead
  
  for (let i = 0; i < maxLookAhead; i++) {
    const potentialStart = formatDate(checkDate);
    const potentialEnd = new Date(checkDate);
    potentialEnd.setDate(potentialEnd.getDate() + desiredDays);
    const potentialEndStr = formatDate(potentialEnd);
    
    const hasConflict = sortedBookings.some(booking =>
      datesOverlap(potentialStart, potentialEndStr, booking.pickupDate, booking.returnDate)
    );
    
    if (!hasConflict) {
      return { startDate: potentialStart, endDate: potentialEndStr };
    }
    
    checkDate.setDate(checkDate.getDate() + 1);
  }
  
  return null;
}
