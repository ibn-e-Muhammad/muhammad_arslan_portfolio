"use client";

import { useRef, useEffect, useCallback, useActionState } from "react";
import gsap from "gsap";
import { submitContact, type ContactState } from "@/app/actions/contact";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialState: ContactState = { success: false, message: "" };

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  /* ── Animate open ────────────────────────────── */
  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;
    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.fromTo(
        panelRef.current,
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.1,
        },
      );
    }
  }, [isOpen]);

  /* ── Auto-close on success ───────────────────── */
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        handleClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  /* ── Animate close ───────────────────────────── */
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

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-void/90 backdrop-blur-sm"
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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h3 className="mb-2 font-serif text-3xl text-canvas md:text-4xl">
          Get in touch
        </h3>
        <p className="mb-8 text-sm font-sans text-canvas/50">
          Drop a message and I&apos;ll get back to you.
        </p>

        <form ref={formRef} action={formAction} className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="contact-name"
              className="mb-2 block text-xs uppercase tracking-widest font-sans text-canvas/40"
            >
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full border-b border-canvas/15 bg-transparent py-3 font-sans text-canvas outline-none placeholder:text-canvas/20 transition-colors focus:border-terra"
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="mb-2 block text-xs uppercase tracking-widest font-sans text-canvas/40"
            >
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full border-b border-canvas/15 bg-transparent py-3 font-sans text-canvas outline-none placeholder:text-canvas/20 transition-colors focus:border-terra"
            />
          </div>
          <div>
            <label
              htmlFor="contact-message"
              className="mb-2 block text-xs uppercase tracking-widest font-sans text-canvas/40"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              placeholder="Tell me about your project..."
              className="w-full resize-none border-b border-canvas/15 bg-transparent py-3 font-sans text-canvas outline-none placeholder:text-canvas/20 transition-colors focus:border-terra"
            />
          </div>

          {/* Status message */}
          {state.message && (
            <p
              className={`text-sm font-sans ${state.success ? "text-green-400" : "text-red-400"}`}
              aria-live="polite"
            >
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-terra py-4 text-sm uppercase tracking-widest font-sans text-canvas transition-all duration-300 hover:bg-terra/90 hover:shadow-lg hover:shadow-terra/20 disabled:opacity-50"
          >
            {pending ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="opacity-25"
                  />
                  <path
                    d="M4 12a8 8 0 018-8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-75"
                  />
                </svg>
                Sending...
              </>
            ) : state.success ? (
              "Sent ✓"
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
