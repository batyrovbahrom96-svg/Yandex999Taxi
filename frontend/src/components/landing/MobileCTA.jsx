import { Phone, Send, FileText } from "lucide-react";
import { PHONE, TELEGRAM_URL } from "@/lib/brand";

export default function MobileCTA() {
  const goForm = (e) => {
    e.preventDefault();
    document.getElementById("aloqa")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      data-testid="mobile-sticky-cta"
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden grid grid-cols-3 border-t border-white/10 bg-black/90 backdrop-blur-xl"
    >
      <a
        href={`tel:${PHONE}`}
        data-testid="sticky-cta-call"
        className="flex flex-col items-center justify-center gap-1 py-3 text-white active:bg-white/10"
      >
        <Phone size={18} className="text-taxi" />
        <span className="text-[11px] font-bold">Qo‘ng‘iroq</span>
      </a>
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noreferrer"
        data-testid="sticky-cta-telegram"
        className="flex flex-col items-center justify-center gap-1 py-3 bg-taxi text-black active:bg-[#ffe04d]"
      >
        <Send size={18} />
        <span className="text-[11px] font-extrabold">Telegram</span>
      </a>
      <a
        href="#aloqa"
        onClick={goForm}
        data-testid="sticky-cta-form"
        className="flex flex-col items-center justify-center gap-1 py-3 text-white active:bg-white/10"
      >
        <FileText size={18} className="text-taxi" />
        <span className="text-[11px] font-bold">Ariza qoldirish</span>
      </a>
    </div>
  );
}
