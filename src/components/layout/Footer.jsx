import { Github, Linkedin, Instagram, Youtube, Code2 } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/shivv2430', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/shivv2430', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/shivani.learns/', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/@Shivani.learns', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
          <Code2 className="w-4 h-4 text-brand-500" aria-hidden="true" />
          <span>Built with ❤️ by <span className="text-brand-500 font-medium">Shivani Pal</span></span>
        </div>
        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 text-gray-400 hover:text-brand-500 transition-colors rounded-lg hover:bg-brand-50 dark:hover:bg-brand-950/30"
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} Shivani Pal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
