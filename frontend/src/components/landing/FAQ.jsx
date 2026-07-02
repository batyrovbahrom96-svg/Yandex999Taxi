import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "999 Taxi nima xizmat ko‘rsatadi?",
    a: "999 Taxi — taksi haydovchilari uchun ulanish va qo‘llab-quvvatlash xizmati. Biz ishni boshlash, kerakli ma’lumotlarni tushunish va aloqa jarayonini tezlashtirishda yordam beramiz.",
  },
  {
    q: "Yandex Go orqali ishlash uchun qanday bog‘lanaman?",
    a: "Telegram orqali yozing yoki telefon qiling — kerakli bosqichlarni bosqichma-bosqich tushuntirib beramiz.",
  },
  {
    q: "Qancha vaqtda javob olaman?",
    a: "Ish vaqti davomida (har kuni 09:00–21:00) murojaatlarga imkon qadar tez javob beramiz.",
  },
  {
    q: "Qanday hujjatlar kerak?",
    a: "Odatda telefon raqami, haydovchilik guvohnomasi, avtomobil va shaxsiy ma’lumotlar kerak bo‘ladi. Talablar farq qilishi mumkin — aniq ro‘yxat uchun biz bilan bog‘laning.",
  },
  {
    q: "Telegram orqali murojaat qilsam bo‘ladimi?",
    a: "Albatta. Telegram — biz bilan bog‘lanishning eng tez usuli. @t_boxodir manziliga yozing.",
  },
  {
    q: "Bu rasmiy Yandex xizmati hisoblanadimi?",
    a: "999 Taxi haydovchilarga ulanish va ish jarayonini tushunishda yordam beruvchi xizmatdir. Rasmiy maqom va shartlar bo‘yicha aniq ma’lumot olish uchun biz bilan bog‘laning.",
  },
];

export default function FAQ() {
  return (
    <section id="savollar" data-testid="faq-section" className="relative py-24 md:py-32 bg-[#0b0b0b]">
      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="font-mono-accent text-taxi text-xs">10 / SAVOL-JAVOB</span>
          <h2 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl tracking-tighter mt-4">
            Ko‘p so‘raladigan savollar
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                data-testid={`faq-item-${i}`}
                className="border border-white/10 bg-[#0e0e0e] px-6 data-[state=open]:border-taxi/50"
              >
                <AccordionTrigger className="text-white font-bold text-left text-base md:text-lg hover:no-underline hover:text-taxi py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/60 text-sm md:text-base leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
