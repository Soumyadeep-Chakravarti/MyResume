// src/data/github/github.client.ts
// GitHub API client — fetches repo data.

import type { GitHubRepoResponse } from "./github.types";

const GITHUB_USERNAME =
  import.meta.env.VITE_GITHUB_USERNAME || "Soumyadeep-Chakravarti";

export async function fetchRepos(
  perPage = 6
): Promise<GitHubRepoResponse[]> {
  const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=${perPage}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch projects: ${response.status} ${response.statusText}`
    );
  }
  return response.json();
}
