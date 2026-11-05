import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';

const CHAPTERS = [
  {
    id: 1,
    number: '01',
    title: 'The Beginning',
    subtitle: 'It started with one question: "how does this actually work?"',
    image: '/assets/chapters/chapter-1.jpg',
    meta: 'BTech 2nd Year &bull; ELCE &bull; ABES Engineering College, Ghaziabad',
    milestones: [
      'First lines of code in C++ and exploring basics',
      'Curiosity sparked about how websites operate behind the scenes',
      'Choosing software development alongside engineering studies',
    ],
    context: 'Sitting in front of the screen wondering how simple characters transform into digital systems. That initial curiosity turned into late evening problem solving and an ongoing commitment to write code every day.',
  },
  {
    id: 2,
    number: '02',
    title: 'Building the Foundation',
    subtitle: 'From HTML and CSS to JavaScript, React, and learning how to learn.',
    image: '/assets/chapters/chapter-2.jpg',
    meta: 'Core Stack &bull; Frontend Fundamentals',
    milestones: [
      'HTML structure, responsive modern CSS, and DOM interactions',
      'JavaScript logic, async API calls, and state handling',
      'React component architecture and modern workflow tools',
    ],
    context: 'Every error message became a teacher. I learned to read official documentation, debug calmly, ask better questions, and embrace being a beginner with patience.',
  },
  {
    id: 3,
    number: '03',
    title: 'Learning by Doing',
    subtitle: 'Real growth happened when I stopped just following tutorials and started building.',
    image: '/assets/chapters/chapter-3.jpg',
    meta: 'Practical Projects &bull; Full-Stack Experiments',
    milestones: [
      'Shipped Password Generator, Weather App, and interactive tools',
      'Collaborated on LazyStudy AI and full-stack healthcare platforms',
      'Practiced end-to-end cycles: plan, build, test, deploy, and repeat',
    ],
    context: 'Building independent projects pushed me beyond tutorials into real-world debugging, responsive design quirks, and working effectively with team members.',
  },
  {
    id: 4,
    number: '04',
    title: 'Hackathons & Open Source',
    subtitle: 'Code is better when built together in collaborative environments.',
    image: '/assets/chapters/chapter-4.jpg',
    meta: 'Open Source &bull; Team Competitions',
    milestones: [
      'Active participant in GirlScript Summer of Code (GSSoC 2026)',
      'Contributed during Hacktoberfest and navigated community codebases',
      'Built fast under pressure in multiple competitive hackathons',
    ],
    context: 'Hackathons and open-source contributions taught me how to read other people\'s code, communicate clearly via pull requests, and solve non-trivial problems as a team.',
  },
  {
    id: 5,
    number: '05',
    title: 'Community & Growth',
    subtitle: 'Learning, networking, collaborating, and sharing knowledge with others.',
    image: '/assets/chapters/chapter-5.jpg',
    meta: 'Leadership &bull; Content &bull; Communities',
    milestones: [
      'Gemini Student Ambassador and Microsoft Learn community member',
      'Salaah Technology Department and Eco Club documentation member',
      'Creating technical learning content on YouTube, Instagram, and LinkedIn',
    ],
    context: 'Growth accelerates when you help others learn. Connecting with fellow developers at meetups and sharing what I discover keeps me inspired to continue building.',
  },
];

export default function StoryChapters() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showContext, setShowContext] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef(null);

  const goTo = useCallback((idx) => {
    setCurrentIdx(Math.max(0, Math.min(CHAPTERS.length - 1, idx)));
    setShowContext(false);
  }, []);

  const next = useCallback(() => goTo(currentIdx + 1), [currentIdx, goTo]);
  const prev = useCallback(() => goTo(currentIdx - 1), [currentIdx, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (modalOpen && e.key === 'Escape') {
        setModalOpen(false);
        return;
      }
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev, modalOpen]);

  const ch = CHAPTERS[currentIdx];

  return (
    <section
      id="story"
      ref={sectionRef}
      className="section-padding bg-purple-50/40 dark:bg-cinematic-900/40 relative overflow-hidden"
      aria-labelledby="story-heading"
    >
      <div className="container-max relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-semibold text-gold-500 tracking-widest uppercase">
            Interactive Journey
          </span>
          <h2
            id="story-heading"
            className="text-4xl sm:text-5xl font-serif text-gray-900 dark:text-white mt-1 mb-3"
          >
            The Story Behind the Code
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-sans">
            Five chapters from first syntax to open-source code. Click the card or use arrow keys to navigate.
          </p>
        </div>

        {/* Chapter Progress Tabs */}
        <div
          role="tablist"
          aria-label="Story chapter steps"
          className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap"
        >
          {CHAPTERS.map((c, i) => {
            const isActive = i === currentIdx;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => goTo(i)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-900/40 font-bold scale-105 border border-gold-400/40'
                    : 'bg-white/80 dark:bg-cinematic-800 text-gray-600 dark:text-gray-400 border border-purple-200/40 dark:border-purple-800/40 hover:text-gold-400'
                }`}
              >
                <span>{c.number}</span>
                <span className="hidden md:inline font-sans font-medium">{c.title}</span>
              </button>
            );
          })}
        </div>

        {/* Cinematic Chapter Box */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-3xl bg-white dark:bg-cinematic-850 border border-purple-200/60 dark:border-purple-800/50 shadow-2xl overflow-hidden p-6 sm:p-8"
            >
              <div className="grid md:grid-cols-12 gap-8 items-center">
                {/* Photo Slot */}
                <div className="md:col-span-5 relative group">
                  <div
                    onClick={() => setModalOpen(true)}
                    className="relative aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-purple-300/30 dark:border-purple-700/40"
                    title="Click image to view full story notes"
                  >
                    <img
                      src={ch.image}
                      alt={`Shivani Pal: ${ch.title}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cinematic-950/80 via-transparent to-transparent" />
                    
                    {/* Chapter tag */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-cinematic-950/85 backdrop-blur-md text-gold-300 text-xs font-mono border border-gold-400/30">
                      Chapter {ch.number}
                    </div>

                    <div className="absolute bottom-3 inset-x-3 text-center">
                      <span className="inline-block text-xs text-white/90 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                        Click image for details &rarr;
                      </span>
                    </div>
                  </div>
                </div>

                {/* Narrative Details */}
                <div className="md:col-span-7 flex flex-col justify-center">
                  <div
                    dangerouslySetInnerHTML={{ __html: ch.meta }}
                    className="text-xs font-mono text-gold-500 dark:text-gold-400 uppercase tracking-wider mb-2"
                  />
                  
                  <h3 className="text-3xl sm:text-4xl font-serif text-gray-900 dark:text-white mb-3">
                    {ch.title}
                  </h3>

                  <p className="text-base sm:text-lg text-purple-900/80 dark:text-purple-200/90 font-medium leading-relaxed mb-6">
                    {ch.subtitle}
                  </p>

                  {/* Milestones list */}
                  <div className="space-y-2.5 mb-6">
                    {ch.milestones.map((m, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>

                  {/* Context Revealer */}
                  <div className="pt-2">
                    {!showContext ? (
                      <button
                        onClick={() => setShowContext(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-600 dark:text-purple-300 hover:text-gold-500 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        See the context
                      </button>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 bg-purple-100/40 dark:bg-purple-950/40 p-3.5 rounded-xl border border-purple-200/40 dark:border-purple-800/40 leading-relaxed font-sans"
                      >
                        {ch.context}
                      </motion.p>
                    )}
                  </div>
                </div>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-purple-200/40 dark:border-purple-800/40">
                <button
                  onClick={prev}
                  disabled={currentIdx === 0}
                  aria-label="Previous chapter"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono text-gray-600 dark:text-gray-300 hover:bg-purple-100/60 dark:hover:bg-cinematic-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous Chapter
                </button>

                <span className="text-xs font-mono text-gray-400">
                  {currentIdx + 1} of {CHAPTERS.length}
                </span>

                <button
                  onClick={next}
                  disabled={currentIdx === CHAPTERS.length - 1}
                  aria-label="Next chapter"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono text-gray-600 dark:text-gray-300 hover:bg-purple-100/60 dark:hover:bg-cinematic-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next Chapter
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Closing Tagline */}
        <p className="text-center mt-12 text-lg sm:text-xl font-serif italic text-gray-500 dark:text-gray-400">
          "This isn't the finished story. I'm still writing it, one project at a time."
        </p>
      </div>

      {/* Modal Popup with Expanded Chapter Image and Notes */}
      <AnimatePresence>
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Chapter ${ch.number} details`}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white dark:bg-cinematic-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
                className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 dark:bg-cinematic-800 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-gold-400 mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Chapter {ch.number} Notes</span>
              </div>

              <h4 className="text-3xl font-serif text-gray-900 dark:text-white mb-2">
                {ch.title}
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300 font-medium mb-4">
                {ch.subtitle}
              </p>

              <div className="rounded-2xl overflow-hidden mb-6 border border-purple-500/20 max-h-[420px] flex items-center justify-center bg-black">
                <img
                  src={ch.image}
                  alt={ch.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-3 mb-6">
                <h5 className="text-xs font-mono uppercase text-gray-400 tracking-wider">
                  Key Learnings &amp; Milestones
                </h5>
                {ch.milestones.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-purple-100/50 dark:bg-purple-950/40 border border-purple-200/50 dark:border-purple-800/40">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                  {ch.context}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
