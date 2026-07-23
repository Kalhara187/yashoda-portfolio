import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Particles({ count = 3000 }) {
  const points = useRef();

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100;
  }

  useFrame(() => {
    if (points.current) points.current.rotation.y += 0.0003;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#00ffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}
