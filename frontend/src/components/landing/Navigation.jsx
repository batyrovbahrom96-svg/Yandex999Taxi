import { useState, useEffect } from "react";
import { Menu, X, Phone, Send } from "lucide-react";
import { Logo } from "@/components/landing/Logo";
import { PHONE, TELEGRAM_URL } from "@/lib/brand";

const links = [
  { label: "Bosh sahifa", id: "hero" },
  { label: "Xizmatlar", id: "xizmatlar" },
  { label: "Afzalliklar", id: "afzalliklar" },
  { label: "Qanday ishlaydi", id: "qanday" },
  { label: "Savollar", id: "savollar" },
  { label: "Aloqa", id: "aloqa" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-black/70 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 h-18 md:h-20 flex items-center justify-between py-3">
        <a href="#hero" data-testid="nav-logo" onClick={(e) => go(e, "hero")}>
          <Logo />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => go(e, l.id)}
              data-testid={`nav-link-${l.id}`}
              className="text-sm text-white/70 hover:text-white transition-colors relative group cursor-pointer"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-taxi group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${PHONE}`}
            data-testid="nav-cta-call"
            className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-bold px-5 py-3 hover:border-taxi hover:text-taxi transition-colors"
          >
            <Phone size={15} />
            Qo‘ng‘iroq qilish
          </a>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            data-testid="nav-cta-telegram"
            className="inline-flex items-center gap-2 bg-taxi text-black font-bold text-sm px-5 py-3 hover:bg-[#ffe04d] hover:scale-[1.03] transition-all duration-300"
          >
            <Send size={15} />
            Telegram orqali bog‘lanish
          </a>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          className="lg:hidden text-white"
          onClick={() => setOpen((s) => !s)}
          aria-label="Menyu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-6">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                data-testid={`mobile-nav-link-${l.id}`}
                className="text-white/80 hover:text-taxi text-lg font-display tracking-tighter"
              >
                {l.label}
              </a>
            ))}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              data-testid="mobile-nav-cta-telegram"
              className="bg-taxi text-black font-bold text-sm px-6 py-3 text-center mt-2"
            >
              Telegram orqali bog‘lanish
            </a>
            <a
              href={`tel:${PHONE}`}
              data-testid="mobile-nav-cta-call"
              className="border border-white/20 text-white font-bold text-sm px-6 py-3 text-center"
            >
              Qo‘ng‘iroq qilish
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
