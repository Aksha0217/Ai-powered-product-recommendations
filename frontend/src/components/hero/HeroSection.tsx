import { motion } from "framer-motion";
import { HeroScene } from "@/components/3d/HeroScene";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[#0f0a1f] to-background" />
      
      {/* Enhanced animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] animate-pulse-slow" />
      
      {/* Multiple animated gradient orbs for depth */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-neon-blue/30 rounded-full blur-[120px]"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.6, 0.4, 0.6],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neon-pink/20 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-primary to-neon-blue bg-clip-text text-transparent neon-text">
              AI-Powered
            </span>
            <br />
            <span className="bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-pink bg-clip-text text-transparent">
              Product Recommendations
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed mb-8">
            Personalize product recommendations with AI precision. Our advanced neural network analyzes user behavior to identify perfect matches with <span className="text-primary font-semibold">99.5% accuracy</span>. Enhance your shopping experience with intelligent suggestions.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button
              size="lg"
              onClick={() => navigate("/demo")}
              className="group relative bg-gradient-to-r from-primary via-neon-blue to-neon-cyan hover:opacity-90 text-white text-lg px-10 py-7 rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                Get Recommendations Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary/40 hover:bg-primary/20 hover:border-primary/60 text-lg px-10 py-7 rounded-2xl backdrop-blur-sm transition-all duration-300"
            >
              <span className="flex items-center">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-8"
          >
            <div>
              <div className="text-3xl font-bold text-neon-purple">99.5%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="text-3xl font-bold text-neon-blue">2.5M+</div>
              <div className="text-sm text-muted-foreground">Predictions/Day</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="text-3xl font-bold text-neon-cyan">15ms</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 right-20 w-20 h-20 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue opacity-20 blur-3xl"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue opacity-20 blur-3xl"
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
};
