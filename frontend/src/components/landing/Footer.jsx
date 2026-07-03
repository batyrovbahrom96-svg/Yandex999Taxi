import { Phone, Send } from "lucide-react";
import { Logo } from "@/components/landing/Logo";
import { PHONE, PHONE_DISPLAY, TELEGRAM_HANDLE, TELEGRAM_URL } from "@/lib/brand";
import { useT } from "@/lib/i18n";

export default function Footer() {
  const t = useT().footer;
  const go = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer data-testid="footer-section" className="relative bg-[#030303] border-t border-white/10 pt-16 pb-28 lg:pb-10">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Logo size="lg" />
            <p className="mt-5 text-white/55 text-sm leading-relaxed max-w-xs" data-testid="footer-copy">{t.copy}</p>
          </div>

          <div>
            <div className="font-mono-accent text-white/40 text-[10px] mb-4">{t.pages}</div>
            <nav className="flex flex-col gap-3">
              {t.links.map((l) => (
                <a key={l.id} href={`#${l.id}`} onClick={(e) => go(e, l.id)} data-testid={`footer-link-${l.id}`} className="text-white/70 hover:text-taxi text-sm font-bold transition-colors w-fit">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <div className="font-mono-accent text-white/40 text-[10px] mb-4">{t.contact}</div>
            <div className="flex flex-col gap-3">
              <a href={`tel:${PHONE}`} data-testid="footer-phone" className="inline-flex items-center gap-2 text-white/70 hover:text-taxi text-sm font-bold transition-colors w-fit">
                <Phone size={14} className="text-taxi" /> {PHONE_DISPLAY}
              </a>
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" data-testid="footer-telegram" className="inline-flex items-center gap-2 text-white/70 hover:text-taxi text-sm font-bold transition-colors w-fit">
                <Send size={14} className="text-taxi" /> {TELEGRAM_HANDLE}
              </a>
              <span className="text-white/50 text-sm">{t.address}</span>
              <span className="text-white/50 text-sm">{t.hours}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10">
          <p className="text-white/35 text-xs leading-relaxed max-w-3xl" data-testid="footer-legal-note">{t.legal}</p>
          <p className="mt-4 text-white/30 text-xs">
            © {new Date().getFullYear()} 999 Taxi. {t.rights}
            <span className="mx-2 text-white/20">|</span>
            <span data-testid="footer-3d-credit">3D model credit: Q.SARDOR / CC BY 4.0</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
