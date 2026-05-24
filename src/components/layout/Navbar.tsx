"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import heroPortrait from "../../assets/images/hero_profile_pic.png";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const [compact, setCompact] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "99999",
      onUpdate: (self) => {
        if (window.scrollY < 100) {
          setCompact(false);
          return;
        }
        if (self.direction === 1) {
          // scrolling down
          setCompact(true);
        } else if (self.direction === -1) {
          // scrolling up
          setCompact(false);
        }
      },
    });

    return () => trigger.kill();
  }, []);

  const isCompact = compact && !isHovered;

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleContactClick = () => {
    // Scroll to the contact section and let the user click the CTA there
    scrollTo("[data-section='contact']");
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`navbar-pill flex items-center gap-3 md:gap-4 rounded-full border border-ink/[0.08] bg-canvas/30 backdrop-blur-xl shadow-sm ${
          isCompact
            ? "px-3 py-2 md:px-4 md:py-2.5"
            : "px-4 py-2.5 md:px-5 md:py-3"
        }`}
      >
        {/* Avatar */}
        <div
          className={`relative overflow-hidden rounded-full transition-all duration-400 ${
            isCompact ? "h-10 w-10" : "h-8 w-8 md:h-9 md:w-9"
          }`}
        >
          <Image
            src={heroPortrait}
            alt="MA"
            fill
            className="object-cover object-top"
            sizes="36px"
          />
        </div>

        {/* Name — transitions between "Arslan" and "MA" */}
        <div className="relative overflow-hidden">
          <span
            className={`block font-sans text-sm font-semibold text-ink transition-all duration-400 ${
              isCompact
                ? "opacity-0 w-12 scale-90"
                : "opacity-100 max-w-[80px] scale-100"
            }`}
            style={{ whiteSpace: "nowrap" }}
          >
            MA
          </span>
          <span
            className={`absolute top-0 left-0 block font-sans text-sm font-semibold text-ink transition-all duration-400 ${
              isCompact ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            Arslan
          </span>
        </div>

        {/* Divider & Links Container */}
        <div
          className={`flex items-center gap-1 md:gap-2 overflow-hidden transition-all duration-500 ease-in-out ${
            isCompact ? "max-w-0 opacity-0 -ml-2" : "max-w-[400px] opacity-100"
          }`}
        >
          {/* Divider */}
          <div className="h-4 w-[1px] bg-ink/10 shrink-0" />

          {/* Nav links */}
          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            <button
              onClick={() => scrollTo("[data-section='about']")}
              className="rounded-full px-2.5 py-1 md:px-3 md:py-1.5 text-xs font-sans font-medium text-ink/60 transition-colors hover:text-ink hover:bg-ink/[0.04]"
            >
              About
            </button>
            <button
              onClick={() => scrollTo("[data-section='projects']")}
              className="rounded-full px-2.5 py-1 md:px-3 md:py-1.5 text-xs font-sans font-medium text-ink/60 transition-colors hover:text-ink hover:bg-ink/[0.04]"
            >
              Work
            </button>
            <button
              onClick={() => scrollTo("[data-section='contact']")}
              className="rounded-full px-2.5 py-1 md:px-3 md:py-1.5 text-xs font-sans font-medium text-ink/60 transition-colors hover:text-ink hover:bg-ink/[0.04]"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
