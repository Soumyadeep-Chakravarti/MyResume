// src/content/profile.ts
// Profile content — name, title, bio. Extracted from legacy Hero + About.

import type { ProfileData } from "@/types/content";

export const profile: ProfileData = {
  name: "Soumyadeep Chakravarti",
  title: "Full-Spectrum Software Architect",
  description:
    "Specializing in designing, building, and operating complex, resilient, and high-performance systems across the entire technology stack, from user interface to cloud operations.",
  email: "soumyadeepsai1@gmail.com",
};

// About section content — used in the Architectural Overview section.
export type AboutPart = string | { type: "strong"; text: string };

export const aboutParts: AboutPart[] = [
  { type: "strong", text: "My name is Soumyadeep Chakravarti." },
  " I am a dedicated ",
  { type: "strong", text: "Full-Spectrum Software Architect" },
  ", passionate about engineering ",
  { type: "strong", text: "resilient, high-performance systems" },
  " from the user interface to the underlying cloud infrastructure.",
  " ",
  "My focus is on strategic problem-solving, architectural design, and automating the entire development lifecycle for maximum operational stability.",
];
