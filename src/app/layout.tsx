import type { Metadata } from "next";
import { Syne_Tactile, Montserrat } from "next/font/google";
import Grain from "../components/layout/Grain";
import Preloader from "../components/layout/Preloader";
import SmoothScroll from "../components/layout/SmoothScroll";

import "../styles/globals.css";

const serif = Syne_Tactile({
  subsets: ["latin"],
  weight: ["400"], // Syne Tactile only supports weight 400
  variable: "--font-serif",
  display: "swap",
});

const sans = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
