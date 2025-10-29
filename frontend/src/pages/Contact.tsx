import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef, useMemo, useState } from 'react';
import { Group, SphereGeometry } from 'three';
import { LandingHeader } from '@/components/landing/LandingHeader';
import Footer from '@/components/Footer';

import * as THREE from 'three';
// 3D Background Sphere
function AnimatedSphere({ rotationSpeed = 0.01 }) {
  const groupRef = useRef<Group>(null);
  const geo = useMemo(() => new SphereGeometry(3, 64, 64), []);
  const [isHovered, setIsHovered] = useState(false);
  const { camera } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed * (isHovered ? 1.5 : 1);
      groupRef.current.rotation.x += rotationSpeed * 0.5 * (isHovered ? 1.5 : 1);
      
      // Pulse scale on hover
      const scale = isHovered ? 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1 : 1;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={(event) => {
        event.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        setIsHovered(false);
      }}
    >
      {/* Wireframe */}
      <mesh>
        <primitive object={geo} attach="geometry" />
        <meshStandardMaterial 
          color={isHovered ? "#00b8a9" : "#00ffe0"} 
          emissive={isHovered ? "#00b8a9" : "#00ffe0"} 
          emissiveIntensity={isHovered ? 0.8 : 0.3}
          wireframe 
          metalness={1}
          roughness={0}
        />
      </mesh>
      {/* Shiny Dots at Vertices */}
      <points>
        <primitive object={geo} attach="geometry" />
        <pointsMaterial 
          color={isHovered ? "#00b8a9" : "#00ffe0"} 
          size={isHovered ? 0.08 : 0.05}
          sizeAttenuation={true}
          transparent
          opacity={isHovered ? 1 : 0.9}
        />
      </points>
    </group>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-gray-900 to-[#1e1b4b] text-white">
      <LandingHeader />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center h-screen text-center px-4">
          <Canvas className="absolute inset-0 z-0">
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ffe0" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
            <AnimatedSphere />
            <Stars />
          </Canvas>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-primary to-neon-blue bg-clip-text text-transparent"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative z-10 text-lg md:text-xl max-w-2xl text-gray-300"
          >
            Reach out for collaborations, queries, or just to say hello!  
            We’d love to hear from you.
          </motion.p>
        </section>

        {/* Contact Details */}
        <section className="py-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-3xl font-semibold mb-6">Contact Information</h2>
            <p className="mb-4 text-lg">
              📧 <strong>Email:</strong> <a href="mailto:akn22csds@cmrit.ac.in" className="underline hover:text-neon-blue">akn22csds@cmrit.ac.in</a> | <a href="mailto:aksha.nfeb21@gmail.com" className="underline hover:text-neon-blue">aksha.nfeb21@gmail.com</a>
            </p>
            <p className="mb-4 text-lg">
              🔗 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/aksha-n-63319625a" target="_blank" rel="noopener noreferrer" className="underline hover:text-neon-blue">linkedin.com/in/aksha-n-63319625a</a>
            </p>
            <p className="mb-4 text-lg">
              💻 <strong>GitHub:</strong> <a href="https://github.com/Aksha0217" target="_blank" rel="noopener noreferrer" className="underline hover:text-neon-blue">github.com/Aksha0217</a>
            </p>
          </motion.div>
        </section>

        {/* Contact Form (Optional) */}
        <section className="py-20 px-6 text-center bg-[#1e293b]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-md mx-auto"
          >
            <h2 className="text-3xl font-semibold mb-6">Send a Message</h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-neon-blue"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-neon-blue"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-neon-blue"
              />
              <button
                type="submit"
                className="p-3 rounded-lg bg-gradient-to-r from-primary to-neon-blue text-white font-semibold hover:opacity-90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
