import { ArrowUpRight, Instagram, Twitter, Youtube } from "lucide-react";

const columns = [
  {
    title: "Riders",
    links: ["Order a ride", "Tariffs", "Airport rides", "Business account"],
  },
  {
    title: "Drivers",
    links: ["Become a driver", "Requirements", "Earnings", "Support"],
  },
  {
    title: "Company",
    links: ["About", "Press", "Careers", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookies", "Compliance"],
  },
];

export default function Footer() {
  return (
    <footer
      data-testid="footer-section"
      className="relative bg-[#0a0a0a] border-t border-white/5 pt-24 md:pt-32 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        {/* CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16 border-b border-white/10">
          <div className="lg:col-span-2">
            <div className="font-mono-accent text-xs text-yandex mb-4">
              // READY?
            </div>
            <h3 className="font-display text-white text-4xl md:text-5xl lg:text-6xl tracking-tighter">
              Get where you&apos;re going.<br />
              <span className="text-yandex">Faster.</span>
            </h3>
          </div>
          <div className="flex items-end">
            <a
              href="#app"
              data-testid="footer-cta"
              className="group inline-flex items-center justify-between gap-4 bg-yandex text-black font-bold uppercase tracking-wide px-8 py-5 w-full lg:w-auto hover:bg-[#FFDB4D] transition-colors"
            >
              Download Yandex Taxi
              <ArrowUpRight
                size={22}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
          {columns.map((col) => (
            <div key={col.title} data-testid={`footer-column-${col.title.toLowerCase()}`}>
              <h4 className="font-mono-accent text-xs text-yandex mb-6">
                {col.title.toUpperCase()}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                      data-testid={`footer-link-${l.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Socials + bottom */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-12 border-t border-white/5 pt-8">
          <div className="flex items-center gap-4">
            {[Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                data-testid={`footer-social-${i}`}
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/60 hover:text-yandex hover:border-yandex transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <div className="font-mono-accent text-xs text-white/40">
            © 2026 YANDEX TAXI. ALL RIGHTS RESERVED. — MADE FOR THE CITY.
          </div>
        </div>
      </div>

      {/* Big brand text */}
      <div
        aria-hidden="true"
        className="relative overflow-hidden select-none pointer-events-none pb-4"
      >
        <div className="font-display text-white/[0.06] tracking-tighter leading-none text-center whitespace-nowrap text-[22vw]">
          YANDEX.TAXI
        </div>
      </div>
    </footer>
  );
}
