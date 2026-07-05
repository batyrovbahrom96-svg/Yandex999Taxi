import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Occupants } from "@/components/landing/Occupants";

export const COBALT_URL = "/models/cobalt.glb?v=3";
const DRACO_DECODER_PATH = "/draco/";

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

function makeBrandTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.font = "900 185px 'Arial Black', Arial, sans-serif";
  ctx.lineWidth = 18;
  ctx.strokeStyle = "#0a0a0a";
  ctx.strokeText("999", 36, 140);
  ctx.fillStyle = "#E11D2E";
  ctx.fillText("999", 36, 140);
  ctx.font = "900 128px 'Arial Black', Arial, sans-serif";
  ctx.fillStyle = "#0a0a0a";
  ctx.fillText("TAXI", 500, 146);
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  return tex;
}

function makeCheckerTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const s = 64;
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 16; col++) {
      ctx.fillStyle = (row + col) % 2 === 0 ? "#0a0a0a" : "#f2f2f2";
      ctx.fillRect(col * s, row * s, s, s);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  return tex;
}

function SideBranding({ side }) {
  const x = side === "right" ? 0.925 : -0.925;
  const rotY = side === "right" ? Math.PI / 2 : -Math.PI / 2;
  const brandTex = useMemo(() => makeBrandTexture(), []);
  const checkerTex = useMemo(() => makeCheckerTexture(), []);
  return (
    <group>
      {/* continuous taxi checker band across doors */}
      <mesh position={[x, 0.8, 0.05]} rotation={[0, rotY, 0]}>
        <planeGeometry args={[1.7, 0.22]} />
        <meshStandardMaterial map={checkerTex} roughness={0.5} />
      </mesh>
      {/* aligned 999 TAXI door branding */}
      <mesh position={[x, 0.52, -0.15]} rotation={[0, rotY, 0]}>
        <planeGeometry args={[1.2, 0.3]} />
        <meshBasicMaterial map={brandTex} transparent />
      </mesh>
    </group>
  );
}

/** Optimized Chevrolet Cobalt LTZ (Q.SARDOR / CC BY 4.0), normalized: bottom y=0, length 4.3 along z */
export function CobaltModel(props) {
  const { scene } = useGLTF(COBALT_URL, DRACO_DECODER_PATH);

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
        m.metalness = 0.3;
        m.roughness = 0.18;
        m.envMapIntensity = 1.1;
        if ("clearcoat" in m) {
          m.clearcoat = 1;
          m.clearcoatRoughness = 0.04;
        }
      } else if (m.name === "Car_windshield_glass") {
        m.transparent = true;
        m.opacity = 0.22;
        m.color = new THREE.Color("#1c2430");
        m.metalness = 0.5;
        m.roughness = 0.05;
      } else if (m.name.startsWith("roda")) {
        const lum = m.color ? (m.color.r + m.color.g + m.color.b) / 3 : 0;
        if (lum > 0.35) {
          m.color = new THREE.Color("#c9ccd2");
          m.metalness = 0.9;
          m.roughness = 0.28;
        } else {
          m.color = new THREE.Color("#101010");
          m.metalness = 0.05;
          m.roughness = 0.92;
        }
      } else if (m.name.includes("front_light")) {
        m.transparent = true;
        m.opacity = 0.35;
        m.color = new THREE.Color("#dfe8f0");
        m.metalness = 1;
        m.roughness = 0.06;
        if (m.emissive) {
          m.emissive = new THREE.Color("#9fc4e8");
          m.emissiveIntensity = 0.2;
        }
      } else if (m.name.includes("rear_light")) {
        m.transparent = true;
        m.opacity = 0.65;
        m.color = new THREE.Color("#7a0d12");
        m.roughness = 0.15;
        if (m.emissive) {
          m.emissive = new THREE.Color("#66080c");
          m.emissiveIntensity = 0.6;
        }
      } else if (m.name.startsWith("escape")) {
        m.color = new THREE.Color("#b8bcc2");
        m.metalness = 0.95;
        m.roughness = 0.25;
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
      <group position={[0, 1.28, -0.1]}>
        <mesh>
          <boxGeometry args={[0.64, 0.22, 0.3]} />
          <meshStandardMaterial color="#ff8a00" emissive="#ff7a00" emissiveIntensity={1.2} />
        </mesh>
        <TextPlane text="TAXI" color="#0a0a0a" width={0.5} height={0.19} position={[0, 0, 0.155]} />
        <TextPlane text="TAXI" color="#0a0a0a" width={0.5} height={0.19} position={[0, 0, -0.155]} rotation={[0, Math.PI, 0]} />
      </group>

      <SideBranding side="right" />
      <SideBranding side="left" />

      <Occupants />
    </group>
  );
}

useGLTF.preload(COBALT_URL, DRACO_DECODER_PATH);
