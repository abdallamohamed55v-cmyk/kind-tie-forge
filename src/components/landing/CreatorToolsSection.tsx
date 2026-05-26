import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { IMAGE_TOOLS } from "@/lib/imageToolsData";
import { VIDEO_TOOLS } from "@/lib/videoToolsData";

interface CardItem {
  name: string;
  description: string;
  preview?: string;
  isVideo: boolean;
  kind: "Image" | "Video";
  route: string;
  badge?: string;
}

// Curated subset — only tools with preview media
const imageCards: CardItem[] = IMAGE_TOOLS
  .filter((t) => t.previewImage || t.previewVideo)
  .slice(0, 10)
  .map((t) => ({
    name: t.name,
    description: t.description,
    preview: t.previewImage || t.previewVideo,
    isVideo: !!t.previewVideo && !t.previewImage,
    kind: "Image" as const,
    route: t.route,
    badge: t.badge,
  }));

const videoCards: CardItem[] = VIDEO_TOOLS
  .filter((t) => t.previewVideo)
  .slice(0, 10)
  .map((t) => ({
    name: t.name,
    description: t.description,
    preview: t.previewVideo,
    isVideo: true,
    kind: "Video" as const,
    route: t.route,
    badge: t.badge,
  }));

const allCards: CardItem[] = [...imageCards, ...videoCards];

const ArtistStoriesSection = () => {
  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const scroll = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : 320;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  // Auto-scroll: seamless loop. When we reach the halfway point (end of original list),
  // snap back to the start without animation so it feels infinite.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    let last = performance.now();
    const SPEED = 40; // px per second

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused) {
        const half = el.scrollWidth / 2;
        let next = el.scrollLeft + SPEED * dt;
        if (next >= half) next -= half;
        el.scrollLeft = next;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [paused]);

  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end"
        >
          <div>
            <h2 className="flex items-center gap-3 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
              CREATOR
              <Sparkles className="h-8 w-8 text-fuchsia-400 md:h-12 md:w-12" />
              TOOLS
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/55 md:text-base">
              Pro-grade tools for images and videos — swipe through and pick your weapon.
            </p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              aria-label="Previous"
              onClick={() => scroll(-1)}
              className="rounded-full border border-white/15 bg-white/[0.03] p-3 text-white transition hover:border-white/40 hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next"
              onClick={() => scroll(1)}
              className="rounded-full border border-white/15 bg-white/[0.03] p-3 text-white transition hover:border-white/40 hover:bg-white/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div
          ref={scrollerRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-6 md:-mx-6 md:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {[...allCards, ...allCards].map((c, i) => {
            const accent = c.kind === "Image" ? "text-emerald-400" : "text-sky-400";
            return (
              <motion.button
                key={`${c.kind}-${c.name}-${i}`}
                data-card
                onClick={() => navigate(c.route)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
                className="group relative flex w-[78%] shrink-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 text-left transition hover:border-white/30 sm:w-[48%] md:w-[32%] lg:w-[26%]"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-800">
                  {c.preview ? (
                    c.isVideo ? (
                      <video
                        src={c.preview}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <img
                        src={c.preview}
                        alt={c.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-white/30">No preview</div>
                  )}
                  {c.badge && (
                    <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                      {c.badge}
                    </span>
                  )}
                </div>
                <div className="rounded-b-3xl bg-neutral-900 px-5 py-4">
                  <h3 className={`font-display text-xl font-black uppercase tracking-tight ${accent}`}>
                    {c.name}
                  </h3>
                  <p className={`mt-1 text-sm ${accent} opacity-75`}>{c.description}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArtistStoriesSection;
