import React, { useState, useEffect } from 'react';
import { Search, Folder, Hash, Sun, Music, Mail, FileText } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { playClickSound, playPopSound } from '../utils/sound';
import { scrollToTarget } from '../utils/smoothScroll';

interface CommandPaletteProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelectProject: (id: string) => void;
  onToggleTheme: () => void;
  onToggleMusic: () => void;
}

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'intro', label: 'What I do' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'experiments', label: 'Experiments' },
  { id: 'archive', label: 'Archive' },
  { id: 'resume', label: 'Resume' },
  { id: 'about', label: 'About me' },
  { id: 'contact', label: 'Contact' },
];

const rowClass =
  'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors text-left';
const groupClass = 'px-3 pt-3 pb-1.5 text-[10px] font-mono-tech font-bold text-[var(--text-muted)] uppercase';

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onOpen,
  onClose,
  onSelectProject,
  onToggleTheme,
  onToggleMusic,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          playPopSound();
          onOpen();
        }
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase();
  const sections = SECTIONS.filter((s) => s.label.toLowerCase().includes(q));
  const projects = PROJECTS.filter(
    (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );
  const actions = [
    { label: 'Switch theme', icon: <Sun className="w-4 h-4 text-amber-500" />, run: onToggleTheme },
    { label: 'Play / pause music', icon: <Music className="w-4 h-4 text-indigo-500" />, run: onToggleMusic },
    {
      label: 'Email me',
      icon: <Mail className="w-4 h-4 text-rose-500" />,
      run: () => window.location.assign(`mailto:${PERSONAL_INFO.email}`),
    },
    {
      label: 'Open resume',
      icon: <FileText className="w-4 h-4 text-emerald-500" />,
      run: () => window.open(PERSONAL_INFO.resumeUrl, '_blank'),
    },
  ].filter((a) => a.label.toLowerCase().includes(q));

  const handleAction = (cb: () => void) => {
    playClickSound();
    cb();
    onClose();
    setQuery('');
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[95] flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[var(--bg-surface)] border border-[var(--border-glass)] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3.5 border-b border-[var(--border-glass)] gap-3">
          <Search className="w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            autoFocus
            placeholder="Jump to a section, project or action..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
          />
          <kbd className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[var(--badge-bg)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
            ESC
          </kbd>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {sections.length > 0 && <div className={groupClass}>Sections</div>}
          {sections.map((s) => (
            <button
              key={s.id}
              className={rowClass}
              onClick={() => handleAction(() => scrollToTarget(document.getElementById(s.id)))}
            >
              <span className="flex items-center gap-2.5">
                <Hash className="w-4 h-4 text-[var(--text-muted)]" /> {s.label}
              </span>
              <span className="text-[10px] font-mono-tech text-[var(--text-muted)]">Go to</span>
            </button>
          ))}

          {projects.length > 0 && <div className={groupClass}>Projects</div>}
          {projects.map((p) => (
            <button key={p.id} className={rowClass} onClick={() => handleAction(() => onSelectProject(p.id))}>
              <span className="flex items-center gap-2.5">
                <Folder className="w-4 h-4" style={{ color: p.accentColor }} /> {p.title}
              </span>
              <span className="text-[10px] font-mono-tech text-[var(--text-muted)]">{p.year}</span>
            </button>
          ))}

          {actions.length > 0 && <div className={groupClass}>Actions</div>}
          {actions.map((a) => (
            <button key={a.label} className={rowClass} onClick={() => handleAction(a.run)}>
              <span className="flex items-center gap-2.5">
                {a.icon} {a.label}
              </span>
              <span className="text-[10px] font-mono-tech text-[var(--text-muted)]">Action</span>
            </button>
          ))}

          {sections.length + projects.length + actions.length === 0 && (
            <div className="px-3 py-8 text-center text-xs text-[var(--text-muted)]">Nothing matches "{query}"</div>
          )}
        </div>
      </div>
    </div>
  );
};
