import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { CobaltModel } from "@/components/landing/CobaltModel";

const KEYS = [
  { pos: [3.9, 1.7, -5.4], look: [0, 0.6, -0.4] },
  { pos: [6.2, 1.15, -0.2], look: [0, 0.65, 0] },
  { pos: [1.7, 1.6, -3.0], look: [0.1, 1.0, -0.9] },
  { pos: [-4.4, 2.5, -6.4], look: [0, 0.5, 0] },
];

const smooth = (t) => t * t * (3 - 2 * t);

function CameraRig({ getProgress, cinematic }) {
  const vec = useMemo(() => ({ p: new THREE.Vector3(), l: new THREE.Vector3(), cl: new THREE.Vector3(0, 0.6, -0.4) }), []);
  useFrame(({ camera }) => {
    let p = 0;
    if (cinematic) p = THREE.MathUtils.clamp(getProgress(), 0, 1);
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
  const dashes = useMemo(() => Array.from({ length: 14 }, (_, i) => -18 + i * 2.6), []);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[60, 12]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.92} />
      </mesh>
      {/* route glow strips */}
      {[-3.4, 3.4].map((z, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, z]}>
          <planeGeometry args={[60, 0.08]} />
          <meshBasicMaterial color="#FFD400" transparent opacity={0.5} />
        </mesh>
      ))}
      {/* dashed center lines */}
      {dashes.map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, -0.01, 0]}>
          <planeGeometry args={[1.3, 0.1]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.22} />
        </mesh>
      ))}
      {/* showcase ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0, 0]}>
        <ringGeometry args={[3.3, 3.42, 64]} />
        <meshBasicMaterial color="#FFD400" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export default function CinematicScene({ getProgress, cinematic = true }) {
  return (
    <Canvas
      dpr={cinematic ? [1, 2] : [1, 1.5]}
      shadows
      camera={{ position: [3.9, 1.7, -5.4], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 9, 5]} intensity={1.3} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-6, 4, -4]} intensity={1.6} color="#FFD400" />
      <pointLight position={[-4, 1.5, 5]} intensity={0.25} color="#E11D2E" />
      <fog attach="fog" args={["#050505", 14, 30]} />

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
