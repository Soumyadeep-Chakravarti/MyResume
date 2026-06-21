// src/data/github/github.projects.ts
// GitHub projects adapter — fetches + caches + transforms repo data.

import type { ProjectData } from "@/types/content";
import type { GitHubRepoResponse } from "./github.types";
import { fetchRepos } from "./github.client";
import { readCache, writeCache } from "./github.cache";

function transformRepo(repo: GitHubRepoResponse): ProjectData {
  return {
    title: repo.name,
    subtitle: repo.description || "No description provided.",
    link: repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language || "N/A",
    updatedAt: new Date(repo.updated_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    branch: repo.default_branch,
  };
}

export async function getProjects(): Promise<ProjectData[]> {
  const cached = readCache<ProjectData[]>();
  if (cached) return cached;

  const raw = await fetchRepos();
  const projects = raw.filter((r) => !r.fork).map(transformRepo);
  writeCache(projects);
  return projects;
}
