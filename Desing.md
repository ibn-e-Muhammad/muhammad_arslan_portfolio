🏛️ AI Portfolio: Master Design & Architecture Specification

1. Executive Summary & Core Vision

The objective is to build a highly immersive, personal portfolio website that operates at the intersection of classical editorial print and modern cinematic web experiences.

The Aesthetic Profile:

Keywords: Grandiose, Elegant, Cinematic, Classy, Smooth, Timeless, Restrained.

The Anti-Profile: Not corporate, not minimal startup-like, not cyberpunk, not chaotic, not a generic developer template.

The Philosophy: Design interfaces with the discipline of print and the pace of cinema. Every grid, margin, and typographic decision is tuned to make space for the story. The work lives in contrast—soft textures against sharp structure, quiet moments against bold statements.

2. Technical Stack

Framework: Next.js (App Router, React 18+)

Styling: Tailwind CSS (Strictly bound to custom variables; no random utilities)

Animation Engine: GSAP (GreenSock) + ScrollTrigger (Contextualized for React)

Scroll Physics: Lenis by Studio Freight (Global lerp smooth scrolling)

3. The Color System (Terra & Void)

The palette avoids pure whites and pure blacks, opting instead for organic, warm, and tactile tones that emulate physical paper and cinematic grading.

Canvas (bg-canvas): #F9F8F6 (Alabaster Cream) - The primary background. A very soft, warm off-white that removes screen glare.

Ink (text-ink): #1C1A19 (Deep Espresso) - The primary text color. A deeply warm charcoal that maintains high contrast without the harshness of #000.

Terra (text-terra, bg-terra): #9C4A43 (Muted Terra Rose) - The primary brand identity. A sophisticated, dusty cream-red used for highlights, ambient liquid glows, and hover states.

Oatmeal (bg-oatmeal): #EFECE7 - A secondary surface tone used for image placeholders and subtle structural separation.

Void (bg-void): #141211 - The inverted canvas. Used strictly for the Epilogue (Contact section) to create a dramatic, emotionally resonant conclusion.

4. Typography System

Typography is treated as the primary visual actor. We rely on fluid clamping (clamp()) to ensure text scales like a responsive painting rather than snapping abruptly at breakpoints.

Display (The Emotion): PP Editorial New (or Ogg / Playfair Display). An elegant, high-contrast Serif used for massive, screen-spanning statements, section headers, and the primary brand mark.

Scale: --text-hero: clamp(4rem, 10vw, 9rem)

Body (The Utility): Neue Montreal (or Inter / Satoshi). A clean, geometric Sans-Serif used for UI, navigation, and long-form reading.

Scale: --text-body: clamp(0.875rem, 1.2vw, 1.125rem)

Styling: High line-height (leading-relaxed), slightly muted opacity (text-ink/80) for softness.

5. Textures & Atmospheric Assets

To prevent the site from feeling like "flat code," we inject physical and optical imperfections.

The Film Grain: A fixed, full-screen SVG noise filter (opacity: 0.04, pointer-events: none). It sits above all content, adding microscopic texture to every pixel, turning the digital screen into cinematic film.

Liquid Ambient Lighting: Behind the hero section, three massive, heavily blurred (blur-[100px]) colored orbs (Terra, deeper Red, and Oatmeal) slowly orbit and blend, acting as a slow-moving liquid lava lamp.

Image Grading: All photography and project thumbnails must be treated with a warm, slightly desaturated, high-contrast grade.

Frosted Optics: Any glassmorphism must be heavy (blur-16px) with ultra-low opacity white (bg-white/5), avoiding the "cheap plastic" look.

6. Motion Philosophy & The Actors

Animations are not decorations; they are the camera movements of our cinema.

The Physics: No linear transitions. All GSAP easing uses power3.out or custom sine curves.

The Pace: Slow and intentional. Standard duration is 1.2s minimum.

Scroll Damping: All scroll-linked animations use heavy scrubbing (scrub: 1 to scrub: 1.5) so elements lag slightly behind the scroll wheel, creating a feeling of massive physical weight and luxury.

The Three Primary Animation Actors:

The Staggered Reveal: Text elements fade from opacity: 0 and float up from y: 40 (or 100 for massive text). They appear in a staggered sequence to guide the eye.

The Cinematic Parallax: Images inside project wrappers are scaled to 120% height (h-[120%]). As the user scrolls, the image translates on the Y-axis (yPercent: -20 to 20), creating profound depth, as if looking through a window.

The Continuous Ambient: Background elements (like the liquid orbs) move on a continuous, infinite loop (yoyo: true, duration: 8s) independently of user interaction to make the site feel "alive."

7. Section-by-Section Architectural Layout

Act I: Hero (The Prologue)

Layout: 100vh, center-aligned, massive typography spanning the screen.

Atmosphere: The Liquid Ambient orbs flow slowly in the background behind the text. The grain overlay is highly visible against the Terra colors.

Motion: Text reveals gracefully on load. As the user scrolls down, the entire section physically sinks (y: 100) and fades out (opacity: 0) slowly over 800px.

Act II: About (The Monologue)

Layout: Asymmetrical 12-column grid. Left side (5 cols) holds a pinned editorial portrait. Right side (7 cols) holds heavily spaced typography.

Design Profile: Macro whitespace. Padding between elements is vast (py-section-gap).

Motion: As the right column scrolls into the viewport (80% from the top), the paragraphs sequentially float up and reveal themselves. The left portrait remains sticky.

Act III: Projects (The Archive)

Layout: A vertical sequence of massive, edge-to-edge cinematic posters. No standard UI cards.

Design Profile: Each project block is at least min-h-[80vh]. The image placeholder is massive (aspect ratio 21:9 or 4:3). The typography sits cleanly beneath it.

Motion: The images inside the massive placeholders execute the heavy scrub: 1.5 vertical parallax, moving independently of the page scroll.

Act IV: Contact (The Epilogue)

Layout: 100vh, deeply spacious.

Design Profile: A violent but elegant color inversion. The background becomes Void (Dark espresso), and the text becomes Canvas (Off-white).

Interaction: A massive serif statement ("Let's build something timeless.") serves as the email trigger, gracefully fading to Terra on hover.
