import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  // Stagger, in seconds
  delay?: number;
  as?: 'div' | 'li' | 'article' | 'section';
}

// Fades and slides its children up the first time they scroll into view
export const Reveal: React.FC<RevealProps> = ({ children, className = '', delay = 0, as = 'div' }) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
};

// Shared section heading: mono eyebrow + big condensed title
export const SectionHeading: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}> = ({ eyebrow, title, children, className = '' }) => (
  <Reveal className={`mb-14 sm:mb-20 ${className}`}>
    <div className="section-eyebrow">{eyebrow}</div>
    <h2 className="section-title mt-3">{title}</h2>
    {children && <p className="section-lede mt-5">{children}</p>}
  </Reveal>
);
