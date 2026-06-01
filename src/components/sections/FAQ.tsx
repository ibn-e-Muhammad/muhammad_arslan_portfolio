"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../layout/Container";

/* ── Static Q&A data ─────────────────────────────── */
const FAQ_ITEMS = [
  {
    question: "How long does it takes to build the app?",
    answer:
      "6 – 12 weeks from strategy session to launch-ready app. I yield a clear roadmap before starting development.",
  },
  {
    question: "Can you start right away?",
    answer:
      "If I have the capacity, yes. I typically onboard 1 – 2 clients per month to ensure quality & focus.",
  },
  {
    question: "Will I own the code?",
    answer:
      "Yes. Full source code ownership is transferred to you at the end of the project.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. I provide ongoing maintenance & support packages to ensure your app stays up-to-date and secure.",
  },
  {
    question: "What do you need to start working together?",
    answer:
      "A clear idea of your app, its core features, & your goals. A short call is the best way to get aligned.",
  },
] as const;

/* ── Spring config — buttery & elegantly slow ────── */
const SPRING = { type: "spring" as const, stiffness: 100, damping: 20, mass: 0.8 };

/* ── Stagger variants for the list entrance ──────── */
const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="relative bg-void text-canvas py-section-gap overflow-hidden"
      data-section="faq"
    >
      {/* ── Ambient orbs — visual continuity with About/Contact ── */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <motion.div
          animate={{
            x: ["-5%", "15%", "-10%", "5%", "-5%"],
            y: ["-5%", "10%", "0%", "-10%", "-5%"],
            scale: [1, 1.15, 0.95, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/3 h-[45vw] w-[45vw] rounded-full bg-terra/[0.8] blur-[140px]"
        />
        <motion.div
          animate={{
            x: ["10%", "-5%", "10%", "-10%", "10%"],
            y: ["10%", "-10%", "5%", "-5%", "10%"],
            scale: [1, 1.1, 0.85, 1.15, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 h-[50vw] w-[50vw] rounded-full bg-[#8A3A33]/[0.7] blur-[120px]"
        />
      </div>

      <Container className="relative z-10">
        {/* ── Heading ──────────────────────────────── */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-canvas leading-[0.95] tracking-[-0.02em]">
            Still got{" "}
            <span className="text-terra">questions</span>?
          </h2>
        </motion.div>

        {/* ── Accordion list ──────────────────────── */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="mx-auto max-w-3xl flex flex-col gap-3"
        >
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const itemId = `faq-answer-${index}`;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`rounded-2xl transition-colors duration-500 ${
                  isOpen ? "bg-canvas/[0.08]" : "bg-canvas/[0.05]"
                }`}
              >
                {/* ── Question bar ──────────────── */}
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={itemId}
                  className="flex w-full items-center gap-4 px-6 py-5 md:px-8 md:py-6 text-left cursor-pointer group"
                >
                  {/* Plus/minus icon */}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={SPRING}
                    className="flex h-6 w-6 shrink-0 items-center justify-center"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      className="text-terra"
                    >
                      <line
                        x1="9"
                        y1="2"
                        x2="9"
                        y2="16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="2"
                        y1="9"
                        x2="16"
                        y2="9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.span>

                  {/* Question text */}
                  <span className="font-sans text-base md:text-lg font-medium text-canvas/90 transition-colors duration-300 group-hover:text-terra">
                    {item.question}
                  </span>
                </button>

                {/* ── Collapsible answer ────────── */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={itemId}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={SPRING}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pl-16 md:px-8 md:pb-6 md:pl-[4.5rem]">
                        <p className="font-sans text-sm md:text-base leading-relaxed text-canvas/60 max-w-[60ch]">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
