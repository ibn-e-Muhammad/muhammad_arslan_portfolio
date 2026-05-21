import Container from "../layout/Container";
import Section from "../layout/Section";

export default function About() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="aspect-[3/4] w-full rounded-sm bg-oatmeal" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-8">
              <h2 className="font-serif text-4xl lg:text-6xl">
                An Editorial Approach to Digital Craft
              </h2>
              <div
                className="space-y-8 text-ink/80 leading-relaxed"
                style={{ fontSize: "var(--text-body)" }}
              >
                <p>
                  I design interfaces with the discipline of print and the pace
                  of cinema. Every grid, margin, and typographic decision is
                  tuned to make space for the story.
                </p>
                <p>
                  The work lives in contrast—soft textures against sharp
                  structure, quiet moments against bold statements—always
                  calibrated for elegance and clarity.
                </p>
                <p>
                  This is a practice built on restraint, intent, and the belief
                  that atmosphere is a product feature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
