import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../../data/skills';

function SkillBadge({ name, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      whileHover={{ y: -2, scale: 1.03 }}
      className="px-3.5 py-1.5 rounded-xl bg-purple-50/70 dark:bg-cinematic-850 text-gray-800 dark:text-gray-200 border border-purple-200/50 dark:border-purple-800/40 text-xs font-mono shadow-sm hover:border-gold-400 hover:text-gold-500 dark:hover:text-gold-300 transition-all cursor-default"
    >
      {name}
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="toolbox"
      ref={ref}
      className="section-padding bg-purple-50/30 dark:bg-cinematic-900/30 relative"
      aria-labelledby="toolbox-heading"
    >
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold text-gold-500 tracking-widest uppercase">
            Technologies
          </span>
          <h2
            id="toolbox-heading"
            className="text-4xl sm:text-5xl font-serif text-gray-900 dark:text-white mt-1 mb-3"
          >
            Toolbox
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-sans">
            Languages, frameworks, databases, and development tools I use to build real-world software.
          </p>
        </div>

        {/* 4 Category Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: catIdx * 0.1 }}
              className="rounded-2xl bg-white dark:bg-cinematic-850 border border-purple-200/50 dark:border-purple-800/50 p-6 flex flex-col justify-between shadow-md hover:border-brand-400/50 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="text-2xl" aria-hidden="true">{cat.emoji}</span>
                  <h3 className="font-serif text-xl text-gray-900 dark:text-white">
                    {cat.label}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2" role="list" aria-label={`${cat.label} skills`}>
                  {cat.skills.map((skill, sIdx) => (
                    <div key={skill} role="listitem">
                      <SkillBadge name={skill} index={sIdx} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-purple-100/60 dark:border-purple-900/40 text-[11px] font-mono text-gray-400">
                {cat.skills.length} core technologies
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
