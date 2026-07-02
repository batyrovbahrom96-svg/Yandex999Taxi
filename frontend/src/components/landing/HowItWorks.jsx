import { Suspense, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { MapPin, Car, Route, Star } from "lucide-react";
import * as THREE from "three";

function SpinningGeo({ position, color, geometry = "box" }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.008;
    ref.current.rotation.y += 0.011;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.15;
  });
  const mat = new THREE.MeshStandardMaterial({
    color,
    metalness: 0.8,
    roughness: 0.2,
    emissive: color,
    emissiveIntensity: 0.15,
  });
  return (
    <mesh ref={ref} position={position} material={mat}>
      {geometry === "box" && <boxGeometry args={[0.8, 0.8, 0.8]} />}
      {geometry === "sphere" && <sphereGeometry args={[0.5, 32, 32]} />}
      {geometry === "octa" && <octahedronGeometry args={[0.6, 0]} />}
      {geometry === "torus" && <torusGeometry args={[0.42, 0.16, 16, 32]} />}
    </mesh>
  );
}

function MiniScene({ shape, color }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 3], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 2]} intensity={1.5} />
      <pointLight position={[-3, -2, -2]} intensity={1.2} color="#ffcc00" />
      <Suspense fallback={null}>
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
          <SpinningGeo position={[0, 0, 0]} color={color} geometry={shape} />
        </Float>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

const steps = [
  {
    id: "destination",
    n: "01",
    title: "Set your destination.",
    body: "Type it, tap it, or drop a pin. The map understands.",
    icon: MapPin,
    shape: "octa",
    color: "#FFCC00",
  },
  {
    id: "choose",
    n: "02",
    title: "Choose your tariff.",
    body: "Economy for the day-to-day, Premier for the moment that matters.",
    icon: Car,
    shape: "box",
    color: "#FFCC00",
  },
  {
    id: "track",
    n: "03",
    title: "Track your driver.",
    body: "Watch them turn onto your street. Real-time, real accurate.",
    icon: Route,
    shape: "torus",
    color: "#FFCC00",
  },
  {
    id: "ride",
    n: "04",
    title: "Enjoy the ride.",
    body: "Rate, tip, and you're done — receipt lands in your inbox.",
    icon: Star,
    shape: "sphere",
    color: "#FFCC00",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      data-testid="how-it-works-section"
      className="relative py-24 md:py-32 bg-[#0a0a0a] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <div className="font-mono-accent text-xs text-yandex mb-4">
              // HOW IT WORKS
            </div>
            <h2
              className="font-display text-white text-5xl md:text-6xl lg:text-7xl tracking-tighter"
              data-testid="how-title"
            >
              Four taps.<br />One ride.
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-lg">
            From open-app to arrive-safely in less time than it takes to make
            coffee.
          </p>
        </div>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[27px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-16 md:space-y-24">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
                  data-testid={`step-${s.id}`}
                >
                  {/* dot on line */}
                  <div className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 top-8 w-4 h-4 rounded-full bg-yandex shadow-[0_0_0_6px_rgba(255,204,0,0.15)]" />

                  {/* Text side */}
                  <div
                    className={`pl-16 md:pl-0 ${
                      isEven ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-3 font-mono-accent text-xs text-yandex mb-3 ${
                        isEven ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <span>{s.n}</span>
                      <span className="w-8 h-px bg-yandex" />
                    </div>
                    <h3 className="font-display text-white text-4xl md:text-5xl lg:text-6xl tracking-tighter">
                      {s.title}
                    </h3>
                    <p className="text-white/60 text-lg mt-4 max-w-md md:ml-auto">
                      {s.body}
                    </p>
                    <div
                      className={`mt-4 inline-flex items-center gap-2 text-white/50 text-sm ${
                        isEven ? "md:ml-auto" : ""
                      }`}
                    >
                      <Icon size={18} className="text-yandex" />
                      <span className="font-mono-accent text-xs">
                        {s.title.split(" ").slice(-1)}
                      </span>
                    </div>
                  </div>

                  {/* 3D side */}
                  <div
                    className={`h-56 md:h-72 relative ${
                      isEven ? "" : "md:col-start-1 md:row-start-1"
                    } pl-16 md:pl-0`}
                  >
                    <div className="w-full h-full bg-[#121212] border border-white/10 relative overflow-hidden">
                      <MiniScene shape={s.shape} color={s.color} />
                      <div className="absolute top-3 left-3 font-mono-accent text-[10px] text-white/40">
                        STEP {s.n}
                      </div>
                      <div className="absolute bottom-3 right-3 font-mono-accent text-[10px] text-yandex">
                        &bull; ACTIVE
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
