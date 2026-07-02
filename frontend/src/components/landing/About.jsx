import { motion } from "framer-motion";
import { UserPlus, MessageSquare, Send, LifeBuoy } from "lucide-react";

const cards = [
  { icon: UserPlus, title: "Ro‘yxatdan o‘tishga yordam", desc: "Ishni boshlash uchun kerakli bosqichlarni birga bosib o‘tamiz." },
  { icon: MessageSquare, title: "Haydovchilar uchun maslahat", desc: "Savollaringizga oddiy va tushunarli tilda javob beramiz." },
  { icon: Send, title: "Telegram orqali tezkor aloqa", desc: "Yozing — qisqa vaqt ichida javob olasiz." },
  { icon: LifeBuoy, title: "Ish jarayonida qo‘llab-quvvatlash", desc: "Boshlaganingizdan keyin ham yoningizda bo‘lamiz." },
];

export default function About() {
  return (
    <section id="haqida" data-testid="about-section" className="relative py-24 md:py-32 bg-[#0b0b0b]">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="font-mono-accent text-taxi text-xs">01 / BIZ HAQIMIZDA</span>
          <h2 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl tracking-tighter mt-4">
            999 Taxi nima qiladi?
          </h2>
          <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed" data-testid="about-copy">
            999 Taxi — taksi haydovchilari uchun ulanish va qo‘llab-quvvatlash
            xizmati. Biz haydovchilarga ishni boshlash, kerakli ma’lumotlarni
            tushunish va aloqa jarayonini tezlashtirishda yordam beramiz.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
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
                <c.icon size={22} />
              </div>
              <h3 className="text-white font-extrabold text-base md:text-lg">{c.title}</h3>
              <p className="mt-2 text-white/60 text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
