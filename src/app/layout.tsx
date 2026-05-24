import type { Metadata } from "next";
import { Comfortaa, Montserrat, Inter } from "next/font/google";
import Grain from "../components/layout/Grain";
import Navbar from "../components/layout/Navbar";
import Preloader from "../components/layout/Preloader";
import SmoothScroll from "../components/layout/SmoothScroll";

import "../styles/globals.css";

const serif = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Inter({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-mono",
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
      <body className={`${serif.variable} ${sans.variable} ${mono.variable} font-sans font-medium bg-canvas text-ink antialiased`}>
        <Preloader />
        <Grain />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
