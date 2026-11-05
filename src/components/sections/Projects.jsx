import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Sparkles, X, ArrowUpRight } from 'lucide-react';
import { projects } from '../../data/projects';

function ProjectCard({ project, onSelect }) {
  const cardRef = useRef(null);
  const [isCentered, setIsCentered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowCenter = window.innerHeight / 2;
      // If card vertical center is within +/- 140px of screen center
      const cardCenter = rect.top + rect.height / 2;
      const nearCenter = Math.abs(cardCenter - windowCenter) < 140;
      setIsCentered(nearCenter);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      onClick={() => onSelect(project)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      className={`group cursor-pointer rounded-2xl bg-white dark:bg-cinematic-900 border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        isCentered
          ? 'border-gold-400 dark:border-gold-400 shadow-xl shadow-purple-900/20 -translate-y-1.5 ring-1 ring-gold-400/40'
          : 'border-purple-200/50 dark:border-purple-900/40 hover:border-brand-400 hover:-translate-y-1 shadow-md'
      }`}
      aria-label={`Project: ${project.title}. Click to view details and links.`}
    >
      <div>
        {/* Gradient Header with Emoji & Open Badge */}
        <div
          className={`relative h-44 bg-gradient-to-tr ${project.gradient} p-5 flex flex-col justify-between overflow-hidden`}
        >
          <div className="flex items-center justify-between">
            <span className="text-3xl filter drop-shadow-md" aria-hidden="true">
              {project.emoji}
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 flex items-center gap-1 group-hover:bg-gold-500 group-hover:text-black transition-colors">
              Details <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-serif text-white tracking-wide drop-shadow-sm">
              {project.title}
            </h3>
            <p className="text-xs text-white/80 font-sans line-clamp-1">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4 font-sans">
            {project.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2" aria-label="Technologies used">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-purple-100/70 dark:bg-cinematic-800 text-purple-800 dark:text-purple-300 border border-purple-200/40 dark:border-purple-800/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Direct Actions */}
      <div
        className="px-5 py-3 border-t border-purple-100/70 dark:border-purple-900/40 flex items-center justify-between text-xs font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-brand-600 dark:text-purple-300 hover:text-gold-500 font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </a>
        ) : (
          <span className="text-gray-400 italic">Demo coming soon</span>
        )}

        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:text-gold-500 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            Code
          </a>
        ) : (
          <span className="text-gray-400 italic">Code coming soon</span>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section
      id="work"
      className="section-padding bg-white dark:bg-cinematic-950 relative"
      aria-labelledby="projects-heading"
    >
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold text-gold-500 tracking-widest uppercase">
            Portfolio
          </span>
          <h2
            id="projects-heading"
            className="text-4xl sm:text-5xl font-serif text-gray-900 dark:text-white mt-1 mb-3"
          >
            Selected Work
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-sans">
            Real projects built with modern tooling. Click any project card to open its full details and direct links.
          </p>
        </div>

        {/* 6 Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onSelect={setActiveProject} />
          ))}
        </div>
      </div>

      {/* Interactive Project Modal Popup */}
      <AnimatePresence>
        {activeProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full bg-white dark:bg-cinematic-900 border border-purple-400/40 dark:border-purple-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setActiveProject(null)}
                aria-label="Close project modal"
                className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 dark:bg-cinematic-800 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl p-2.5 rounded-2xl bg-purple-100 dark:bg-cinematic-800 border border-purple-300/30">
                  {activeProject.emoji}
                </span>
                <div>
                  <h3
                    id="project-modal-title"
                    className="text-2xl sm:text-3xl font-serif text-gray-900 dark:text-white leading-tight"
                  >
                    {activeProject.title}
                  </h3>
                  <p className="text-xs font-mono text-gold-500">
                    {activeProject.tagline}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-sans">
                {activeProject.description}
              </p>

              <div className="p-4 rounded-xl bg-purple-50 dark:bg-cinematic-850 border border-purple-200/50 dark:border-purple-900/40 mb-6">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {activeProject.details}
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-7">
                <span className="block text-xs font-mono uppercase text-gray-400 mb-2">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-purple-100 dark:bg-cinematic-800 text-purple-800 dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-purple-100 dark:border-purple-900/40">
                {activeProject.demo ? (
                  <a
                    href={activeProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-purple-700 hover:from-brand-500 hover:to-purple-600 text-white font-medium text-sm transition-all shadow-md shadow-purple-900/30"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Live Demo
                  </a>
                ) : (
                  <div className="flex-1 text-center py-2.5 px-4 rounded-xl bg-gray-100 dark:bg-cinematic-800 text-xs font-mono text-gray-400">
                    Live Demo: Coming soon
                  </div>
                )}

                {activeProject.github ? (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-purple-300 dark:border-purple-800 hover:border-gold-400 text-gray-800 dark:text-gray-200 text-sm font-medium transition-all"
                  >
                    <Github className="w-4 h-4" />
                    View GitHub Repo
                  </a>
                ) : (
                  <div className="py-2.5 px-4 rounded-xl border border-gray-200 dark:border-cinematic-800 text-xs font-mono text-gray-400">
                    GitHub: Coming soon
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
