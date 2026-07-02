import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PresentationControls, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

function makeTextTexture(text, { color = "#000", outline = null, w = 512, h = 256, fontSize = 150 }) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.font = `900 ${fontSize}px 'Arial Black', Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (outline) {
    ctx.lineWidth = 16;
    ctx.strokeStyle = outline;
    ctx.strokeText(text, w / 2, h / 2);
  }
  ctx.fillStyle = color;
  ctx.fillText(text, w / 2, h / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  return tex;
}

function TextPlane({ text, color, outline, width, height, position, rotation = [0, 0, 0] }) {
  const texture = useMemo(() => makeTextTexture(text, { color, outline }), [text, color, outline]);
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

function Person({ position, shirt }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.34, 0]}>
        <sphereGeometry args={[0.125, 16, 16]} />
        <meshStandardMaterial color="#d9a066" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.28, 0.42, 0.22]} />
        <meshStandardMaterial color={shirt} roughness={0.7} />
      </mesh>
    </group>
  );
}

function DoorBrand({ side }) {
  const z = side === "left" ? 0.782 : -0.782;
  const rot = side === "left" ? [0, 0, 0] : [0, Math.PI, 0];
  return (
    <group position={[0, 0, z]} rotation={rot}>
      <TextPlane text="999" color="#E11D2E" outline="#050505" width={0.72} height={0.36} position={[0.15, 0.62, 0.002]} />
      <TextPlane text="TAXI" color="#0a0a0a" width={0.56} height={0.28} position={[-0.75, 0.62, 0.002]} />
      {/* checker motif */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} position={[0.62 + (i % 3) * 0.11, 0.68 - Math.floor(i / 3) * 0.11, 0]}>
          <boxGeometry args={[0.09, 0.09, 0.005]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#0a0a0a" : "#f5f5f5"} />
        </mesh>
      ))}
    </group>
  );
}

/** Chevrolet Cobalt-style yellow taxi sedan with passengers and 999 branding */
function CobaltTaxi() {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y += 0.0028;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 0.8) * 0.04;
  });

  const mats = useMemo(() => ({
    paint: new THREE.MeshStandardMaterial({ color: "#FFD400", metalness: 0.7, roughness: 0.3 }),
    glass: new THREE.MeshPhysicalMaterial({ color: "#0b0b0f", metalness: 0.2, roughness: 0.05, transmission: 0.75, thickness: 0.4, clearcoat: 1 }),
    rubber: new THREE.MeshStandardMaterial({ color: "#0a0a0a", metalness: 0.15, roughness: 0.9 }),
    chrome: new THREE.MeshStandardMaterial({ color: "#e8e8e8", metalness: 1, roughness: 0.12 }),
    gold: new THREE.MeshStandardMaterial({ color: "#d4af37", metalness: 1, roughness: 0.25 }),
    interior: new THREE.MeshStandardMaterial({ color: "#141414", roughness: 0.95 }),
    light: new THREE.MeshStandardMaterial({ color: "#fff8d0", emissive: "#fff2a8", emissiveIntensity: 1.8 }),
    brake: new THREE.MeshStandardMaterial({ color: "#ff3838", emissive: "#ff2020", emissiveIntensity: 1.5 }),
    sign: new THREE.MeshStandardMaterial({ color: "#ff8a00", emissive: "#ff7a00", emissiveIntensity: 0.9 }),
  }), []);

  return (
    <group ref={group} position={[0, -0.32, 0]} scale={0.98}>
      {/* Lower chassis */}
      <mesh position={[0, 0.42, 0]} material={mats.paint} castShadow>
        <boxGeometry args={[3.7, 0.52, 1.55]} />
      </mesh>
      {/* Long sedan hood */}
      <mesh position={[1.28, 0.72, 0]} material={mats.paint} castShadow>
        <boxGeometry args={[1.05, 0.16, 1.5]} />
      </mesh>
      {/* Sedan trunk (3-box silhouette) */}
      <mesh position={[-1.42, 0.74, 0]} material={mats.paint} castShadow>
        <boxGeometry args={[0.8, 0.2, 1.5]} />
      </mesh>
      {/* Cabin */}
      <mesh position={[-0.15, 1.02, 0]} material={mats.paint} castShadow>
        <boxGeometry args={[1.85, 0.64, 1.42]} />
      </mesh>
      {/* Cabin floor / interior */}
      <mesh position={[-0.15, 0.72, 0]} material={mats.interior}>
        <boxGeometry args={[1.8, 0.06, 1.36]} />
      </mesh>

      {/* Passengers inside */}
      <Person position={[0.28, 0.82, 0.32]} shirt="#f5f5f5" />
      <Person position={[-0.62, 0.82, -0.3]} shirt="#2563eb" />
      <Person position={[-0.62, 0.82, 0.32]} shirt="#E11D2E" />
      {/* seats */}
      <mesh position={[0.1, 0.86, -0.32]} material={mats.interior}>
        <boxGeometry args={[0.3, 0.5, 0.42]} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0.92, 1.02, 0]} rotation={[0, 0, -0.42]} material={mats.glass}>
        <boxGeometry args={[0.6, 0.62, 1.34]} />
      </mesh>
      {/* Rear window */}
      <mesh position={[-1.22, 1.0, 0]} rotation={[0, 0, 0.48]} material={mats.glass}>
        <boxGeometry args={[0.5, 0.6, 1.34]} />
      </mesh>
      {/* Side windows */}
      {[0.712, -0.712].map((z, i) => (
        <mesh key={i} position={[-0.15, 1.06, z]} material={mats.glass}>
          <boxGeometry args={[1.72, 0.5, 0.02]} />
        </mesh>
      ))}
      {/* B-pillar */}
      {[0.72, -0.72].map((z, i) => (
        <mesh key={i} position={[-0.15, 1.06, z]} material={mats.rubber}>
          <boxGeometry args={[0.06, 0.52, 0.015]} />
        </mesh>
      ))}

      {/* Door branding both sides */}
      <DoorBrand side="left" />
      <DoorBrand side="right" />

      {/* Orange TAXI roof sign (Cobalt reference) */}
      <mesh position={[-0.15, 1.46, 0]} material={mats.sign}>
        <boxGeometry args={[0.62, 0.22, 0.34]} />
      </mesh>
      <TextPlane text="TAXI" color="#0a0a0a" width={0.5} height={0.2} position={[-0.15, 1.46, 0.175]} />
      <TextPlane text="TAXI" color="#0a0a0a" width={0.5} height={0.2} position={[-0.15, 1.46, -0.175]} rotation={[0, Math.PI, 0]} />

      {/* Chevrolet-style chrome grille + gold bowtie */}
      <mesh position={[1.86, 0.5, 0]} material={mats.rubber}>
        <boxGeometry args={[0.03, 0.3, 1.0]} />
      </mesh>
      {[0.6, 0.42].map((y, i) => (
        <mesh key={i} position={[1.875, y, 0]} material={mats.chrome}>
          <boxGeometry args={[0.02, 0.045, 1.02]} />
        </mesh>
      ))}
      <mesh position={[1.885, 0.51, 0]} material={mats.gold}>
        <boxGeometry args={[0.02, 0.09, 0.26]} />
      </mesh>

      {/* Headlights */}
      {[0.58, -0.58].map((z, i) => (
        <mesh key={`hl-${i}`} position={[1.86, 0.62, z]} material={mats.light}>
          <boxGeometry args={[0.04, 0.16, 0.36]} />
        </mesh>
      ))}
      {/* Rear lights */}
      {[0.58, -0.58].map((z, i) => (
        <mesh key={`rl-${i}`} position={[-1.83, 0.7, z]} material={mats.brake}>
          <boxGeometry args={[0.04, 0.16, 0.32]} />
        </mesh>
      ))}
      {/* Bumpers */}
      <mesh position={[1.87, 0.28, 0]} material={mats.rubber}>
        <boxGeometry args={[0.06, 0.18, 1.5]} />
      </mesh>
      <mesh position={[-1.87, 0.28, 0]} material={mats.rubber}>
        <boxGeometry args={[0.06, 0.18, 1.5]} />
      </mesh>

      {/* Wheels — silver alloys */}
      {[
        [1.15, 0.16, 0.8],
        [1.15, 0.16, -0.8],
        [-1.15, 0.16, 0.8],
        [-1.15, 0.16, -0.8],
      ].map((p, i) => (
        <group key={i} position={p}>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={mats.rubber}>
            <cylinderGeometry args={[0.33, 0.33, 0.24, 24]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={mats.chrome}>
            <cylinderGeometry args={[0.17, 0.17, 0.25, 5]} />
          </mesh>
        </group>
      ))}

      {/* Side mirrors */}
      {[0.8, -0.8].map((z, i) => (
        <mesh key={i} position={[0.75, 1.0, z]} material={mats.paint}>
          <boxGeometry args={[0.14, 0.09, 0.1]} />
        </mesh>
      ))}
      {/* Side skirts */}
      {[0.78, -0.78].map((z, i) => (
        <mesh key={i} position={[0, 0.14, z]} material={mats.rubber}>
          <boxGeometry args={[3.2, 0.08, 0.02]} />
        </mesh>
      ))}
    </group>
  );
}

function CityBackdrop() {
  const buildings = useMemo(
    () =>
      [
        [-6, -6, 1.4, 3.2], [-3.5, -8, 1.8, 4.6], [-0.5, -9, 2.0, 5.4],
        [2.8, -8, 1.6, 4.0], [5.8, -6.5, 1.3, 3.0], [8, -8.5, 1.8, 4.8],
      ].map(([x, z, w, h]) => ({ x, z, w, h })),
    []
  );
  return (
    <group>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2 - 0.45, b.z]}>
          <boxGeometry args={[b.w, b.h, b.w]} />
          <meshStandardMaterial color="#101010" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export default function TaxiScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ position: [5.4, 2.6, 6.6], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 8, 4]} intensity={1.2} color="#ffffff" castShadow />
      <pointLight position={[-5, 3, -3]} intensity={1.4} color="#FFD400" />
      <pointLight position={[3, 1, 4]} intensity={0.5} color="#E11D2E" />
      <spotLight position={[0, 6, 0]} angle={0.6} penumbra={1} intensity={0.6} color="#ffffff" />

      <Suspense fallback={null}>
        <CityBackdrop />

        {/* Showcase platform */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.46, 0]} receiveShadow>
          <circleGeometry args={[3.4, 48]} />
          <meshStandardMaterial color="#0c0c0c" roughness={0.85} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, 0]}>
          <ringGeometry args={[3.1, 3.24, 64]} />
          <meshBasicMaterial color="#FFD400" transparent opacity={0.55} />
        </mesh>

        <PresentationControls
          global
          rotation={[0, -0.3, 0]}
          polar={[-0.2, 0.2]}
          azimuth={[-0.8, 0.8]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 200 }}
        >
          <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.35}>
            <CobaltTaxi />
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -0.44, 0]} opacity={0.55} scale={10} blur={2.5} far={4} color="#000000" />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
