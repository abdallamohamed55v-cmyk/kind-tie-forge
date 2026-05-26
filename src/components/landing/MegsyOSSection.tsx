import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Mode = {
  brand: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  brandStyle?: React.CSSProperties;
};

const modes: Mode[] = [
  {
    brand: "MEGSY OS",
    title: "Your autonomous\ncloud computer",
    description:
      "Megsy OS plans, researches, codes and deploys full apps on its own — and hands you back a live link. Works 24/7 in the cloud.",
    cta: "Try Megsy OS",
    href: "/pricing",
    brandStyle: { fontFamily: '"Dela Gothic One", sans-serif', letterSpacing: "-0.02em" },
  },
  {
    brand: "DEEP RESEARCH",
    title: "Hours of research\nin minutes",
    description:
      "Megsy crawls the web, reads dozens of sources and delivers a sourced, structured report — ready to share with your team.",
    cta: "Start researching",
    href: "/chat",
    brandStyle: { fontFamily: '"Dela Gothic One", sans-serif', letterSpacing: "-0.02em" },
  },
  {
    brand: "LEARNING",
    title: "Master anything,\nstep by step",
    description:
      "Personalized lessons, examples and quizzes that adapt to your level — from coding basics to advanced math, in your own language.",
    cta: "Start learning",
    href: "/chat",
    brandStyle: { fontFamily: '"Dela Gothic One", sans-serif', letterSpacing: "-0.02em" },
  },
  {
    brand: "SHOPPING",
    title: "Smarter shopping,\nbetter prices",
    description:
      "Compare products, read real reviews and find the best deal across the web — Megsy picks what fits your budget and needs.",
    cta: "Shop with Megsy",
    href: "/chat",
    brandStyle: { fontFamily: '"Dela Gothic One", sans-serif', letterSpacing: "-0.02em" },
  },
  {
    brand: "SLIDES",
    title: "Pitch decks built\nin one prompt",
    description:
      "From outline to designed presentation in seconds — themes, charts and speaker notes included. Export to PPTX or share a link.",
    cta: "Create slides",
    href: "/chat",
    brandStyle: { fontFamily: '"Dela Gothic One", sans-serif', letterSpacing: "-0.02em" },
  },
  {
    brand: "DOCS",
    title: "Reports & contracts\nready to send",
    description:
      "Professional templates for reports, contracts and research — auto-formatted, multilingual, and ready to download.",
    cta: "Open Docs",
    href: "/chat",
    brandStyle: { fontFamily: '"Dela Gothic One", sans-serif', letterSpacing: "-0.02em" },
  },
];

const MegsyOSSection = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const go = (dir: number) => {
    setIndex((i) => (i + dir + modes.length) % modes.length);
  };

  const current = modes[index];

  return (
    <section className="relative bg-black py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center md:mb-12"
        >
          <h3
            style={{ fontFamily: '"Dela Gothic One", sans-serif' }}
            className="text-3xl uppercase leading-[0.95] tracking-tight text-white md:text-5xl"
          >
            Every mode, one Megsy
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-[13px] text-white/60 md:text-base">
            Switch between specialized modes — research, learning, shopping, slides, autonomous OS and more — all inside one chat.
          </p>
        </motion.div>

        <div className="relative">
          {/* Arrows */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous mode"
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 -translate-x-2 rounded-full border border-white/15 bg-black/60 p-3 text-white backdrop-blur transition hover:border-white/40 hover:bg-black/80 md:-translate-x-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next mode"
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-2 rounded-full border border-white/15 bg-black/60 p-3 text-white backdrop-blur transition hover:border-white/40 hover:bg-black/80 md:translate-x-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Card */}
          <div className="relative mx-auto w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.brand}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-t-[32px] rounded-b-[200px] border border-white/10 bg-gradient-to-b from-neutral-900 to-neutral-950 px-6 py-12 text-center md:px-12 md:py-16"
              >
                <h4
                  style={current.brandStyle}
                  className="text-3xl uppercase text-white md:text-5xl"
                >
                  {current.brand}
                </h4>

                <p
                  style={{ fontFamily: '"Dela Gothic One", sans-serif' }}
                  className="mx-auto mt-8 max-w-md whitespace-pre-line text-xl leading-tight text-white md:text-3xl"
                >
                  {current.title}
                </p>

                <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
                  {current.description}
                </p>

                <button
                  onClick={() => navigate(current.href)}
                  className="mt-8 rounded-full border border-white/25 px-7 py-3 text-sm font-medium text-white transition hover:border-white/60 hover:bg-white/5"
                >
                  {current.cta}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {modes.map((m, i) => (
              <button
                key={m.brand}
                onClick={() => setIndex(i)}
                aria-label={`Go to ${m.brand}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
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
