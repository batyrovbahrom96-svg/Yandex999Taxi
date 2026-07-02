import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Ride", href: "#hero" },
  { label: "Benefits", href: "#benefits" },
  { label: "Tariffs", href: "#tariffs" },
  { label: "How it works", href: "#how" },
  { label: "App", href: "#app" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        scrolled
          ? "backdrop-blur-xl bg-black/60 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 h-20 flex items-center justify-between">
        <a
          href="#hero"
          data-testid="nav-logo"
          className="flex items-center gap-3 group"
        >
          <div className="relative">
            <div className="w-9 h-9 bg-yandex rounded-md flex items-center justify-center transition-transform group-hover:rotate-12">
              <span className="font-display text-black text-xl">Y</span>
            </div>
            <div className="absolute -inset-1 bg-yandex/40 blur-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-white text-lg tracking-tighter">
              YANDEX
            </span>
            <span className="font-mono-accent text-yandex text-[10px]">
              TAXI / 2026
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              className="text-sm text-white/70 hover:text-white transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-yandex group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#app"
            data-testid="nav-cta-download"
            className="bg-yandex text-black font-bold uppercase tracking-wide text-sm px-6 py-3 hover:bg-[#FFDB4D] hover:scale-105 transition-transform duration-300"
          >
            Download app
          </a>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          className="md:hidden text-white"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-6">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                className="text-white/80 hover:text-yandex text-lg font-display tracking-tighter"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#app"
              data-testid="mobile-nav-cta"
              className="bg-yandex text-black font-bold uppercase tracking-wide text-sm px-6 py-3 text-center mt-2"
            >
              Download app
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
