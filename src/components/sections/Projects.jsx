import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../../data/projects';

function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-xl transition-all duration-300"
      aria-label={`Project: ${project.title}`}
    >
      {/* Thumbnail */}
      <div className={`relative h-36 bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`} aria-hidden="true">
        <span className="text-5xl opacity-80">{project.emoji}</span>
        <div className="absolute inset-0 bg-black/10" />
        {project.featured && (
          <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-semibold bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30">
            Featured
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4" role="list" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span
              key={tag}
              role="listitem"
              className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700/50">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" aria-hidden="true" />
              GitHub
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-gray-300 dark:text-gray-600 cursor-not-allowed">
              <Github className="w-3.5 h-3.5" aria-hidden="true" />
              GitHub
            </span>
          )}

          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live demo`}
              className="flex items-center gap-1.5 text-xs font-medium text-brand-500 hover:text-brand-600 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              Live Demo
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-gray-300 dark:text-gray-600 cursor-not-allowed" aria-label="No live demo available">
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              Live Demo
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? projects : projects.slice(0, 6);

  return (
    <section
      id="projects"
      ref={ref}
      className="section-padding bg-gray-50/50 dark:bg-gray-900/30"
      aria-labelledby="projects-heading"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-sm font-mono font-medium text-brand-500 tracking-widest uppercase">Portfolio</span>
          <h2 id="projects-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mt-2">
            Featured Projects
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl">
            A selection of projects I&apos;ve built — each one a step in my growth as a developer.
          </p>
        </motion.div>

        {inView && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}

        {projects.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(v => !v)}
              className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-brand-400 hover:text-brand-500 font-medium rounded-xl transition-all"
              aria-expanded={showAll}
            >
              {showAll ? 'Show Less' : `Show All ${projects.length} Projects`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
