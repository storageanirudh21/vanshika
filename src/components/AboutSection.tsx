import React from 'react';
import { ABOUT } from '../data/portfolioData';
import { Reveal, SectionHeading } from './Reveal';

// "Who am I?": how I started, what I learned, who I am + hobbies
export const AboutSection: React.FC = () => (
  <section id="about" className="panel panel--butter">
    <div className="panel-inner grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20 items-start">
      {/* Portrait card with the hero stickers */}
      <Reveal className="about-portrait-wrap">
        <div className="about-portrait">
          <img src="/heroimg.png" alt="Vanshika Gupta" className="w-full h-full object-cover object-top" />
        </div>
        <img src="/images/cat.png" alt="" className="about-sticker about-sticker--cat" />
        <img src="/images/ramen.png" alt="" className="about-sticker about-sticker--ramen" />
      </Reveal>

      <div>
        <SectionHeading eyebrow="About me" title="Who am I?" />

        <div className="space-y-10">
          {ABOUT.chapters.map((chapter, i) => (
            <Reveal key={chapter.title} delay={i * 0.08} className="about-chapter">
              <span className="section-eyebrow">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="about-chapter-title">{chapter.title}</h3>
                <p className="mt-2 text-[17px] leading-relaxed opacity-80">{chapter.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="section-eyebrow mb-4">Off the clock</div>
          <div className="flex flex-wrap gap-2.5">
            {ABOUT.hobbies.map((hobby) => (
              <span key={hobby.label} className="hobby-chip">
                <span className="text-lg leading-none">{hobby.emoji}</span> {hobby.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
