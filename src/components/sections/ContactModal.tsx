"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  /* ── Animate in/out ──────────────────────────── */
  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;

    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.fromTo(
        panelRef.current,
        { y: 60, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out", delay: 0.1 },
      );
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (!overlayRef.current || !panelRef.current) return;
    gsap.to(panelRef.current, {
      y: 40,
      opacity: 0,
      scale: 0.96,
      duration: 0.35,
      ease: "power3.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.35,
      delay: 0.1,
      ease: "power2.in",
      onComplete: onClose,
    });
  }, [onClose]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim() || !message.trim()) return;

      setSending(true);

      /* ── mailto fallback — opens user's email client ── */
      const subject = encodeURIComponent("Portfolio Contact — New Message");
      const body = encodeURIComponent(
        `From: ${email}\n\n${message}`,
      );
      window.location.href = `mailto:muhammadarslan23156@gmail.com?subject=${subject}&body=${body}`;

      setSending(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setEmail("");
        setMessage("");
        handleClose();
      }, 2000);
    },
    [email, message, handleClose],
  );

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-void/80 backdrop-blur-sm"
      style={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      {/* ── Ambient glow ────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="glow-orb absolute top-1/3 left-1/3 h-[40vw] w-[40vw] rounded-full bg-terra/[0.06] blur-[120px]" />
        <div className="glow-orb absolute bottom-1/4 right-1/4 h-[35vw] w-[35vw] rounded-full bg-[#8A3A33]/[0.04] blur-[100px]" />
      </div>

      <div
        ref={panelRef}
        className="relative mx-4 w-full max-w-lg rounded-2xl border border-canvas/10 bg-void p-8 md:p-12"
        style={{ opacity: 0 }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-canvas/40 transition-colors hover:text-canvas"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h3 className="mb-2 font-serif text-3xl text-canvas md:text-4xl">
          Get in touch
        </h3>
        <p className="mb-8 text-sm text-canvas/50">
          Drop a message and I&apos;ll get back to you.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="contact-email"
              className="mb-2 block text-xs uppercase tracking-widest text-canvas/40"
            >
              Your Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border-b border-canvas/15 bg-transparent py-3 text-canvas outline-none placeholder:text-canvas/20 transition-colors focus:border-terra"
            />
          </div>
          <div>
            <label
              htmlFor="contact-message"
              className="mb-2 block text-xs uppercase tracking-widest text-canvas/40"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project..."
              className="w-full resize-none border-b border-canvas/15 bg-transparent py-3 text-canvas outline-none placeholder:text-canvas/20 transition-colors focus:border-terra"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="mt-2 w-full rounded-lg bg-terra py-4 text-sm uppercase tracking-widest text-canvas transition-all duration-300 hover:bg-terra/90 hover:shadow-lg hover:shadow-terra/20 disabled:opacity-50"
          >
            {sent ? "Sent ✓" : sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
