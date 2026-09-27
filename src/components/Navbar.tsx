import React, { useState } from 'react';
import { Search, FileText, MessageCircle, Volume2, VolumeX, Moon, Sun, Flame, Menu, X, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playClickSound, playPopSound } from '../utils/sound';
import { scrollToTarget } from '../utils/smoothScroll';

interface NavbarProps {
  activeSection: string;
  onOpenCommandPalette: () => void;
  isSoundOn: boolean;
  onToggleSound: () => void;
  theme: 'light' | 'dark' | 'warm';
  onChangeTheme: (theme: 'light' | 'dark' | 'warm') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onOpenCommandPalette,
  isSoundOn,
  onToggleSound,
  theme,
  onChangeTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'WORK', href: '#work' },
    { name: 'RESUME', href: '#resume' },
    { name: 'ABOUT', href: '#about' },
  ];

  const handleNavClick = (href: string) => {
    playClickSound();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      scrollToTarget(target);
    }
  };

  const cycleTheme = () => {
    playPopSound();
    if (theme === 'light') onChangeTheme('dark');
    else if (theme === 'dark') onChangeTheme('warm');
    else onChangeTheme('light');
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 pt-5 lg:pt-[42px]">
      <div className="px-5 sm:px-8 lg:px-[1.8vw] flex items-center justify-between">
        {/* Left: Avatar + Name (scrolls away with the hero) */}
        <a
          href="#home"
          onClick={() => playPopSound()}
          className="flex items-center gap-4 lg:gap-5 group"
        >
          <div className="headshot w-11 h-11 lg:w-[58px] lg:h-[58px] shadow-[0_4px_14px_rgba(0,0,0,0.12)]">
            <img
              src="/heroimg.png"
              alt={PERSONAL_INFO.name}
              className="headshot-img group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <span className="font-bold text-xl lg:text-[30px] tracking-[-0.01em] text-[var(--text-primary)]">
            {PERSONAL_INFO.name}
          </span>
        </a>

        {/* Right: nav pill stays pinned while scrolling */}
        <div className="fixed top-5 lg:top-[42px] right-5 sm:right-8 lg:right-[1.8vw] z-50">
          <nav className="hidden lg:flex items-center gap-1 nav-pill">
            <button
              onClick={() => handleNavClick('#contact')}
              aria-label="Contact me"
              title="Say hello"
              className="w-[42px] h-[42px] rounded-full flex items-center justify-center bg-[var(--nav-chat-bg)] text-[var(--text-primary)] hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-[19px] h-[19px]" strokeWidth={2} />
            </button>

            <a
              href="#resume"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#resume');
              }}
              title="Resume"
              className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--badge-bg)] transition-colors"
            >
              <FileText className="w-[18px] h-[18px]" strokeWidth={2} />
            </a>

            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`nav-link ${isActive ? 'is-active' : ''}`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Mobile Action Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => {
                playClickSound();
                onOpenCommandPalette();
              }}
              className="p-2.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-glass)] text-[var(--text-primary)]"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={cycleTheme}
              className="p-2.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-glass)] text-[var(--text-primary)]"
              aria-label="Change Theme"
            >
              {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
              {theme === 'dark' && <Moon className="w-4 h-4 text-indigo-400" />}
              {theme === 'warm' && <Flame className="w-4 h-4 text-orange-500" />}
            </button>

            <button
              onClick={() => {
                playPopSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-surface)]"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[72px] inset-x-4 bg-[var(--bg-surface)] border border-[var(--border-glass)] rounded-2xl p-5 shadow-2xl z-50 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-glass)]">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Navigation Menu
            </span>
            <button
              onClick={onToggleSound}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--text-secondary)]"
            >
              {isSoundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              Sound: {isSoundOn ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-4 py-3 rounded-xl font-bold text-sm bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-surface)] transition-all"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                handleNavClick('#contact');
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <Sparkles className="w-4 h-4" /> Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
