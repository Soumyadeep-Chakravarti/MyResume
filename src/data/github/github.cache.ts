// src/data/github/github.cache.ts
// Local cache for GitHub data — uses localStorage.

import type { GitHubCacheEntry } from "./github.types";

const CACHE_KEY = "github_repos_cache";
const CACHE_EXPIRY_MS = 2 * 60 * 60 * 1000; // 2 hours

export function readCache<T>(): T | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed: GitHubCacheEntry<T> = JSON.parse(raw);
    if (!parsed?.data || !parsed?.timestamp) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    if (Date.now() - parsed.timestamp > CACHE_EXPIRY_MS) {
      return null;
    }
    return parsed.data;
  } catch {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
}

export function writeCache<T>(data: T): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // caching failure is non-critical
  }
}
