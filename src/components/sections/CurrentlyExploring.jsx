import { motion } from 'framer-motion';

const EXPLORING_TAGS = [
  { name: 'Full-stack development', emoji: '🌐', note: 'Architecture, auth, and deployment' },
  { name: 'DSA in C++', emoji: '⚡', note: 'Core problem solving and data structures' },
  { name: 'Cloud and AWS', emoji: '☁️', note: 'Scalable services and static delivery' },
  { name: 'AI-powered apps', emoji: '🤖', note: 'LLM integration and prompt workflows' },
  { name: 'Open source', emoji: '🔀', note: 'Collaborative code and community PRs' },
  { name: 'UI/UX and Figma', emoji: '🎨', note: 'Clean interfaces and design systems' },
];

export default function CurrentlyExploring() {
  return (
    <section
      id="exploring"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50/25 dark:bg-cinematic-900/25 border-y border-purple-200/40 dark:border-purple-900/40"
      aria-labelledby="exploring-heading"
    >
      <div className="container-max text-center">
        <span className="text-xs font-mono font-semibold text-gold-500 tracking-widest uppercase">
          Continuous Learning
        </span>
        <h2
          id="exploring-heading"
          className="text-3xl sm:text-4xl font-serif text-gray-900 dark:text-white mt-1 mb-8"
        >
          Currently Exploring
        </h2>

        {/* Clean Interactive Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {EXPLORING_TAGS.map((tag, idx) => (
            <motion.div
              key={tag.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -3, scale: 1.03 }}
              className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-white dark:bg-cinematic-850 border border-purple-200/50 dark:border-purple-800/50 shadow-sm hover:border-gold-400 dark:hover:border-gold-400 transition-all cursor-default"
            >
              <span className="text-xl" aria-hidden="true">{tag.emoji}</span>
              <div className="text-left">
                <span className="block text-xs sm:text-sm font-mono font-medium text-gray-800 dark:text-gray-200">
                  {tag.name}
                </span>
                <span className="block text-[10px] text-gray-500 dark:text-gray-400 font-sans">
                  {tag.note}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
