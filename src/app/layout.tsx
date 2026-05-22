import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Grain from "../components/layout/Grain";
import Preloader from "../components/layout/Preloader";
import SmoothScroll from "../components/layout/SmoothScroll";

import "../styles/globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Arslan — Creative Developer",
  description:
    "Cinematic editorial portfolio — crafting immersive digital experiences with atmosphere, restraint, and detail.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} bg-canvas text-ink antialiased`}>
        <Preloader />
        <Grain />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
