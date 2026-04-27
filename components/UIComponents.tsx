import React from 'react';

export const Container = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`container ${className}`}>
    {children}
  </div>
);

export const Section = ({ children, id, className = "", bgLight = false }: { children: React.ReactNode, id?: string, className?: string, bgLight?: boolean }) => (
  <section id={id} className={`py-5 ${bgLight ? 'bg-light' : ''} ${className}`}>
    {children}
  </section>
);

export const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`card shadow-sm border-0 h-100 transition-hover ${className}`}>
    {children}
  </div>
);
