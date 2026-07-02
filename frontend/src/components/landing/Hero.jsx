import { motion } from "framer-motion";
import { Send, Phone, FileText, Zap, LifeBuoy, MessageCircle, MapPin } from "lucide-react";
import TaxiScene from "@/components/landing/TaxiScene";
import { PHONE, TELEGRAM_URL } from "@/lib/brand";

const badges = [
  { icon: Zap, label: "Tezkor ulanish" },
  { icon: LifeBuoy, label: "Haydovchilar uchun yordam" },
  { icon: MessageCircle, label: "Telegram orqali aloqa" },
  { icon: MapPin, label: "Toshkent bo‘yicha xizmat" },
];

export default function Hero() {
  const goForm = (e) => {
    e.preventDefault();
    document.getElementById("aloqa")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden pt-28 md:pt-32 pb-16"
    >
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-taxi/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

      <div className="relative max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 border border-white/15 bg-white/[0.03] backdrop-blur-md mb-6"
            data-testid="hero-badge"
          >
            <span className="w-2 h-2 rounded-full bg-taxi animate-pulse-glow" />
            <span className="font-mono-accent text-[10px] md:text-xs text-white/80">
              TOSHKENT / HAYDOVCHILAR UCHUN
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-white text-4xl sm:text-5xl lg:text-6xl xl:text-[5.5rem] tracking-tighter"
            data-testid="hero-title"
          >
            <span className="text-taxi">999 Taxi</span> bilan<br />
            tezroq ish<br />
            boshlang<span className="text-redb">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 text-white/70 text-base md:text-lg max-w-xl leading-relaxed"
            data-testid="hero-description"
          >
            Yandex Go orqali ishlashni xohlagan haydovchilar uchun ulanish,
            yordam va qo‘llab-quvvatlash xizmati.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              data-testid="hero-cta-telegram"
              className="group inline-flex items-center gap-3 bg-taxi text-black font-extrabold px-7 py-4 hover:bg-[#ffe04d] hover:scale-[1.03] transition-all duration-300"
            >
              <Send size={18} />
              Telegram orqali bog‘lanish
            </a>
            <a
              href="#aloqa"
              onClick={goForm}
              data-testid="hero-cta-form"
              className="inline-flex items-center gap-3 border border-white/25 text-white font-bold px-7 py-4 hover:border-taxi hover:text-taxi transition-colors duration-300"
            >
              <FileText size={17} />
              Ariza qoldirish
            </a>
            <a
              href={`tel:${PHONE}`}
              data-testid="hero-cta-call"
              className="inline-flex items-center gap-3 border border-white/25 text-white font-bold px-7 py-4 hover:border-taxi hover:text-taxi transition-colors duration-300"
            >
              <Phone size={17} />
              Qo‘ng‘iroq qilish
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
            data-testid="hero-trust-badges"
          >
            {badges.map((b, i) => (
              <div key={i} className="border-l-2 border-taxi/40 pl-3 py-1">
                <b.icon size={16} className="text-taxi mb-1.5" />
                <div className="text-white/80 text-xs font-bold leading-snug">{b.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="lg:col-span-6 relative h-[340px] sm:h-[420px] md:h-[500px] lg:h-[calc(100vh-10rem)] w-full">
          <div className="absolute top-4 left-4 font-mono-accent text-[10px] text-white/50 z-10">
            [999 TAXI / TOSHKENT]
          </div>
          <div className="absolute top-4 right-4 font-mono-accent text-[10px] text-taxi z-10">
            &bull; ONLAYN
          </div>
          <div className="absolute bottom-4 left-4 font-mono-accent text-[10px] text-white/50 z-10">
            360° AYLANTIRING
          </div>
          <div className="absolute inset-0" data-testid="hero-3d-canvas">
            <TaxiScene />
          </div>
        </div>
      </div>
    </section>
  );
}
