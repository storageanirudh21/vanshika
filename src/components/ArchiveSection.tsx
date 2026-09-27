import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ARCHIVE } from '../data/portfolioData';
import { Reveal, SectionHeading } from './Reveal';

// Archive: landing pages, Figma explorations and smaller pieces
export const ArchiveSection: React.FC = () => (
  <section id="archive" className="panel panel--paper">
    <div className="panel-inner">
      <SectionHeading eyebrow="Archive" title="Landing pages & explorations">
        Smaller projects, Figma explorations and the odds and ends in between.
      </SectionHeading>

      <Reveal>
        <div className="archive-head hidden sm:grid">
          <span>Year</span>
          <span>Project</span>
          <span>Type</span>
          <span className="text-right">Link</span>
        </div>
        <ul>
          {ARCHIVE.map((item) => (
            <li key={item.title}>
              <a href={item.url} target="_blank" rel="noreferrer" className="archive-row group">
                <span className="font-mono-tech text-sm opacity-60">{item.year}</span>
                <span className="archive-title">{item.title}</span>
                <span className="text-sm opacity-70">{item.type}</span>
                <span className="flex items-center justify-end gap-1.5 font-mono-tech text-sm">
                  {item.platform}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);
