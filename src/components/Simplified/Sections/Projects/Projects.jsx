import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../UI/SectionTitle';
import Card from '../../UI/Card';

const GITHUB_USERNAME = 'Soumyadeep-Chakravarti';
const CACHE_KEY = 'github_repos_cache';

// Simple component for a clean loading state (a "skeleton")
const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-40 animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
  </div>
);

export default function Projects() {
  const [repos, setRepos] = useState(() => {
    // 1. Initial State from Local Storage (SWR pattern)
    const cachedData = localStorage.getItem(CACHE_KEY);
    return cachedData ? JSON.parse(cachedData) : [];
  });
  const [loading, setLoading] = useState(repos.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if we don't have any cached data *or* if we want to revalidate
    // We set loading to true only if repos is empty to allow SWR behavior.
    
    const fetchRepos = async () => {
      // If we have cached data, setLoading will be false (better UX)
      if (repos.length === 0) setLoading(true);

      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6` // Sort by updated for relevance
        );
        
        if (!response.ok) {
            // Check for rate limit or other issues
            const text = await response.text();
            throw new Error(`Failed to fetch repos: ${response.status}. ${text.substring(0, 50)}...`);
        }
        
        const data = await response.json();
        const filtered = data
          .filter((repo) => !repo.fork)
          .map(({ name, description, html_url, stargazers_count, language, updated_at }) => ({
            title: name,
            subtitle: description || 'No description provided.',
            link: html_url,
            stars: stargazers_count,
            language: language || 'N/A',
            updatedAt: new Date(updated_at).toLocaleDateString('en-US'),
          }));
          
        setRepos(filtered);
        localStorage.setItem(CACHE_KEY, JSON.stringify(filtered)); // Cache the new data
        setError(null);

      } catch (err) {
        console.error("GitHub Fetch Error:", err);
        // Only set error if we couldn't load anything (i.e., cache is empty)
        if (repos.length === 0) {
            setError('Failed to load projects. Please try again later.');
        } else {
            // If cache exists, silently fail and show stale data
            console.warn("Using cached data due to failed revalidation.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [GITHUB_USERNAME]); // Rerun if the username constant somehow changes

  const displayRepos = loading && repos.length === 0 ? Array(6).fill(null) : repos;

  // --- Rendering Logic ---

  if (error && repos.length === 0)
    return (
      <section id="projects" className="min-h-screen flex justify-center items-center">
        <p className="text-red-500 dark:text-red-400 p-4 border border-red-500 rounded-lg">
            ⚠️ {error}
        </p>
      </section>
    );

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center items-center px-4 py-20 
                 bg-gray-100 dark:bg-[#131722] transition-colors duration-500"
    >
      <SectionTitle text="Projects" />

      <motion.div
        className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full"
        initial="hidden"
        animate="visible"
        variants={{
            visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {displayRepos.map((repo, index) => (
          <motion.div
            key={repo?.title || index} // Use index for key if repo is null (skeleton)
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            {repo ? (
              <Card
                title={repo.title}
                subtitle={repo.subtitle}
                link={repo.link}
                stars={repo.stars}
                language={repo.language}
                updatedAt={repo.updatedAt}
              />
            ) : (
              <SkeletonCard />
            )}
          </motion.div>
        ))}
      </motion.div>
      
      {/* Optional: Add a link to the full GitHub profile */}
      <a 
          href={`https://github.com/${GITHUB_USERNAME}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-12 text-teal-600 dark:text-teal-400 font-semibold hover:underline"
      >
          View All {'>'}
      </a>

    </section>
  );
}
