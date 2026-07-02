import { motion } from "framer-motion";
import { PlugZap, FileSearch, Car, Send, GraduationCap, Rocket, ArrowRight } from "lucide-react";
import { TELEGRAM_URL } from "@/lib/brand";

const services = [
  { icon: PlugZap, title: "Yandex Go orqali ishlash bo‘yicha ulanish", desc: "Ish boshlash uchun kerakli jarayonni tez va oson tashkil qilamiz." },
  { icon: FileSearch, title: "Haydovchi ma’lumotlarini tekshirish", desc: "Hujjat va ma’lumotlaringiz to‘g‘ri tayyorlanganini ko‘rib chiqamiz." },
  { icon: Car, title: "Avtomobil bo‘yicha yo‘riqnoma", desc: "Avtomobilingizga qo‘yiladigan talablarni tushuntirib beramiz." },
  { icon: Send, title: "Telegram orqali yordam", desc: "Savollaringizga Telegram orqali tezkor javob beramiz." },
  { icon: GraduationCap, title: "Yangi haydovchilar uchun tushuntirish", desc: "Birinchi marta boshlayotganlar uchun bosqichma-bosqich yo‘riqnoma." },
  { icon: Rocket, title: "Ish boshlash jarayonini soddalashtirish", desc: "Ortiqcha ovoragarchiliksiz — faqat kerakli qadamlar." },
];

export default function Services() {
  return (
    <section id="xizmatlar" data-testid="services-section" className="relative py-24 md:py-32 bg-[#050505]">
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div className="relative max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="font-mono-accent text-taxi text-xs">02 / XIZMATLAR</span>
            <h2 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl tracking-tighter mt-4">
              Xizmatlarimiz
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-sm md:text-base">
            Haydovchilar uchun kerak bo‘lgan barcha yordam — bir joyda.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              data-testid={`service-card-${i}`}
              className="tilt-card group relative border border-white/10 bg-[#0e0e0e] p-7 flex flex-col hover:border-taxi/50 transition-colors duration-300"
            >
              <span className="absolute top-5 right-6 font-mono-accent text-white/20 text-xs">
                0{i + 1}
              </span>
              <div className="w-12 h-12 bg-taxi text-black flex items-center justify-center mb-6">
                <s.icon size={22} />
              </div>
              <h3 className="text-white font-extrabold text-base md:text-lg leading-snug">{s.title}</h3>
              <p className="mt-2 text-white/60 text-sm leading-relaxed flex-1">{s.desc}</p>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                data-testid={`service-cta-${i}`}
                className="mt-6 inline-flex items-center gap-2 text-taxi font-bold text-sm group-hover:gap-3 transition-all"
              >
                Bog‘lanish <ArrowRight size={15} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
