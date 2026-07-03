import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useT } from "@/lib/i18n";

export default function Testimonials() {
  const t = useT().testimonials;
  return (
    <section id="fikrlar" data-testid="testimonials-section" className="relative py-24 md:py-32 bg-[#0b0b0b]">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="font-mono-accent text-taxi text-xs">{t.label}</span>
          <h2 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl tracking-tighter mt-4">{t.title}</h2>
          <p className="mt-4 text-white/60 text-base">{t.sub}</p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              data-testid={`testimonial-card-${i}`}
              className="tilt-card relative border border-white/10 bg-[#0e0e0e] p-7 flex flex-col hover:border-taxi/50 transition-colors duration-300"
            >
              <Quote size={26} className="text-taxi/60 mb-4" />
              <p className="text-white/75 text-sm leading-relaxed flex-1">“{item.text}”</p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="text-white font-extrabold text-sm">{item.name}</div>
                  <div className="text-white/45 text-xs mt-0.5">{t.role}, {item.area}</div>
                </div>
                <div className="w-10 h-10 bg-taxi text-black font-display flex items-center justify-center text-sm rounded-full">
                  {item.name.split(" ").map((w) => w[0]).join("")}
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} className={s < item.stars ? "text-taxi fill-taxi" : "text-white/20"} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
