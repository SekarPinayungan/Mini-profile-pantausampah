import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function Section({ id, className = '', title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className={`py-5 ${className}`}>
      <div className="container text-center">
        <h2 className="fw-bold mb-3">{title}</h2>
        {subtitle && (
          <p className="text-muted mb-5 mx-auto" style={{ maxWidth: '700px' }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
