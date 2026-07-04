import { motion } from "framer-motion";
import { UserPlus, MessageSquare, Send, LifeBuoy } from "lucide-react";
import { useT } from "@/lib/i18n";
import { FloatingDecor } from "@/components/landing/FloatingDecor";

const icons = [UserPlus, MessageSquare, Send, LifeBuoy];

export default function About() {
  const t = useT().about;
  return (
    <section id="haqida" data-testid="about-section" className="relative py-24 md:py-32 bg-[#0b0b0b] overflow-hidden">
      <FloatingDecor src="/decor/phone.webp" testId="decor-about-phone" className="hidden xl:block absolute right-16 2xl:right-28 top-20 w-48 2xl:w-56" />
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="font-mono-accent text-taxi text-xs">{t.label}</span>
          <h2 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl tracking-tighter mt-4">{t.title}</h2>
          <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed" data-testid="about-copy">{t.copy}</p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.cards.map((c, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                data-testid={`about-card-${i}`}
                className="tilt-card group border border-white/10 bg-white/[0.03] p-6 hover:border-taxi/50 hover:bg-white/[0.05] transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-taxi/10 border border-taxi/30 flex items-center justify-center mb-5 group-hover:bg-taxi group-hover:text-black text-taxi transition-colors duration-300">
                  <Icon size={22} />
                </div>
                <h3 className="text-white font-extrabold text-base md:text-lg">{c.title}</h3>
                <p className="mt-2 text-white/60 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
