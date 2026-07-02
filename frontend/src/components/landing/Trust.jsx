import { motion } from "framer-motion";
import { Phone, Send, Clock, MapPin } from "lucide-react";
import { PHONE, PHONE_DISPLAY, TELEGRAM_HANDLE, TELEGRAM_URL, WORK_HOURS, LOCATION } from "@/lib/brand";

const blocks = [
  { icon: Phone, label: "Telefon", value: PHONE_DISPLAY, href: `tel:${PHONE}` },
  { icon: Send, label: "Telegram", value: TELEGRAM_HANDLE, href: TELEGRAM_URL },
  { icon: Clock, label: "Ish vaqti", value: WORK_HOURS },
  { icon: MapPin, label: "Manzil", value: LOCATION },
];

export default function Trust() {
  return (
    <section id="ishonch" data-testid="trust-section" className="relative py-24 md:py-32 bg-[#050505]">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="relative max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="font-mono-accent text-taxi text-xs">07 / ISHONCH</span>
          <h2 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl tracking-tighter mt-4">
            Ishonchli va tezkor aloqa
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {blocks.map((b, i) => {
            const inner = (
              <>
                <b.icon size={22} className="text-taxi mb-4" />
                <div className="font-mono-accent text-white/40 text-[10px]">{b.label}</div>
                <div className="mt-1.5 text-white font-extrabold text-base md:text-lg">{b.value}</div>
              </>
            );
            const cls =
              "tilt-card block border border-white/10 bg-[#0e0e0e] p-6 hover:border-taxi/50 transition-colors duration-300";
            return b.href ? (
              <motion.a
                key={i}
                href={b.href}
                target={b.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                data-testid={`trust-block-${i}`}
                className={cls}
              >
                {inner}
              </motion.a>
            ) : (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                data-testid={`trust-block-${i}`}
                className={cls}
              >
                {inner}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
