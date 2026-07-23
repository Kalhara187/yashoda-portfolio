import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 70;
const CONNECTION_DISTANCE = 2.8;
const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

function createParticles() {
  const positions  = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const b = i * 3;
    positions[b]     = (Math.random() - 0.5) * 16;
    positions[b + 1] = (Math.random() - 0.5) * 10;
    positions[b + 2] = (Math.random() - 0.5) * 6;

    // very slow drift
    velocities[b]     = (Math.random() - 0.5) * 0.0015;
    velocities[b + 1] = (Math.random() - 0.5) * 0.0015;
    velocities[b + 2] = (Math.random() - 0.5) * 0.001;
  }

  return { positions, velocities };
}

function buildConnections(pos) {
  const pairs = [];
  for (let a = 0; a < pos.length; a += 3) {
    for (let b = a + 3; b < pos.length; b += 3) {
      const dx = pos[a] - pos[b];
      const dy = pos[a + 1] - pos[b + 1];
      const dz = pos[a + 2] - pos[b + 2];
      const dSq = dx * dx + dy * dy + dz * dz;
      if (dSq <= CONNECTION_DISTANCE_SQ) {
        pairs.push([a, b, Math.sqrt(dSq)]);
      }
    }
  }
  return pairs;
}

function ParticleNetwork() {
  const pointsRef = useRef();
  const linesRef  = useRef();
  const mouse     = useRef({ x: 0, y: 0 });

  const { positions, velocities, connections, linePositions } = useMemo(() => {
    const { positions, velocities } = createParticles();
    const connections   = buildConnections(positions);
    const linePositions = new Float32Array(connections.length * 6);
    return { positions, velocities, connections, linePositions };
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth)  *  2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * -2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }) => {
    const pts  = pointsRef.current;
    const segs = linesRef.current;
    if (!pts || !segs) return;

    const t  = clock.elapsedTime;
    const mx = mouse.current.x * 1.5;   // reduced world-space influence
    const my = mouse.current.y * 1.0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const b = i * 3;

      // gentle sine drift + constant velocity
      positions[b]     += velocities[b]     + Math.sin(t * 0.2 + i * 0.3) * 0.0008;
      positions[b + 1] += velocities[b + 1] + Math.cos(t * 0.18 + i * 0.25) * 0.0006;
      positions[b + 2] += velocities[b + 2];

      // very soft mouse repulsion — only within a small radius
      const dx   = positions[b]     - mx;
      const dy   = positions[b + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1.8 && dist > 0) {
        const push = (1.8 - dist) / 1.8 * 0.012;
        positions[b]     += (dx / dist) * push;
        positions[b + 1] += (dy / dist) * push;
      }

      // wrap-around bounds so particles never disappear
      if (positions[b]     >  8) positions[b]     = -8;
      if (positions[b]     < -8) positions[b]     =  8;
      if (positions[b + 1] >  5) positions[b + 1] = -5;
      if (positions[b + 1] < -5) positions[b + 1] =  5;
      if (positions[b + 2] >  3) positions[b + 2] = -3;
      if (positions[b + 2] < -3) positions[b + 2] =  3;
    }

    pts.geometry.attributes.position.needsUpdate = true;

    // update line segment positions
    const pp = pts.geometry.attributes.position.array;
    for (let ci = 0; ci < connections.length; ci++) {
      const [a, b] = connections[ci];
      const lb = ci * 6;
      linePositions[lb]     = pp[a];
      linePositions[lb + 1] = pp[a + 1];
      linePositions[lb + 2] = pp[a + 2];
      linePositions[lb + 3] = pp[b];
      linePositions[lb + 4] = pp[b + 1];
      linePositions[lb + 5] = pp[b + 2];
    }
    segs.geometry.attributes.position.needsUpdate = true;

    // very subtle whole-group tilt toward mouse
    pts.rotation.y  = THREE.MathUtils.lerp(pts.rotation.y,  mouse.current.x * 0.06, 0.02);
    pts.rotation.x  = THREE.MathUtils.lerp(pts.rotation.x,  mouse.current.y * 0.04, 0.02);
    segs.rotation.y = pts.rotation.y;
    segs.rotation.x = pts.rotation.x;
  });

  return (
    <group>
      {/* Particles */}
      <points ref={pointsRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.55}
          depthWrite={false}
          color="#22d3ee"
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color="#a855f7"
        />
      </lineSegments>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        dpr={[1, 1.2]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#02040a"]} />
        <ParticleNetwork />
      </Canvas>

      {/* Subtle radial glow overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.07),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.06),transparent_50%)]" />
    </div>
  );
}
