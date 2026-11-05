import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../../data/skills';

function SkillCard({ skill, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-md transition-all cursor-default"
    >
      {skill}
    </motion.div>
  );
}

function CategoryCard({ category, inView }) {
  return (
    <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
      <div className={`h-1 bg-gradient-to-r ${category.color}`} aria-hidden="true" />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl" aria-hidden="true">{category.emoji}</span>
          <h3 className="font-semibold text-gray-900 dark:text-white">{category.label}</h3>
        </div>
        <div className="flex flex-wrap gap-2" role="list" aria-label={`${category.label} skills`}>
          {category.skills.map((skill, i) => (
            <div key={skill} role="listitem">
              {inView && <SkillCard skill={skill} delay={i * 0.05} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="skills"
      ref={ref}
      className="section-padding"
      aria-labelledby="skills-heading"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-sm font-mono font-medium text-brand-500 tracking-widest uppercase">Tech Stack</span>
          <h2 id="skills-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mt-2">
            Toolbox
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl">
            Technologies I work with and tools that have become part of my everyday workflow.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {skillCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
