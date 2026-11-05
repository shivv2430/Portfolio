import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { label: 'Story', href: '#story' },
  { label: 'Work', href: '#work' },
  { label: 'Toolbox', href: '#toolbox' },
  { label: 'Community', href: '#community' },
  { label: 'Play', href: '#play' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { resolvedTheme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#faf8ff]/85 dark:bg-cinematic-950/85 backdrop-blur-md border-b border-purple-200/40 dark:border-purple-900/40 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-serif text-2xl tracking-tight text-gray-900 dark:text-white hover:text-brand-400 transition-colors"
          aria-label="Shivani Pal Home"
        >
          Shivani <span className="italic text-gradient-gold">Pal</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-500 dark:hover:text-gold-400 transition-colors rounded-lg hover:bg-purple-100/40 dark:hover:bg-purple-950/30"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggle}
            aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gold-400 hover:bg-purple-100/50 dark:hover:bg-purple-950/40 transition-colors border border-transparent hover:border-purple-300/30 dark:hover:border-purple-700/30"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="w-5 h-5 text-gold-400" aria-hidden="true" />
            ) : (
              <Moon className="w-5 h-5 text-brand-600" aria-hidden="true" />
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-purple-100/50 dark:hover:bg-purple-950/40 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#faf8ff]/95 dark:bg-cinematic-950/95 backdrop-blur-md border-b border-purple-200/40 dark:border-purple-900/40"
          >
            <ul className="px-4 pb-4 pt-2 flex flex-col gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gold-400 hover:bg-purple-100/40 dark:hover:bg-purple-950/30 rounded-lg transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
