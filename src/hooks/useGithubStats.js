import { useState, useEffect } from 'react';
import logger from '../utils/logger';

const GITHUB_USERNAME = 'Soumyadeep-Chakravarti';
const CACHE_KEY = 'github_stats_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useGithubStats = () => {
  const [stats, setStats] = useState({ repos: 0, followers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setStats(data);
            setLoading(false);
            return;
          }
        }

        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        const statsData = {
          repos: data.public_repos,
          followers: data.followers,
        };
        
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: statsData,
          timestamp: Date.now(),
        }));
        
        setStats(statsData);
      } catch (error) {
        logger.error('GitHub stats fetch error:', error.message);
        setStats({ repos: 38, followers: 0 }); // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};

export default useGithubStats;