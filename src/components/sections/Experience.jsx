import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, Code2, ExternalLink, Calendar } from 'lucide-react';

const experiences = [
  {
    id: 'gssoc',
    type: 'Open Source',
    emoji: '🌐',
    color: 'from-orange-400 to-pink-500',
    title: "GSSoC'26 Contributor",
    org: 'GirlScript Summer of Code',
    period: '2026',
    description:
      "Contributing to open-source projects as part of GirlScript Summer of Code 2026 — reviewing issues, submitting PRs, and collaborating with maintainers across diverse repositories.",
    tags: ['Open Source', 'Collaboration', 'GitHub'],
    link: null,
  },
  {
    id: 'flipkart',
    type: 'Hackathon',
    emoji: '🏆',
    color: 'from-yellow-400 to-orange-500',
    title: 'Flipkart GRiD 8.0',
    org: 'Flipkart',
    period: '2026',
    description:
      'Cleared the screening round of Flipkart GRiD 8.0, a prestigious engineering challenge testing real-world problem-solving, system design, and technical depth.',
    tags: ['Hackathon', 'Problem Solving', 'Engineering'],
    link: null,
  },
  {
    id: 'mlsa',
    type: 'Community',
    emoji: '🎓',
    color: 'from-blue-400 to-indigo-500',
    title: 'Microsoft Learn Student Ambassador',
    org: 'Microsoft',
    period: '2025 – Present',
    description:
      "Part of Microsoft's global student community — participating in learning events, connecting with fellow developers, and exploring Microsoft technologies like Azure and AI.",
    tags: ['Microsoft', 'Community', 'Azure', 'Learning'],
    link: null,
  },
  {
    id: 'hacktoberfest',
    type: 'Open Source',
    emoji: '🎃',
    color: 'from-purple-400 to-pink-500',
    title: 'Hacktoberfest 2026 Participant',
    org: 'DigitalOcean / GitHub',
    period: 'October 2026',
    description:
      'Contributed to open-source projects during Hacktoberfest 2026 — submitting meaningful pull requests, fixing bugs, and improving documentation across public repositories.',
    tags: ['Open Source', 'Hacktoberfest', 'GitHub'],
    link: null,
  },
];

function ExperienceCard({ exp, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-lg transition-all duration-300 group"
    >
      <div className={`h-1 bg-gradient-to-r ${exp.color}`} aria-hidden="true" />

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center text-xl shadow-md flex-shrink-0`} aria-hidden="true">
              {exp.emoji}
            </div>
            <div>
              <span className="text-xs font-mono font-medium text-brand-500 uppercase tracking-wider">{exp.type}</span>
              <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{exp.title}</h3>
            </div>
          </div>
          {exp.link && (
            <a
              href={exp.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${exp.title}`}
              className="p-1.5 text-gray-400 hover:text-brand-500 transition-colors rounded-lg"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400">
          <Users className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
          <span>{exp.org}</span>
          <span aria-hidden="true">·</span>
          <Calendar className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
          <span>{exp.period}</span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {exp.description}
        </p>

        <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tags">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              role="listitem"
              className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="community"
      ref={ref}
      className="section-padding"
      aria-labelledby="experience-heading"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-sm font-mono font-medium text-brand-500 tracking-widest uppercase">Community &amp; Milestones</span>
          <h2 id="experience-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mt-2">
            Beyond Academics
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl">
            Hackathons, open-source contributions, and community involvement that have shaped my growth.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
