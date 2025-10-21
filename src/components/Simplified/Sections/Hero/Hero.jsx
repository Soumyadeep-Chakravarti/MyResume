import React from 'react';
import SectionTitle from '../../UI/SectionTitle.jsx';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <SectionTitle text="Soumyadeep Chakravarti" />

      <p className="mt-4 text-lg md:text-xl max-w-xl">
        Full-stack developer & problem solver. I build projects that merge design with functionality.
      </p>

      <div className="mt-6 flex gap-4">
        <a href="#projects" className="btn-primary">View Projects</a>
        <a href="/resume.pdf" target="_blank" className="btn-secondary">Download Resume</a>
      </div>
    </section>
  );
}

