import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });
const bodyClassName = cn(
  fontSans.variable,
  "min-h-screen bg-background font-sans antialiased leading-relaxed text-foreground tracking-tight"
);

export const metadata: Metadata = {
  title: "클타임",
  description: "내가 탄 벽을 기록하고, 쿨타임을 관리하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={bodyClassName}>{children}</body>
    </html>
  );
}
