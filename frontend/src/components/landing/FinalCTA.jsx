import { motion } from "framer-motion";
import { Send, Phone, FileText } from "lucide-react";
import { PHONE, TELEGRAM_URL } from "@/lib/brand";

export default function FinalCTA() {
  const goForm = (e) => {
    e.preventDefault();
    document.getElementById("aloqa")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section data-testid="final-cta-section" className="relative py-24 md:py-36 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 city-lights pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 road-perspective pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-taxi/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-[1100px] mx-auto px-5 md:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="font-display text-white text-4xl sm:text-5xl lg:text-7xl tracking-tighter"
          data-testid="final-cta-title"
        >
          Bugunoq ish boshlashni<br />
          <span className="text-taxi">xohlaysizmi?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-white/65 text-base md:text-lg max-w-xl mx-auto"
        >
          999 Taxi bilan bog‘laning va kerakli bosqichlarni bilib oling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            data-testid="final-cta-telegram"
            className="inline-flex items-center gap-3 bg-taxi text-black font-extrabold px-8 py-4 hover:bg-[#ffe04d] hover:scale-[1.03] transition-all duration-300"
          >
            <Send size={18} />
            Telegram orqali yozish
          </a>
          <a
            href={`tel:${PHONE}`}
            data-testid="final-cta-call"
            className="inline-flex items-center gap-3 border border-white/25 text-white font-bold px-8 py-4 hover:border-taxi hover:text-taxi transition-colors duration-300"
          >
            <Phone size={17} />
            Qo‘ng‘iroq qilish
          </a>
          <a
            href="#aloqa"
            onClick={goForm}
            data-testid="final-cta-form"
            className="inline-flex items-center gap-3 border border-white/25 text-white font-bold px-8 py-4 hover:border-taxi hover:text-taxi transition-colors duration-300"
          >
            <FileText size={17} />
            Ariza qoldirish
          </a>
        </motion.div>
      </div>
    </section>
  );
}
