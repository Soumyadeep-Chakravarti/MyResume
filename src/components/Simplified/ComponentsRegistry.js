// src/Simplified/componentsRegistry.js

import React from "react";

// Lazy-load Section Components
const Hero = React.lazy(() => import("./Sections/Hero/Hero.jsx"));
const About = React.lazy(() => import("./Sections/About/About.jsx"));
const Skills = React.lazy(() => import("./Sections/Skills/Skills.jsx"));
const Projects = React.lazy(() => import("./Sections/Projects/Projects.jsx"));
const Contact = React.lazy(() => import("./Sections/Contact/Contact.jsx"));

/**
 * Exports a stable array of section objects.
 * Each object explicitly links the Section component to its unique ID.
 * This creates a single source of truth, eliminating reliance on array order.
 */
export const sections = [
  { id: "hero", Component: Hero },
  { id: "about", Component: About },
  { id: "skills", Component: Skills },
  { id: "projects", Component: Projects },
  { id: "contact", Component: Contact },
];

/**
 * Optional: Export an array of IDs for observer/navigation purposes.
 * This is derived directly from the primary sections array.
 */
export const SECTION_IDS = sections.map((section) => section.id);
