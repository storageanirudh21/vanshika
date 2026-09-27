import React, { useEffect, useRef } from 'react';
import { INTRO, STATS, DOMAINS, SERVICES } from '../data/portfolioData';
import { Reveal, SectionHeading } from './Reveal';

// Paragraph whose words fill in with colour as you scroll through it
const ScrollFillText: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top enters the lower part of the screen, 1 once the bottom passes the middle
      const progress = (vh * 0.85 - rect.top) / (rect.height + vh * 0.4);
      el.style.setProperty('--fill', Math.min(1, Math.max(0, progress)).toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <p ref={ref} className="intro-statement mt-6" aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="fill-word"
          style={{ '--i': (i / words.length).toFixed(4) } as React.CSSProperties}
        >
          {word}{' '}
        </span>
      ))}
    </p>
  );
};

// Under the hero: intro statement, stats, domains and "what I do"
export const IntroSection: React.FC = () => (
  <section id="intro" className="panel panel--cream">
    <div className="panel-inner">
      {/* Intro statement */}
      <Reveal>
        <div className="section-eyebrow">Hello there</div>
        <ScrollFillText text={INTRO.statement} />
      </Reveal>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-16 sm:mt-20">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </Reveal>
        ))}
      </div>

      {/* Domains */}
      <Reveal className="mt-10 flex flex-wrap items-center gap-3">
        <span className="section-eyebrow mr-2">Domains I've designed for</span>
        {DOMAINS.map((domain) => (
          <span key={domain} className="panel-chip">
            {domain}
          </span>
        ))}
      </Reveal>

      {/* What I do */}
      <div className="mt-28 sm:mt-36">
        <SectionHeading eyebrow="What I do" title="Design, end to end" />
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={(i % 2) * 0.1} as="article" className="service-card group">
              <div className="flex items-start justify-between gap-4">
                <span className="section-eyebrow">{String(i + 1).padStart(2, '0')}</span>
                <span className="service-dot" aria-hidden="true" />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {service.tools.map((tool) => (
                  <span key={tool} className="panel-chip panel-chip--sm">
                    {tool}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
