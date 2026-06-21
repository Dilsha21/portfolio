"use client";
import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/supabase";

const TAG_LABELS: Record<string, string> = {
  "*": "All",
  dev: "Development",
  uiux: "UI/UX",
  design: "Design",
};

export default function Projects({ projects }: { projects: Project[] }) {
  const [activeTag, setActiveTag] = useState("*");

  const tags = ["*", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
  const filtered =
    activeTag === "*" ? projects : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <h2 className="section-title">Projects</h2>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border transition-all ${
                  activeTag === tag
                    ? "border-terracotta bg-terracotta text-white"
                    : "border-warm-light/40 text-warm-mid hover:border-terracotta hover:text-terracotta"
                }`}
              >
                {TAG_LABELS[tag] ?? tag}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-warm-light text-center py-20">No projects yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="portfolio-card relative overflow-hidden rounded-sm group cursor-pointer bg-sand aspect-[4/3]">
      {project.image_url ? (
        <Image
          src={project.image_url}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "var(--sand)" }}
        >
          <span className="font-serif text-warm-mid/30 text-5xl">
            {project.title.charAt(0)}
          </span>
        </div>
      )}

      <div className="overlay rounded-sm">
        <div className="w-full">
          <h3 className="font-serif text-white text-xl mb-1">{project.title}</h3>
          <p className="text-white/60 text-xs uppercase tracking-widest mb-3">
            {project.tech.slice(0, 3).join(" · ")}
          </p>
          <p className="text-white/75 text-sm leading-relaxed line-clamp-3 mb-4">
            {project.description}
          </p>
          <div className="flex gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-gold text-xs uppercase tracking-widest border-b border-white/30 hover:border-gold transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub →
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-gold text-xs uppercase tracking-widest border-b border-white/30 hover:border-gold transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Live →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
