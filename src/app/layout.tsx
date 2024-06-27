import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });
const bodyClassName = cn(
  fontSans.variable,
  "min-h-screen flex flex-col bg-background font-sans antialiased leading-relaxed text-foreground tracking-tight"
);

export const metadata: Metadata = {
  title: "클타임",
  description: "내가 탄 벽을 기록하고, 쿨타임을 관리하세요",
};

const queryClient = new QueryClient();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={bodyClassName}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
