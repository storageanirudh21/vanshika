import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { scrollToTarget } from '../utils/smoothScroll';

// Footer: logo + name, contact, social links, resume, copyright
export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="panel panel--night !pb-10">
      <div className="panel-inner">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-12">
          <div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white/10">
                <img
                  src={PERSONAL_INFO.avatar}
                  onError={(e) => {
                    if (!e.currentTarget.src.endsWith('/images/portrait.jpg')) e.currentTarget.src = '/images/portrait.jpg';
                  }}
                  alt=""
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="text-2xl font-bold">{PERSONAL_INFO.name}</div>
                <div className="text-sm opacity-60">{PERSONAL_INFO.title}</div>
              </div>
            </div>
            <p className="mt-6 max-w-sm opacity-60 leading-relaxed">
              Designing products and experiences that make life simpler.
            </p>
          </div>

          <div>
            <div className="section-eyebrow mb-4">Contact</div>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="footer-link break-all">
              {PERSONAL_INFO.email}
            </a>
            <div className="mt-2 text-sm opacity-50">{PERSONAL_INFO.location}</div>
          </div>

          <div>
            <div className="section-eyebrow mb-4">Elsewhere</div>
            <ul className="space-y-2">
              <li>
                <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="footer-link">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.socials.behance} target="_blank" rel="noreferrer" className="footer-link">
                  Behance ↗
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.resumeUrl} target="_blank" rel="noreferrer" className="footer-link">
                  Resume ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Giant name */}
        <div className="footer-giant" aria-hidden="true">
          {PERSONAL_INFO.name.split(' ')[0]}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10 font-mono-tech text-xs opacity-60">
          <span>
            © {year} {PERSONAL_INFO.name}. All rights reserved.
          </span>
          <button onClick={() => scrollToTarget(0)} className="flex items-center gap-2 hover:opacity-100">
            Back to top <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
