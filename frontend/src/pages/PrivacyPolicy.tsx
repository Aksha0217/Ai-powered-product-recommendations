import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef, useMemo, useState } from 'react';
import { Group, SphereGeometry } from 'three';
import { LandingHeader } from '@/components/landing/LandingHeader';
import Footer from '@/components/Footer';

import * as THREE from 'three';

function AnimatedShield({ rotationSpeed = 0.008 }) {
  const groupRef = useRef<Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed * (isHovered ? 1.3 : 1);
      groupRef.current.rotation.x += Math.sin(state.clock.elapsedTime * 0.3) * 0.005;
      
      // Gentle float on hover
      const float = isHovered ? Math.sin(state.clock.elapsedTime * 1.5) * 0.02 : 0;
      groupRef.current.position.y = float;
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
      {/* Shield Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.5, 0.1, 32]} />
        <meshStandardMaterial 
          color={isHovered ? "#FFD700" : "#FFA500"} 
          emissive={isHovered ? "#FFD700" : "#FFA500"} 
          emissiveIntensity={isHovered ? 0.6 : 0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Shield Top */}
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[1.2, 0.8, 32]} />
        <meshStandardMaterial 
          color={isHovered ? "#FFD700" : "#FFA500"} 
          emissive={isHovered ? "#FFD700" : "#FFA500"} 
          emissiveIntensity={isHovered ? 0.6 : 0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Lock Icon on Shield */}
      <mesh position={[0, 0.2, 0.06]}>
        <boxGeometry args={[0.3, 0.4, 0.05]} />
        <meshStandardMaterial 
          color={isHovered ? "#000000" : "#333333"} 
          emissive={isHovered ? "#000000" : "#333333"} 
          emissiveIntensity={isHovered ? 0.8 : 0.4}
          metalness={1}
          roughness={0}
        />
      </mesh>
      {/* Lock Shackle */}
      <mesh position={[0, 0.5, 0.06]}>
        <torusGeometry args={[0.15, 0.03, 8, 16]} />
        <meshStandardMaterial 
          color={isHovered ? "#000000" : "#333333"} 
          emissive={isHovered ? "#000000" : "#333333"} 
          emissiveIntensity={isHovered ? 0.8 : 0.4}
          metalness={1}
          roughness={0}
        />
      </mesh>
    </group>
  );
}

const PrivacySection = ({ title, content, icon }) => {
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

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-gray-900 to-[#1e1b4b] text-white">
      <LandingHeader />
      <div className="pt-20">
        {/* Hero Section with 3D */}
        <section className="relative flex flex-col items-center justify-center h-screen text-center px-4">
          <Canvas className="absolute inset-0 z-0">
            <ambientLight intensity={0.5} />
            <pointLight position={[8, 8, 8]} intensity={1.8} color="#FFD700" />
            <pointLight position={[-8, -8, -8]} intensity={1.2} color="#FFA500" />
            <AnimatedShield />
            <Stars />
          </Canvas>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative z-10 text-lg md:text-xl max-w-2xl text-gray-300"
          >
            Your privacy is our priority. Learn how we protect your data.
          </motion.p>
        </section>

        {/* Sections */}
        <section className="py-20 px-6 max-w-4xl mx-auto">
          <PrivacySection
            icon="📊"
            title="A. Information We Collect"
            content="We collect data such as name, email, usage behavior, and cookies to improve your experience and provide personalized recommendations."
          />
          <PrivacySection
            icon="🔄"
            title="B. How We Use Your Data"
            content="Your data is used to personalize recommendations, improve service quality, enhance security, and analyze usage patterns for better features."
          />
          <PrivacySection
            icon="🍪"
            title="C. Cookies & Tracking"
            content="We use cookies to analyze traffic, improve features, ensure a smooth browsing experience, and remember your preferences."
          />
          <PrivacySection
            icon="🔒"
            title="D. Data Security"
            content="We implement advanced security measures to protect your data from unauthorized access, including encryption and secure storage."
          />
          <PrivacySection
            icon="⚖️"
            title="E. Your Rights"
            content="You can request access, deletion, or modification of your data anytime by contacting us. We respect your privacy choices."
          />
          <PrivacySection
            icon="📧"
            title="F. Contact Us"
            content="For privacy-related queries, email us at akn22csds@cmrit.ac.in or aksha.nfeb21@gmail.com. We aim to respond within 48 hours."
          />
        </section>
      </div>
      <Footer />
    </div>
  );
}
