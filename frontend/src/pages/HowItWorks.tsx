import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Icosahedron, Text, Sphere, Line } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LandingHeader } from '@/components/landing/LandingHeader';
import Footer from '@/components/Footer';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';

const AnimatedTechCubes = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {['React', 'Python', 'Flask', 'TensorFlow', 'Three.js', 'Tailwind'].map((tech, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(i * 0.5) * 2;

        return (
          <group key={i} position={[x, y, z]}>
            <mesh>
              <boxGeometry args={[1.5, 1.5, 1.5]} />
              <meshStandardMaterial
                color={['purple', 'yellow', 'blue', 'orange', 'green', 'cyan'][i]}
                emissive={['purple', 'yellow', 'blue', 'orange', 'green', 'cyan'][i]}
                emissiveIntensity={0.1}
              />
            </mesh>
            <Text
              position={[0, 1.2, 0]}
              fontSize={0.5}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {tech}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

const ProjectDemoAnimation = () => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  // Create neural network nodes and connections
  const nodes = useMemo(() => {
    const nodePositions: [number, number, number][] = [];
    for (let i = 0; i < 20; i++) {
      const theta = (i / 20) * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3;
      nodePositions.push([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ]);
    }
    return nodePositions;
  }, []);

  const connections = useMemo(() => {
    const lines: [number, number, number][][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.9) { // Only connect some nodes
          lines.push([nodes[i], nodes[j]]);
        }
      }
    }
    return lines;
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.2;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central AI Brain Sphere */}
      <mesh ref={sphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.2}
          wireframe
        />
      </mesh>

      {/* Neural Network Nodes */}
      {nodes.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* Neural Network Connections */}
      {connections.map((connection, i) => (
        <Line
          key={i}
          points={connection}
          color="#06b6d4"
          lineWidth={1}
          transparent
          opacity={0.6}
        />
      ))}

      {/* Floating Data Points */}
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(i * 0.7) * 1.5;

        return (
          <mesh key={`data-${i}`} position={[x, y, z]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#f59e0b"
              emissiveIntensity={0.4}
            />
          </mesh>
        );
      })}

      {/* Recommendation Output Arrows */}
      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * 2.5;
        const z = Math.sin(angle) * 2.5;

        return (
          <group key={`arrow-${i}`} position={[x, 0, z]}>
            <mesh rotation={[0, angle, 0]}>
              <coneGeometry args={[0.2, 0.5, 8]} />
              <meshStandardMaterial
                color="#10b981"
                emissive="#10b981"
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] text-white">
      <LandingHeader />
      <div className="pt-20 px-6 py-16">
        {/* Section 1: Overview — “Behind the Intelligence” */}
        <section className="text-center max-w-4xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-primary to-neon-blue bg-clip-text text-transparent"
          >
            Behind the Intelligence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed mb-8"
          >
            Our AI Recommendation Engine uses advanced machine learning algorithms to understand user preferences and deliver personalized product suggestions in real time.
          </motion.p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-[#1e293b] p-6 rounded-2xl"
            >
              <h3 className="text-xl font-semibold mb-2">Frontend</h3>
              <p className="text-gray-400">React.js + Tailwind CSS for responsive, modern UI</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-[#1e293b] p-6 rounded-2xl"
            >
              <h3 className="text-xl font-semibold mb-2">Backend & ML</h3>
              <p className="text-gray-400">Flask/Node.js for API, Python (Scikit-learn/TensorFlow) for ML, MongoDB/MySQL for data</p>
            </motion.div>
          </div>
        </section>

        {/* 3D Neural Network Animation */}
        <section className="flex flex-col items-center mb-24">
          <h2 className="text-3xl font-semibold mb-6">Visualizing the Neural Network</h2>
          <div className="h-96 w-full max-w-4xl rounded-2xl overflow-hidden bg-[#111827] shadow-lg">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Icosahedron args={[2.5, 1]} position={[0, 0, 0]}>
                <meshStandardMaterial color="mediumpurple" wireframe />
              </Icosahedron>
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
            </Canvas>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-gray-400 mt-6 max-w-2xl"
          >
            A 3D rotating neural network model representing how our AI connects user data to intelligent recommendations.
          </motion.p>
        </section>

        {/* Section 2: Step-by-Step Workflow */}
        <section className="max-w-6xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-semibold text-center mb-12"
          >
            Step-by-Step Workflow
          </motion.h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-neon-blue rounded-full" />
            {[
              {
                title: '1️⃣ Data Collection',
                desc: 'Collects product browsing and user interaction data from the frontend via API.',
                icon: '📊',
              },
              {
                title: '2️⃣ Preprocessing',
                desc: 'Cleans and structures user data for model training using Python scripts.',
                icon: '🔄',
              },
              {
                title: '3️⃣ Model Training',
                desc: 'Trains a Neural Network with TensorFlow to recognize product patterns and preferences.',
                icon: '🧠',
              },
              {
                title: '4️⃣ Prediction Engine',
                desc: 'Analyzes real-time user behavior to predict best product matches with 99.5% accuracy.',
                icon: '⚡',
              },
              {
                title: '5️⃣ Recommendation Display',
                desc: 'Dynamically updates the UI with personalized suggestions using React state.',
                icon: '💡',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-1/2 p-6 rounded-2xl bg-[#1e293b] shadow-lg ${
                  index % 2 === 0 ? 'mr-8' : 'ml-8'
                }`}>
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <span className="mr-2 text-2xl">{step.icon}</span>
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg z-10">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: Tech Stack Visualization */}
        <section className="max-w-6xl mx-auto text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold mb-6"
          >
            Tech Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-300 mb-10"
          >
            We chose React.js for its interactive UI capabilities, Python for AI modeling flexibility, and TensorFlow for accurate deep learning results. This combination ensures high accuracy and smooth integration.
          </motion.p>
          {/* 3D Floating Cubes for Tech */}
          <div className="relative h-96 mb-8">
            <Canvas camera={{ position: [0, 0, 10] }}>
              <ambientLight intensity={0.3} />
              <pointLight position={[5, 5, 5]} />
              <AnimatedTechCubes />
              <OrbitControls enableRotate={false} enableZoom={false} />
            </Canvas>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {['React.js', 'Tailwind CSS', 'Python', 'Flask', 'TensorFlow', 'MongoDB', 'Three.js'].map((tech, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.1, rotateY: 180 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="px-5 py-2 bg-gradient-to-r from-primary to-neon-blue rounded-full shadow-md text-white font-medium"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </section>

        {/* Section 4: Why This Project Matters (Profit & Impact) */}
        <section className="max-w-5xl mx-auto mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold mb-6"
          >
            Why This Project Matters
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { point: 'Increases sales through personalized product suggestions 💡', color: 'neon-blue' },
              { point: 'Enhances customer engagement and satisfaction 💬', color: 'neon-cyan' },
              { point: 'Reduces search time with intelligent filtering ⚡', color: 'primary' },
              { point: 'Offers data insights to improve marketing and product placement 📈', color: 'neon-purple' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                className={`bg-[#1e293b] p-5 rounded-2xl shadow-md text-gray-300 border-l-4 border-${item.color}`}
              >
                {item.point}
              </motion.div>
            ))}
          </div>
          {/* Upward Graph Animation */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            className="h-32 bg-gradient-to-r from-primary to-neon-blue rounded-lg flex items-end justify-center"
          >
            <div className="w-4 bg-white rounded-t-full h-24 animate-pulse" />
          </motion.div>
          <p className="text-gray-400 mt-4">Achieve up to 30% sales uplift with AI-driven personalization.</p>
        </section>

        {/* Section 5: Interactive Demo */}
        <section className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold mb-6"
          >
            See It in Action
          </motion.h2>
          <p className="text-gray-300 mb-8">Experience how recommendations update in real-time based on user interactions, reaching 99.5% accuracy.</p>
          {/* Demo Video */}
          <div className="h-64 w-full max-w-2xl mx-auto bg-[#111827] rounded-2xl overflow-hidden shadow-lg mb-8">
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/Demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <Button
            size="lg"
            onClick={() => navigate('/demo')}
            className="bg-gradient-to-r from-primary to-neon-blue hover:opacity-90 text-white px-8 py-4 rounded-2xl shadow-lg"
          >
            Try It Yourself
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        {/* Section 6: Summary */}
        <section className="text-center max-w-3xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-300 text-lg leading-relaxed"
          >
            Our AI Recommendation Engine combines the power of machine learning and modern web technologies to deliver intelligent, personalized experiences — turning data into value.
          </motion.p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
