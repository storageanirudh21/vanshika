import React, { useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronUp, Box, TrendingUp, TrendingDown, Trash2, Copy } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import type { Project, ShowcaseCursor } from '../types';
import { playClickSound } from '../utils/sound';
import { Reveal } from './Reveal';

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
}

// Figma-style collaborator pointer with a name tag
const CollabCursor: React.FC<{ cursor: ShowcaseCursor; index: number }> = ({ cursor, index }) => {
  const pointsRight = cursor.side === 'left';
  return (
    <div
      className="work-cursor absolute z-30 pointer-events-none hidden sm:block"
      style={{ left: `${cursor.x}%`, top: `${cursor.y}%`, animationDelay: `${index * -2.2}s` }}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 absolute -top-1 -left-1"
        style={{ transform: pointsRight ? 'scaleX(-1)' : undefined, filter: `drop-shadow(0 0 10px ${cursor.color}99)` }}
        aria-hidden="true"
      >
        <path d="M3 2.5 L21 10 L12.5 12.5 L10 21 Z" fill={cursor.color} stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <span
        className="absolute top-6 whitespace-nowrap px-2 py-1 rounded-[5px] text-[15px] sm:text-[17px] font-medium text-white font-mono-tech"
        style={{
          backgroundColor: cursor.color,
          boxShadow: `0 0 24px ${cursor.color}66`,
          ...(pointsRight ? { right: '0.75rem' } : { left: '0.75rem' }),
          color: cursor.color.toLowerCase() === '#f59e0b' ? '#2a1a00' : '#fff',
        }}
      >
        {cursor.label}
      </span>
    </div>
  );
};

const ShowcaseCard: React.FC<{ project: Project; index: number; onOpen: () => void }> = ({
  project,
  index,
  onOpen,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const [screenOk, setScreenOk] = useState(true);
  const [artOk, setArtOk] = useState(true);
  const showcase = project.showcase;
  const [summaryLead, summaryRest] = (showcase?.summary ?? project.tagline).split('{emoji}');

  const handleMove = (e: React.MouseEvent) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <article className="work-card group">
      {/* ---------- Showcase stage ---------- */}
      <div
        ref={stageRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setPointer(null)}
        onClick={onOpen}
        className="relative cursor-pointer"
      >
        {/* Frame with a border that fades out toward the bottom */}
        <div className="work-frame relative aspect-[4/3] sm:aspect-[2/1] rounded-[20px] overflow-hidden">
          {/* Laptop outline */}
          <div className="work-laptop absolute left-1/2 -translate-x-1/2 top-[14%] w-[80%] sm:w-[62%] aspect-[16/10]">
            <span className="work-laptop-notch" />
            {/* Browser window */}
            <div className="absolute left-[5.5%] right-[16%] top-[12%] bottom-[-4%] rounded-t-md bg-[#15171c] border border-white/10 overflow-hidden">
              <div className="flex items-center gap-1.5 px-2.5 h-[7%] min-h-[14px] bg-[#1d2027] border-b border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 h-[60%] w-[22%] rounded-t-sm bg-[#2a2e37]" />
              </div>
              <div className="h-[5%] min-h-[10px] mx-2 my-1 rounded-full bg-[#23262e]" />
              <div className="relative h-full">
                {showcase?.screen && screenOk ? (
                  <img
                    src={showcase.screen}
                    onError={() => setScreenOk(false)}
                    alt={`${project.title} interface`}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse 70% 60% at 50% 70%, ${project.accentColor}cc 0%, ${project.accentColor}33 45%, transparent 75%), #0e1015`,
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Bottom fade into the page */}
          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent to-[#0b0c0f] pointer-events-none z-10" />
        </div>

        {/* Artwork bursting out of the frame (or a glow until the art exists) */}
        {showcase?.art && artOk ? (
          <img
            src={showcase.art}
            onError={() => setArtOk(false)}
            alt=""
            className="work-art absolute left-[18%] sm:left-[22%] top-[6%] sm:top-[8%] w-[64%] sm:w-[56%] z-20 pointer-events-none"
          />
        ) : (
          <div
            className="work-art absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[46%] aspect-square rounded-full blur-3xl opacity-60 z-20 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${project.accentColor} 0%, transparent 65%)` }}
          />
        )}

        {/* Left floating info chip */}
        <div className="work-chip hidden md:block absolute -left-[4%] top-[23%] w-[23%] z-30 p-3">
          <div className="text-[10px] text-white/45">{project.category}</div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[13px] font-semibold text-white truncate">{project.title}</span>
            <span className="shrink-0 flex items-center gap-1 text-[10px] text-white/60 bg-white/10 rounded px-1.5 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" /> {project.duration}
              <ChevronDown className="w-2.5 h-2.5" />
            </span>
          </div>
          <div className="text-[10px] text-white/40 mt-1 truncate">Role: {project.role}</div>
          <div className="h-px bg-white/10 my-2" />
          <div className="flex items-center gap-3 text-white/35">
            <Copy className="w-3 h-3" />
            <Trash2 className="w-3 h-3 text-red-400/70" />
          </div>
          <span className="work-chip-tail" />
        </div>

        {/* Right floating asset button + list panel */}
        <div className="hidden md:flex absolute -right-[1%] top-[16%] z-30 items-center gap-2 px-3 py-1.5 rounded-lg bg-[#16181d] border border-white/15 text-white text-[13px] font-medium shadow-lg">
          <Box className="w-3.5 h-3.5" /> Stack <ChevronDown className="w-3.5 h-3.5 text-white/60" />
        </div>
        <div className="work-panel hidden md:block absolute -right-[5%] top-[26%] w-[16%] z-30">
          <div className="flex items-center justify-between px-3 py-2 text-[10px] text-white/45">
            Toolkit <ChevronUp className="w-3 h-3" />
          </div>
          {project.tags.slice(0, 2).map((tag, i) => (
            <div
              key={tag}
              className={`flex items-center gap-2 px-3 py-2 text-[10px] ${i === 0 ? 'text-white/85' : 'text-white/30'}`}
            >
              <span className="w-2 h-2 rounded-sm border border-current opacity-70" />
              <span className="truncate">{tag}</span>
            </div>
          ))}
        </div>

        {/* Collaborator cursors */}
        {showcase?.cursors.map((cursor, i) => (
          <CollabCursor key={cursor.label} cursor={cursor} index={i + index} />
        ))}

        {/* "VIEW" pill that follows the mouse */}
        <div
          className={`work-view-pill hidden sm:flex ${pointer ? 'is-visible' : ''}`}
          style={pointer ? { left: pointer.x, top: pointer.y } : undefined}
          aria-hidden="true"
        >
          <span className="text-[18px] leading-none">👀</span> VIEW
        </div>
      </div>

      {/* ---------- Details ---------- */}
      <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[3.2rem_1fr_auto] gap-x-4 mt-6 sm:mt-10">
        <span className="col-span-2 sm:col-span-1 text-sm text-white/90 font-mono-tech sm:pt-2.5">
          {project.year}
        </span>

        <div className="min-w-0">
          <h3 className="work-title">{project.title}</h3>

          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="work-tag">
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-5 text-[15px] sm:text-base leading-relaxed text-[#a3a6ae] font-mono-tech max-w-[46rem]">
            {summaryLead}
            {showcase && summaryRest !== undefined && (
              <>
                <span className="inline-block mx-0.5 align-[-2px]">{showcase.emoji}</span>
                {summaryRest}
              </>
            )}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 font-mono-tech">
            <span className="text-[15px] tracking-wide text-[var(--work-accent)]">IMPACT</span>
            {project.impactMetrics.slice(0, 2).map((metric) => {
              const isDown = metric.value.trim().startsWith('-');
              const Trend = isDown ? TrendingDown : TrendingUp;
              return (
                <span key={metric.label} className="flex items-center gap-2">
                  <Trend className="w-5 h-5 text-[#a3e635]" strokeWidth={2.4} />
                  <span className="text-lg font-bold text-white">{metric.value.replace(/^[-+]/, '')}</span>
                  <span className="text-[15px] text-[#8d9099]">{metric.label}</span>
                </span>
              );
            })}
          </div>

          {/* Figma / Behance / live links */}
          <div className="flex flex-wrap gap-2.5 mt-6">
            {(
              [
                ['Figma', project.figmaUrl],
                ['Behance', project.behanceUrl],
                ['Live site', project.demoUrl],
              ] as const
            )
              .filter(([, url]) => url)
              .map(([label, url]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="work-link"
                >
                  {label} <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ))}
          </div>
        </div>

        <button
          onClick={onOpen}
          aria-label={`Open ${project.title} case study`}
          className="self-start mt-1 sm:mt-2 p-1 text-white transition-transform group-hover:translate-x-1.5"
        >
          <ArrowRight className="w-8 h-8" strokeWidth={2} />
        </button>
      </div>
    </article>
  );
};

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject }) => {
  return (
    <section id="work" className="panel work-section">
      <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 sm:mb-24">
          <div>
            <div className="section-eyebrow">Selected work</div>
            <h2 className="section-title mt-3">Case studies</h2>
            <p className="section-lede mt-5">
              Three products I took from zero to shipped, each with the Figma file, the Behance write-up and the live
              site.
            </p>
          </div>
          <span className="section-eyebrow opacity-60 shrink-0">
            {String(PROJECTS.length).padStart(2, '0')} projects
          </span>
        </Reveal>

        <div className="space-y-28 sm:space-y-40">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id}>
              <ShowcaseCard
                project={project}
                index={i}
                onOpen={() => {
                  playClickSound();
                  onSelectProject(project);
                }}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
