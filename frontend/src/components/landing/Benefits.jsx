import { motion } from "framer-motion";
import { Zap, Shield, Clock, MapPin, Wallet, Sparkles } from "lucide-react";

const items = [
  {
    id: "fast",
    span: "md:col-span-8",
    theme: "dark",
    icon: Zap,
    kicker: "01 / SPEED",
    title: "3.5 min average pickup.",
    body: "Millions of drivers across 600+ cities. Whenever you tap, a car is already turning your way.",
  },
  {
    id: "safety",
    span: "md:col-span-4",
    theme: "yellow",
    icon: Shield,
    kicker: "02 / SAFETY",
    title: "Verified drivers, tracked rides.",
    body: "Every driver is vetted. Every trip is monitored in real time.",
  },
  {
    id: "support",
    span: "md:col-span-4",
    theme: "glass",
    icon: Clock,
    kicker: "03 / 24/7",
    title: "Support that never sleeps.",
    body: "Reach a real human in under 30 seconds — day or night.",
  },
  {
    id: "coverage",
    span: "md:col-span-4",
    theme: "dark",
    icon: MapPin,
    kicker: "04 / REACH",
    title: "600+ cities worldwide.",
    body: "One app, one login, one tap from anywhere on the map.",
  },
  {
    id: "pricing",
    span: "md:col-span-4",
    theme: "dark",
    icon: Wallet,
    kicker: "05 / PRICING",
    title: "See the price before you ride.",
    body: "No surprises. No hidden fees. Ever.",
  },
  {
    id: "premium",
    span: "md:col-span-8",
    theme: "yellow-soft",
    icon: Sparkles,
    kicker: "06 / PREMIUM",
    title: "From Economy to Premier — one fleet, endless options.",
    body: "Whatever the moment calls for — a quick sprint across town or a chauffeured black car for the boardroom — you're one tap away.",
  },
];

function Card({ item, i }) {
  const Icon = item.icon;
  const base =
    "relative group p-8 md:p-12 min-h-[240px] border border-white/10 overflow-hidden transition-all duration-500";
  const themes = {
    dark: "bg-[#121212] hover:bg-[#171717]",
    yellow: "bg-yandex text-black border-yandex hover:bg-[#FFDB4D]",
    "yellow-soft":
      "bg-[#121212] hover:bg-[#181812] border-yandex/40",
    glass:
      "bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06]",
  };

  const isYellow = item.theme === "yellow";
  const isYellowSoft = item.theme === "yellow-soft";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: i * 0.06 }}
      className={`${item.span} col-span-1 ${base} ${themes[item.theme]}`}
      data-testid={`benefit-card-${item.id}`}
    >
      <div
        className={`inline-flex items-center gap-2 font-mono-accent text-xs ${
          isYellow ? "text-black/70" : "text-white/50"
        }`}
      >
        <span>{item.kicker}</span>
      </div>

      <Icon
        size={44}
        strokeWidth={1.5}
        className={`mt-6 ${
          isYellow
            ? "text-black"
            : isYellowSoft
            ? "text-yandex"
            : "text-yandex"
        } group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
      />

      <h3
        className={`font-display text-3xl md:text-4xl lg:text-5xl tracking-tighter mt-6 ${
          isYellow ? "text-black" : "text-white"
        }`}
      >
        {item.title}
      </h3>
      <p
        className={`mt-4 text-base md:text-lg max-w-lg leading-relaxed ${
          isYellow ? "text-black/70" : "text-white/60"
        }`}
      >
        {item.body}
      </p>

      {/* corner accent */}
      <div
        className={`absolute bottom-4 right-4 font-mono-accent text-[10px] ${
          isYellow ? "text-black/40" : "text-white/30"
        }`}
      >
        /{String(i + 1).padStart(2, "0")}
      </div>
    </motion.div>
  );
}

export default function Benefits() {
  return (
    <section
      id="benefits"
      data-testid="benefits-section"
      className="relative py-24 md:py-32 bg-[#0a0a0a]"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="font-mono-accent text-xs text-yandex mb-4">
              // WHY YANDEX TAXI
            </div>
            <h2
              className="font-display text-white text-5xl md:text-6xl lg:text-7xl tracking-tighter max-w-3xl"
              data-testid="benefits-title"
            >
              Built for the pace<br />of your city.
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-lg">
            Six reasons riders keep coming back — and drivers keep signing up.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {items.map((it, i) => (
            <Card item={it} i={i} key={it.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
