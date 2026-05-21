import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Grain from "../components/layout/Grain";
import SmoothScroll from "../components/layout/SmoothScroll";

import "../styles/globals.css";

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Cinematic editorial portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} bg-canvas text-ink antialiased`}>
        <Grain />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
