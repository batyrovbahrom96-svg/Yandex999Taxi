import { lazy, Suspense, useEffect, useRef, useState, Component } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { Send, Phone, FileText, Zap, LifeBuoy, MessageCircle, MapPin, ChevronDown } from "lucide-react";
import { PHONE, TELEGRAM_URL } from "@/lib/brand";

const CinematicScene = lazy(() => import("@/components/landing/CinematicScene"));

const badges = [
  { icon: Zap, label: "Tezkor ulanish" },
  { icon: LifeBuoy, label: "Haydovchilar uchun yordam" },
  { icon: MessageCircle, label: "Telegram orqali aloqa" },
  { icon: MapPin, label: "Toshkent bo‘yicha xizmat" },
];

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
          className="w-full h-full object-cover opacity-70"
          data-testid="hero-image-fallback"
        />
      );
    }
    return this.props.children;
  }
}

function SceneLoader() {
  const { progress } = useProgress();
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setDone(true), 500);
      return () => clearTimeout(t);
    }
  }, [progress]);
  if (done) return null;
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505]/80 backdrop-blur-sm pointer-events-none" data-testid="scene-loader">
      <div className="font-display text-taxi text-5xl tracking-tighter">{Math.round(progress)}%</div>
      <div className="mt-4 w-52 h-[3px] bg-white/10 overflow-hidden">
        <div className="h-full bg-taxi transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-3 font-mono-accent text-white/50 text-[10px]">3D MODEL YUKLANMOQDA</div>
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

export default function Hero() {
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

  const cinematic = !isMobile && webgl;

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

  const stage0 = (
    <div className="relative max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 pt-28 md:pt-32 lg:pt-0 lg:h-full flex items-start lg:items-center pointer-events-none">
      <div className="lg:max-w-[46%] pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-4 py-2 border border-white/15 bg-black/40 backdrop-blur-md mb-6"
          data-testid="hero-badge"
        >
          <span className="w-2 h-2 rounded-full bg-taxi animate-pulse-glow" />
          <span className="font-mono-accent text-[10px] md:text-xs text-white/80">TOSHKENT / HAYDOVCHILAR UCHUN</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display text-white text-4xl sm:text-5xl lg:text-6xl xl:text-[5rem] tracking-tighter"
          data-testid="hero-title"
        >
          <span className="text-taxi">999 Taxi</span> bilan<br />
          tezroq ish boshlang<span className="text-redb">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 text-white/70 text-base md:text-lg max-w-xl leading-relaxed"
          data-testid="hero-description"
        >
          Yandex Go orqali ishlashni xohlagan haydovchilar uchun ulanish, yordam va qo‘llab-quvvatlash xizmati.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-7 flex flex-wrap items-center gap-3"
        >
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" data-testid="hero-cta-telegram" className="inline-flex items-center gap-3 bg-taxi text-black font-extrabold px-7 py-4 hover:bg-[#ffe04d] hover:scale-[1.03] transition-all duration-300">
            <Send size={18} /> Telegram orqali bog‘lanish
          </a>
          <a href="#aloqa" onClick={goForm} data-testid="hero-cta-form" className="inline-flex items-center gap-3 border border-white/25 bg-black/30 backdrop-blur text-white font-bold px-7 py-4 hover:border-taxi hover:text-taxi transition-colors duration-300">
            <FileText size={17} /> Ariza qoldirish
          </a>
          <a href={`tel:${PHONE}`} data-testid="hero-cta-call" className="inline-flex items-center gap-3 border border-white/25 bg-black/30 backdrop-blur text-white font-bold px-7 py-4 hover:border-taxi hover:text-taxi transition-colors duration-300">
            <Phone size={17} /> Qo‘ng‘iroq qilish
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
          data-testid="hero-trust-badges"
        >
          {badges.map((b, i) => (
            <div key={i} className="border-l-2 border-taxi/40 pl-3 py-1 bg-black/20 backdrop-blur-sm">
              <b.icon size={16} className="text-taxi mb-1.5" />
              <div className="text-white/80 text-xs font-bold leading-snug">{b.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );

  return (
    <section id="hero" ref={ref} data-testid="hero-section" className={`relative ${cinematic ? "h-[400vh]" : ""}`}>
      <div className={`${cinematic ? "sticky top-0 h-screen" : "relative min-h-screen"} w-full overflow-hidden`}>
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="absolute inset-0 radial-glow pointer-events-none" />

        {/* 3D scene */}
        <div className="absolute inset-0" data-testid="hero-3d-canvas">
          {webgl ? (
            <SceneErrorBoundary>
              <Suspense fallback={null}>
                <CinematicScene getProgress={() => progressRef.current} cinematic={cinematic} />
              </Suspense>
              <SceneLoader />
            </SceneErrorBoundary>
          ) : (
            <img src="/cobalt-taxi.jpg" alt="999 Taxi — Chevrolet Cobalt" className="w-full h-full object-cover opacity-70" data-testid="hero-image-fallback" />
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

        {/* Stage 0 — hero reveal */}
        {cinematic ? (
          <motion.div style={{ opacity: o0, pointerEvents: ev0 }} className="absolute inset-0 z-10">
            {stage0}
          </motion.div>
        ) : (
          <div className="relative z-10 pb-24">{stage0}</div>
        )}

        {cinematic && (
          <>
            {/* Stage 1 — side profile */}
            <motion.div style={{ opacity: o1 }} className="absolute inset-0 z-10 pointer-events-none flex items-center">
              <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 w-full">
                <div className="max-w-md" data-testid="hero-stage-1">
                  <span className="font-mono-accent text-taxi text-xs">CHEVROLET COBALT</span>
                  <h2 className="font-display text-white text-4xl lg:text-6xl tracking-tighter mt-3">
                    Toshkent yo‘llari<br />uchun ideal
                  </h2>
                  <p className="mt-4 text-white/65 text-base leading-relaxed">
                    Keng salon, tejamkor dvigatel va ishonchli yurish — Cobalt taksi ishi uchun eng qulay tanlov.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stage 2 — details close-up */}
            <motion.div style={{ opacity: o2 }} className="absolute inset-0 z-10 pointer-events-none flex items-center justify-end">
              <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 w-full flex justify-end">
                <div className="max-w-md text-right" data-testid="hero-stage-2">
                  <span className="font-mono-accent text-taxi text-xs">HAR BIR DETAL JOYIDA</span>
                  <h2 className="font-display text-white text-4xl lg:text-6xl tracking-tighter mt-3">
                    TAXI belgisi.<br />999 brendi.
                  </h2>
                  <p className="mt-4 text-white/65 text-base leading-relaxed">
                    Yorqin chiroqlar, brendlangan eshiklar va professional ko‘rinish — mijoz ishonchini oshiradi.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stage 3 — final CTA */}
            <motion.div style={{ opacity: o3, pointerEvents: ev3 }} className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="text-center px-5" data-testid="hero-stage-3">
                <span className="font-mono-accent text-taxi text-xs">SHAHAR SIZNI KUTMOQDA</span>
                <h2 className="font-display text-white text-4xl lg:text-7xl tracking-tighter mt-3">
                  999 Taxi bilan<br />yo‘lga chiqing
                </h2>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" data-testid="hero-stage3-telegram" className="inline-flex items-center gap-3 bg-taxi text-black font-extrabold px-8 py-4 hover:bg-[#ffe04d] hover:scale-[1.03] transition-all duration-300">
                    <Send size={18} /> Telegram orqali bog‘lanish
                  </a>
                  <a href={`tel:${PHONE}`} data-testid="hero-stage3-call" className="inline-flex items-center gap-3 border border-white/25 bg-black/30 backdrop-blur text-white font-bold px-8 py-4 hover:border-taxi hover:text-taxi transition-colors duration-300">
                    <Phone size={17} /> Qo‘ng‘iroq qilish
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div style={{ opacity: hint }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none" data-testid="hero-scroll-hint">
              <span className="font-mono-accent text-white/50 text-[10px]">PASTGA AYLANTIRING</span>
              <ChevronDown size={18} className="text-taxi animate-bounce" />
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
