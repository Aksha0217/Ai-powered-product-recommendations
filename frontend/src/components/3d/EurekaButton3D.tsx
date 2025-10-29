import { useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Html, Text, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

const AnimatedEurekaSphere = ({ isHovered }: { isHovered: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <Sphere ref={meshRef} args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color={isHovered ? "#a855f7" : "#7c3aed"}
            attach="material"
            distort={isHovered ? 0.6 : 0.3}
            speed={isHovered ? 2 : 1}
            roughness={0.1}
            metalness={0.9}
            emissive={isHovered ? "#a855f7" : "#7c3aed"}
            emissiveIntensity={isHovered ? 0.3 : 0.1}
          />
        </Sphere>

        {/* Outer glow ring */}
        <Sphere args={[1.5, 32, 32]}>
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={isHovered ? 0.2 : 0.1}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Inner core */}
        <Sphere args={[0.8, 32, 32]}>
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.8}
          />
        </Sphere>

        {/* Particle ring */}
        {Array.from({ length: 8 }).map((_, i) => (
          <Sphere
            key={i}
            args={[0.05, 8, 8]}
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 2,
              Math.sin((i / 8) * Math.PI * 2) * 2,
              0
            ]}
          >
            <meshBasicMaterial color="#a855f7" />
          </Sphere>
        ))}
      </Float>
    </group>
  );
};

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 30;

  const positions = Array.from({ length: particleCount * 3 }, () =>
    (Math.random() - 0.5) * 8
  );

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={new Float32Array(positions)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#a855f7" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const EurekaButton3D = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const controls = useAnimation();

  const handleClick = () => {
    controls.start({
      scale: [1, 1.1, 0.9, 1],
      transition: { duration: 0.3 }
    });
    setTimeout(() => navigate('/eureka'), 300);
  };

  return (
    <motion.div
      className="relative w-full h-96 cursor-pointer"
      animate={controls}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="absolute inset-0"
      >
        <color attach="background" args={['transparent']} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} color="#a855f7" intensity={0.8} />
        <spotLight position={[0, 8, 0]} angle={0.3} penumbra={1} intensity={0.6} color="#7c3aed" />

        <AnimatedEurekaSphere isHovered={isHovered} />
        <FloatingParticles />
        <Stars radius={10} depth={50} count={100} factor={2} saturation={0} fade speed={0.5} />
      </Canvas>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.div
          className="text-center"
          animate={{
            y: isHovered ? -10 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.h3
            className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
            animate={{
              textShadow: isHovered
                ? "0 0 20px rgba(168, 85, 247, 0.5)"
                : "0 0 0px rgba(168, 85, 247, 0)"
            }}
          >
            EUREKA SERVER
          </motion.h3>
          <motion.p
            className="text-white/80 text-lg mb-4"
            animate={{
              opacity: isHovered ? 1 : 0.7,
            }}
          >
            Service Discovery & Registry
          </motion.p>

          {/* Animated border */}
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"
            animate={{
              scaleX: isHovered ? 1.2 : 1,
              opacity: isHovered ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Hover indicator */}
        <motion.div
          className="mt-6 text-white/60 text-sm"
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.3 }}
        >
          Click to explore →
        </motion.div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          boxShadow: isHovered
            ? "0 0 50px rgba(168, 85, 247, 0.3), inset 0 0 50px rgba(168, 85, 247, 0.1)"
            : "0 0 20px rgba(168, 85, 247, 0.1), inset 0 0 20px rgba(168, 85, 247, 0.05)"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default EurekaButton3D;
