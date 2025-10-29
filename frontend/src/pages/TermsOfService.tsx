import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef, useMemo, useState } from 'react';
import { Group, SphereGeometry } from 'three';
import { LandingHeader } from '@/components/landing/LandingHeader';
import Footer from '@/components/Footer';

import * as THREE from 'three';

function AnimatedCube({ rotationSpeed = 0.01 }) {
  const groupRef = useRef<Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += rotationSpeed * (isHovered ? 1.5 : 1);
      groupRef.current.rotation.y += rotationSpeed * 0.8 * (isHovered ? 1.5 : 1);
      groupRef.current.rotation.z += rotationSpeed * 0.5 * (isHovered ? 1.5 : 1);
      
      // Pulse scale on hover
      const scale = isHovered ? 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1 : 1;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group 
      ref={groupRef}
      position={[0, 0, 0]}
      onPointerOver={(event) => {
        event.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        setIsHovered(false);
      }}
    >
      {/* Glowing Cube */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color={isHovered ? "#00b8a9" : "#00ffe0"} 
          emissive={isHovered ? "#00b8a9" : "#00ffe0"} 
          emissiveIntensity={isHovered ? 0.8 : 0.4}
          wireframe 
          metalness={1}
          roughness={0}
        />
      </mesh>
      {/* Inner Solid Cube for Depth */}
      <mesh scale={0.8}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color={isHovered ? "#9370DB" : "#DDA0DD"} 
          emissive={isHovered ? "#9370DB" : "#DDA0DD"} 
          emissiveIntensity={isHovered ? 0.6 : 0.3}
          transparent
          opacity={0.5}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}

const ToSSection = ({ title, content, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="bg-gray-900 bg-opacity-40 p-6 rounded-xl mb-6 shadow-lg border border-blue-700 hover:border-blue-500 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-4">{icon}</div>
        <h3
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 cursor-pointer flex-1 hover:from-purple-300 hover:via-blue-300 hover:to-pink-300 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
        </h3>
      </div>
      {isOpen && (
        <motion.p
          className="text-gray-300 mt-4 text-base"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5 }}
        >
          {content}
        </motion.p>
      )}
    </motion.div>
  );
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-gray-900 to-[#1e1b4b] text-white">
      <LandingHeader />
      <div className="pt-20">
        {/* Hero Section with 3D */}
        <section className="relative flex flex-col items-center justify-center h-screen text-center px-4">
          <Canvas className="absolute inset-0 z-0">
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#9370DB" />
            <pointLight position={[-5, -5, -5]} intensity={0.8} color="#DDA0DD" />
            <AnimatedCube />
            <Stars />
          </Canvas>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 mb-4"
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative z-10 text-lg md:text-xl max-w-2xl text-gray-300"
          >
            Your trust matters. Please read carefully.
          </motion.p>
        </section>

        {/* Sections */}
        <section className="py-20 px-6 max-w-4xl mx-auto">
          <ToSSection
            icon="📋"
            title="A. Introduction"
            content="These Terms of Service govern your use of the AI Recommendation Engine Valencian website and services. By accessing or using our services, you agree to be bound by these terms."
          />
          <ToSSection
            icon="✅"
            title="B. Acceptance of Terms"
            content="By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree, please do not use our services."
          />
          <ToSSection
            icon="🔧"
            title="C. Use of Services"
            content="You may use our services only for lawful purposes and in accordance with these terms. You agree not to reproduce, duplicate, copy, sell, or exploit any portion of the service without express written permission."
          />
          <ToSSection
            icon="👤"
            title="D. User Accounts"
            content="Users are responsible for maintaining the confidentiality of their account and password, and for all activities that occur under their account. We reserve the right to suspend or terminate accounts for violations."
          />
          <ToSSection
            icon="©️"
            title="E. Intellectual Property"
            content="All content on this site, including text, graphics, logos, and software, is the property of AI Recommendation Engine Valencian or its licensors and is protected by copyright and trademark laws."
          />
          <ToSSection
            icon="⚖️"
            title="F. Limitation of Liability"
            content="To the fullest extent permitted by law, AI Recommendation Engine Valencian shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the services."
          />
          <ToSSection
            icon="🚪"
            title="G. Termination"
            content="We may terminate or suspend your access to our services immediately, without prior notice, for conduct that we believe violates these terms or is harmful to other users or us."
          />
          <ToSSection
            icon="🏛️"
            title="H. Governing Law"
            content="These terms shall be governed by and construed in accordance with the laws of the jurisdiction where AI Recommendation Engine Valencian is based, without regard to its conflict of law provisions."
          />
          <ToSSection
            icon="📧"
            title="I. Contact Information"
            content="For any questions regarding these terms, email us at akn22csds@cmrit.ac.in or aksha.nfeb21@gmail.com. We aim to respond within 48 hours."
          />
        </section>
      </div>
      <Footer />
    </div>
  );
}
