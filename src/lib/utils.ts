import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function todayWithoutTime() {
  const now = new Date();
  return format(now, "yyyy-MM-dd");
}

// 랜덤한 숫자를 생성하는 함수
export function getRandomNumber(min: number = 1, max: number = 99999) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
