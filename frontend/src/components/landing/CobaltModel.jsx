import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const COBALT_URL = "/models/cobalt.glb?v=2";

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

export function TextPlane({ text, color, outline, width, height, position, rotation = [0, 0, 0], fontSize }) {
  const texture = useMemo(() => makeTextTexture(text, { color, outline, fontSize }), [text, color, outline, fontSize]);
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

function Checkers({ x, rotY }) {
  return (
    <group>
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[x, 0.82, -0.99 + i * 0.22]} rotation={[0, rotY, 0]}>
          <planeGeometry args={[0.13, 0.13]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#0a0a0a" : "#f5f5f5"} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function SideBranding({ side }) {
  const x = side === "right" ? 0.93 : -0.93;
  const rotY = side === "right" ? Math.PI / 2 : -Math.PI / 2;
  return (
    <group>
      <TextPlane text="999" color="#E11D2E" outline="#050505" width={0.62} height={0.31} position={[x, 0.55, -0.42]} rotation={[0, rotY, 0]} />
      <TextPlane text="TAXI" color="#0a0a0a" width={0.44} height={0.22} position={[x, 0.55, 0.5]} rotation={[0, rotY, 0]} />
      <Checkers x={x} rotY={rotY} />
    </group>
  );
}

/** Optimized Chevrolet Cobalt LTZ (Q.SARDOR / CC BY 4.0), normalized: bottom y=0, length 4.3 along z */
export function CobaltModel(props) {
  const { scene } = useGLTF(COBALT_URL, true);

  const { s, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const s = 4.3 / size.z;
    scene.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      o.castShadow = true;
      const m = o.material;
      if (m.name === "Realistic_Car_Paint") {
        m.color = new THREE.Color("#FFD400");
        m.metalness = 0.55;
        m.roughness = 0.32;
        if ("clearcoat" in m) {
          m.clearcoat = 1;
          m.clearcoatRoughness = 0.06;
        }
      } else if (m.name === "Car_windshield_glass") {
        m.transparent = true;
        m.opacity = 0.4;
        m.color = new THREE.Color("#0d1117");
        m.metalness = 0.6;
        m.roughness = 0.05;
      } else if (m.name && m.name.includes("light")) {
        m.emissiveIntensity = Math.max(m.emissiveIntensity || 0, 0.6);
      }
    });
    return { s, offset: [-center.x * s, -box.min.y * s, -center.z * s] };
  }, [scene]);

  return (
    <group {...props}>
      <group position={offset} scale={s}>
        <primitive object={scene} />
      </group>

      {/* Taxi roof sign */}
      <group position={[0, 1.26, -0.1]}>
        <mesh>
          <boxGeometry args={[0.52, 0.18, 0.26]} />
          <meshStandardMaterial color="#ff8a00" emissive="#ff7a00" emissiveIntensity={0.9} />
        </mesh>
        <TextPlane text="TAXI" color="#0a0a0a" width={0.42} height={0.16} position={[0, 0, 0.135]} />
        <TextPlane text="TAXI" color="#0a0a0a" width={0.42} height={0.16} position={[0, 0, -0.135]} rotation={[0, Math.PI, 0]} />
      </group>

      <SideBranding side="right" />
      <SideBranding side="left" />
    </group>
  );
}

useGLTF.preload(COBALT_URL, true);
