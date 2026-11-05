import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BusRouteNav from './components/layout/BusRouteNav';
import Hero from './components/sections/Hero';
import StoryChapters from './components/sections/StoryChapters';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import CurrentlyExploring from './components/sections/CurrentlyExploring';
import CatchTheCode from './components/sections/CatchTheCode';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#faf8ff] dark:bg-cinematic-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 relative selection:bg-purple-500/20 selection:text-purple-200">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-lg focus:font-mono focus:text-xs"
        >
          Skip to main content
        </a>

        {/* Global Navigation */}
        <Navbar />

        {/* Fixed Bus Route Side Navigation */}
        <BusRouteNav />

        {/* Main Content Sections (Strict Order) */}
        <main id="main-content" className="relative z-10">
          {/* 1. Hero */}
          <Hero />

          {/* 2. The Story Behind the Code */}
          <StoryChapters />

          {/* 3. Selected Work */}
          <Projects />

          {/* 4. Toolbox */}
          <Skills />

          {/* 5. Beyond Academics */}
          <Experience />

          {/* 6. Currently Exploring */}
          <CurrentlyExploring />

          {/* 7. Mini Game: Catch the Code */}
          <CatchTheCode />

          {/* 8. Contact */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
