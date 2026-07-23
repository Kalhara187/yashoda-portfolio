import { Canvas } from "@react-three/fiber";
import AnimatedObject from "./AnimatedObject";
import Particles from "./Particles";

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} color="#00ffff" intensity={2} />
        <pointLight position={[-5, -5, -5]} color="#7c3aed" intensity={1} />
        <AnimatedObject />
        <Particles />
      </Canvas>
    </div>
  );
}
