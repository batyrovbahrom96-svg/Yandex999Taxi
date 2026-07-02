import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import TaxiScene from "@/components/landing/TaxiScene";

export default function Hero() {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden pt-28 md:pt-24 pb-16"
    >
      {/* Background grid + glow */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-yandex/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-6rem)]">
        {/* Left column: text */}
        <div className="lg:col-span-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 border border-white/15 bg-white/[0.03] backdrop-blur-md mb-8"
            data-testid="hero-badge"
          >
            <span className="w-2 h-2 rounded-full bg-yandex animate-pulse-glow" />
            <span className="font-mono-accent text-xs text-white/80">
              LIVE / 2M+ RIDES DAILY
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-white text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] tracking-tighter"
            data-testid="hero-title"
          >
            Move to the<br />
            <span className="text-yandex">rhythm</span><br />
            of the city.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 text-white/70 text-lg md:text-xl max-w-xl leading-relaxed"
            data-testid="hero-description"
          >
            Yandex Taxi — the fastest way to get anywhere. Millions of drivers,
            transparent pricing, and a ride that&apos;s always just a tap away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#app"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center gap-3 bg-yandex text-black font-bold uppercase tracking-wide px-8 py-4 hover:bg-[#FFDB4D] hover:scale-[1.03] transition-all duration-300"
            >
              Order now
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#how"
              data-testid="hero-cta-secondary"
              className="group inline-flex items-center gap-3 bg-transparent border border-white/20 text-white font-bold uppercase tracking-wide px-8 py-4 hover:border-white hover:bg-white/5 transition-all duration-300"
            >
              <Play size={16} className="fill-white" />
              How it works
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-xl"
            data-testid="hero-stats"
          >
            {[
              { v: "600+", l: "Cities" },
              { v: "3.5min", l: "Avg. wait" },
              { v: "4.9★", l: "Rating" },
            ].map((s, i) => (
              <div key={i} className="border-l border-white/10 pl-4">
                <div className="font-display text-white text-3xl md:text-4xl">
                  {s.v}
                </div>
                <div className="font-mono-accent text-xs text-white/50 mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column: 3D car */}
        <div className="lg:col-span-6 relative h-[420px] sm:h-[520px] md:h-[620px] w-full">
          {/* corner tickers */}
          <div className="absolute top-4 left-4 font-mono-accent text-xs text-white/50 z-10">
            [MODEL: Y.TAXI-01]
          </div>
          <div className="absolute top-4 right-4 font-mono-accent text-xs text-yandex z-10">
            &bull; LIVE PREVIEW
          </div>
          <div className="absolute bottom-4 left-4 font-mono-accent text-xs text-white/50 z-10">
            360° ROTATE / DRAG
          </div>
          <div className="absolute bottom-4 right-4 font-mono-accent text-xs text-white/50 z-10">
            LAT 55.75 / LON 37.61
          </div>

          <div className="absolute inset-0" data-testid="hero-3d-canvas">
            <TaxiScene />
          </div>
        </div>
      </div>
    </section>
  );
}
