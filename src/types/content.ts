// src/types/content.ts
// Content domain contracts — reusable types for portfolio content data.

// ─── Skills ────────────────────────────────────────────────────────────────

export type SkillLevel = "expert" | "intermediate" | "familiar";

export interface SkillItem {
  id: string;
  label: string;
  level: SkillLevel;
  icon?: string;
  accent?: string;
  tags?: string[];
}

export interface SkillCategory {
  id: "languages" | "frameworks" | "tools";
  label: string;
  items: SkillItem[];
}

// ─── Profile ───────────────────────────────────────────────────────────────

export interface ProfileData {
  name: string;
  title: string;
  description: string;
  email: string;
}

// ─── Social Links ──────────────────────────────────────────────────────────

export interface SocialLink {
  name: string;
  label: string;
  href: string;
  style: string;
  icon: string;
}

// ─── Projects ──────────────────────────────────────────────────────────────

export interface ProjectData {
  title: string;
  subtitle: string;
  link: string;
  stars: number;
  language: string;
  updatedAt: string;
  branch: string;
}
