import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PresentationControls, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Stylized low-poly taxi built entirely from R3F primitives.
 * Yellow paint, black accents, chrome trim.
 */
function TaxiCar() {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    // gentle rotation
    group.current.rotation.y += 0.003;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 0.8) * 0.05;
  });

  const paint = new THREE.MeshStandardMaterial({
    color: "#FFCC00",
    metalness: 0.75,
    roughness: 0.28,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: "#0b0b0f",
    metalness: 0.2,
    roughness: 0.05,
    transmission: 0.85,
    thickness: 0.5,
    clearcoat: 1,
  });
  const rubber = new THREE.MeshStandardMaterial({
    color: "#0a0a0a",
    metalness: 0.15,
    roughness: 0.9,
  });
  const chrome = new THREE.MeshStandardMaterial({
    color: "#e8e8e8",
    metalness: 1,
    roughness: 0.15,
  });
  const light = new THREE.MeshStandardMaterial({
    color: "#fff8d0",
    emissive: "#fff2a8",
    emissiveIntensity: 1.8,
  });
  const brake = new THREE.MeshStandardMaterial({
    color: "#ff3838",
    emissive: "#ff2020",
    emissiveIntensity: 1.5,
  });

  return (
    <group ref={group} position={[0, -0.35, 0]} scale={1.05}>
      {/* Chassis lower */}
      <mesh position={[0, 0.4, 0]} material={paint} castShadow>
        <boxGeometry args={[3.4, 0.7, 1.5]} />
      </mesh>
      {/* Cabin */}
      <mesh position={[-0.05, 0.95, 0]} material={paint} castShadow>
        <boxGeometry args={[2.1, 0.7, 1.35]} />
      </mesh>
      {/* Cabin roof taper (a slightly smaller box on top) */}
      <mesh position={[-0.05, 1.31, 0]} material={paint} castShadow>
        <boxGeometry args={[1.9, 0.05, 1.32]} />
      </mesh>
      {/* Hood */}
      <mesh position={[1.35, 0.75, 0]} material={paint} castShadow>
        <boxGeometry args={[0.85, 0.15, 1.4]} />
      </mesh>
      {/* Trunk */}
      <mesh position={[-1.4, 0.75, 0]} material={paint} castShadow>
        <boxGeometry args={[0.7, 0.15, 1.4]} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0.85, 1.0, 0]} rotation={[0, 0, -0.4]} material={glass}>
        <boxGeometry args={[0.65, 0.65, 1.28]} />
      </mesh>
      {/* Rear window */}
      <mesh position={[-1.05, 1.0, 0]} rotation={[0, 0, 0.45]} material={glass}>
        <boxGeometry args={[0.55, 0.65, 1.28]} />
      </mesh>
      {/* Side windows (both sides via mirrored) */}
      {[0.68, -0.68].map((z, i) => (
        <mesh key={i} position={[-0.1, 0.98, z]} material={glass}>
          <boxGeometry args={[1.7, 0.55, 0.02]} />
        </mesh>
      ))}

      {/* Black checker stripe (taxi motif) */}
      <mesh position={[-0.05, 0.55, 0.76]} material={rubber}>
        <boxGeometry args={[2.6, 0.14, 0.01]} />
      </mesh>
      <mesh position={[-0.05, 0.55, -0.76]} material={rubber}>
        <boxGeometry args={[2.6, 0.14, 0.01]} />
      </mesh>

      {/* Roof taxi sign */}
      <mesh position={[0, 1.5, 0]} material={chrome}>
        <boxGeometry args={[0.55, 0.2, 0.3]} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.52, 0.18, 0.29]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Headlights */}
      {[0.6, -0.6].map((z, i) => (
        <mesh key={`hl-${i}`} position={[1.72, 0.55, z]} material={light}>
          <boxGeometry args={[0.05, 0.2, 0.35]} />
        </mesh>
      ))}
      {/* Rear lights */}
      {[0.6, -0.6].map((z, i) => (
        <mesh key={`rl-${i}`} position={[-1.72, 0.62, z]} material={brake}>
          <boxGeometry args={[0.05, 0.2, 0.28]} />
        </mesh>
      ))}

      {/* Grille */}
      <mesh position={[1.72, 0.35, 0]} material={rubber}>
        <boxGeometry args={[0.02, 0.15, 0.9]} />
      </mesh>

      {/* Wheels */}
      {[
        [1.0, 0.15, 0.78],
        [1.0, 0.15, -0.78],
        [-1.05, 0.15, 0.78],
        [-1.05, 0.15, -0.78],
      ].map((p, i) => (
        <group key={i} position={p}>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={rubber}>
            <cylinderGeometry args={[0.32, 0.32, 0.22, 24]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={chrome}>
            <cylinderGeometry args={[0.14, 0.14, 0.23, 20]} />
          </mesh>
        </group>
      ))}

      {/* Side skirts */}
      <mesh position={[0, 0.13, 0.76]} material={rubber}>
        <boxGeometry args={[3.0, 0.08, 0.02]} />
      </mesh>
      <mesh position={[0, 0.13, -0.76]} material={rubber}>
        <boxGeometry args={[3.0, 0.08, 0.02]} />
      </mesh>
    </group>
  );
}

export default function TaxiScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ position: [4.5, 2.2, 5.5], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 4]}
        intensity={1.2}
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-5, 3, -3]} intensity={1.5} color="#ffcc00" />
      <spotLight
        position={[0, 6, 0]}
        angle={0.6}
        penumbra={1}
        intensity={0.6}
        color="#ffffff"
      />

      <Suspense fallback={null}>
        <PresentationControls
          global
          rotation={[0, -0.3, 0]}
          polar={[-0.2, 0.2]}
          azimuth={[-0.8, 0.8]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 200 }}
        >
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
            <TaxiCar />
          </Float>
        </PresentationControls>

        <ContactShadows
          position={[0, -0.42, 0]}
          opacity={0.55}
          scale={10}
          blur={2.5}
          far={4}
          color="#000000"
        />

        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
