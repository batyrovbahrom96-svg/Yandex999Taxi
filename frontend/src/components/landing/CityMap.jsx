import { Suspense, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

/**
 * Stylized isometric-ish 3D city grid with animated route arcs.
 */
function City() {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = -0.35 + Math.sin(t * 0.15) * 0.08;
  });

  // Deterministic pseudo-random building layout
  const buildings = useMemo(() => {
    const list = [];
    const gridSize = 9;
    const cell = 1.2;
    let seed = 1;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let x = -gridSize; x <= gridSize; x++) {
      for (let z = -gridSize; z <= gridSize; z++) {
        // leave streets on grid lines
        if (Math.abs(x) % 2 === 0 || Math.abs(z) % 2 === 0) continue;
        const h = 0.3 + rand() * 2.4;
        const isYellow = rand() > 0.9;
        list.push({
          pos: [x * cell * 0.5, h / 2, z * cell * 0.5],
          size: [cell * 0.4, h, cell * 0.4],
          color: isYellow ? "#FFCC00" : rand() > 0.5 ? "#1a1a1a" : "#242424",
          emissive: isYellow ? "#FFCC00" : "#000000",
        });
      }
    }
    return list;
  }, []);

  // Yellow route curve
  const routeGeom = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.5, 0.02, -3),
      new THREE.Vector3(-2, 0.02, -1.5),
      new THREE.Vector3(0.5, 0.02, 0.5),
      new THREE.Vector3(2.5, 0.02, 2),
      new THREE.Vector3(4.5, 0.02, 3.5),
    ]);
    return new THREE.TubeGeometry(curve, 80, 0.06, 12, false);
  }, []);

  // Moving marker along route
  const marker = useRef();
  const curveRef = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-4.5, 0.02, -3),
        new THREE.Vector3(-2, 0.02, -1.5),
        new THREE.Vector3(0.5, 0.02, 0.5),
        new THREE.Vector3(2.5, 0.02, 2),
        new THREE.Vector3(4.5, 0.02, 3.5),
      ]),
    []
  );

  useFrame((state) => {
    if (!marker.current) return;
    const t = (state.clock.getElapsedTime() * 0.15) % 1;
    const p = curveRef.getPoint(t);
    marker.current.position.set(p.x, 0.35, p.z);
  });

  return (
    <group ref={group} rotation={[0, -0.35, 0]}>
      {/* Ground */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.2} roughness={0.9} />
      </mesh>
      {/* Grid lines */}
      <gridHelper args={[16, 16, "#222222", "#161616"]} position={[0, 0, 0]} />

      {buildings.map((b, i) => (
        <mesh key={i} position={b.pos} castShadow>
          <boxGeometry args={b.size} />
          <meshStandardMaterial
            color={b.color}
            emissive={b.emissive}
            emissiveIntensity={b.emissive === "#FFCC00" ? 0.6 : 0}
            metalness={0.5}
            roughness={0.55}
          />
        </mesh>
      ))}

      {/* Route arc */}
      <mesh geometry={routeGeom}>
        <meshStandardMaterial
          color="#FFCC00"
          emissive="#FFCC00"
          emissiveIntensity={1.2}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Start/End pins */}
      <mesh position={[-4.5, 0.4, -3]}>
        <coneGeometry args={[0.25, 0.6, 12]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh position={[4.5, 0.4, 3.5]}>
        <coneGeometry args={[0.25, 0.6, 12]} />
        <meshStandardMaterial
          color="#FFCC00"
          emissive="#FFCC00"
          emissiveIntensity={0.9}
        />
      </mesh>

      {/* Moving marker (the taxi) */}
      <mesh ref={marker} position={[0, 0.35, 0]}>
        <boxGeometry args={[0.35, 0.2, 0.5]} />
        <meshStandardMaterial
          color="#FFCC00"
          emissive="#FFCC00"
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

export default function CityMap() {
  return (
    <section
      data-testid="city-map-section"
      className="relative py-24 md:py-32 bg-[#0a0a0a] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="font-mono-accent text-xs text-yandex mb-4">
              // LIVE NETWORK
            </div>
            <h2
              className="font-display text-white text-5xl md:text-6xl lg:text-7xl tracking-tighter"
              data-testid="city-map-title"
            >
              Every street.<br />Every second.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-white/60 text-lg">
              The Yandex Taxi network runs 24/7 — mapping traffic, matching
              riders, and moving cars in real time. Watch a live route play out
              across the grid.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative h-[500px] md:h-[620px] bg-[#0d0d0d] border border-white/10 overflow-hidden"
          data-testid="city-map-canvas"
        >
          {/* corner labels */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 font-mono-accent text-xs text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-yandex animate-pulse-glow" />
            LIVE / MOSCOW GRID
          </div>
          <div className="absolute top-4 right-4 z-10 font-mono-accent text-xs text-white/50">
            LAT 55.7558° / LON 37.6173°
          </div>
          <div className="absolute bottom-4 left-4 z-10 font-mono-accent text-xs text-yandex">
            ROUTE #A-2076
          </div>
          <div className="absolute bottom-4 right-4 z-10 font-mono-accent text-xs text-white/50">
            ETA 12 MIN / 4.7 KM
          </div>

          {/* 3D city canvas */}
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [8, 6.5, 8], fov: 30 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={0.35} />
            <directionalLight
              position={[10, 12, 5]}
              intensity={1.5}
              color="#ffffff"
            />
            <pointLight position={[-6, 3, -3]} intensity={2} color="#ffcc00" />
            <pointLight position={[6, 3, 3]} intensity={1.2} color="#ffcc00" />
            <Suspense fallback={null}>
              <City />
              <Environment preset="night" />
            </Suspense>
            <fog attach="fog" args={["#0a0a0a", 8, 22]} />
          </Canvas>

          {/* overlay stats */}
          <div className="absolute bottom-16 left-4 md:left-8 z-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              { l: "DRIVERS", v: "1,247" },
              { l: "ACTIVE", v: "892" },
              { l: "AVG.WAIT", v: "3.4m" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-2"
                data-testid={`map-stat-${i}`}
              >
                <div className="font-mono-accent text-[10px] text-white/50">
                  {s.l}
                </div>
                <div className="font-display text-white text-xl tracking-tighter">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
