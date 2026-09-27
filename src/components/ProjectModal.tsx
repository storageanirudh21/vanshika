import React, { useEffect } from 'react';
import { X, ArrowRight, CheckCircle, Sparkles, Layers, ShieldCheck, Compass } from 'lucide-react';
import type { Project } from '../types';
import { playPopSound, playClickSound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { scrollToTarget } from '../utils/smoothScroll';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCelebrate = () => {
    playPopSound();
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.5 },
    });
  };

  return (
    <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[var(--bg-surface)] border border-[var(--border-glass)] rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-glass)] bg-[var(--bg-surface)] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.accentColor }}
            />
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[var(--text-muted)]">
              {project.category} • {project.year}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCelebrate}
              className="p-2 rounded-full hover:bg-[var(--badge-bg)] text-[var(--text-secondary)] transition-colors"
              title="Applaud project"
              aria-label="Applaud project"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-2 rounded-full hover:bg-[var(--badge-bg)] text-[var(--text-primary)] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* Hero Banner inside modal */}
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              Case Study Deep Dive
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
              {project.title}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] font-medium">
              {project.subtitle} — {project.tagline}
            </p>
          </div>

          {/* Project Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
            <div>
              <div className="text-xs text-[var(--text-muted)] font-mono-tech">ROLE</div>
              <div className="font-bold text-sm text-[var(--text-primary)] mt-0.5">{project.role}</div>
            </div>
            <div>
              <div className="text-xs text-[var(--text-muted)] font-mono-tech">DURATION</div>
              <div className="font-bold text-sm text-[var(--text-primary)] mt-0.5">{project.duration}</div>
            </div>
            <div>
              <div className="text-xs text-[var(--text-muted)] font-mono-tech">CATEGORY</div>
              <div className="font-bold text-sm text-[var(--text-primary)] mt-0.5">{project.category}</div>
            </div>
            <div>
              <div className="text-xs text-[var(--text-muted)] font-mono-tech">DELIVERY</div>
              <div className="font-bold text-sm text-[var(--text-primary)] mt-0.5">Shipped Production</div>
            </div>
          </div>

          {/* Impact Metrics Banner */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-mono-tech text-[var(--text-muted)]">
              Measured Business & User Impact
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.impactMetrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/10 border border-indigo-500/15 text-center"
                >
                  <div
                    className="text-2xl sm:text-3xl font-extrabold font-heading"
                    style={{ color: project.accentColor }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-xs font-semibold text-[var(--text-secondary)] mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Problem & Solution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)]/50 border border-[var(--border-subtle)] space-y-3">
              <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                <Compass className="w-4 h-4" />
                The Problem
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)]/50 border border-[var(--border-subtle)] space-y-3">
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                The Solution
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Interactive Prototype Simulation Canvas */}
          <div className="p-6 rounded-2xl border border-[var(--border-glass)] bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-surface)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-[var(--text-primary)]">
                <Layers className="w-4 h-4 text-indigo-500" />
                Interface Architecture & Deliverables
              </div>
              <span className="text-xs text-[var(--text-muted)] font-mono-tech">100% Responsive</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {project.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] font-medium"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--badge-bg)] text-[var(--text-secondary)] border border-[var(--badge-border)]"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-[var(--border-glass)] bg-[var(--bg-surface)] flex flex-wrap items-center justify-between gap-4 sticky bottom-0 z-20">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--badge-bg)] transition-colors"
          >
            Close Overview
          </button>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={() => {
                onClose();
                const el = document.getElementById('contact');
                scrollToTarget(el);
              }}
              className="px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-surface)] text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md"
            >
              Discuss Similar Project <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
