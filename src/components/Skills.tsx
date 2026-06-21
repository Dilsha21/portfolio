import type { Skill } from "@/lib/supabase";

export default function Skills({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <section
      id="skills"
      className="py-24 px-6"
      style={{ background: "var(--warm-dark)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title" style={{ color: "#fff" }}>
            My Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3
                className="text-xs uppercase tracking-widest mb-5"
                style={{ color: "var(--gold)" }}
              >
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <span
                    key={s.id}
                    className="px-3 py-1 rounded-full text-sm border"
                    style={{
                      border: "1px solid rgba(241,166,197,0.25)",
                      color: "rgba(255,255,255,0.75)",
                      fontWeight: 300,
                    }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
