import type { ReactNode } from "react";
import { forwardRef } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { children, className },
  ref,
) {
  return (
    <section ref={ref} className={`py-section-gap ${className ?? ""}`.trim()}>
      {children}
    </section>
  );
});

export default Section;
