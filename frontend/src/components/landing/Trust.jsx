import { motion } from "framer-motion";
import { Phone, Send, Clock, MapPin, Camera } from "lucide-react";
import { PHONE, PHONE_DISPLAY, TELEGRAM_HANDLE, TELEGRAM_URL } from "@/lib/brand";
import { useT } from "@/lib/i18n";

export default function Trust() {
  const t = useT();
  const tr = t.trust;
  const blocks = [
    { icon: Phone, label: tr.callcenter, value: PHONE_DISPLAY, href: `tel:${PHONE}` },
    { icon: Send, label: tr.telegram, value: TELEGRAM_HANDLE, href: TELEGRAM_URL },
    { icon: Clock, label: tr.hoursLabel, value: t.office.hours },
    { icon: MapPin, label: tr.addressLabel, value: t.office.address },
  ];

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
          <span className="font-mono-accent text-taxi text-xs">{tr.label}</span>
          <h2 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl tracking-tighter mt-4">{tr.title}</h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {blocks.map((b, i) => {
            const inner = (
              <>
                <b.icon size={22} className="text-taxi mb-4" />
                <div className="font-mono-accent text-white/40 text-[10px]">{b.label}</div>
                <div className="mt-1.5 text-white font-extrabold text-sm md:text-base">{b.value}</div>
              </>
            );
            const cls = "tilt-card block border border-white/10 bg-[#0e0e0e] p-6 hover:border-taxi/50 transition-colors duration-300";
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

        {/* Real photo block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          data-testid="real-photo-block"
          className="mt-10 relative border border-white/10 overflow-hidden group"
        >
          <img src="/cobalt-taxi.jpg" alt={tr.photoCaption} className="w-full h-[260px] md:h-[380px] object-cover group-hover:scale-[1.02] transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 bg-taxi text-black font-mono-accent text-[10px] px-3 py-1.5 flex items-center gap-2">
            <Camera size={12} />
            {tr.photoTag}
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-sm md:text-base">{tr.photoCaption}</div>
        </motion.div>
      </div>
    </section>
  );
}
