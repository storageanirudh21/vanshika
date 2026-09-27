import React from 'react';
import { COMPANIES } from '../data/portfolioData';

// Infinite marquee of the companies I've interned / freelanced at
export const CompaniesStrip: React.FC = () => {
  // Enough copies to fill wide screens; the track loops at -50%
  const loop = [...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES];

  return (
    <section aria-label="Companies I've worked with" className="companies-strip">
      <div className="hero-mono text-center text-[var(--text-muted)] mb-6">
        Companies I've interned &amp; freelanced at
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0" aria-hidden={copy === 1}>
              {loop.map((company, i) => (
                <div key={`${company.name}-${i}`} className="flex items-center shrink-0">
                  <span className="company-mark">
                    {company.logo ? (
                      <img src={company.logo} alt={company.name} className="h-8 w-auto" />
                    ) : (
                      company.name
                    )}
                    <span className="company-type">{company.type}</span>
                  </span>
                  <span className="mx-8 sm:mx-12 text-[var(--text-muted)] text-xl" aria-hidden="true">
                    ✦
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
