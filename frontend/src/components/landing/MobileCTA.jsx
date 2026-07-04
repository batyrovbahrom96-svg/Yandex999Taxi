import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Send, FileText, PhoneCall, X, CheckCircle2 } from "lucide-react";
import { PHONE, TELEGRAM_URL, telegramWithText } from "@/lib/brand";
import { useT } from "@/lib/i18n";

export default function MobileCTA() {
  const t = useT().mobileCta;
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const goForm = (e) => {
    e.preventDefault();
    document.getElementById("aloqa")?.scrollIntoView({ behavior: "smooth" });
  };

  const close = () => {
    setOpen(false);
    setSent(false);
    setPhone("");
  };

  const submit = (e) => {
    e.preventDefault();
    const url = telegramWithText(`${t.sheet.msg}: ${phone}`);
    const popup = window.open(url, "_blank");
    if (!popup) window.location.href = url;
    setSent(true);
    setTimeout(close, 2500);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-[55] bg-black/70 backdrop-blur-sm lg:hidden"
              data-testid="callback-backdrop"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed bottom-0 left-0 right-0 z-[60] lg:hidden border-t border-taxi/40 bg-[#0b0b0b] p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
              data-testid="callback-sheet"
            >
              <button onClick={close} data-testid="callback-close" className="absolute top-4 right-4 text-white/50 p-1 active:text-white">
                <X size={20} />
              </button>
              {sent ? (
                <div className="flex flex-col items-center text-center py-6" data-testid="callback-success">
                  <CheckCircle2 size={44} className="text-taxi mb-4" />
                  <p className="text-white font-bold text-base">{t.sheet.success}</p>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <h3 className="font-display text-white text-2xl tracking-tighter pr-8">{t.sheet.title}</h3>
                  <p className="mt-2 text-white/60 text-sm">{t.sheet.desc}</p>
                  <input
                    required
                    autoFocus
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.sheet.ph}
                    data-testid="callback-phone-input"
                    className="mt-4 w-full bg-[#0e0e0e] border border-white/15 text-white px-4 py-3.5 text-base placeholder:text-white/35 focus:outline-none focus:border-taxi transition-colors"
                  />
                  <button
                    type="submit"
                    data-testid="callback-submit"
                    className="mt-4 w-full inline-flex items-center justify-center gap-2.5 bg-taxi text-black font-extrabold px-6 py-4 active:bg-[#ffe04d]"
                  >
                    <PhoneCall size={17} />
                    {t.sheet.submit}
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div
        data-testid="mobile-sticky-cta"
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden grid grid-cols-4 border-t border-white/10 bg-black/90 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
      >
        <a href={`tel:${PHONE}`} data-testid="sticky-cta-call" className="flex flex-col items-center justify-center gap-1 py-3 text-white active:bg-white/10">
          <Phone size={18} className="text-taxi" />
          <span className="text-[10px] font-bold">{t.call}</span>
        </a>
        <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" data-testid="sticky-cta-telegram" className="flex flex-col items-center justify-center gap-1 py-3 bg-taxi text-black active:bg-[#ffe04d]">
          <Send size={18} />
          <span className="text-[10px] font-extrabold">{t.telegram}</span>
        </a>
        <button onClick={() => setOpen(true)} data-testid="sticky-cta-callback" className="flex flex-col items-center justify-center gap-1 py-3 text-white active:bg-white/10">
          <PhoneCall size={18} className="text-taxi" />
          <span className="text-[10px] font-bold">{t.callback}</span>
        </button>
        <a href="#aloqa" onClick={goForm} data-testid="sticky-cta-form" className="flex flex-col items-center justify-center gap-1 py-3 text-white active:bg-white/10">
          <FileText size={18} className="text-taxi" />
          <span className="text-[10px] font-bold">{t.form}</span>
        </a>
      </div>
    </>
  );
}
