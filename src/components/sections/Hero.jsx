import { motion } from 'framer-motion';
import { Github, Linkedin, Download, ArrowRight, Sparkles } from 'lucide-react';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function FloatingOrb({ className }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 dark:opacity-15 animate-pulse-slow pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}

export default function Hero() {
  const handleScroll = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Background orbs */}
      <FloatingOrb className="w-96 h-96 bg-brand-400 -top-20 -right-20" />
      <FloatingOrb className="w-72 h-72 bg-purple-400 bottom-10 -left-20" />
      <FloatingOrb className="w-56 h-56 bg-pink-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(74,108,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,108,247,1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="container-max section-padding w-full relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left"
          >
            {/* Status badge */}
            <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Currently learning, building & exploring
            </motion.div>

            <motion.h1
              variants={item}
              id="hero-heading"
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-4"
            >
              Hi, I&apos;m{' '}
              <span className="text-gradient">Shivani</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4 leading-snug"
            >
              Turning Curiosity Into Code &amp;<br className="hidden sm:block" /> Ideas Into Reality.
            </motion.p>

            <motion.p
              variants={item}
              className="text-base text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              I&apos;m a BTech student, developer, and lifelong learner passionate about building
              meaningful digital experiences, exploring new technologies, and contributing
              to the developer community.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
              <button
                onClick={() => handleScroll('#projects')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                View My Work
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                onClick={() => handleScroll('#contact')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-600 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                Let&apos;s Connect
              </button>

              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-3 text-gray-500 dark:text-gray-400 font-medium rounded-xl border border-dashed border-gray-300 dark:border-gray-700 hover:border-brand-400 hover:text-brand-500 transition-all duration-200"
                aria-label="Download Resume"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={item} className="flex items-center justify-center lg:justify-start gap-4">
              <a
                href="https://github.com/shivv2430"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
                <span>GitHub</span>
              </a>
              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
              <a
                href="https://www.linkedin.com/in/shivv2430"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Animated Developer Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="hidden lg:flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="relative w-80 h-80">
              {/* Central circle */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-200 dark:border-brand-800 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full border border-brand-100 dark:border-brand-900/50" />

              {/* Core */}
              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-brand-500/30">
                <span className="text-5xl">👩‍💻</span>
              </div>

              {/* Orbiting skill chips */}
              {['React', 'Node.js', 'C++', 'Python', 'Figma', 'AWS'].map((skill, i) => {
                const angle = (i / 6) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 130;
                const x = 160 + r * Math.cos(rad);
                const y = 160 + r * Math.sin(rad);
                return (
                  <motion.div
                    key={skill}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: x, top: y }}
                    animate={{ y: [y - 4, y + 4, y - 4] }}
                    transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="px-2 py-1 text-xs font-mono font-semibold bg-white dark:bg-gray-800 text-brand-600 dark:text-brand-400 rounded-full shadow-md border border-brand-100 dark:border-brand-900/50 whitespace-nowrap">
                      {skill}
                    </span>
                  </motion.div>
                );
              })}

              {/* Sparkles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${[15, 80, 10, 85][i]}%`,
                    top: `${[20, 15, 75, 70][i]}%`,
                  }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-brand-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-xs text-gray-400 font-mono">scroll down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-brand-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
