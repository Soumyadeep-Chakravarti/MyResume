import React from 'react';
import SectionTitle from '../../UI/SectionTitle';

export default function About() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gray-50 dark:bg-gray-900">
      <SectionTitle text="About Me" />
      <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-700 dark:text-gray-200">
        I am Buna Sai, a passionate full-stack developer with experience building interactive, user-friendly web applications. I enjoy transforming ideas into real-world solutions using modern web technologies.
      </p>
    </section>
  );
}

