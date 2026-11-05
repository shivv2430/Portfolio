import { useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { journeyNodes } from '../../data/journey';

function NodePanel({ node, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`panel-title-${node.id}`}
      className="fixed inset-x-4 bottom-6 sm:absolute sm:inset-auto sm:bottom-auto sm:top-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-96 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${node.color} text-white text-sm font-semibold`}>
          <span aria-hidden="true">{node.emoji}</span>
          {node.label}
        </div>
        <button
          onClick={onClose}
          aria-label="Close panel"
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <h3 id={`panel-title-${node.id}`} className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {node.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        {node.story}
      </p>

      <div className="flex items-center gap-2 text-xs text-brand-600 dark:text-brand-400 font-medium bg-brand-50 dark:bg-brand-950/30 rounded-lg px-3 py-2">
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
        {node.milestone}
      </div>
    </motion.div>
  );
}

export default function JourneyMap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeNode, setActiveNode] = useState(null);
  const closePanel = useCallback(() => setActiveNode(null), []);

  const handleKeyDown = (e, node) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveNode(activeNode?.id === node.id ? null : node);
    }
    if (e.key === 'Escape') closePanel();
  };

  return (
    <section
      id="journey"
      ref={ref}
      className="section-padding"
      aria-labelledby="journey-heading"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-sm font-mono font-medium text-brand-500 tracking-widest uppercase">My Story</span>
          <h2 id="journey-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mt-2">
            Developer Journey
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl">
            Click on any milestone to explore the story behind it.
          </p>
        </motion.div>

        {/* Journey Map SVG */}
        <div className="relative bg-gray-50 dark:bg-gray-900/40 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden" style={{ minHeight: '400px' }}>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full opacity-20 dark:opacity-10"
            aria-hidden="true"
          >
            <polyline
              points={journeyNodes.map(n => `${n.position.x},${n.position.y}`).join(' ')}
              fill="none"
              stroke="#4a6cf7"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          </svg>

          <div className="relative p-8" style={{ minHeight: '400px' }}>
            {/* Panel */}
            <AnimatePresence>
              {activeNode && (
                <NodePanel node={activeNode} onClose={closePanel} />
              )}
            </AnimatePresence>

            {/* Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {journeyNodes.map((node, i) => (
                <motion.button
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  onClick={() => setActiveNode(activeNode?.id === node.id ? null : node)}
                  onKeyDown={(e) => handleKeyDown(e, node)}
                  aria-expanded={activeNode?.id === node.id}
                  aria-label={`${node.label}: ${node.title}`}
                  className={`group relative text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                    activeNode?.id === node.id
                      ? 'border-brand-400 bg-brand-50 dark:bg-brand-950/30 shadow-lg shadow-brand-500/10'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-md'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${node.color} mb-3 shadow-md text-xl`} aria-hidden="true">
                    {node.emoji}
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{node.label}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{node.title}</p>

                  <div className={`absolute top-3 right-3 w-2 h-2 rounded-full transition-all ${
                    activeNode?.id === node.id ? 'bg-brand-500 scale-125' : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-brand-400'
                  }`} aria-hidden="true" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
