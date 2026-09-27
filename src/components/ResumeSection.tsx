import React from 'react';
import { Download, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE, EDUCATION, SKILLS, DOMAINS } from '../data/portfolioData';
import { Reveal, SectionHeading } from './Reveal';

// Resume rendered as a paper sheet in the site's style, with a PDF download
export const ResumeSection: React.FC = () => (
  <section id="resume" className="panel panel--peach">
    <div className="panel-inner">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <SectionHeading eyebrow="Resume" title="The one-page version" className="!mb-0" />
        <Reveal className="flex flex-wrap gap-3 md:shrink-0">
          <a href={PERSONAL_INFO.resumeUrl} download className="panel-button">
            <Download className="w-4 h-4" /> Download PDF
          </a>
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="panel-button panel-button--ghost"
          >
            LinkedIn <ArrowUpRight className="w-4 h-4" />
          </a>
        </Reveal>
      </div>

      <Reveal className="resume-sheet mt-12 sm:mt-16">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-black/10">
          <div>
            <h3 className="resume-name">{PERSONAL_INFO.name}</h3>
            <div className="text-[15px] opacity-70 mt-1">{PERSONAL_INFO.title}</div>
          </div>
          <div className="font-mono-tech text-xs sm:text-right opacity-70 space-y-1">
            <div>{PERSONAL_INFO.email}</div>
            <div>{PERSONAL_INFO.location}</div>
          </div>
        </header>

        <div className="grid md:grid-cols-[1.6fr_1fr] gap-10 mt-8">
          {/* Experience */}
          <div>
            <h4 className="resume-heading">Experience</h4>
            <div className="space-y-7">
              {EXPERIENCE.map((job) => (
                <div key={job.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="font-bold">
                      {job.role} · {job.company}
                    </div>
                    <div className="font-mono-tech text-xs opacity-60">{job.period}</div>
                  </div>
                  <div className="text-xs opacity-55 mt-0.5">
                    {job.type} · {job.location}
                  </div>
                  <ul className="mt-2 space-y-1 text-[14px] opacity-80 list-disc pl-4">
                    {job.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education, skills, domains */}
          <div className="space-y-8">
            <div>
              <h4 className="resume-heading">Education</h4>
              {EDUCATION.map((edu) => (
                <div key={edu.degree}>
                  <div className="font-bold">{edu.degree}</div>
                  <div className="text-sm opacity-70">{edu.school}</div>
                  <div className="font-mono-tech text-xs opacity-55 mt-0.5">{edu.period}</div>
                </div>
              ))}
            </div>
            {(
              [
                ['Design', SKILLS.design],
                ['Tools', SKILLS.tools],
                ['Code', SKILLS.code],
                ['Domains', DOMAINS],
              ] as const
            ).map(([label, items]) => (
              <div key={label}>
                <h4 className="resume-heading">{label}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span key={item} className="resume-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
