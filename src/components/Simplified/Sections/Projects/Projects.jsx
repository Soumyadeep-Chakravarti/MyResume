import React from 'react';
import SectionTitle from '../../UI/SectionTitle';
import Card from '../../UI/Card';

const projects = [
  { title: 'Project A', description: 'An amazing project that does X.', link: '#' },
  { title: 'Project B', description: 'A web app built with React and Node.js.', link: '#' },
  { title: 'Project C', description: 'Open-source project showcasing Y.', link: '#' },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-50 dark:bg-gray-900">
      <SectionTitle text="Projects" />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        {projects.map((project) => (
          <Card
            key={project.title}
            title={project.title}
            subtitle={project.description}
            link={project.link}
          />
        ))}
      </div>
    </section>
  );
}

