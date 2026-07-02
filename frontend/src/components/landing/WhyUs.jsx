import { motion } from "framer-motion";
import { Zap, BookOpen, MapPin, PhoneCall, ListChecks, Sparkles } from "lucide-react";

const reasons = [
  { icon: Zap, title: "Tezkor javob", desc: "Murojaatingizga imkon qadar tez javob beramiz." },
  { icon: BookOpen, title: "Oddiy tushuntirish", desc: "Murakkab jarayonlarni sodda tilda yetkazamiz." },
  { icon: MapPin, title: "Toshkentdagi haydovchilar uchun qulay", desc: "Mahalliy sharoitni yaxshi bilamiz." },
  { icon: PhoneCall, title: "Telefon va Telegram orqali aloqa", desc: "Sizga qulay bo‘lgan usulda bog‘laning." },
  { icon: ListChecks, title: "Aniq bosqichma-bosqich yo‘riqnoma", desc: "Har bir qadam oldindan tushunarli bo‘ladi." },
  { icon: Sparkles, title: "Yangi haydovchilar uchun qulay boshlanish", desc: "Tajribasiz bo‘lsangiz ham bemalol boshlaysiz." },
];

export default function WhyUs() {
  return (
    <section id="afzalliklar" data-testid="whyus-section" className="relative py-24 md:py-32 bg-[#0b0b0b]">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="font-mono-accent text-taxi text-xs">03 / AFZALLIKLAR</span>
          <h2 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl tracking-tighter mt-4">
            Nega haydovchilar<br />
            <span className="text-taxi">999 Taxi</span>’ni tanlaydi?
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              data-testid={`whyus-card-${i}`}
              className="group bg-[#0b0b0b] p-7 md:p-9 hover:bg-[#101010] transition-colors duration-300"
            >
              <r.icon size={24} className="text-taxi mb-5" />
              <h3 className="text-white font-extrabold text-base md:text-lg">{r.title}</h3>
              <p className="mt-2 text-white/55 text-sm leading-relaxed">{r.desc}</p>
              <div className="mt-5 w-8 h-[3px] bg-redb group-hover:w-16 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
