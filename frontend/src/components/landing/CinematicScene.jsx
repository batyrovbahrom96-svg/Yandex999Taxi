import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { CobaltModel } from "@/components/landing/CobaltModel";

const KEYS = [
  { pos: [5.4, 1.9, -7.6], look: [1.5, 0.55, 0.95] },
  { pos: [7.2, 1.35, -0.3], look: [0, 0.6, 1.35] },
  { pos: [2.7, 1.9, -4.3], look: [-0.6, 0.9, -1.5] },
  { pos: [-5.2, 2.7, -7.4], look: [0, 0.45, 0] },
];

const smooth = (t) => t * t * (3 - 2 * t);

function CameraRig({ getProgress, cinematic }) {
  const vec = useMemo(() => ({ p: new THREE.Vector3(), l: new THREE.Vector3(), cl: new THREE.Vector3(1.5, 0.55, 0.95) }), []);
  useFrame(({ camera }) => {
    if (!cinematic) {
      camera.lookAt(0, 0.65, 0);
      return;
    }
    const p = THREE.MathUtils.clamp(getProgress(), 0, 1);
    const scaled = p * 3;
    const seg = Math.min(2, Math.floor(scaled));
    const t = smooth(scaled - seg);
    const a = KEYS[seg];
    const b = KEYS[seg + 1];
    vec.p.set(
      THREE.MathUtils.lerp(a.pos[0], b.pos[0], t),
      THREE.MathUtils.lerp(a.pos[1], b.pos[1], t),
      THREE.MathUtils.lerp(a.pos[2], b.pos[2], t)
    );
    vec.l.set(
      THREE.MathUtils.lerp(a.look[0], b.look[0], t),
      THREE.MathUtils.lerp(a.look[1], b.look[1], t),
      THREE.MathUtils.lerp(a.look[2], b.look[2], t)
    );
    camera.position.lerp(vec.p, 0.09);
    vec.cl.lerp(vec.l, 0.09);
    camera.lookAt(vec.cl);
  });
  return null;
}

function IdleCar({ cinematic, getProgress }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    if (!cinematic) {
      ref.current.rotation.y = t * 0.25;
    } else {
      const p = getProgress();
      ref.current.rotation.y = p < 0.05 ? Math.sin(t * 0.3) * 0.08 : THREE.MathUtils.lerp(ref.current.rotation.y, 0, 0.05);
    }
  });
  return (
    <group ref={ref}>
      <CobaltModel />
    </group>
  );
}

function CityBackdrop() {
  const buildings = useMemo(
    () =>
      [
        [-8, -9, 1.6, 4.2], [-4.5, -11, 2.2, 6.0], [-0.5, -12, 2.4, 7.2],
        [3.5, -11, 2.0, 5.2], [7.5, -9, 1.6, 3.8], [11, -11, 2.2, 6.2],
        [-11, -10, 1.8, 5.0],
      ].map(([x, z, w, h]) => ({ x, z, w, h })),
    []
  );
  return (
    <group>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2 - 0.02, b.z]}>
          <boxGeometry args={[b.w, b.h, b.w]} />
          <meshStandardMaterial color="#0e0e0e" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Road() {
  const dashes = useMemo(() => Array.from({ length: 12 }, (_, i) => -14 + i * 2.6), []);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[40, 9]} />
        <meshStandardMaterial color="#070707" roughness={0.95} />
      </mesh>
      {/* subtle lane edges */}
      {[-2.9, 2.9].map((z, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, z]}>
          <planeGeometry args={[40, 0.05]} />
          <meshBasicMaterial color="#FFD400" transparent opacity={0.18} />
        </mesh>
      ))}
      {/* dashed center lines */}
      {dashes.map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, -0.01, 0]}>
          <planeGeometry args={[1.2, 0.08]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.14} />
        </mesh>
      ))}
      {/* showcase ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0, 0]}>
        <ringGeometry args={[3.3, 3.4, 64]} />
        <meshBasicMaterial color="#FFD400" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

export default function CinematicScene({ getProgress, cinematic = true }) {
  return (
    <Canvas
      dpr={cinematic ? [1, 2] : [1, 1.5]}
      shadows
      camera={{ position: cinematic ? [5.4, 1.9, -7.6] : [6.4, 2.2, -9.4], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <hemisphereLight args={["#ffffff", "#1a1a1a", 0.55]} />
      <directionalLight position={[6, 9, 5]} intensity={1.1} castShadow shadow-mapSize={[1024, 1024]} shadow-radius={6} />
      <pointLight position={[-6, 4, -4]} intensity={1.2} color="#FFD400" />
      <pointLight position={[-4, 1.5, 5]} intensity={0.2} color="#E11D2E" />
      <fog attach="fog" args={["#050505", 12, 26]} />

      <Suspense fallback={null}>
        <CityBackdrop />
        <Road />
        <IdleCar cinematic={cinematic} getProgress={getProgress} />
        <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={12} blur={2.2} far={4} color="#000000" />
        <Environment preset="city" />
      </Suspense>

      <CameraRig getProgress={getProgress} cinematic={cinematic} />
    </Canvas>
  );
}
