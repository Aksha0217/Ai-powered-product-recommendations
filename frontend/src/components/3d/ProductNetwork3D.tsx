import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import * as THREE from "three";

interface Node {
  id: string;
  position: [number, number, number];
  color: string;
}

interface Connection {
  start: [number, number, number];
  end: [number, number, number];
  strength: number;
}

const NetworkNode = ({ position, color, label, onClick }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered ? 1.3 : 1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

const NetworkConnection = ({ start, end, strength }: Connection) => {
  return (
    <Line
      points={[start, end]}
      color="#a855f7"
      lineWidth={strength * 3}
      transparent
      opacity={0.4}
    />
  );
};

export const ProductNetwork3D = () => {
  const nodes: Node[] = useMemo(() => {
    const radius = 4;
    const nodeCount = 10;
    return Array.from({ length: nodeCount }, (_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2;
      return {
        id: `Product ${String.fromCharCode(65 + i)}`,
        position: [
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        color: `hsl(${(i * 360) / nodeCount}, 70%, 60%)`,
      };
    });
  }, []);

  const connections: Connection[] = useMemo(() => {
    return nodes.flatMap((node, i) =>
      nodes.slice(i + 1).map((targetNode) => ({
        start: node.position,
        end: targetNode.position,
        strength: Math.random(),
      }))
    );
  }, [nodes]);

  return (
    <div className="h-[600px] w-full bg-gradient-to-b from-background to-card rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />

        {connections.map((conn, i) => (
          <NetworkConnection key={i} {...conn} />
        ))}

        {nodes.map((node) => (
          <NetworkNode
            key={node.id}
            position={node.position}
            color={node.color}
            label={node.id}
            onClick={() => console.log(`Clicked ${node.id}`)}
          />
        ))}

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

