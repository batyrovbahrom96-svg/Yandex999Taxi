import { motion } from "framer-motion";
import { Send, FileText, Route, CheckCircle2 } from "lucide-react";
import { TELEGRAM_URL } from "@/lib/brand";

const steps = [
  { icon: Send, title: "Telegram orqali yozing", desc: "Bizga qisqa xabar yuboring — shu yerdan hammasi boshlanadi." },
  { icon: FileText, title: "Ma’lumotlaringizni yuboring", desc: "Telefon raqami, guvohnoma va avtomobil ma’lumotlari kifoya." },
  { icon: Route, title: "Kerakli bosqichlarni tushuntiramiz", desc: "Har bir qadamni sodda tilda, tartib bilan yetkazamiz." },
  { icon: CheckCircle2, title: "Ish boshlashga tayyor bo‘lasiz", desc: "Qisqa vaqt ichida yo‘lga chiqishga tayyor bo‘lasiz." },
];

export default function Process() {
  return (
    <section id="qanday" data-testid="process-section" className="relative py-24 md:py-32 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-60 pointer-events-none" />
      <div className="relative max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="font-mono-accent text-taxi text-xs">04 / JARAYON</span>
          <h2 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl tracking-tighter mt-4">
            Qanday ishlaydi?
          </h2>
          <p className="mt-4 text-white/60 text-base">
            To‘rt oddiy qadam — va siz ish boshlashga tayyorsiz.
          </p>
        </motion.div>

        <div className="mt-16 relative">
          <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] road-line" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                data-testid={`process-step-${i + 1}`}
                className="relative flex flex-col items-center text-center"
              >
                <div className="tilt-card relative w-[104px] h-[104px] bg-[#0e0e0e] border border-taxi/40 flex items-center justify-center animate-float-slow" style={{ animationDelay: `${i * 0.7}s` }}>
                  <s.icon size={36} className="text-taxi" />
                  <span className="absolute -top-3 -right-3 w-8 h-8 bg-taxi text-black font-display text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-redb" />
                </div>
                <h3 className="mt-6 text-white font-extrabold text-base md:text-lg leading-snug max-w-[220px]">
                  {s.title}
                </h3>
                <p className="mt-2 text-white/55 text-sm leading-relaxed max-w-[240px]">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            data-testid="process-cta-telegram"
            className="inline-flex items-center gap-3 bg-taxi text-black font-extrabold px-8 py-4 hover:bg-[#ffe04d] hover:scale-[1.03] transition-all duration-300"
          >
            <Send size={18} />
            Hoziroq boshlash — Telegram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
