export default function About({ content }: { content: Record<string, string> }) {
  return (
    <section id="about" className="py-24 px-6" style={{ background: "var(--cream)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div className="relative">
            {/* Dot grid accent */}
            <div
              className="absolute -top-6 -left-6 w-36 h-36 opacity-25 pointer-events-none"
              style={{
                background: `radial-gradient(circle, var(--gold) 1.5px, transparent 1.5px)`,
                backgroundSize: "12px 12px",
              }}
            />
            <img
              src="/images/dilsha.jpg"
              alt="Dilsha"
              className="relative z-10 w-full object-cover object-top rounded-sm"
              style={{ maxHeight: 580 }}
            />
          </div>

          {/* Text */}
          <div>
            <h3 className="heading-serif text-2xl mb-6" style={{ color: "var(--warm-dark)" }}>
              Hi, I&apos;m Dilsha 👋
            </h3>
            <p
              className="text-lg leading-relaxed mb-5"
              style={{ color: "var(--warm-mid)", fontWeight: 300 }}
            >
              {content.about_lead ??
                "Computer Science and Engineering undergraduate at the University of Moratuwa with hands-on experience in full-stack development, UI/UX design, and low-level computing."}
            </p>
            <p
              className="leading-relaxed mb-8"
              style={{ color: "var(--warm-mid)", fontWeight: 300 }}
            >
              {content.about_body ??
                "Proficient in Java, Python, JavaScript, and Next.js with a strong grasp of OOP, REST APIs, and Firebase-backed architectures. Passionate about building thoughtful digital experiences that are both functional and beautiful."}
            </p>
            <a
              href={content.cv_url ?? "/cv/Dilsha_Atugedara_CV.pdf"}
              download
              className="btn-pill"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
