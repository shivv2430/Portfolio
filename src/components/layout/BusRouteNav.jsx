import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bus } from 'lucide-react';

const STOPS = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Journey' },
  { id: 'work', label: 'Work' },
  { id: 'toolbox', label: 'Toolbox' },
  { id: 'community', label: 'Community' },
  { id: 'play', label: 'Play' },
  { id: 'contact', label: 'Contact' },
];

export default function BusRouteNav() {
  const [activeStop, setActiveStop] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = STOPS.length - 1; i >= 0; i--) {
        const el = document.getElementById(STOPS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveStop(STOPS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeIndex = Math.max(0, STOPS.findIndex((s) => s.id === activeStop));

  return (
    <>
      {/* Desktop Bus Route (left fixed) */}
      <nav
        aria-label="Section route navigation"
        className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center select-none"
      >
        <div className="relative py-2 flex flex-col items-center">
          {/* Vertical Route Line */}
          <div
            className="absolute top-4 bottom-4 w-[2px] bg-gradient-to-b from-brand-500/20 via-purple-400/40 to-gold-400/30 rounded-full"
            aria-hidden="true"
          />

          {/* Moving Bus Icon */}
          <motion.div
            className="absolute -left-[14px] z-20 w-8 h-8 rounded-full bg-gradient-to-br from-brand-600 to-purple-800 text-gold-300 shadow-lg shadow-brand-900/40 flex items-center justify-center border border-gold-400/40"
            animate={{
              top: `${activeIndex * 48 + 8}px`,
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 24,
            }}
            aria-hidden="true"
          >
            <Bus className="w-4 h-4 text-gold-300" />
          </motion.div>

          {/* Stops */}
          <div className="flex flex-col gap-6 relative z-10">
            {STOPS.map((stop) => {
              const isActive = activeStop === stop.id;
              return (
                <button
                  key={stop.id}
                  onClick={() => scrollTo(stop.id)}
                  aria-label={`Go to ${stop.label} section`}
                  aria-current={isActive ? 'true' : undefined}
                  className="group flex items-center gap-3 h-6 text-left focus:outline-none"
                >
                  {/* Stop node */}
                  <span
                    className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? 'border-gold-400 bg-gold-400 scale-125 shadow-md shadow-gold-500/50'
                        : 'border-purple-300/60 dark:border-purple-500/40 bg-white dark:bg-cinematic-900 group-hover:border-brand-400 group-hover:scale-110'
                    }`}
                  />

                  {/* Stop label */}
                  <span
                    className={`text-xs font-mono tracking-wider transition-all duration-200 uppercase ${
                      isActive
                        ? 'text-gold-500 dark:text-gold-400 font-bold opacity-100 translate-x-0'
                        : 'text-gray-400 dark:text-gray-500 font-medium opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0'
                    }`}
                  >
                    {stop.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Route Dots (bottom or right indicator) */}
      <nav
        aria-label="Mobile section navigation"
        className="lg:hidden fixed right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5 p-2 rounded-full bg-white/70 dark:bg-cinematic-900/70 backdrop-blur-md border border-purple-500/20 shadow-lg"
      >
        {STOPS.map((stop) => {
          const isActive = activeStop === stop.id;
          return (
            <button
              key={stop.id}
              onClick={() => scrollTo(stop.id)}
              aria-label={`Jump to ${stop.label}`}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                isActive
                  ? 'bg-gold-400 scale-125 shadow-sm shadow-gold-400'
                  : 'bg-purple-300/60 dark:bg-purple-700/60 hover:bg-brand-400'
              }`}
            />
          );
        })}
      </nav>
    </>
  );
}
