import { motion } from 'framer-motion';
import { LandingHeader } from '@/components/landing/LandingHeader';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] text-white">
      <LandingHeader />
      <div className="pt-20 px-6 py-16">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-primary to-neon-blue bg-clip-text text-transparent"
          >
            Transforming Choices with Artificial Intelligence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
          >
            Our AI Recommendation System uses data-driven insights and advanced algorithms to deliver personalized suggestions tailored to every user’s needs.
          </motion.p>
        </section>

        {/* Our Vision */}
        <section className="max-w-5xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-semibold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Our Vision
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-300 text-lg leading-relaxed text-center max-w-3xl mx-auto"
          >
            We believe every digital interaction should be intelligent. Our system learns from user behavior, adapts to preferences, and delivers smarter recommendations — improving efficiency, user engagement, and business growth.
          </motion.p>
        </section>

        {/* How It Works Overview */}
        <section className="max-w-6xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-semibold text-center mb-12"
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Data Collection', desc: 'Gathers data from users’ browsing, purchases, or activity.', icon: '📊' },
              { title: 'Feature Extraction', desc: 'Uses AI models to understand trends and patterns.', icon: '🔍' },
              { title: 'Recommendation Engine', desc: 'Generates accurate predictions using ML algorithms.', icon: '🧠' },
              { title: 'Feedback Loop', desc: 'Continuously refines accuracy through real-time learning.', icon: '🔄' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#1e293b] p-6 rounded-2xl text-center shadow-md"
              >
                <div className="text-4xl mb-3">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technologies Used */}
        <section className="max-w-6xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-semibold text-center mb-12"
          >
            Technologies Used
          </motion.h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Python', icon: '🐍', desc: 'Machine Learning model training (KNN, Decision Tree, etc.)' },
              { name: 'React.js', icon: '⚛️', desc: 'Front-end UI with smooth transitions and animations' },
              { name: 'Node.js / Express', icon: '🌐', desc: 'Handles backend requests securely' },
              { name: 'TensorFlow / Scikit-learn', icon: '🧠', desc: 'Core ML libraries for recommendation logic' },
              { name: 'MongoDB / Firebase', icon: '🗃️', desc: 'Stores user data and learning history' },
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-[#1e293b] p-4 rounded-xl text-center shadow-md"
              >
                <div className="text-3xl mb-2">{tech.icon}</div>
                <h3 className="text-lg font-semibold mb-1">{tech.name}</h3>
                <p className="text-sm text-gray-400">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="max-w-5xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-semibold text-center mb-12"
          >
            Key Features
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { feature: 'Real-time personalized recommendations', icon: '⚡' },
              { feature: 'Dynamic UI with 3D transitions', icon: '🧩' },
              { feature: 'Secure data handling', icon: '🔐' },
              { feature: 'Visual analytics dashboard', icon: '📊' },
              { feature: 'Scalable and adaptable architecture', icon: '🚀' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-[#1e293b] p-6 rounded-2xl text-center shadow-md"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="text-gray-300">{item.feature}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-6xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-semibold text-center mb-12"
          >
            Benefits
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-[#1e293b] p-6 rounded-2xl"
            >
              <h3 className="text-2xl font-semibold mb-4 text-purple-300">For Businesses</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Increased user retention</li>
                <li>• Data-driven insights for growth</li>
                <li>• Reduced bounce rate</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-[#1e293b] p-6 rounded-2xl"
            >
              <h3 className="text-2xl font-semibold mb-4 text-pink-300">For Users</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Personalized experience</li>
                <li>• Time-saving smart suggestions</li>
                <li>• Intuitive and interactive interface</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Future Scope */}
        <section className="text-center max-w-4xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-semibold mb-8"
          >
            Future Scope
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-300 text-lg leading-relaxed"
          >
            We’re evolving our recommendation system to support deep neural networks, multimodal learning, and cross-platform integration — making personalization smarter and more human.
          </motion.p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
