"use client";

import { useState, useRef, ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Interactive3DFlipTileProps {
  children: ReactNode; // Front face content
  backContent: ReactNode; // Back face content
  isFlipped: boolean;
  onToggleFlip: () => void;
  index?: number;
}

export default function Interactive3DFlipTile({
  children,
  backContent,
  isFlipped,
  onToggleFlip,
  index = 0,
}: Interactive3DFlipTileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Hover physics state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [translateZ, setTranslateZ] = useState(0);
  const [shadowOffset, setShadowOffset] = useState({ x: 0, y: 20 });
  const [isHovered, setIsHovered] = useState(false);

  // Handle escape key
  useEffect(() => {
    if (!isFlipped) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onToggleFlip();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFlipped, onToggleFlip]);

  // Lock body scroll when flipped (full screen mode)
  useEffect(() => {
    if (isFlipped) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFlipped]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isFlipped) return;
    setIsHovered(true);
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Max rotation ±15deg
    const maxRotation = 15;
    const rx = (mouseY / (rect.height / 2)) * -maxRotation;
    const ry = (mouseX / (rect.width / 2)) * maxRotation;

    setRotateX(Math.max(-maxRotation, Math.min(maxRotation, rx)));
    setRotateY(Math.max(-maxRotation, Math.min(maxRotation, ry)));
    setTranslateZ(20);
    
    // Shadow moves opposite to tilt
    setShadowOffset({
      x: (mouseX / (rect.width / 2)) * -20,
      y: Math.max(10, (mouseY / (rect.height / 2)) * -20 + 20)
    });
  };

  const handleMouseLeave = () => {
    if (isFlipped) return;
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setTranslateZ(0);
    setShadowOffset({ x: 0, y: 20 });
  };

  // We want the modal content to fade in smoothly once the flip reaches halfway
  // Framer Motion's layout animations handle the expansion of the container.
  
  return (
    <>
      <AnimatePresence>
        {isFlipped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              willChange: "opacity, filter",
              WebkitTransform: "translateZ(0)",
            }}
            className="fixed inset-0 z-[60] bg-ink/20 backdrop-blur-sm"
            onClick={onToggleFlip}
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
        className={
          isFlipped
            ? "fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 pointer-events-none"
            : "relative w-full h-full cursor-pointer z-10"
        }
        style={{ perspective: 1200 }}
      >
        <motion.div
          ref={containerRef}
          layout
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            if (!isFlipped) onToggleFlip();
          }}
          animate={{
            rotateX: isFlipped ? 0 : rotateX,
            rotateY: isFlipped ? 180 : rotateY,
            z: isFlipped ? 0 : translateZ,
            y: isFlipped ? 0 : (isHovered ? -8 : 0),
            scale: isFlipped ? 1 : (isHovered ? 1.02 : 1),
            boxShadow: isFlipped 
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              : isHovered 
                ? `${shadowOffset.x}px ${shadowOffset.y}px 60px rgba(2, 146, 183, 0.15), 0 8px 24px rgba(0,0,0,0.3)`
                : "0 4px 20px rgba(0,0,0,0.1)",
          }}
          transition={{
            rotateY: isFlipped 
              ? { duration: 0.9, ease: [0.34, 1.2, 0.64, 1] } 
              : { type: "spring", stiffness: 150, damping: 20 },
            rotateX: { type: "spring", stiffness: 150, damping: 20 },
            z: { type: "spring", stiffness: 150, damping: 20 },
            layout: { duration: 0.9, ease: [0.34, 1.2, 0.64, 1] },
            boxShadow: { duration: 0.2 }
          }}
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform, filter",
            WebkitTransform: "translateZ(0)",
          }}
          className={`relative rounded-2xl w-full h-full transition-colors duration-500 ${
            isFlipped 
              ? "max-w-5xl max-h-[95vh] pointer-events-auto bg-canvas" 
              : `pointer-events-auto backdrop-blur-2xl ring-1 ring-inset bg-gradient-to-br ${
                  isHovered 
                    ? "from-white/70 via-white/30 to-white/50 ring-white/70"
                    : "from-white/60 via-white/20 to-white/40 ring-white/50"
                }`
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (!isFlipped) onToggleFlip();
            }
          }}
        >
          {/* Front Face */}
          <div
            className="relative w-full h-full rounded-2xl"
            style={{ 
              backfaceVisibility: "hidden", 
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {children}
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 w-full h-full flex flex-col rounded-2xl"
            style={{ 
              backfaceVisibility: "hidden", 
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)" 
            }}
            onClick={(e) => {
              // Click inside back face doesn't automatically close unless it's the background
              // We'll let the close button handle closing to avoid accidental closes when clicking content
            }}
          >
            {/* Delay the rendering/fade-in of back content slightly so it doesn't show during the very start of flip */}
            <motion.div
              initial={false}
              animate={{ opacity: isFlipped ? 1 : 0, scale: isFlipped ? 1 : 0.9 }}
              transition={{ duration: 0.5, delay: isFlipped ? 0.3 : 0 }}
              className="w-full h-full overflow-y-auto"
            >
              {backContent}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
