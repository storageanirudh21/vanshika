import React from 'react';
import { EXPERIENCE } from '../data/portfolioData';
import { Reveal, SectionHeading } from './Reveal';

// "The journey so far": experience timeline
export const JourneySection: React.FC = () => (
  <section id="experience" className="panel panel--lavender">
    <div className="panel-inner">
      <SectionHeading eyebrow="Experience" title="The journey so far">
        One year, three teams, and a lot of first versions.
      </SectionHeading>

      <ol className="journey-list">
        {EXPERIENCE.map((job, i) => (
          <Reveal key={job.id} as="li" delay={i * 0.08} className="journey-row">
            <div className="journey-index">{String(i + 1).padStart(2, '0')}</div>

            <div>
              <div className="section-eyebrow">{job.period}</div>
              <h3 className="journey-company">{job.company}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="font-semibold">{job.role}</span>
                <span className="panel-chip panel-chip--sm panel-chip--accent">{job.type}</span>
                <span className="text-sm opacity-60">{job.location}</span>
              </div>
            </div>

            <div>
              <p className="leading-relaxed">{job.description}</p>
              <ul className="mt-4 space-y-2">
                {job.highlights.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] opacity-80">
                    <span className="journey-bullet" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-5">
                {job.skills.map((skill) => (
                  <span key={skill} className="panel-chip panel-chip--sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
