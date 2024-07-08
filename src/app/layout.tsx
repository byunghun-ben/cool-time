import { cn, getURL } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Nav from "./_components/Nav";
import { setDefaultOptions } from "date-fns";
import { ko } from "date-fns/locale";

setDefaultOptions({ locale: ko });

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });
const bodyClassName = cn(
  fontSans.variable,
  "min-h-screen flex flex-col bg-background font-sans antialiased leading-relaxed text-foreground tracking-tight"
);

const url = getURL();

export const metadata: Metadata = {
  title: "클타임",
  description: "내가 탄 벽을 기록하고, 쿨타임을 관리하세요",
  authors: [
    { name: "@de.gu.r.r", url: "https://www.instagram.com/de.gu.r.r/" },
  ],
  keywords: [
    "클라이밍",
    "클라이밍센터",
    "쿨타임",
    "볼더링",
    "리드",
    "클타임",
    "실내 클라이밍",
    "실내 클라이밍센터",
    "실내 클라이밍장",
  ],
  openGraph: {
    type: "website",
    url: `${url}`,
    title: `클(라이밍쿨)타임`,
    description: `내가 가는 암장의 다음 세팅일은 언제일까요? 모든 벽이 바뀌는 날을 기다리며, 내가 탄 벽을 기록하고, 쿨타임을 관리하세요`,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={bodyClassName}>
        <Providers>
          <Nav />
          {children}
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
