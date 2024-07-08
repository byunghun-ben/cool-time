/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["ko"],
    defaultLocale: "ko",
  },
  images: {
    remotePatterns: [
      {
        hostname: "lepsdetrprgnpklyszxx.supabase.co",
      },
    ],
  },
};

export default nextConfig;
