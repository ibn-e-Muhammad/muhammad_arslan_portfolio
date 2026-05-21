export default function Contact() {
  return (
    <section className="min-h-screen bg-void text-canvas flex flex-col justify-between px-8 py-12 md:px-16 md:py-16 lg:px-28 lg:py-24">
      {/* Top label */}
      <div>
        <p className="text-xs uppercase tracking-widest font-sans text-canvas/60">
          Get in touch
        </p>
      </div>

      {/* Central statement */}
      <div>
        <h2 className="font-serif text-5xl md:text-7xl lg:text-9xl leading-[0.95] transition-colors duration-500 hover:text-terra">
          <span className="block">Let&apos;s build</span>
          <span className="block">something timeless.</span>
        </h2>
      </div>

      {/* Footer info */}
      <div className="flex flex-col gap-6 text-xs uppercase tracking-widest font-sans text-canvas/60 md:flex-row md:items-center md:justify-between">
        <span>Local time: 21:06 GMT</span>
        <div className="flex gap-8">
          <span>Twitter</span>
          <span>LinkedIn</span>
        </div>
        <span>&copy; 2026</span>
      </div>
    </section>
  );
}
