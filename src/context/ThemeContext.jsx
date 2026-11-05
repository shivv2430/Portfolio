import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('color-scheme') || 'system';
    } catch {
      return 'system';
    }
  });

  const resolvedTheme = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  useEffect(() => {
    const root = document.documentElement;
    const metaTag = document.querySelector('meta[name="color-scheme"]');

    if (theme === 'dark') {
      root.classList.add('dark');
      if (metaTag) metaTag.content = 'dark';
      try { localStorage.setItem('color-scheme', 'dark'); } catch {}
    } else if (theme === 'light') {
      root.classList.remove('dark');
      if (metaTag) metaTag.content = 'light';
      try { localStorage.setItem('color-scheme', 'light'); } catch {}
    } else {
      if (metaTag) metaTag.content = 'light dark';
      try { localStorage.removeItem('color-scheme'); } catch {}
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') {
        if (mq.matches) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const toggle = () => {
    setTheme(prev => {
      const current = prev === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : prev;
      const target = current === 'dark' ? 'light' : 'dark';
      return target === (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        ? 'system'
        : target;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
