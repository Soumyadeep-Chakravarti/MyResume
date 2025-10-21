import React from 'react';
import SectionTitle from '../../UI/SectionTitle';
import Card from '../../UI/Card';

const skills = [
  { name: 'JavaScript', level: 'Advanced' },
  { name: 'React', level: 'Advanced' },
  { name: 'Node.js', level: 'Intermediate' },
  { name: 'Python', level: 'Intermediate' },
  { name: 'C/C++', level: 'Intermediate' },
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-100 dark:bg-gray-800">
      <SectionTitle text="Skills" />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
        {skills.map((skill) => (
          <Card key={skill.name} title={skill.name} subtitle={skill.level} />
        ))}
      </div>
    </section>
  );
}

