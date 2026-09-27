import React from 'react';

interface MusicToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

// Floating bottom-left music switch with animated equaliser bars
export const MusicToggle: React.FC<MusicToggleProps> = ({ isOn, onToggle }) => (
  <button
    onClick={onToggle}
    className={`music-toggle ${isOn ? 'is-on' : ''}`}
    aria-pressed={isOn}
    aria-label={isOn ? 'Pause background music' : 'Play background music'}
    title={isOn ? 'Pause music' : 'Play music'}
  >
    <span className="flex items-end gap-[3px] h-3.5 w-5" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="music-bar" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </span>
    <span>{isOn ? 'MUSIC ON' : 'MUSIC OFF'}</span>
  </button>
);
