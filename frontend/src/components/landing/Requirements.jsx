import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import { useT } from "@/lib/i18n";

export default function Requirements() {
  const t = useT().requirements;
  return (
    <section id="talablar" data-testid="requirements-section" className="relative py-24 md:py-32 bg-[#0b0b0b]">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono-accent text-taxi text-xs">{t.label}</span>
          <h2 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl tracking-tighter mt-4">
            {t.title[0]}<br />{t.title[1]}
          </h2>
          <div className="mt-8 flex items-start gap-3 border border-white/15 bg-white/[0.03] p-5 max-w-lg" data-testid="requirements-note">
            <Info size={18} className="text-taxi shrink-0 mt-0.5" />
            <p className="text-white/60 text-sm leading-relaxed">{t.note}</p>
          </div>
        </motion.div>

        <div className="space-y-3">
          {t.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              data-testid={`requirement-item-${i}`}
              className="flex items-center gap-4 border border-white/10 bg-[#0e0e0e] px-6 py-5 hover:border-taxi/40 transition-colors"
            >
              <span className="w-8 h-8 bg-taxi text-black flex items-center justify-center shrink-0">
                <Check size={17} strokeWidth={3} />
              </span>
              <span className="text-white font-bold text-base md:text-lg">{item}</span>
              <span className="ml-auto font-mono-accent text-white/25 text-xs">0{i + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
