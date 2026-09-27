import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EXPERIMENTS } from '../data/portfolioData';
import type { Experiment } from '../types';
import { Reveal, SectionHeading } from './Reveal';

// Mini mock of a Storybook UI
const StorybookVisual: React.FC = () => (
  <div className="exp-visual grid grid-cols-[38%_1fr]">
    <div className="border-r border-black/5 p-4 space-y-2.5 bg-white/60">
      <div className="h-2.5 w-16 rounded-full bg-[#ff4785]/80" />
      {['Button', 'Input', 'Toggle', 'Card', 'Badge'].map((item, i) => (
        <div
          key={item}
          className={`text-[11px] font-mono-tech px-2 py-1 rounded ${i === 0 ? 'bg-[#1d8fe0]/12 text-[#1d8fe0]' : 'text-black/45'}`}
        >
          ▸ {item}
        </div>
      ))}
    </div>
    <div className="p-5 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(#0000000f_1px,transparent_1px)] [background-size:14px_14px]">
      <span className="exp-demo-button">Get started</span>
      <span className="exp-demo-button exp-demo-button--ghost">Learn more</span>
      <span className="flex items-center gap-2 text-[11px] font-mono-tech text-black/50">
        <span className="exp-demo-toggle" /> dark mode
      </span>
    </div>
  </div>
);

// Mini mock of an AI-generated design system
const DesignSystemVisual: React.FC = () => {
  const ramps = [
    ['#e0f0ff', '#9fd0ff', '#4aa8f5', '#1d8fe0', '#0d5fa3'],
    ['#fdeee6', '#f6c9b3', '#ee9f7e', '#d9714d', '#3a1a08'],
    ['#eef9ee', '#c2ebc6', '#86d392', '#45b35a', '#1f6e30'],
  ];
  return (
    <div className="exp-visual p-5 flex flex-col justify-between">
      <div className="space-y-2">
        {ramps.map((ramp, r) => (
          <div key={r} className="flex gap-1.5">
            {ramp.map((color) => (
              <span key={color} className="h-7 flex-1 rounded-md" style={{ background: color }} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-end justify-between gap-3 mt-4">
        <div className="flex items-end gap-3 text-black/80 font-bold leading-none">
          <span className="text-4xl">Aa</span>
          <span className="text-2xl">Aa</span>
          <span className="text-lg">Aa</span>
          <span className="text-sm">Aa</span>
        </div>
        <div className="flex flex-col items-end gap-1 font-mono-tech text-[10px] text-black/50">
          <span>--space-4: 16px</span>
          <span>--radius-lg: 20px</span>
          <span>--brand-500: #1d8fe0</span>
        </div>
      </div>
    </div>
  );
};

const ExperimentCard: React.FC<{ experiment: Experiment; index: number }> = ({ experiment, index }) => (
  <Reveal as="article" delay={index * 0.1} className="exp-card group">
    {experiment.visual === 'storybook' ? <StorybookVisual /> : <DesignSystemVisual />}

    <div className="p-6 sm:p-8">
      <span className="panel-chip panel-chip--sm panel-chip--accent">{experiment.kicker}</span>
      <h3 className="exp-title mt-4">{experiment.title}</h3>
      <p className="mt-3 leading-relaxed opacity-75">{experiment.desc}</p>
      <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
        <div className="flex flex-wrap gap-2">
          {experiment.tags.map((tag) => (
            <span key={tag} className="panel-chip panel-chip--sm">
              {tag}
            </span>
          ))}
        </div>
        {experiment.link && (
          <a href={experiment.link} target="_blank" rel="noreferrer" className="panel-link">
            View experiment <ArrowUpRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  </Reveal>
);

export const ExperimentsSection: React.FC = () => (
  <section id="experiments" className="panel panel--sky">
    <div className="panel-inner">
      <SectionHeading eyebrow="Experiments" title="Playing with code & AI">
        Side quests where I vibe-code, break things and see how far AI can take design.
      </SectionHeading>
      <div className="grid md:grid-cols-2 gap-5">
        {EXPERIMENTS.map((experiment, i) => (
          <ExperimentCard key={experiment.id} experiment={experiment} index={i} />
        ))}
      </div>
    </div>
  </section>
);
