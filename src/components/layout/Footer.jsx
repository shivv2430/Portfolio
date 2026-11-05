import { Github, Linkedin, Instagram, Youtube, Heart } from 'lucide-react';

const SOCIALS = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/shivv2430', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/shivv2430', label: 'GitHub' },
  { icon: Instagram, href: 'https://www.instagram.com/shivani.learns/', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/@Shivani.learns', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="border-t border-purple-200/40 dark:border-purple-900/40 py-12 px-4 bg-[#faf8ff] dark:bg-cinematic-950">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <a
            href="#home"
            className="font-serif text-2xl text-gray-900 dark:text-white hover:text-brand-400 transition-colors"
          >
            Shivani <span className="italic text-gradient-gold">Pal</span>
          </a>
          <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-1">
            Turning curiosity into code and ideas into reality.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-xl text-gray-400 hover:text-gold-400 hover:bg-purple-100/50 dark:hover:bg-purple-950/40 transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <p className="text-xs font-mono text-gray-500 dark:text-gray-400">
          &copy; 2026 Shivani Pal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
