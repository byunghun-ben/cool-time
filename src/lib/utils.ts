import { type ClassValue, clsx } from "clsx";
import { format, startOfWeek } from "date-fns";
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

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.startsWith("http") ? url : `https://${url}`;

  // 끝에 / 가 있으면 제거한다.
  url = url.endsWith("/") ? url.slice(0, -1) : url;

  return url;
};

export const getWeekDates = (weekLength: number = 7) => {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDates = Array.from({ length: weekLength }).map((_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return format(date, "yyyy-MM-dd");
  });

  return weekDates;
};
