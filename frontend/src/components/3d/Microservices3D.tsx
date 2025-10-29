import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text, Html } from "@react-three/drei";
import * as THREE from "three";

interface ServiceNode {
  id: string;
  name: string;
  position: [number, number, number];
  color: string;
  status: 'up' | 'down' | 'starting';
  connections: string[];
}

const services: ServiceNode[] = [
  {
    id: 'eureka',
    name: 'Eureka Server',
    position: [0, 0, 0],
    color: '#a855f7',
    status: 'up',
    connections: ['api-gateway', 'user-service', 'product-service', 'recommendation-service']
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    position: [3, 1, 0],
    color: '#3b82f6',
    status: 'up',
    connections: ['user-service', 'product-service', 'recommendation-service']
  },
  {
    id: 'user-service',
    name: 'User Service',
    position: [-2, 2, 2],
    color: '#ec4899',
    status: 'up',
    connections: ['api-gateway', 'product-service']
  },
  {
    id: 'product-service',
    name: 'Product Service',
    position: [2, -1, -2],
    color: '#06b6d4',
    status: 'up',
    connections: ['api-gateway', 'recommendation-service']
  },
  {
    id: 'recommendation-service',
    name: 'Recommendation',
    position: [-3, -2, 1],
    color: '#10b981',
    status: 'up',
    connections: ['api-gateway', 'product-service']
  },
  {
    id: 'config-server',
    name: 'Config Server',
    position: [0, 3, -1],
    color: '#f59e0b',
    status: 'up',
    connections: ['eureka']
  }
];

const AnimatedServiceNode = ({ service }: { service: ServiceNode }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
    if (groupRef.current) {
      groupRef.current.position.y = service.position[1] + Math.sin(state.clock.getElapsedTime() * 0.5 + service.position[0]) * 0.2;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up': return '#10b981';
      case 'down': return '#ef4444';
      case 'starting': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={meshRef} args={[0.8, 32, 32]} position={service.position}>
          <MeshDistortMaterial
            color={service.color}
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            emissive={service.color}
            emissiveIntensity={0.1}
          />
        </Sphere>

        {/* Status indicator */}
        <Sphere args={[0.1, 16, 16]} position={[service.position[0] + 1, service.position[1] + 1, service.position[2]]}>
          <meshBasicMaterial color={getStatusColor(service.status)} />
        </Sphere>

        {/* Service label */}
        <Html position={[service.position[0], service.position[1] - 1.5, service.position[2]]} center>
          <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap">
            {service.name}
          </div>
        </Html>
      </Float>
    </group>
  );
};

const ConnectionLines = () => {
  const linesRef = useRef<THREE.Group>(null);

  const connections = useMemo(() => {
    const lines: Array<{ start: [number, number, number]; end: [number, number, number] }> = [];

    services.forEach(service => {
      service.connections.forEach(targetId => {
        const target = services.find(s => s.id === targetId);
        if (target) {
          lines.push({
            start: service.position,
            end: target.position
          });
        }
      });
    });

    return lines;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={linesRef}>
      {connections.map((connection, index) => {
        const points = [];
        points.push(new THREE.Vector3(...connection.start));
        points.push(new THREE.Vector3(...connection.end));

        const curve = new THREE.CatmullRomCurve3(points);
        const geometry = new THREE.TubeGeometry(curve, 20, 0.02, 8, false);

        return (
          <mesh key={index} geometry={geometry}>
            <meshBasicMaterial
              color="#a855f7"
              transparent
              opacity={0.6}
              emissive="#a855f7"
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#a855f7" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

export const Microservices3D = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Canvas camera={{ position: [8, 5, 8], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#0f0a1f']} />
        <fog attach="fog" args={['#0f0a1f', 10, 30]} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} color="#a855f7" intensity={2} />
        <pointLight position={[10, 5, 5]} color="#3b82f6" intensity={1.5} />
        <spotLight position={[0, 10, 0]} angle={0.4} penumbra={1} intensity={1.5} color="#ec4899" />

        {services.map((service) => (
          <AnimatedServiceNode key={service.id} service={service} />
        ))}

        <ConnectionLines />
        <FloatingParticles />

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white">
        <h3 className="text-lg font-bold mb-2">Microservices Architecture</h3>
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Active Services: {services.filter(s => s.status === 'up').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Connections: {services.reduce((acc, s) => acc + s.connections.length, 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
