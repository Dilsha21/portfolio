import Image from "next/image";
import type { GalleryItem } from "@/lib/supabase";

export default function Gallery({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) return null;

  return (
    <section id="gallery" className="py-24 px-6" style={{ background: "var(--sand)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Gallery</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="portfolio-card relative overflow-hidden rounded-sm aspect-[4/3] group"
            >
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="overlay rounded-sm">
                <div className="w-full">
                  <h3 className="font-serif text-white text-lg">{item.title}</h3>
                  {item.caption && (
                    <p className="text-white/65 text-xs uppercase tracking-widest mt-1">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
