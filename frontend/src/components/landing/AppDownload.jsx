import { motion } from "framer-motion";
import { Apple, Play, ShieldCheck, Zap, Sparkles } from "lucide-react";

export default function AppDownload() {
  return (
    <section
      id="app"
      data-testid="app-download-section"
      className="relative py-24 md:py-32 bg-[#0d0d0d] border-t border-white/5 overflow-hidden"
    >
      {/* Diagonal yellow slash */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-yandex/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: text + CTAs */}
        <div>
          <div className="font-mono-accent text-xs text-yandex mb-4">
            // GET THE APP
          </div>
          <h2
            className="font-display text-white text-5xl md:text-6xl lg:text-7xl tracking-tighter"
            data-testid="app-title"
          >
            Your ride.<br />
            <span className="text-yandex">One tap</span> away.
          </h2>
          <p className="text-white/60 text-lg mt-6 max-w-lg">
            Download Yandex Taxi for iOS and Android. Sign in once, ride
            forever. 200 million users can&apos;t be wrong.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#"
              data-testid="app-cta-appstore"
              onClick={(e) => e.preventDefault()}
              className="group inline-flex items-center gap-3 bg-white text-black px-6 py-4 hover:scale-[1.03] transition-transform"
            >
              <Apple size={26} />
              <div className="text-left leading-tight">
                <div className="font-mono-accent text-[10px] text-black/60">
                  DOWNLOAD ON
                </div>
                <div className="font-display text-lg tracking-tighter">
                  App Store
                </div>
              </div>
            </a>
            <a
              href="#"
              data-testid="app-cta-playstore"
              onClick={(e) => e.preventDefault()}
              className="group inline-flex items-center gap-3 bg-yandex text-black px-6 py-4 hover:bg-[#FFDB4D] hover:scale-[1.03] transition-transform"
            >
              <Play size={22} className="fill-black" />
              <div className="text-left leading-tight">
                <div className="font-mono-accent text-[10px] text-black/70">
                  GET IT ON
                </div>
                <div className="font-display text-lg tracking-tighter">
                  Google Play
                </div>
              </div>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
            {[
              { icon: ShieldCheck, l: "Verified", v: "Drivers" },
              { icon: Zap, l: "3.5m", v: "Pickup" },
              { icon: Sparkles, l: "4.9★", v: "Rated" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="border border-white/10 bg-[#121212] p-4"
                  data-testid={`app-stat-${i}`}
                >
                  <Icon size={22} className="text-yandex" />
                  <div className="font-display text-white text-2xl tracking-tighter mt-2">
                    {s.l}
                  </div>
                  <div className="font-mono-accent text-[10px] text-white/50 mt-1">
                    {s.v}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: phone mockup */}
        <div className="relative h-[560px] md:h-[680px] flex items-center justify-center">
          {/* Glow */}
          <div className="absolute inset-0 bg-yandex/15 blur-[120px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 4 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="relative animate-float-slow"
            data-testid="phone-mockup"
          >
            {/* Phone frame */}
            <div className="w-[280px] md:w-[320px] h-[560px] md:h-[640px] rounded-[48px] bg-[#0a0a0a] border-[10px] border-[#1a1a1a] shadow-[0_40px_100px_-20px_rgba(255,204,0,0.4)] overflow-hidden relative">
              {/* Screen */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e] via-[#0a0a0a] to-[#111111] p-5 flex flex-col">
                {/* Notch */}
                <div className="mx-auto w-24 h-6 bg-black rounded-b-2xl mb-3" />

                {/* Top bar */}
                <div className="flex items-center justify-between">
                  <span className="font-mono-accent text-[9px] text-white/60">
                    9:41
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-yandex" />
                    <span className="font-mono-accent text-[9px] text-white/60">
                      5G
                    </span>
                  </div>
                </div>

                {/* Map area */}
                <div className="mt-4 flex-1 bg-[#131313] rounded-2xl relative overflow-hidden border border-white/5">
                  {/* Fake map grid */}
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  {/* Route */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 200 300"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M20,260 C60,220 40,140 100,120 C150,100 140,60 180,40"
                      stroke="#FFCC00"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="6 4"
                    />
                    <circle cx="20" cy="260" r="6" fill="#ffffff" />
                    <circle cx="180" cy="40" r="6" fill="#FFCC00" />
                  </svg>
                  {/* Pulse pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-yandex animate-pulse-glow" />
                </div>

                {/* Bottom card */}
                <div className="mt-4 bg-[#181818] border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-accent text-[10px] text-white/50">
                      ARRIVING
                    </span>
                    <span className="font-mono-accent text-[10px] text-yandex">
                      &bull; 3 MIN
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yandex flex items-center justify-center">
                      <span className="font-display text-black text-lg">A</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-display text-white text-base tracking-tight">
                        Alexei
                      </div>
                      <div className="font-mono-accent text-[10px] text-white/50">
                        HYUNDAI SOLARIS &middot; A123AA
                      </div>
                    </div>
                    <div className="font-display text-yandex text-xl">4.9★</div>
                  </div>
                  <button
                    className="mt-4 w-full bg-yandex text-black font-bold uppercase tracking-wide text-xs py-3"
                    data-testid="phone-mockup-cta"
                  >
                    Order — $6.80
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
