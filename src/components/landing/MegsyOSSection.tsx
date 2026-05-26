import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const modes = [
  {
    name: "MEGSY OS",
    title: "Your autonomous\ncloud computer",
    desc: "Plans, researches, builds and deploys complete apps end-to-end. Works 24/7 in the cloud and hands you the live link inside the chat.",
    cta: "Try Megsy OS",
    href: "/auth",
  },
  {
    name: "DEEP RESEARCH",
    title: "Multi-source\nresearch on demand",
    desc: "Autonomous agent that crawls the web, cross-checks sources, and delivers a sourced report with citations in minutes — not hours.",
    cta: "Start a research",
    href: "/auth",
  },
  {
    name: "LEARNING",
    title: "Learn anything,\nstep by step",
    desc: "Explanations, study cards, quizzes and structured lessons tuned to your level — from quick refreshers to deep curricula.",
    cta: "Open Learning",
    href: "/auth",
  },
  {
    name: "SLIDES",
    title: "Full decks\nfrom one prompt",
    desc: "Generates entire presentations with on-brand themes, charts, images and speaker notes — export to PPTX or share online.",
    cta: "Create a deck",
    href: "/auth",
  },
  {
    name: "DOCS",
    title: "Reports, contracts,\nresearch papers",
    desc: "Professional long-form documents and templates with clean typography, structured sections and export-ready formatting.",
    cta: "Open Docs",
    href: "/auth",
  },
  {
    name: "IMAGES",
    title: "Pixel-perfect\nimage generation",
    desc: "Five flagship models plus 20+ pro tools — face swap, headshots, background removal, relight, restyle and more.",
    cta: "Open Image Studio",
    href: "/auth",
  },
  {
    name: "VIDEOS",
    title: "Cinematic AI\nvideo creation",
    desc: "Veo 3, Wan-X, Hunyuan and more. Generate, restyle and lip-sync video — from quick clips to full cinematic scenes.",
    cta: "Open Video Studio",
    href: "/auth",
  },
  {
    name: "VOICE",
    title: "Studio-grade\nvoice & lip-sync",
    desc: "Text-to-speech, voice cloning and lip-sync. Give your characters a real voice that matches their mouth movements.",
    cta: "Open Voice",
    href: "/auth",
  },
  {
    name: "SHOPPING",
    title: "Find & compare\nproducts instantly",
    desc: "Search across stores, compare prices and specs, and get smart recommendations tailored to what you actually need.",
    cta: "Open Shopping",
    href: "/auth",
  },
  {
    name: "INTEGRATIONS",
    title: "Connect 30+\nfavorite tools",
    desc: "Gmail, Slack, Notion, GitHub, HubSpot, Stripe, Shopify and more — Megsy works directly inside your stack.",
    cta: "Browse integrations",
    href: "/auth",
  },
];

const MegsyOSSection = () => {
  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - 24, behavior: "smooth" });
  };

  const go = (dir: -1 | 1) => {
    const next = Math.min(Math.max(active + dir, 0), modes.length - 1);
    setActive(next);
    scrollTo(next);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      children.forEach((c, i) => {
        const mid = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(mid - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center md:mb-14"
        >
          <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
            HOW MEGSY'S AI{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              CREATIVE SUITE
            </span>{" "}
            WORKS
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/55 md:text-lg">
            Every mode of Megsy in one workspace — chat, research, learning, slides, docs, images, video, voice and a full autonomous OS.
          </p>
        </motion.div>

        <div className="relative">
          {/* Arrows */}
          <button
            aria-label="Previous"
            onClick={() => go(-1)}
            className="absolute left-1 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 p-3 text-white backdrop-blur transition hover:border-white/40 md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            onClick={() => go(1)}
            className="absolute right-1 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 p-3 text-white backdrop-blur transition hover:border-white/40 md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Scroller */}
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {modes.map((m, i) => (
              <div
                key={m.name}
                className="relative flex w-[85%] shrink-0 snap-center flex-col items-center overflow-hidden rounded-t-[28px] rounded-b-[50%_28%] border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] px-6 pb-20 pt-14 text-center sm:w-[70%] md:w-[55%] lg:w-[42%]"
                style={{ minHeight: "min(520px, 70vh)" }}
              >
                <h3 className="font-display text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
                  {m.name}
                </h3>
                <p className="mt-6 whitespace-pre-line font-display text-xl font-bold text-white md:text-2xl">
                  {m.title}
                </p>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
                  {m.desc}
                </p>
                <button
                  onClick={() => navigate(m.href)}
                  className="mt-6 rounded-full border border-white/20 bg-white/[0.03] px-6 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                >
                  {m.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {modes.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => { setActive(i); scrollTo(i); }}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-8 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MegsyOSSection;
