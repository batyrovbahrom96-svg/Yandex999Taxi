import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";

const tariffs = [
  {
    id: "economy",
    name: "Economy",
    tag: "Everyday",
    price: "$4.20",
    per: "from",
    desc: "Fast, affordable rides for the everyday commute.",
    features: ["4-seat sedans", "AC standard", "Card & cash", "3.5 min pickup"],
    featured: false,
  },
  {
    id: "comfort",
    name: "Comfort",
    tag: "Balanced",
    price: "$6.80",
    per: "from",
    desc: "More legroom, higher-rated drivers, no compromise.",
    features: [
      "Newer vehicles",
      "Top-rated drivers",
      "Extra legroom",
      "Free waiting +3 min",
    ],
    featured: true,
  },
  {
    id: "business",
    name: "Business",
    tag: "Premium",
    price: "$11.90",
    per: "from",
    desc: "Executive cars with a professional touch.",
    features: [
      "Business-class fleet",
      "Suit & tie drivers",
      "Complimentary water",
      "Priority dispatch",
    ],
    featured: false,
  },
  {
    id: "premier",
    name: "Premier",
    tag: "Luxury",
    price: "$18.50",
    per: "from",
    desc: "Chauffeured black-car service. On demand.",
    features: [
      "Luxury sedans",
      "Chauffeur trained",
      "Meet-and-greet",
      "Silent ride option",
    ],
    featured: false,
  },
];

export default function Tariffs() {
  return (
    <section
      id="tariffs"
      data-testid="tariffs-section"
      className="relative py-24 md:py-32 bg-[#0a0a0a] border-t border-white/5"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="font-mono-accent text-xs text-yandex mb-4">
              // TARIFFS
            </div>
            <h2
              className="font-display text-white text-5xl md:text-6xl lg:text-7xl tracking-tighter"
              data-testid="tariffs-title"
            >
              A ride for<br />every moment.
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-lg">
            Transparent pricing, no surge chaos. Pick the class that fits your
            mood — the price you see is the price you pay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tariffs.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative p-8 border transition-all duration-500 flex flex-col ${
                t.featured
                  ? "bg-yandex text-black border-yandex hover:bg-[#FFDB4D]"
                  : "bg-[#121212] border-white/10 hover:border-l-4 hover:border-l-yandex hover:bg-[#161616]"
              }`}
              data-testid={`tariff-card-${t.id}`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`font-mono-accent text-[10px] px-2 py-1 border ${
                    t.featured
                      ? "border-black/30 text-black/80"
                      : "border-white/20 text-white/60"
                  }`}
                >
                  {t.tag}
                </span>
                <ArrowUpRight
                  size={22}
                  className={`opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-500 ${
                    t.featured ? "text-black" : "text-yandex"
                  }`}
                />
              </div>

              <h3
                className={`font-display text-4xl md:text-5xl mt-8 tracking-tighter ${
                  t.featured ? "text-black" : "text-white"
                }`}
              >
                {t.name}
              </h3>
              <p
                className={`mt-3 text-sm min-h-[3rem] ${
                  t.featured ? "text-black/70" : "text-white/60"
                }`}
              >
                {t.desc}
              </p>

              <div
                className={`mt-6 flex items-baseline gap-2 pb-6 border-b ${
                  t.featured ? "border-black/20" : "border-white/10"
                }`}
              >
                <span
                  className={`font-mono-accent text-xs ${
                    t.featured ? "text-black/60" : "text-white/50"
                  }`}
                >
                  {t.per}
                </span>
                <span
                  className={`font-display text-4xl tracking-tighter ${
                    t.featured ? "text-black" : "text-white"
                  }`}
                >
                  {t.price}
                </span>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-center gap-3 text-sm ${
                      t.featured ? "text-black/80" : "text-white/70"
                    }`}
                  >
                    <Check
                      size={16}
                      className={
                        t.featured ? "text-black" : "text-yandex shrink-0"
                      }
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#app"
                data-testid={`tariff-cta-${t.id}`}
                className={`mt-8 inline-flex items-center justify-center gap-2 uppercase tracking-wide text-sm font-bold py-3 transition-all ${
                  t.featured
                    ? "bg-black text-yandex hover:bg-[#1a1a1a]"
                    : "border border-white/20 text-white hover:border-yandex hover:text-yandex"
                }`}
              >
                Select {t.name}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
