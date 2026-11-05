import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Youtube, Download, ArrowRight, Sparkles } from 'lucide-react';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function Hero() {
  const handleScroll = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center overflow-hidden pt-20 pb-16"
      aria-labelledby="hero-heading"
    >
      {/* Cinematic purple & gold ambient glows */}
      <div
        className="absolute -top-32 right-0 w-[500px] h-[500px] bg-brand-600/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-20 w-[420px] h-[420px] bg-gold-500/10 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-max section-padding w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Status Indicator */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-100/70 dark:bg-cinematic-850 border border-purple-300/40 dark:border-purple-800/60 text-purple-900 dark:text-purple-200 text-xs font-mono mb-6"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500" />
              </span>
              <span>Currently learning, building and exploring</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              id="hero-heading"
              className="text-6xl sm:text-7xl lg:text-8xl font-serif tracking-tight text-gray-900 dark:text-white mb-4 leading-none"
            >
              Shivani <span className="italic text-gradient">Pal</span>
            </motion.h1>

            {/* Headline */}
            <motion.p
              variants={item}
              className="text-2xl sm:text-3xl font-serif text-gray-800 dark:text-gray-200 mb-4 leading-snug"
            >
              Turning curiosity into code and ideas into reality.
            </motion.p>

            {/* Supporting Short Line */}
            <motion.p
              variants={item}
              className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 font-sans"
            >
              BTech 2nd Year, Electrical and Computer Engineering at ABES Engineering College, Ghaziabad. Aspiring software engineer driven by curiosity, modern web stacks, and open source collaboration.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-8"
            >
              <button
                onClick={() => handleScroll('#story')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-600 to-purple-700 hover:from-brand-500 hover:to-purple-600 text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-lg shadow-purple-900/30 hover:-translate-y-0.5"
              >
                Explore My Journey
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                onClick={() => handleScroll('#work')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-cinematic-850 text-gray-800 dark:text-gray-200 font-medium text-sm rounded-xl border border-purple-200/60 dark:border-purple-800/60 hover:border-gold-400 transition-all duration-200 hover:-translate-y-0.5"
              >
                View My Work
              </button>

              <button
                onClick={() => handleScroll('#contact')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-purple-700 dark:text-purple-300 hover:text-gold-500 rounded-xl transition-colors"
              >
                Let's Connect
              </button>

              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider text-gray-600 dark:text-gray-400 rounded-xl border border-dashed border-purple-300 dark:border-purple-800 hover:border-gold-400 hover:text-gold-400 transition-all"
                aria-label="Download Resume"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={item}
              className="flex items-center justify-center lg:justify-start gap-5 pt-2"
            >
              {[
                { icon: Github, href: 'https://github.com/shivv2430', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/shivv2430', label: 'LinkedIn' },
                { icon: Instagram, href: 'https://www.instagram.com/shivani.learns/', label: 'Instagram' },
                { icon: Youtube, href: 'https://www.youtube.com/@Shivani.learns', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-400 hover:text-gold-400 transition-colors p-1"
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Hero Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Decorative border frame */}
              <div
                className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-brand-600/40 via-purple-500/20 to-gold-400/30 blur-sm"
                aria-hidden="true"
              />

              <div className="relative rounded-2xl bg-white dark:bg-cinematic-900 border border-purple-300/40 dark:border-purple-800/50 p-6 shadow-2xl overflow-hidden">
                {/* Visual Avatar / Card Header */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-5 bg-gradient-to-b from-purple-950 to-cinematic-950 flex items-center justify-center border border-purple-500/20">
                  <img
                    src="/assets/chapters/chapter-1.jpg"
                    alt="Shivani Pal"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cinematic-950 via-transparent to-transparent opacity-60" />
                  <span className="absolute bottom-3 left-3 text-xs font-mono text-gold-300 bg-cinematic-950/80 px-2.5 py-1 rounded-md border border-gold-400/30 backdrop-blur-sm">
                    ABESEC &bull; ELCE '27
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                  <span>Stack Focus:</span>
                  <span className="text-purple-400">React &bull; C++ &bull; Node.js</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
