// src/Simplified/componentsRegistry.js

import React from "react";

const Hero = React.lazy(() => import("./Sections/Hero/Hero.jsx"));
const About = React.lazy(() => import("./Sections/About/About.jsx"));
const Skills = React.lazy(() => import("./Sections/Skills/Skills.jsx"));
const Projects = React.lazy(() => import("./Sections/Projects/Projects.jsx"));
const Contact = React.lazy(() => import("./Sections/Contact/Contact.jsx"));

export const sections = [Hero, About, Skills, Projects, Contact];
