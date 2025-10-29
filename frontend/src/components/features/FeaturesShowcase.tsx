import { motion } from "framer-motion";
import { Brain, TrendingUp, Network, Zap, Target, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "Hybrid AI Models",
    description: "Combines collaborative filtering, content-based, and deep learning approaches",
    gradient: "from-neon-purple to-neon-blue",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Analytics",
    description: "Live performance metrics and user behavior tracking with instant updates",
    gradient: "from-neon-blue to-neon-cyan",
  },
  {
    icon: Network,
    title: "3D Visualizations",
    description: "Interactive product relationship networks and data exploration",
    gradient: "from-neon-cyan to-success",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-15ms response times with distributed caching and optimization",
    gradient: "from-neon-pink to-neon-purple",
  },
  {
    icon: Target,
    title: "Precision Targeting",
    description: "Advanced segmentation with 99%+ accuracy in user preference prediction",
    gradient: "from-warning to-neon-pink",
  },
  {
    icon: Sparkles,
    title: "Auto-Learning",
    description: "Continuous model improvement through reinforcement learning",
    gradient: "from-success to-neon-cyan",
  },
];

export const FeaturesShowcase = () => {
  return (
    <section className="py-32 relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-background" />
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-1 bg-gradient-to-r from-white via-primary to-neon-blue bg-clip-text text-transparent neon-text tracking-wide leading-[2] pb-12">
            Cutting-Edge Features
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Powered by <span className="text-primary font-semibold">state-of-the-art</span> machine learning algorithms
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full glass-card-hover group cursor-pointer relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-[2px] mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center">
                      <Icon className="h-7 w-7 text-foreground" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors relative z-10">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed relative z-10">
                    {feature.description}
                  </p>

                  <div className={`mt-6 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
