import { motion } from 'framer-motion';
import { LandingHeader } from '@/components/landing/LandingHeader';
import Footer from '@/components/Footer';

export default function Features() {
  const features = [
    {
      title: 'Personalized Product Recommendations',
      desc: 'Our AI analyzes user behavior — clicks, likes, and purchases — to deliver personalized product suggestions with 99.5% accuracy.',
      tech: 'Python, TensorFlow, Flask, React.js',
      icon: '🧠',
    },
    {
      title: 'Real-Time Data Processing',
      desc: 'Recommendations update dynamically as users browse — no page refresh required.',
      tech: 'React.js, WebSocket, REST APIs',
      icon: '⚡',
    },
    {
      title: 'AI Model Accuracy Visualization',
      desc: 'Displays live training and prediction metrics, showing transparency and performance.',
      tech: 'Plotly, Flask API, Python',
      icon: '📊',
    },
    {
      title: 'Intelligent Search Optimization',
      desc: 'Predicts and ranks the most relevant search results using NLP-based ranking models.',
      tech: 'TF-IDF, Word2Vec, React Hooks',
      icon: '🔍',
    },
    {
      title: 'Feedback Learning System',
      desc: 'Learns from every user interaction, continuously improving recommendations over time.',
      tech: 'Reinforcement Learning, Python',
      icon: '💬',
    },
    {
      title: 'Business Impact Analytics Dashboard',
      desc: 'Provides real-time insights into trends, top products, and user engagement metrics.',
      tech: 'Recharts, Flask, React.js',
      icon: '💰',
    },
    {
      title: 'Seamless Integration',
      desc: 'Easily integrates into existing e-commerce systems via REST APIs for scalability.',
      tech: 'Flask, JSON, REST APIs',
      icon: '🧩',
    },
    {
      title: 'Modern & Responsive UI',
      desc: 'Built with React.js and Tailwind CSS for a futuristic look with smooth animations.',
      tech: 'React.js, Tailwind CSS, Framer Motion',
      icon: '🌈',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] text-white">
      <LandingHeader />
      <div className="pt-20 px-6 py-16">
        <section className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-primary to-neon-blue bg-clip-text text-transparent leading-tight"
          >
            Why Our AI Recommendation Engine Stands Out
          </motion.h1>
          <p className="text-gray-300 text-lg">
            Explore the advanced capabilities that make our AI Recommendation Engine powerful, scalable, and business-ready.
          </p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto mb-20">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 2 }}
              className="bg-[#1e293b] p-6 rounded-2xl shadow-md hover:shadow-purple-500/20 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">{feature.title}</h3>
              <p className="text-gray-400 mb-3">{feature.desc}</p>
              <p className="text-sm text-pink-400 italic">Tech Used: {feature.tech}</p>
            </motion.div>
          ))}
        </section>

        <section className="text-center max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gray-300 text-lg leading-relaxed"
          >
            Each feature in our AI Recommendation Engine was designed to merge intelligence with performance — transforming user experience into business growth.
          </motion.p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
