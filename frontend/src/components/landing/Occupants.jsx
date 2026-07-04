const SKIN = "#c99b76";

function Person({ position, rotationY = 0, clothes = "#1a1a1f", cap = false, driver = false, lean = -0.08 }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0.72, 0]} rotation={[lean, 0, 0]} castShadow>
        <capsuleGeometry args={[0.145, 0.26, 6, 12]} />
        <meshStandardMaterial color={clothes} roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.0, 0.02]} castShadow>
        <sphereGeometry args={[0.105, 20, 16]} />
        <meshStandardMaterial color={SKIN} roughness={0.6} />
      </mesh>
      {cap && (
        <group position={[0, 1.05, 0.02]}>
          <mesh>
            <sphereGeometry args={[0.11, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2.3]} />
            <meshStandardMaterial color="#111114" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.005, 0.1]}>
            <cylinderGeometry args={[0.085, 0.085, 0.016, 14]} />
            <meshStandardMaterial color="#FFD400" roughness={0.5} />
          </mesh>
        </group>
      )}
      {driver && (
        <>
          <mesh position={[0.11, 0.76, 0.17]} rotation={[-1.05, 0, -0.18]} castShadow>
            <capsuleGeometry args={[0.038, 0.24, 4, 8]} />
            <meshStandardMaterial color={clothes} roughness={0.85} />
          </mesh>
          <mesh position={[-0.11, 0.76, 0.17]} rotation={[-1.05, 0, 0.18]} castShadow>
            <capsuleGeometry args={[0.038, 0.24, 4, 8]} />
            <meshStandardMaterial color={clothes} roughness={0.85} />
          </mesh>
        </>
      )}
    </group>
  );
}

/** Stylized driver (front-left, capped) + client (rear-right) seated inside the Cobalt */
export function Occupants() {
  return (
    <group rotation={[0, Math.PI, 0]}>
      <pointLight position={[0, 1.15, -0.1]} intensity={2.4} distance={3} decay={1.5} color="#fff4d6" />
      <Person position={[0.34, 0.02, 0.18]} clothes="#e9e6de" cap driver />
      <Person position={[-0.3, 0.02, -0.62]} clothes="#5a6474" lean={-0.14} rotationY={0.12} />
    </group>
  );
}
