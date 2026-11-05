import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import StoryChapters from './components/sections/StoryChapters';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import JourneyMap from './components/sections/JourneyMap';
import Experience from './components/sections/Experience';
import CurrentlyExploring from './components/sections/CurrentlyExploring';
import CatchTheCode from './components/sections/CatchTheCode';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">
          <Hero />
          <StoryChapters />
          <Skills />
          <Projects />
          <JourneyMap />
          <Experience />
          <CurrentlyExploring />
          <CatchTheCode />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
