import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { brand } from "@/lib/brand";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["wdth"],
  display: "swap",
});

const text = Newsreader({
  subsets: ["latin"],
  variable: "--font-text",
  style: ["normal", "italic"],
  display: "swap",
});

// Vercel sets this automatically on deploys, so no configuration is needed.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${brand.name}: ${brand.edition}`,
  description: brand.description,
  openGraph: {
    title: `${brand.name}: ${brand.edition}`,
    description: brand.description,
    type: "website",
    images: [
      {
        url: "/photos/cover.jpg",
        width: 1700,
        height: 2550,
        alt: "Two men standing in a dry field under a blue sky",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#e8e5de",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
