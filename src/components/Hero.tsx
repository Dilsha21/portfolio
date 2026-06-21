export default function Hero({ content }: { content: Record<string, string> }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--warm-dark)" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/dilsha.jpg')" }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(18,37,45,0.82) 0%, rgba(88,43,89,0.60) 100%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <h1
          className="heading-serif text-white mb-6"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 7rem)",
            lineHeight: 1.05,
            fontStyle: "italic",
            letterSpacing: "-0.01em",
          }}
        >
          {content.hero_name ?? "Dilsha"}
        </h1>
        <p
          className="text-white/85 tracking-widest uppercase mb-10"
          style={{ fontSize: "clamp(0.85rem, 2vw, 1.1rem)", fontWeight: 300 }}
        >
          {content.hero_tagline ??
            "A curious creator from Sri Lanka — designing, building & learning"}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#projects" className="btn-pill btn-pill-white">
            View Projects
          </a>
          <a href="#contact" className="btn-pill btn-pill-white">
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#projects"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <span className="w-px h-10 bg-white/30 block" />
      </a>
    </section>
  );
}
