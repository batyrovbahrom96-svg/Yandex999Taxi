import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Send, Navigation2 } from "lucide-react";
import { PHONE, PHONE_DISPLAY, TELEGRAM_HANDLE, TELEGRAM_URL } from "@/lib/brand";
import { useT } from "@/lib/i18n";

const MAPS_QUERY = "Qorasuv ko'chasi 39, Yashnobod tumani, Tashkent 100014, Uzbekistan";

export default function OfficeLocation() {
  const t = useT().office;
  return (
    <section id="manzil" data-testid="office-location-section" className="relative py-24 md:py-32 bg-[#050505]">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="relative max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
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
          <p className="mt-4 text-white/60 text-base leading-relaxed max-w-lg">{t.desc}</p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4" data-testid="office-address">
              <span className="w-10 h-10 border border-taxi/40 text-taxi flex items-center justify-center shrink-0">
                <MapPin size={17} />
              </span>
              <div>
                <div className="font-mono-accent text-white/40 text-[10px]">{t.addressLabel}</div>
                <div className="text-white font-bold">{t.address}</div>
              </div>
            </div>
            <div className="flex items-center gap-4" data-testid="office-hours">
              <span className="w-10 h-10 border border-taxi/40 text-taxi flex items-center justify-center shrink-0">
                <Clock size={17} />
              </span>
              <div>
                <div className="font-mono-accent text-white/40 text-[10px]">{t.hoursLabel}</div>
                <div className="text-white font-bold">{t.hours}</div>
              </div>
            </div>
            <div className="flex items-center gap-4" data-testid="office-phone">
              <span className="w-10 h-10 border border-taxi/40 text-taxi flex items-center justify-center shrink-0">
                <Phone size={17} />
              </span>
              <div>
                <div className="font-mono-accent text-white/40 text-[10px]">{t.phoneLabel}</div>
                <a href={`tel:${PHONE}`} className="text-white font-bold hover:text-taxi transition-colors">{PHONE_DISPLAY}</a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`}
              target="_blank"
              rel="noreferrer"
              data-testid="office-directions-cta"
              className="inline-flex items-center gap-3 bg-taxi text-black font-extrabold px-7 py-4 hover:bg-[#ffe04d] transition-colors duration-300"
            >
              <Navigation2 size={17} />
              {t.ctaDirections}
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" data-testid="office-telegram-cta" className="inline-flex items-center gap-3 border border-white/25 text-white font-bold px-7 py-4 hover:border-taxi hover:text-taxi transition-colors duration-300">
              <Send size={16} />
              {TELEGRAM_HANDLE}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative border border-white/10 overflow-hidden"
          data-testid="office-map"
        >
          <iframe
            title={t.mapTitle}
            src={`https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=16&output=embed`}
            className="w-full h-[380px] md:h-[460px] grayscale-[35%] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="absolute top-4 left-4 bg-black/85 backdrop-blur px-4 py-2.5 flex items-center gap-2 border border-taxi/40">
            <MapPin size={14} className="text-taxi" />
            <span className="text-white text-xs font-bold">{t.mapBadge}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
