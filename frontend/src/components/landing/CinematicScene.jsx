import { Component, Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { CobaltModel, lightMats } from "@/components/landing/CobaltModel";

class EnvBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const KEYS = [
  { pos: [5.4, 1.9, -7.6], look: [1.5, 0.55, 0.95] },
  { pos: [7.2, 1.35, -0.3], look: [0, 0.6, 1.35] },
  { pos: [2.7, 1.9, -4.3], look: [-0.6, 0.9, -1.5] },
  { pos: [-5.2, 2.7, -7.4], look: [0, 0.45, 0] },
];

/* portrait framing: camera looks slightly above the car so it sits in the lower half, clear of text */
const KEYS_MOBILE = [
  { pos: [4.6, 1.8, -9.6], look: [0.3, 1.75, 0.3] },
  { pos: [7.0, 1.5, -1.0], look: [0, 1.35, 1.0] },
  { pos: [2.7, 1.9, -5.0], look: [-0.5, 1.5, -1.4] },
  { pos: [-4.9, 2.8, -8.8], look: [0, 1.15, 0] },
];

const smooth = (t) => t * t * (3 - 2 * t);

function CameraRig({ getProgress, cinematic, keys }) {
  const vec = useMemo(() => ({ p: new THREE.Vector3(), l: new THREE.Vector3(), cl: new THREE.Vector3(...keys[0].look) }), [keys]);
  useFrame(({ camera }) => {
    if (!cinematic) {
      camera.lookAt(0, 0.65, 0);
      return;
    }
    const p = THREE.MathUtils.clamp(getProgress(), 0, 1);
    const scaled = p * 3;
    const seg = Math.min(2, Math.floor(scaled));
    const t = smooth(scaled - seg);
    const a = keys[seg];
    const b = keys[seg + 1];
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

function IdleCar({ cinematic, getProgress, small, onDrag }) {
  const ref = useRef();
  const d = useRef({ down: false, lastX: 0, off: 0, vel: 0, base: 0, idle: 0, notified: false });
  const { gl } = useThree();

  useEffect(() => {
    if (!cinematic) return;
    const el = gl.domElement;
    const s = d.current;
    const down = (e) => {
      if (getProgress() > 0.12) return;
      s.down = true;
      s.lastX = e.clientX;
    };
    const move = (e) => {
      if (!s.down) return;
      const dx = e.clientX - s.lastX;
      s.lastX = e.clientX;
      s.off += dx * 0.008;
      s.vel = dx * 0.008;
      s.idle = 0;
      if (!s.notified && Math.abs(dx) > 2) {
        s.notified = true;
        if (onDrag) onDrag();
      }
    };
    const up = () => (s.down = false);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.style.cursor = "grab";
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [cinematic, gl, getProgress, onDrag]);

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    if (!cinematic) {
      ref.current.rotation.y = t * 0.18;
      return;
    }
    const s = d.current;
    const p = getProgress();
    if (!s.down) {
      s.off += s.vel;
      s.vel *= 0.94;
      s.idle += delta;
    }
    if (p > 0.12 || s.idle > 4) s.off = THREE.MathUtils.lerp(s.off, 0, 0.04);
    s.base = THREE.MathUtils.lerp(s.base, p < 0.05 && Math.abs(s.off) < 0.02 ? Math.sin(t * 0.3) * 0.08 : 0, 0.05);
    ref.current.rotation.y = s.base + s.off;
  });
  const sc = small ? 0.85 : 1;
  return (
    <group ref={ref} scale={[sc, sc, sc]}>
      <CobaltModel />
    </group>
  );
}

/* headlight beams + unlock flash at the final stage + welcoming cabin glow */
function Headlights({ getProgress }) {
  const spotL = useRef();
  const spotR = useRef();
  const coneL = useRef();
  const coneR = useRef();
  const cabin = useRef();
  const st = useRef({ entered: false, t0: 0 });
  const [tgtL, tgtR] = useMemo(() => {
    const a = new THREE.Object3D();
    a.position.set(-0.62, 0.05, -10);
    const b = new THREE.Object3D();
    b.position.set(0.62, 0.05, -10);
    return [a, b];
  }, []);

  useFrame(({ clock }) => {
    const p = getProgress();
    const t = clock.getElapsedTime();
    let beam;
    let cab = 0;
    if (p > 0.86) {
      if (!st.current.entered) {
        st.current.entered = true;
        st.current.t0 = t;
      }
      const dt = t - st.current.t0;
      beam = dt < 0.64 ? ((dt % 0.32) < 0.17 ? 1 : 0) : Math.min(1, (dt - 0.64) * 2.2);
      cab = Math.min(1.6, Math.max(0, dt - 0.5) * 1.6);
    } else {
      st.current.entered = false;
      beam = p > 0.28 ? 0.4 : 0;
    }
    if (spotL.current) spotL.current.intensity = beam * 60;
    if (spotR.current) spotR.current.intensity = beam * 60;
    if (coneL.current) coneL.current.material.opacity = beam * 0.09;
    if (coneR.current) coneR.current.material.opacity = beam * 0.09;
    if (cabin.current) cabin.current.intensity = cab;
    for (const m of lightMats.front) m.emissiveIntensity = 0.2 + beam * 3.4;
  });

  const cone = (ref, x) => (
    <mesh ref={ref} position={[x, 0.5, -4.9]} rotation={[Math.PI / 2, 0, 0]} renderOrder={2}>
      <coneGeometry args={[0.55, 5.6, 20, 1, true]} />
      <meshBasicMaterial color="#ffe9a8" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );

  return (
    <group>
      <primitive object={tgtL} />
      <primitive object={tgtR} />
      <spotLight ref={spotL} position={[-0.62, 0.66, -2.0]} target={tgtL} angle={0.42} penumbra={0.75} distance={15} decay={1.4} color="#ffedb8" intensity={0} />
      <spotLight ref={spotR} position={[0.62, 0.66, -2.0]} target={tgtR} angle={0.42} penumbra={0.75} distance={15} decay={1.4} color="#ffedb8" intensity={0} />
      {cone(coneL, -0.62)}
      {cone(coneR, 0.62)}
      <pointLight ref={cabin} position={[0, 1.15, 0.1]} distance={3.2} decay={1.5} color="#ffd98f" intensity={0} />
    </group>
  );
}

/* street lamps sweeping over the paint as the user scrolls */
function StreetGlow({ getProgress }) {
  const a = useRef();
  const b = useRef();
  useFrame(() => {
    const p = getProgress();
    if (a.current) a.current.position.z = ((p * 38) % 14) - 7;
    if (b.current) b.current.position.z = ((p * 38 + 7) % 14) - 7;
  });
  return (
    <>
      <pointLight ref={a} position={[1.9, 3.4, 0]} color="#fff3c4" distance={7.5} decay={1.8} intensity={2.4} />
      <pointLight ref={b} position={[-2.3, 3.7, 0]} color="#cfe4ff" distance={7.5} decay={1.8} intensity={1.7} />
    </>
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

export default function CinematicScene({ getProgress, cinematic = true, small = false, mobile = false, onDrag }) {
  const keys = mobile ? KEYS_MOBILE : KEYS;
  return (
    <Canvas
      dpr={mobile ? [1, 1.5] : cinematic ? [1, 2] : [1, 1.5]}
      shadows={cinematic && !mobile}
      camera={{ position: cinematic ? keys[0].pos : small ? [6.6, 2.2, -9.6] : [6.4, 2.2, -9.4], fov: mobile ? 42 : small ? 34 : 32 }}
      gl={{ antialias: !mobile && !small, alpha: true }}
      style={{ background: "transparent", touchAction: "pan-y" }}
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
        <IdleCar cinematic={cinematic} getProgress={getProgress} small={small} onDrag={onDrag} />
        {cinematic && <Headlights getProgress={getProgress} />}
        {cinematic && <StreetGlow getProgress={getProgress} />}
        <ContactShadows position={[0, 0.01, 0]} opacity={cinematic ? 0.6 : 0.45} scale={12} blur={cinematic ? 2.2 : 1.6} far={4} color="#000000" />
      </Suspense>
      <EnvBoundary>
        <Suspense fallback={null}>
          <Environment files="/env/city.hdr" />
        </Suspense>
      </EnvBoundary>

      <CameraRig getProgress={getProgress} cinematic={cinematic} keys={keys} />
    </Canvas>
  );
}
