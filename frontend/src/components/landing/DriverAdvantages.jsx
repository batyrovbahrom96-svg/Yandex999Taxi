import { motion } from "framer-motion";
import { TrendingUp, Wallet, Headset, ShieldCheck, Clock, Users, Send } from "lucide-react";
import { TELEGRAM_URL } from "@/lib/brand";
import { useT } from "@/lib/i18n";

const icons = [TrendingUp, Wallet, Headset, ShieldCheck, Clock, Users];

export default function DriverAdvantages() {
  const t = useT().advantages;
  return (
    <section id="tizim" data-testid="driver-advantages-section" className="relative py-24 md:py-32 bg-taxi overflow-hidden">
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-black/5 pointer-events-none" />
      <div className="absolute -bottom-32 -left-16 w-[500px] h-[500px] rounded-full bg-black/5 pointer-events-none" />
      <div className="relative max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="font-mono-accent text-black/60 text-xs">{t.label}</span>
            <h2 className="font-display text-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter mt-4">
              {t.title[0]}<br />{t.title[1]}
            </h2>
          </div>
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" data-testid="advantages-cta-telegram" className="inline-flex items-center gap-3 bg-black text-taxi font-extrabold px-7 py-4 hover:scale-[1.03] transition-transform duration-300 w-fit">
            <Send size={17} />
            {t.cta}
          </a>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.cards.map((a, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                data-testid={`advantage-card-${i}`}
                className="tilt-card bg-black p-7 group"
              >
                <div className="w-12 h-12 bg-taxi text-black flex items-center justify-center mb-6">
                  <Icon size={22} />
                </div>
                <h3 className="text-white font-extrabold text-base md:text-lg leading-snug">{a.title}</h3>
                <p className="mt-2 text-white/60 text-sm leading-relaxed">{a.desc}</p>
                <div className="mt-5 w-8 h-[3px] bg-redb group-hover:w-16 transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
