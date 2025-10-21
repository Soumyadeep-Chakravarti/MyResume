import React from 'react';

import Hero from './Sections/Hero/Hero.jsx';
import About from './Sections/About/About.jsx';
import Skills from './Sections/Skills/Skills.jsx';
import Projects from './Sections/Projects/Projects.jsx';
import Contact from './Sections/Contact/Contact.jsx';

import SectionNav from './UI/SectionNav.jsx';
import NavBar from './UI/NavBar.jsx';

export default function SimplifiedResume() {
    return (
        <div className="simplified-resume relative">
            <NavBar />
            <SectionNav />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
        </div>
  );
}

