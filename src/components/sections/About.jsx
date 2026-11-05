import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Code, Rocket, Users, Trophy, Lightbulb } from 'lucide-react';

const highlights = [
  { icon: BookOpen, text: 'BTech in Electrical & Computer Engineering', color: 'text-blue-500' },
  { icon: Code, text: 'Learning by building real-world projects', color: 'text-emerald-500' },
  { icon: Rocket, text: 'Exploring full-stack & emerging tech', color: 'text-orange-500' },
  { icon: Users, text: 'Active in open-source & dev communities', color: 'text-purple-500' },
  { icon: Trophy, text: "Hackathons, GSSoC, Flipkart GRiD", color: 'text-yellow-500' },
  { icon: Lightbulb, text: 'Passionate about UI/UX & problem-solving', color: 'text-pink-500' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-gray-50/50 dark:bg-gray-900/30"
      aria-labelledby="about-heading"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <span className="text-sm font-mono font-medium text-brand-500 tracking-widest uppercase">About Me</span>
          <h2 id="about-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            My Journey
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 space-y-5 text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            <p>
              Hey! I&apos;m <strong className="text-gray-900 dark:text-white">Shivani Pal</strong>, a BTech student in
              Electrical and Computer Engineering who somehow found herself more excited about
              building software than anything a typical ECE syllabus could offer — and I think
              that&apos;s a good thing.
            </p>
            <p>
              My path into tech started with that universal question: <em>&quot;How does this website
              actually work?&quot;</em> What began as curiosity turned into late nights learning HTML,
              then CSS, then JavaScript, then React — and somewhere along the way, it stopped
              feeling like studying and started feeling like building something real.
            </p>
            <p>
              I believe the best way to learn is to build. Not just follow tutorials, but hit
              errors, google furiously, debug for hours, and finally see something work. That
              experience has shaped how I approach every project — whether it&apos;s a simple
              to-do app or a full-stack healthcare platform built with a team.
            </p>
            <p>
              Outside of personal projects, I&apos;ve participated in hackathons, cleared the
              Flipkart GRiD 8.0 screening round, contributed to open source through GSSoC&apos;26
              and Hacktoberfest 2026, and been part of the Microsoft Learn Student Ambassador
              community. Each of these experiences has pushed me to grow in ways that coursework
              alone never could.
            </p>
            <p>
              Right now, I&apos;m exploring DSA with C++, cloud computing with AWS, AI-powered
              applications, and diving deeper into UI/UX with Figma. I&apos;m always looking for the
              next problem worth solving.
            </p>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 space-y-4">
              <h3 className="text-sm font-mono font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-5">
                Quick Highlights
              </h3>
              {highlights.map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${color}`} aria-hidden="true" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{text}</span>
                </div>
              ))}
            </div>

            {/* Quote card */}
            <motion.div
              className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-2xl mb-2 block" aria-hidden="true">💡</span>
              <p className="text-sm font-medium leading-relaxed">
                &quot;I&apos;d rather build something imperfect and learn from it than wait for the
                perfect moment to start.&quot;
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
