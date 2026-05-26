import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bot, Sparkles, Globe, Code2, Rocket, Clock } from "lucide-react";

const features = [
  { icon: Bot, title: "Autonomous Agent", desc: "Plans, decides and executes tasks end-to-end without hand-holding." },
  { icon: Globe, title: "Browses the Web", desc: "Researches, scrapes and gathers live information across the internet." },
  { icon: Code2, title: "Builds & Codes", desc: "Generates full apps, scripts and tools — then ships them for you." },
  { icon: Rocket, title: "Deploys & Publishes", desc: "Pushes apps live and hands you a shareable link inside the chat." },
  { icon: Clock, title: "Works 24/7", desc: "Runs in the cloud around the clock — no laptop, no babysitting." },
  { icon: Sparkles, title: "Every Domain", desc: "Research, marketing, ops, dev, design — literally anything you throw at it." },
];

const MegsyOSSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-32">
      <div className="absolute left-1/2 top-1/2 -z-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/15 blur-[200px]" />
      <div className="absolute right-0 top-20 -z-0 h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-fuchsia-300">
            <Bot className="h-3.5 w-3.5" /> Megsy OS · Pro+
          </div>
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
            YOUR AUTONOMOUS{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              CLOUD COMPUTER.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/55 md:text-lg">
            Megsy OS is a full cloud workstation with its own browser, terminal and toolchain.
            Give it a goal — it plans, researches, builds, deploys and delivers the link.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-fuchsia-500/40 hover:bg-fuchsia-500/[0.04]"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-pink-500/10 text-fuchsia-300 ring-1 ring-fuchsia-500/30 transition-transform group-hover:scale-110">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-display text-lg font-black uppercase text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-white/55">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => navigate("/auth")}
            className="rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-8 py-3.5 text-sm font-bold text-white shadow-[0_10px_40px_-10px_rgba(236,72,153,0.6)] transition-transform hover:scale-105"
          >
            Try Megsy OS
          </button>
          <button
            onClick={() => navigate("/pricing")}
            className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-bold text-white/80 transition-colors hover:border-white/30 hover:text-white"
          >
            View Plans
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default MegsyOSSection;
