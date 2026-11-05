import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const explorations = [
  {
    emoji: '🌐',
    title: 'Full-Stack Development',
    description: 'Going deeper into backend architecture, auth, databases, and deploying complete web applications end-to-end.',
    status: 'In progress',
    color: 'from-blue-500/10 to-indigo-500/10 border-blue-200 dark:border-blue-800',
    dot: 'bg-blue-500',
  },
  {
    emoji: '🔢',
    title: 'DSA with C++',
    description: 'Building strong fundamentals in data structures and algorithms — arrays, trees, graphs, and dynamic programming.',
    status: 'Daily practice',
    color: 'from-purple-500/10 to-pink-500/10 border-purple-200 dark:border-purple-800',
    dot: 'bg-purple-500',
  },
  {
    emoji: '☁️',
    title: 'Cloud & AWS',
    description: 'Exploring cloud computing concepts, AWS services, and learning how to architect and deploy scalable applications.',
    status: 'Learning',
    color: 'from-orange-500/10 to-amber-500/10 border-orange-200 dark:border-orange-800',
    dot: 'bg-orange-500',
  },
  {
    emoji: '🤖',
    title: 'AI-Powered Applications',
    description: 'Integrating AI APIs and building intelligent features — from chatbots to generative AI-powered tools.',
    status: 'Experimenting',
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200 dark:border-emerald-800',
    dot: 'bg-emerald-500',
  },
  {
    emoji: '🔓',
    title: 'Open-Source Development',
    description: 'Contributing to meaningful open-source projects, understanding large codebases, and collaborating with global teams.',
    status: 'Active',
    color: 'from-rose-500/10 to-red-500/10 border-rose-200 dark:border-rose-800',
    dot: 'bg-rose-500',
  },
  {
    emoji: '🎨',
    title: 'UI/UX Design & Figma',
    description: 'Learning design principles, prototyping with Figma, and bridging the gap between great design and great code.',
    status: 'Exploring',
    color: 'from-sky-500/10 to-cyan-500/10 border-sky-200 dark:border-sky-800',
    dot: 'bg-sky-500',
  },
];

export default function CurrentlyExploring() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="exploring"
      ref={ref}
      className="section-padding"
      aria-labelledby="exploring-heading"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-sm font-mono font-medium text-brand-500 tracking-widest uppercase">Learning Dashboard</span>
          <h2 id="exploring-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mt-2">
            Currently Exploring
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl">
            Technologies and topics I'm actively diving into — always a student, always building.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {explorations.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`bg-gradient-to-br ${item.color} border rounded-2xl p-5 transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl" aria-hidden="true">{item.emoji}</span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <span className={`w-1.5 h-1.5 rounded-full ${item.dot} animate-pulse`} aria-hidden="true" />
                  {item.status}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

