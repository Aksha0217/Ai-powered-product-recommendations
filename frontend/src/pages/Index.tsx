import { motion } from "framer-motion";
import { FullWidthHero3D } from "@/components/3d/FullWidthHero3D";
import { HeroText } from "@/components/hero/HeroText";
import { FeaturesShowcase } from "@/components/features/FeaturesShowcase";
import { LandingHeader } from "@/components/landing/LandingHeader";
import EurekaButton3D from "@/components/3d/EurekaButton3D";
import { Button } from "@/components/ui/button";
import { Server } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      {/* Hero Text Section */}
      <HeroText />

      {/* 3D Hero Section */}
      <FullWidthHero3D />

      {/* Eureka 3D Button Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="py-20 px-6"
      >
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-8 bg-gradient-to-r from-white via-primary to-neon-blue bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Explore Service Architecture
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground/90 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Dive into our microservices ecosystem with an immersive 3D visualization of the Eureka service registry
          </motion.p>

          <motion.div
            className="max-w-md mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <EurekaButton3D />
          </motion.div>

          {/* Eureka Server Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <Button
              onClick={() => navigate('/eureka')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white px-8 py-4 rounded-2xl shadow-lg"
            >
              <Server className="h-5 w-5 mr-2" />
              View Eureka Server
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Showcase */}
      <FeaturesShowcase />

      <Footer />
    </div>
  );
};

export default Index;
