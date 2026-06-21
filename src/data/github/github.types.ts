// src/data/github/github.types.ts
// GitHub API response types.

export interface GitHubRepoResponse {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  default_branch: string;
  fork: boolean;
}

export interface GitHubCacheEntry<T> {
  data: T;
  timestamp: number;
}
