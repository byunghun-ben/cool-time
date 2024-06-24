import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function todayWithoutTime() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}
