import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, FileText, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playChimeSound } from '../utils/sound';
import { Reveal } from './Reveal';

// Contact + social profiles: email, LinkedIn, Behance, resume
export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      playChimeSound();
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.assign(`mailto:${PERSONAL_INFO.email}`);
    }
  };

  const links = [
    { label: 'LinkedIn', href: PERSONAL_INFO.socials.linkedin, external: true },
    { label: 'Behance', href: PERSONAL_INFO.socials.behance, external: true },
    { label: 'Resume', href: PERSONAL_INFO.resumeUrl, external: true },
    { label: 'Email', href: `mailto:${PERSONAL_INFO.email}`, external: false },
  ];

  return (
    <section id="contact" className="panel panel--cocoa">
      <div className="panel-inner">
        <Reveal>
          <div className="section-eyebrow">Contact</div>
          <h2 className="contact-title mt-4">
            Let's make
            <br />
            something obvious.
          </h2>
          <p className="section-lede mt-6">
            Open to full-time roles, internships and freelance projects. The fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4">
          <a href={`mailto:${PERSONAL_INFO.email}`} className="contact-email">
            <Mail className="w-6 h-6 sm:w-8 sm:h-8 shrink-0" />
            <span className="break-all">{PERSONAL_INFO.email}</span>
          </a>
          <button onClick={copyEmail} className="panel-button panel-button--ghost self-start sm:self-auto">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy email'}
          </button>
        </Reveal>

        <Reveal delay={0.2} className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-14">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="contact-link group"
            >
              <span className="flex items-center gap-2">
                {link.label === 'Resume' && <FileText className="w-4 h-4" />}
                {link.label}
              </span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
};
