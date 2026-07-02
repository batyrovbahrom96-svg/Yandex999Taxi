import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { PHONE, PHONE_DISPLAY, TELEGRAM_HANDLE, TELEGRAM_URL, WORK_HOURS, LOCATION, telegramWithText } from "@/lib/brand";

const inputCls =
  "w-full bg-[#0e0e0e] border border-white/15 text-white px-4 py-3.5 text-sm placeholder:text-white/35 focus:outline-none focus:border-taxi transition-colors";

export default function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    telegram: "",
    car: "bor",
    license: "bor",
    note: "",
  });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const msg = [
      "Salom! 999 Taxi saytidan ariza:",
      `Ism: ${form.name}`,
      `Telefon: ${form.phone}`,
      form.telegram ? `Telegram: ${form.telegram}` : null,
      `Avtomobil: ${form.car === "bor" ? "Bor" : "Yo‘q"}`,
      `Guvohnoma: ${form.license === "bor" ? "Bor" : "Yo‘q"}`,
      form.note ? `Izoh: ${form.note}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(telegramWithText(msg), "_blank");
    setSent(true);
  };

  return (
    <section id="aloqa" data-testid="leadform-section" className="relative py-24 md:py-32 bg-[#050505]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-taxi/5 blur-[120px] pointer-events-none" />
      <div className="relative max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <span className="font-mono-accent text-taxi text-xs">11 / ALOQA</span>
          <h2 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl tracking-tighter mt-4">
            Ariza qoldiring
          </h2>
          <p className="mt-4 text-white/60 text-base leading-relaxed max-w-md">
            Ma’lumotlaringizni qoldiring — 999 Taxi jamoasi siz bilan tez orada bog‘lanadi.
          </p>

          <div className="mt-8 space-y-4">
            {[
              { icon: Phone, label: "Telefon", value: PHONE_DISPLAY, href: `tel:${PHONE}` },
              { icon: Send, label: "Telegram", value: TELEGRAM_HANDLE, href: TELEGRAM_URL },
              { icon: MapPin, label: "Manzil", value: LOCATION },
              { icon: Clock, label: "Ish vaqti", value: WORK_HOURS },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-4" data-testid={`contact-info-${i}`}>
                <span className="w-10 h-10 border border-taxi/40 text-taxi flex items-center justify-center shrink-0">
                  <c.icon size={17} />
                </span>
                <div>
                  <div className="font-mono-accent text-white/40 text-[10px]">{c.label}</div>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="text-white font-bold hover:text-taxi transition-colors"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <div className="text-white font-bold">{c.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7"
        >
          {sent ? (
            <div
              data-testid="leadform-success"
              className="h-full min-h-[400px] border border-taxi/40 bg-taxi/5 flex flex-col items-center justify-center text-center p-10"
            >
              <CheckCircle2 size={56} className="text-taxi mb-6" />
              <h3 className="font-display text-white text-3xl tracking-tighter">
                Rahmat!
              </h3>
              <p className="mt-3 text-white/70 text-base max-w-md">
                999 Taxi jamoasi siz bilan tez orada bog‘lanadi.
              </p>
              <button
                data-testid="leadform-reset"
                onClick={() => setSent(false)}
                className="mt-8 border border-white/25 text-white font-bold px-6 py-3 hover:border-taxi hover:text-taxi transition-colors text-sm"
              >
                Yana ariza yuborish
              </button>
            </div>
          ) : (
            <form onSubmit={submit} data-testid="leadform" className="border border-white/10 bg-[#0b0b0b] p-6 md:p-9 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-accent text-white/50 text-[10px] mb-2">Ism *</label>
                  <input
                    required
                    data-testid="leadform-name"
                    className={inputCls}
                    placeholder="Ismingiz"
                    value={form.name}
                    onChange={set("name")}
                  />
                </div>
                <div>
                  <label className="block font-mono-accent text-white/50 text-[10px] mb-2">Telefon raqami *</label>
                  <input
                    required
                    type="tel"
                    data-testid="leadform-phone"
                    className={inputCls}
                    placeholder="+998 90 123 45 67"
                    value={form.phone}
                    onChange={set("phone")}
                  />
                </div>
              </div>
              <div>
                <label className="block font-mono-accent text-white/50 text-[10px] mb-2">Telegram username</label>
                <input
                  data-testid="leadform-telegram"
                  className={inputCls}
                  placeholder="@username"
                  value={form.telegram}
                  onChange={set("telegram")}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-accent text-white/50 text-[10px] mb-2">Avtomobil</label>
                  <select data-testid="leadform-car" className={inputCls} value={form.car} onChange={set("car")}>
                    <option value="bor">Bor</option>
                    <option value="yoq">Yo‘q</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono-accent text-white/50 text-[10px] mb-2">Haydovchilik guvohnomasi</label>
                  <select data-testid="leadform-license" className={inputCls} value={form.license} onChange={set("license")}>
                    <option value="bor">Bor</option>
                    <option value="yoq">Yo‘q</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-mono-accent text-white/50 text-[10px] mb-2">Izoh</label>
                <textarea
                  data-testid="leadform-note"
                  className={`${inputCls} min-h-[100px] resize-y`}
                  placeholder="Qo‘shimcha ma’lumot (ixtiyoriy)"
                  value={form.note}
                  onChange={set("note")}
                />
              </div>
              <button
                type="submit"
                data-testid="leadform-submit"
                className="w-full inline-flex items-center justify-center gap-3 bg-taxi text-black font-extrabold px-8 py-4 hover:bg-[#ffe04d] transition-colors duration-300"
              >
                <Send size={18} />
                Ariza yuborish
              </button>
              <p className="text-white/40 text-xs text-center">
                Ariza Telegram orqali yuboriladi — xabar tayyor holda ochiladi.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
