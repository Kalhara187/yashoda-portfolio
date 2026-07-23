import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function AnimatedObject() {
  const mesh = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, mouse.current.y * 1.2, 0.05);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mouse.current.x * 1.2, 0.05);
    mesh.current.position.y = Math.sin(Date.now() * 0.001) * 0.3;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[2, 1]} />
      <meshStandardMaterial color="#00ffff" wireframe emissive="#00ffff" emissiveIntensity={0.2} />
    </mesh>
  );
}
