import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Html, Text } from "@react-three/drei";
import * as THREE from "three";

interface EurekaInstance {
  id: string;
  appName: string;
  instanceId: string;
  hostName: string;
  port: number;
  status: 'UP' | 'DOWN' | 'STARTING';
  position: [number, number, number];
  color: string;
}

const eurekaInstances: EurekaInstance[] = [
  {
    id: 'api-gateway-1',
    appName: 'API-GATEWAY',
    instanceId: 'api-gateway:8080',
    hostName: 'api-gateway',
    port: 8080,
    status: 'UP',
    position: [2, 1, 0],
    color: '#3b82f6'
  },
  {
    id: 'user-service-1',
    appName: 'USER-SERVICE',
    instanceId: 'user-service:8081',
    hostName: 'user-service',
    port: 8081,
    status: 'UP',
    position: [-2, 2, 1],
    color: '#ec4899'
  },
  {
    id: 'product-service-1',
    appName: 'PRODUCT-SERVICE',
    instanceId: 'product-service:8082',
    hostName: 'product-service',
    port: 8082,
    status: 'UP',
    position: [1, -1, -2],
    color: '#06b6d4'
  },
  {
    id: 'recommendation-service-1',
    appName: 'RECOMMENDATION-SERVICE',
    instanceId: 'recommendation-service:8083',
    hostName: 'recommendation-service',
    port: 8083,
    status: 'UP',
    position: [-1, -2, 2],
    color: '#10b981'
  },
  {
    id: 'config-server-1',
    appName: 'CONFIG-SERVER',
    instanceId: 'config-server:8888',
    hostName: 'config-server',
    port: 8888,
    status: 'UP',
    position: [0, 3, -1],
    color: '#f59e0b'
  }
];

const AnimatedEurekaInstance = ({ instance }: { instance: EurekaInstance }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
    if (groupRef.current) {
      groupRef.current.position.y = instance.position[1] + Math.sin(state.clock.getElapsedTime() * 0.3 + instance.position[0]) * 0.1;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UP': return '#10b981';
      case 'DOWN': return '#ef4444';
      case 'STARTING': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <Sphere ref={meshRef} args={[0.6, 32, 32]} position={instance.position}>
          <MeshDistortMaterial
            color={instance.color}
            attach="material"
            distort={0.2}
            speed={1.5}
            roughness={0.2}
            metalness={0.7}
            emissive={instance.color}
            emissiveIntensity={0.05}
          />
        </Sphere>

        {/* Status ring */}
        <Sphere args={[0.08, 16, 16]} position={[instance.position[0] + 0.8, instance.position[1] + 0.8, instance.position[2]]}>
          <meshBasicMaterial color={getStatusColor(instance.status)} />
        </Sphere>

        {/* Instance info */}
        <Html position={[instance.position[0], instance.position[1] - 1.2, instance.position[2]]} center>
          <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap max-w-48">
            <div className="font-bold text-purple-300">{instance.appName}</div>
            <div className="text-gray-300">{instance.hostName}:{instance.port}</div>
            <div className={`text-xs font-semibold ${
              instance.status === 'UP' ? 'text-green-400' :
              instance.status === 'DOWN' ? 'text-red-400' : 'text-yellow-400'
            }`}>
              {instance.status}
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
};

const EurekaServer = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05);
    }
  });

  return (
    <group>
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere ref={meshRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#a855f7"
            attach="material"
            distort={0.4}
            speed={1}
            roughness={0.1}
            metalness={0.9}
            emissive="#a855f7"
            emissiveIntensity={0.1}
          />
        </Sphere>

        {/* Eureka label */}
        <Html position={[0, -1.8, 0]} center>
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-lg">
            EUREKA SERVER
          </div>
        </Html>
      </Float>
    </group>
  );
};

const ConnectionBeams = () => {
  const beamsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (beamsRef.current) {
      beamsRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.05;
    }
  });

  return (
    <group ref={beamsRef}>
      {eurekaInstances.map((instance, index) => {
        const points = [];
        points.push(new THREE.Vector3(0, 0, 0)); // Eureka server center
        points.push(new THREE.Vector3(...instance.position));

        const curve = new THREE.CatmullRomCurve3(points);
        const geometry = new THREE.TubeGeometry(curve, 20, 0.03, 8, false);

        return (
          <mesh key={index} geometry={geometry}>
            <meshBasicMaterial
              color={instance.color}
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const DataFlowParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 50;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
      particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.03) * 0.05;
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
      <pointsMaterial size={0.03} color="#a855f7" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
};

export const Eureka3D = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <Canvas camera={{ position: [6, 4, 6], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#0f0a1f']} />
        <fog attach="fog" args={['#0f0a1f', 8, 25]} />

        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} color="#a855f7" intensity={1.5} />
        <pointLight position={[5, 5, 5]} color="#3b82f6" intensity={1} />
        <spotLight position={[0, 8, 0]} angle={0.3} penumbra={1} intensity={1.2} color="#ec4899" />

        <EurekaServer />

        {eurekaInstances.map((instance) => (
          <AnimatedEurekaInstance key={instance.id} instance={instance} />
        ))}

        <ConnectionBeams />
        <DataFlowParticles />

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minDistance={4}
          maxDistance={15}
        />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white">
        <h3 className="text-lg font-bold mb-2">Eureka Service Registry</h3>
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Registered Services: {eurekaInstances.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Active Instances: {eurekaInstances.filter(i => i.status === 'UP').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Eureka Server: UP</span>
          </div>
        </div>
      </div>

      {/* Service list */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white max-w-xs">
        <h4 className="text-sm font-bold mb-2">Service Instances</h4>
        <div className="space-y-1 text-xs max-h-64 overflow-y-auto">
          {eurekaInstances.map((instance) => (
            <div key={instance.id} className="flex items-center justify-between">
              <span className="truncate">{instance.appName}</span>
              <div className={`w-2 h-2 rounded-full ${
                instance.status === 'UP' ? 'bg-green-500' :
                instance.status === 'DOWN' ? 'bg-red-500' : 'bg-yellow-500'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
