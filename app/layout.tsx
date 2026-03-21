import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const porsha = localFont({
  src: "./fonts/porsha/PorshaRichela.ttf",
  variable: "--font-porsha",
});

const melodrama = localFont({
  src: [
    {
      path: "./fonts/Melodrama/Melodrama-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Melodrama/Melodrama-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-melodrama",
});

const ozean = localFont({
  src: "./fonts/Ozean/ozean.ttf",
  variable: "--font-ozean",
});

const clash = localFont({
  src: "./fonts/ClashDisplay/ClashDisplay.ttf",
  variable: "--font-clash",
});

export const metadata: Metadata = {
  title: "ancientika",
  description:
    "ancientika is where contemporary minimalism meets modern elegance. We craft sophisticated menswear defined by clean lines, refined details, and timeless restraint. Our pieces blend sleek design with classic refinement, creating garments that feel both current and enduring. Discover a wardrobe that embodies effortless style and modern sophistication with ancientika.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${porsha.variable} ${melodrama.variable} ${ozean.variable} ${clash.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
