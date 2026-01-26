"use client";

import { useState } from "react";
import { Calendar, Clock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface DateTimeRangePickerProps {
  pickupDate: Date | undefined;
  pickupTime: string;
  returnDate: Date | undefined;
  returnTime: string;
  onPickupDateChange: (date: Date | undefined) => void;
  onPickupTimeChange: (time: string) => void;
  onReturnDateChange: (date: Date | undefined) => void;
  onReturnTimeChange: (time: string) => void;
  compact?: boolean;
}

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
];

function formatDateRu(date: Date | undefined): string {
  if (!date) return "Выберите дату";
  const months = [
    "янв", "фев", "мар", "апр", "май", "июн",
    "июл", "авг", "сен", "окт", "ноя", "дек"
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function DateTimeRangePicker({
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  onPickupDateChange,
  onPickupTimeChange,
  onReturnDateChange,
  onReturnTimeChange,
  compact = false,
}: DateTimeRangePickerProps) {
  const [pickupCalendarOpen, setPickupCalendarOpen] = useState(false);
  const [returnCalendarOpen, setReturnCalendarOpen] = useState(false);
  const [pickupTimeOpen, setPickupTimeOpen] = useState(false);
  const [returnTimeOpen, setReturnTimeOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className={`grid ${compact ? "grid-cols-1 gap-3" : "grid-cols-1 md:grid-cols-2 gap-4"}`}>
      {/* Pickup Section */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Получение
        </label>
        <div className="flex gap-2">
          <Popover open={pickupCalendarOpen} onOpenChange={setPickupCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`flex-1 justify-start bg-secondary/50 border-border/50 hover:bg-secondary ${
                  compact ? "h-10 text-sm" : "h-12"
                }`}
              >
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                <span className="text-foreground">{formatDateRu(pickupDate)}</span>
                <ChevronDown className="w-4 h-4 ml-auto text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
              <CalendarComponent
                mode="single"
                selected={pickupDate}
                onSelect={(date) => {
                  onPickupDateChange(date);
                  setPickupCalendarOpen(false);
                  // Auto-set return date if not set
                  if (date && !returnDate) {
                    const nextDay = new Date(date);
                    nextDay.setDate(nextDay.getDate() + 3);
                    onReturnDateChange(nextDay);
                  }
                }}
                disabled={(date) => date < today}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover open={pickupTimeOpen} onOpenChange={setPickupTimeOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-24 justify-start bg-secondary/50 border-border/50 hover:bg-secondary ${
                  compact ? "h-10 text-sm" : "h-12"
                }`}
              >
                <Clock className="w-4 h-4 mr-1 text-primary" />
                <span className="text-foreground">{pickupTime || "10:00"}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-32 p-2 bg-card border-border" align="start">
              <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={pickupTime === time ? "default" : "ghost"}
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      onPickupTimeChange(time);
                      setPickupTimeOpen(false);
                    }}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Return Section */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Возврат
        </label>
        <div className="flex gap-2">
          <Popover open={returnCalendarOpen} onOpenChange={setReturnCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`flex-1 justify-start bg-secondary/50 border-border/50 hover:bg-secondary ${
                  compact ? "h-10 text-sm" : "h-12"
                }`}
              >
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                <span className="text-foreground">{formatDateRu(returnDate)}</span>
                <ChevronDown className="w-4 h-4 ml-auto text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
              <CalendarComponent
                mode="single"
                selected={returnDate}
                onSelect={(date) => {
                  onReturnDateChange(date);
                  setReturnCalendarOpen(false);
                }}
                disabled={(date) => date < (pickupDate || today)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover open={returnTimeOpen} onOpenChange={setReturnTimeOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-24 justify-start bg-secondary/50 border-border/50 hover:bg-secondary ${
                  compact ? "h-10 text-sm" : "h-12"
                }`}
              >
                <Clock className="w-4 h-4 mr-1 text-primary" />
                <span className="text-foreground">{returnTime || "10:00"}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-32 p-2 bg-card border-border" align="start">
              <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={returnTime === time ? "default" : "ghost"}
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      onReturnTimeChange(time);
                      setReturnTimeOpen(false);
                    }}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
