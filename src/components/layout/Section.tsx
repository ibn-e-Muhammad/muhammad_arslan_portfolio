import type { ReactNode, HTMLAttributes } from "react";
import { forwardRef } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  className?: string;
};

const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { children, className, ...rest },
  ref,
) {
  return (
    <section ref={ref} className={`py-section-gap ${className ?? ""}`.trim()} {...rest}>
      {children}
    </section>
  );
});

export default Section;
