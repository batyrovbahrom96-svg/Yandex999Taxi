import { lazy, Suspense, useEffect, useRef, useState, Component } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { Send, Phone, FileText, Zap, LifeBuoy, MessageCircle, MapPin, ChevronDown } from "lucide-react";
import { PHONE, TELEGRAM_URL } from "@/lib/brand";
import { useT } from "@/lib/i18n";
import { track } from "@/lib/analytics";

const CinematicScene = lazy(() => import("@/components/landing/CinematicScene"));

const badgeIcons = [Zap, LifeBuoy, MessageCircle, MapPin];

class SceneErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return (
        <img
          src="/cobalt-taxi.jpg"
          alt="999 Taxi — Chevrolet Cobalt"
          className="w-full h-full object-cover opacity-80"
          data-testid="hero-image-fallback"
        />
      );
    }
    return this.props.children;
  }
}

function SceneLoader() {
  const { progress, item } = useProgress();
  const t = useT().hero;
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (progress >= 100) {
      const id = setTimeout(() => setDone(true), 500);
      return () => clearTimeout(id);
    }
  }, [progress]);
  // safety: once the car model itself is in, never hold the screen for lighting/extras
  useEffect(() => {
    const carLoaded = progress >= 100 || (typeof item === "string" && item.includes("cobalt"));
    const id = setTimeout(() => setDone(true), carLoaded ? 4000 : 15000);
    return () => clearTimeout(id);
  }, [progress, item]);
  if (done) return null;
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505]/80 backdrop-blur-sm pointer-events-none" data-testid="scene-loader">
      <div className="font-display text-taxi text-5xl tracking-tighter">{Math.round(progress)}%</div>
      <div className="mt-4 w-52 h-[3px] bg-white/10 overflow-hidden">
        <div className="h-full bg-taxi transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-3 font-mono-accent text-white/50 text-[10px]">{t.loader}</div>
    </div>
  );
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function HeroContent({ goForm }) {
  const t = useT().hero;
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-3 px-4 py-2 border border-white/15 bg-black/60 backdrop-blur-md mb-6"
        data-testid="hero-badge"
      >
        <span className="w-2 h-2 rounded-full bg-taxi animate-pulse-glow" />
        <span className="font-mono-accent text-[10px] md:text-xs text-white/80">{t.badge}</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="font-display text-white text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4.4rem] tracking-tighter drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        data-testid="hero-title"
      >
        <span className="text-taxi">999 Taxi</span> {t.titleLines[0]}<br />
        {t.titleLines[1]}<br />
        {t.titleLines[2]}<span className="text-redb">.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-5 text-white/90 text-base md:text-lg max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
        data-testid="hero-description"
      >
        {t.desc}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-7 flex flex-wrap items-center gap-3"
      >
        <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" onClick={() => track("cta_telegram", { source: "hero" })} data-testid="hero-cta-telegram" className="inline-flex items-center gap-3 bg-taxi text-black font-extrabold px-7 py-4 hover:bg-[#ffe04d] hover:scale-[1.03] transition-all duration-300">
          <Send size={18} /> {t.ctaTelegram}
        </a>
        <a href="#aloqa" onClick={(e) => { track("cta_form", { source: "hero" }); goForm(e); }} data-testid="hero-cta-form" className="inline-flex items-center gap-3 border border-white/30 bg-black/60 backdrop-blur text-white font-bold px-7 py-4 hover:border-taxi hover:text-taxi transition-colors duration-300">
          <FileText size={17} /> {t.ctaForm}
        </a>
        <a href={`tel:${PHONE}`} onClick={() => track("cta_call", { source: "hero" })} data-testid="hero-cta-call" className="inline-flex items-center gap-3 border border-white/30 bg-black/60 backdrop-blur text-white font-bold px-7 py-4 hover:border-taxi hover:text-taxi transition-colors duration-300">
          <Phone size={17} /> {t.ctaCall}
        </a>
      </motion.div>
    </>
  );
}

function TrustBadges() {
  const t = useT().hero;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl"
      data-testid="hero-trust-badges"
    >
      {t.badges.map((label, i) => {
        const Icon = badgeIcons[i];
        return (
          <div key={i} className="border border-white/10 bg-black/60 backdrop-blur-md p-3">
            <Icon size={15} className="text-taxi mb-1.5" />
            <div className="text-white/85 text-xs font-bold leading-snug">{label}</div>
          </div>
        );
      })}
    </motion.div>
  );
}

export default function Hero() {
  const th = useT().hero;
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  const [webgl] = useState(hasWebGL);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progressRef = useRef(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => (progressRef.current = v));
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => {
      unsub();
      window.removeEventListener("resize", onResize);
    };
  }, [scrollYProgress]);

  const cinematic = webgl;

  const o0 = useTransform(scrollYProgress, [0, 0.16, 0.28], [1, 1, 0]);
  const ev0 = useTransform(o0, (v) => (v > 0.4 ? "auto" : "none"));
  const o1 = useTransform(scrollYProgress, [0.28, 0.37, 0.52, 0.6], [0, 1, 1, 0]);
  const o2 = useTransform(scrollYProgress, [0.6, 0.68, 0.8, 0.86], [0, 1, 1, 0]);
  const o3 = useTransform(scrollYProgress, [0.87, 0.96], [0, 1]);
  const ev3 = useTransform(o3, (v) => (v > 0.4 ? "auto" : "none"));
  const hint = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  const goForm = (e) => {
    e.preventDefault();
    document.getElementById("aloqa")?.scrollIntoView({ behavior: "smooth" });
  };

  /* ---------- No WebGL: static fallback ---------- */
  if (!cinematic) {
    return (
      <section id="hero" ref={ref} data-testid="hero-section" className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="absolute inset-0 radial-glow pointer-events-none" />
        <div className="relative max-w-[1500px] mx-auto px-5 md:px-10 pt-28 pb-32">
          <HeroContent goForm={goForm} />

          <div className="relative mt-8 -mx-5 md:mx-0 h-[300px] sm:h-[360px] border-y md:border border-white/10 bg-[#070707]" data-testid="hero-3d-canvas">
            <img src="/cobalt-taxi.jpg" alt="999 Taxi — Chevrolet Cobalt" className="w-full h-full object-cover" data-testid="hero-image-fallback" />
          </div>

          <div className="mt-8">
            <TrustBadges />
          </div>
        </div>
      </section>
    );
  }

  /* ---------- Cinematic sticky scroll (all devices) ---------- */
  return (
    <section id="hero" ref={ref} data-testid="hero-section" className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="absolute inset-0 radial-glow pointer-events-none" />

        <div className="absolute inset-0" data-testid="hero-3d-canvas">
          <SceneErrorBoundary>
            <Suspense fallback={null}>
              <CinematicScene getProgress={() => progressRef.current} cinematic mobile={isMobile} />
            </Suspense>
            <SceneLoader />
          </SceneErrorBoundary>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

        {/* Stage 0 — hero reveal: text left/top, car framed right/bottom */}
        <motion.div style={{ opacity: o0, pointerEvents: ev0 }} className="absolute inset-0 z-10">
          <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 h-full flex items-start pt-20 lg:items-center lg:pt-0 pointer-events-none">
            <div className="max-w-full lg:max-w-[44%] pointer-events-auto">
              <HeroContent goForm={goForm} />
              <div className="mt-9 hidden lg:block">
                <TrustBadges />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stage 1 — company praise */}
        <motion.div style={{ opacity: o1 }} className="absolute inset-0 z-10 pointer-events-none flex items-start pt-24 lg:items-center lg:pt-0">
          <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 w-full">
            <div className="max-w-md" data-testid="hero-stage-1">
              <span className="font-mono-accent text-taxi text-xs">{th.stage1.tag}</span>
              <h2 className="font-display text-white text-4xl lg:text-6xl tracking-tighter mt-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                {th.stage1.title[0]}<br /><span className="text-taxi">{th.stage1.title[1]}</span>
              </h2>
              <p className="mt-4 text-white/80 text-base leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                {th.stage1.desc}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stage 2 — details close-up */}
        <motion.div style={{ opacity: o2 }} className="absolute inset-0 z-10 pointer-events-none flex items-start pt-24 lg:items-center lg:pt-0 justify-end">
          <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 w-full flex justify-end">
            <div className="max-w-md text-right" data-testid="hero-stage-2">
              <span className="font-mono-accent text-taxi text-xs">{th.stage2.tag}</span>
              <h2 className="font-display text-white text-4xl lg:text-6xl tracking-tighter mt-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                {th.stage2.title[0]}<br />{th.stage2.title[1]}
              </h2>
              <p className="mt-4 text-white/80 text-base leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                {th.stage2.desc}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stage 3 — final CTA */}
        <motion.div style={{ opacity: o3, pointerEvents: ev3 }} className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center px-5" data-testid="hero-stage-3">
            <span className="font-mono-accent text-taxi text-xs">{th.stage3.tag}</span>
            <h2 className="font-display text-white text-4xl lg:text-7xl tracking-tighter mt-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {th.stage3.title[0]}<br />{th.stage3.title[1]}
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" onClick={() => track("cta_telegram", { source: "hero_stage3" })} data-testid="hero-stage3-telegram" className="inline-flex items-center gap-3 bg-taxi text-black font-extrabold px-8 py-4 hover:bg-[#ffe04d] hover:scale-[1.03] transition-all duration-300">
                <Send size={18} /> {th.ctaTelegram}
              </a>
              <a href={`tel:${PHONE}`} onClick={() => track("cta_call", { source: "hero_stage3" })} data-testid="hero-stage3-call" className="inline-flex items-center gap-3 border border-white/30 bg-black/60 backdrop-blur text-white font-bold px-8 py-4 hover:border-taxi hover:text-taxi transition-colors duration-300">
                <Phone size={17} /> {th.ctaCall}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div style={{ opacity: hint }} className="absolute bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none" data-testid="hero-scroll-hint">
          <span className="font-mono-accent text-white/50 text-[10px]">{th.scrollHint}</span>
          <ChevronDown size={18} className="text-taxi animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
