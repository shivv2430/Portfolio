import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Terminal, Calendar, HeartHandshake, Leaf } from 'lucide-react';

const COMMUNITY_ACTIVITIES = [
  {
    id: 1,
    title: "GirlScript Summer of Code (GSSoC'26)",
    role: 'Participant, Open Source',
    emoji: '🌸',
    icon: Terminal,
    context: 'Contributing pull requests, reviewing issues, and collaborating with mentors on open source codebases.',
  },
  {
    id: 2,
    title: 'Microsoft Learn Student Ambassador Community',
    role: 'Community Member',
    emoji: '🌐',
    icon: Users,
    context: 'Engaging with student developer sessions, exploring Microsoft learning tracks, and sharing tech knowledge.',
  },
  {
    id: 3,
    title: 'Hackathons',
    role: 'Participant',
    emoji: '⚡',
    icon: Award,
    context: 'Prototyping software under sprint constraints, teaming up with peers, and building practical solutions.',
  },
  {
    id: 4,
    title: 'Hacktoberfest Offline Meetup 2026',
    role: 'Attended',
    emoji: '🎃',
    icon: Calendar,
    context: 'Connecting with local developers, celebrating open-source culture in person, and learning community practices.',
  },
  {
    id: 5,
    title: 'Salaah, Technology Department',
    role: 'Member',
    emoji: '🤝',
    icon: HeartHandshake,
    context: 'Collaborating on technological initiatives, peer learning, and college community support systems.',
  },
  {
    id: 6,
    title: 'Eco Club, Social and Content Documentation',
    role: 'Member',
    emoji: '🌱',
    icon: Leaf,
    context: 'Documenting environmental initiatives, creating student awareness materials, and handling club media.',
  },
];

function CommunityRow({ item, index }) {
  const rowRef = useRef(null);
  const [isCentered, setIsCentered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!rowRef.current) return;
      const rect = rowRef.current.getBoundingClientRect();
      const windowCenter = window.innerHeight / 2;
      const rowCenter = rect.top + rect.height / 2;
      const nearCenter = Math.abs(rowCenter - windowCenter) < 100;
      setIsCentered(nearCenter);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isCentered
          ? 'bg-purple-100/60 dark:bg-cinematic-800 border-gold-400 dark:border-gold-400 -translate-y-1 shadow-lg shadow-purple-950/20 ring-1 ring-gold-400/40'
          : 'bg-white dark:bg-cinematic-900 border-purple-200/50 dark:border-purple-800/40 hover:border-brand-400/50 shadow-sm'
      }`}
    >
      <div className="flex items-start sm:items-center gap-4">
        <span className="text-3xl p-2.5 rounded-xl bg-purple-50 dark:bg-cinematic-850 border border-purple-200/40 dark:border-purple-800/40 flex-shrink-0" aria-hidden="true">
          {item.emoji}
        </span>
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-gray-900 dark:text-white leading-tight">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-sans mt-0.5">
            {item.context}
          </p>
        </div>
      </div>

      <div className="flex items-center sm:self-center">
        <span className="inline-block text-xs font-mono font-medium px-3 py-1.5 rounded-full bg-purple-100/80 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 border border-purple-300/40 dark:border-purple-800/60 whitespace-nowrap">
          {item.role}
        </span>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section
      id="community"
      className="section-padding bg-white dark:bg-cinematic-950 relative"
      aria-labelledby="community-heading"
    >
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold text-gold-500 tracking-widest uppercase">
            Involvement
          </span>
          <h2
            id="community-heading"
            className="text-4xl sm:text-5xl font-serif text-gray-900 dark:text-white mt-1 mb-3"
          >
            Beyond Academics
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-sans">
            Collaborative development, student ambassador communities, hackathons, and student organizations.
          </p>
        </div>

        {/* Clean Row List */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {COMMUNITY_ACTIVITIES.map((act, idx) => (
            <CommunityRow key={act.id} item={act} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
