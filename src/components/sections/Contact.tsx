export default function Contact() {
  return (
    <section className="min-h-screen bg-void text-canvas flex flex-col justify-between p-6 md:p-12 lg:p-24">
      <div>
        <p className="text-xs uppercase tracking-widest font-sans text-canvas/60">
          Get in touch
        </p>
      </div>

      <div>
        <h2
          className="font-serif leading-[0.9] transition-colors duration-500 hover:text-terra"
          style={{ fontSize: "var(--text-hero)" }}
        >
          <span className="block">Let's build</span>
          <span className="block">something timeless.</span>
        </h2>
      </div>

      <div className="flex flex-col gap-6 text-xs uppercase tracking-widest font-sans text-canvas/60 md:flex-row md:items-center md:justify-between">
        <span>Local time: 21:06 GMT</span>
        <div className="flex gap-6">
          <span>Twitter</span>
          <span>LinkedIn</span>
        </div>
        <span>© 2026</span>
      </div>
    </section>
  );
}
