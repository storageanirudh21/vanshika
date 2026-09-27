import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CompaniesStrip } from './components/CompaniesStrip';
import { IntroSection } from './components/IntroSection';
import { WorkSection } from './components/WorkSection';
import { JourneySection } from './components/JourneySection';
import { ExperimentsSection } from './components/ExperimentsSection';
import { ArchiveSection } from './components/ArchiveSection';
import { ResumeSection } from './components/ResumeSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CommandPalette } from './components/CommandPalette';
import { Loader } from './components/Loader';
import { MusicToggle } from './components/MusicToggle';
import type { Project } from './types';
import { PROJECTS } from './data/portfolioData';
import { setSoundEnabled, playTapSound } from './utils/sound';
import { startMusic, stopMusic } from './utils/music';
import { initSmoothScroll, stopScroll, startScroll } from './utils/smoothScroll';

type Theme = 'light' | 'dark' | 'warm';

// Which nav link lights up for each section
const NAV_FOR_SECTION: Record<string, string> = {
  home: 'home',
  intro: 'home',
  work: 'work',
  experience: 'work',
  experiments: 'work',
  archive: 'work',
  resume: 'resume',
  about: 'about',
  contact: 'about',
};

const nextTheme = (prev: Theme): Theme => (prev === 'light' ? 'dark' : prev === 'dark' ? 'warm' : 'light');

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  // Lenis smooth scrolling; frozen while the loader is on screen
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const cleanup = initSmoothScroll();
    stopScroll();
    return cleanup;
  }, []);

  // Hero fully revealed: let it play its entrance animation
  const handleLoaderReveal = useCallback(() => {
    document.documentElement.classList.remove('is-loading');
  }, []);

  // Intro fully gone: hand scrolling back to the page
  const handleLoaderDone = useCallback(() => {
    startScroll();
    setIsLoading(false);
  }, []);

  // Theme on the root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Soft tap sound for every link / button click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.('a, button, [role="button"]')) playTapSound();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const handleToggleSound = () => {
    const next = !isSoundOn;
    setIsSoundOn(next);
    setSoundEnabled(next);
  };

  const handleToggleMusic = () => {
    if (isMusicOn) stopMusic();
    else startMusic();
    setIsMusicOn(!isMusicOn);
  };

  // Scroll spy for the navbar
  useEffect(() => {
    const ids = Object.keys(NAV_FOR_SECTION);
    const handleScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = 'home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && probe >= el.offsetTop) current = id;
      }
      setActiveSection(NAV_FOR_SECTION[current]);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenProjectById = (projectId: string) => {
    const found = PROJECTS.find((p) => p.id === projectId);
    if (found) setSelectedProject(found);
  };

  const openPalette = useCallback(() => setIsCommandPaletteOpen(true), []);
  const closePalette = useCallback(() => setIsCommandPaletteOpen(false), []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 relative selection:bg-indigo-500 selection:text-white">
      {isLoading && <Loader onReveal={handleLoaderReveal} onDone={handleLoaderDone} />}

      <Navbar
        activeSection={activeSection}
        onOpenCommandPalette={openPalette}
        isSoundOn={isSoundOn}
        onToggleSound={handleToggleSound}
        theme={theme}
        onChangeTheme={setTheme}
      />

      <main>
        <Hero
          isMusicOn={isMusicOn}
          onToggleMusic={handleToggleMusic}
          onCycleTheme={() => setTheme(nextTheme)}
          onOpenCommandPalette={openPalette}
        />
        <CompaniesStrip />
        <IntroSection />
        <WorkSection onSelectProject={setSelectedProject} />
        <JourneySection />
        <ExperimentsSection />
        <ArchiveSection />
        <ResumeSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />

      <MusicToggle isOn={isMusicOn} onToggle={handleToggleMusic} />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onOpen={openPalette}
        onClose={closePalette}
        onSelectProject={handleOpenProjectById}
        onToggleTheme={() => setTheme(nextTheme)}
        onToggleMusic={handleToggleMusic}
      />
    </div>
  );
}

export default App;
