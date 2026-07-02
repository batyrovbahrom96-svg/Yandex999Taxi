import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Aziz Karimov", role: "Haydovchi, Toshkent", stars: 5, text: "999 Taxi orqali ulanish juda oson bo‘ldi. Telegramga yozdim, ertasiga ishni boshladim. Har bir savolimga sabr bilan javob berishdi." },
  { name: "Bekzod Tursunov", role: "Haydovchi, Chilonzor", stars: 5, text: "Yangi haydovchi sifatida ko‘p narsani bilmasdim. Jamoada hammasini bosqichma-bosqich tushuntirib berishdi. Rahmat!" },
  { name: "Sherzod Alimov", role: "Haydovchi, Yunusobod", stars: 5, text: "Hujjatlarni rasmiylashtirishda katta yordam berishdi. O‘zim yursam bir hafta ketardi, ular bilan bir kunda hal bo‘ldi." },
  { name: "Jasur Rahimov", role: "Haydovchi, Sergeli", stars: 4, text: "Eng yoqqan jihati — tezkor javob. Kechqurun yozsam ham javobsiz qoldirishmaydi. Ishonch bilan tavsiya qilaman." },
  { name: "Dilshod Yusupov", role: "Haydovchi, Mirzo Ulug‘bek", stars: 5, text: "Do‘stim tavsiya qilgandi, hozir o‘zim ham boshqalarga tavsiya qilaman. Ishonchli va samimiy jamoa." },
  { name: "Umid Nazarov", role: "Haydovchi, Olmazor", stars: 5, text: "Ulanish jarayoni sodda va tushunarli ekan. Endi Yandex Go orqali bemalol ishlayapman. 999 Taxi jamoasiga rahmat!" },
];

export default function Testimonials() {
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
          <span className="font-mono-accent text-taxi text-xs">08 / FIKRLAR</span>
          <h2 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl tracking-tighter mt-4">
            Haydovchilar fikrlari
          </h2>
          <p className="mt-4 text-white/60 text-base">
            999 Taxi bilan ishlashni boshlagan haydovchilar tajribasi.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
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
              <p className="text-white/75 text-sm leading-relaxed flex-1">“{t.text}”</p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="text-white font-extrabold text-sm">{t.name}</div>
                  <div className="text-white/45 text-xs mt-0.5">{t.role}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-taxi text-black font-display flex items-center justify-center text-sm rounded-full">
                    {t.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} className={s < t.stars ? "text-taxi fill-taxi" : "text-white/20"} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
