import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const chapters = [
  {
    id: 1,
    number: '01',
    label: 'The Beginning',
    emoji: '🌱',
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    title: 'Where It All Started',
    body: `My journey into tech started with the most universal question: "How does this website actually work?" As an Electrical & Computer Engineering student, I found myself spending more time tinkering with code than with circuits — and I knew that meant something.

What began as simple curiosity quickly turned into something deeper. Late nights decoding HTML, CSS, and JavaScript became my version of fun. Each small win — a styled button, a working form, a responsive layout — felt like unlocking a new level.`,
    quote: '"I didn\'t know where it would lead. I just knew I wanted to keep going."',
  },
  {
    id: 2,
    number: '02',
    label: 'Learning the Craft',
    emoji: '📖',
    color: 'from-blue-400 to-indigo-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    title: 'Building the Foundation',
    body: `I went from HTML to JavaScript, from vanilla JS to React, from frontend-only to full-stack. But more than technologies, I learned how to learn — how to read documentation, debug patiently, ask better questions, and embrace being a beginner.

Every error became a teacher. Stack Overflow became a daily companion. And somewhere along the way, I stopped thinking of myself as "someone learning to code" and started thinking of myself as a developer who still has a lot to learn.`,
    quote: '"The best debugging tool is a good night\'s sleep — and a fresh pair of eyes."',
  },
  {
    id: 3,
    number: '03',
    label: 'Building Things',
    emoji: '🔨',
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    title: 'Learning by Doing',
    body: `Real growth happened when I stopped just following tutorials and started building. Password generators, weather apps, result calculators — and eventually DelhiMed, a full-stack healthcare platform built with a team using React, Node.js, MongoDB, and Gemini AI.

Projects taught me what courses never could: how to scope features, handle edge cases, work with APIs, collaborate with others, and ship something real. Seven projects later, I know the best way to learn a technology is to build something with it.`,
    quote: '"I\'d rather build something imperfect and learn from it than wait for the perfect moment to start."',
  },
  {
    id: 4,
    number: '04',
    label: 'Exploring the World',
    emoji: '🧭',
    color: 'from-purple-400 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    title: 'Hackathons & Open Source',
    body: `I entered hackathons, cleared the Flipkart GRiD 8.0 screening round, contributed to open-source through GSSoC'26 and Hacktoberfest 2026, and discovered that collaboration accelerates learning faster than anything solo.

Joining the Microsoft Learn Student Ambassador community and attending dev meetups showed me that your network isn't just connections — it's people who challenge you to grow. Code is better when built together.`,
    quote: '"Collaboration taught me more in a month than solo coding did in six."',
  },
  {
    id: 5,
    number: '05',
    label: 'What\'s Next',
    emoji: '🚀',
    color: 'from-brand-400 to-brand-600',
    bgColor: 'bg-brand-50 dark:bg-brand-950/20',
    title: 'The Road Ahead',
    body: `I'm diving deeper into DSA with C++, exploring cloud computing with AWS, building AI-powered applications, and looking for opportunities to contribute meaningfully to the developer ecosystem. UI/UX design with Figma is becoming part of my workflow.

This isn't the finished story. I'm still writing it, one project at a time.`,
    quote: '"The best is still ahead — and I\'m here for every line of code it takes."',
  },
];

export default function StoryChapters() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((idx) => {
    setCurrent(Math.max(0, Math.min(chapters.length - 1, idx)));
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Arrow key navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev(); }
    };
    // Only listen when in viewport
    if (inView) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [inView, next, prev]);

  const ch = chapters[current];

  return (
    <section
      id="story"
      ref={ref}
      className="section-padding bg-gray-50/50 dark:bg-gray-900/30"
      aria-labelledby="story-heading"
    >
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-mono font-medium text-brand-500 tracking-widest uppercase">About Me</span>
          <h2 id="story-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mt-2">
            The Story Behind the Code
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Five chapters. Scroll, or use the arrow keys.
          </p>
        </motion.div>

        {/* Chapter navigation dots */}
        <div className="flex items-center justify-center gap-3 mb-8" role="tablist" aria-label="Story chapters">
          {chapters.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={i === current}
              aria-label={`Chapter ${c.number}: ${c.label}`}
              onClick={() => goTo(i)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                i === current
                  ? `bg-gradient-to-r ${c.color} text-white shadow-md`
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span aria-hidden="true">{c.emoji}</span>
              <span className="hidden sm:inline">{c.label}</span>
            </button>
          ))}
        </div>

        {/* Chapter card */}
        <div
          className="relative max-w-3xl mx-auto"
          role="tabpanel"
          aria-label={`Chapter ${ch.number}: ${ch.label}`}
        >
          <AnimatePresence mode="wait">
            <motion.article
              key={ch.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className={`${ch.bgColor} rounded-3xl border border-gray-100 dark:border-gray-800 p-8 sm:p-10`}
            >
              {/* Chapter number & label */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${ch.color} text-white text-sm font-bold`}>
                  <span aria-hidden="true">{ch.emoji}</span>
                  {ch.number}
                </span>
                <span className="text-sm font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {ch.label}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-5">
                {ch.title}
              </h3>

              <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                {ch.body.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Quote */}
              <div className="mt-8 pl-4 border-l-2 border-brand-400 dark:border-brand-500">
                <p className="text-sm italic text-brand-600 dark:text-brand-300 font-medium">
                  {ch.quote}
                </p>
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Prev / Next buttons */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              disabled={current === 0}
              aria-label="Previous chapter"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              Previous
            </button>

            <span className="text-xs font-mono text-gray-400" aria-live="polite">
              {current + 1} / {chapters.length}
            </span>

            <button
              onClick={next}
              disabled={current === chapters.length - 1}
              aria-label="Next chapter"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Closing tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-14 text-xl sm:text-2xl font-semibold text-gray-400 dark:text-gray-500 italic"
        >
          "This isn't the finished story. I'm still writing it, one project at a time."
        </motion.p>
      </div>
    </section>
  );
}
