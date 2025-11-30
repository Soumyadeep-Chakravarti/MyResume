// src/components/Simplified/Sections/Projects/Projects.jsx

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../UI/SectionTitle';
import Card from '../../UI/Card'; 
import { Github } from 'lucide-react'; // Added Github icon for link

const GITHUB_USERNAME = 'Soumyadeep-Chakravarti';
const CACHE_KEY = 'github_repos_cache';
const CACHE_EXPIRY_MS = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

// Skeleton Card component (Unchanged)
const SkeletonCard = () => (
    <div 
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full min-h-[160px] border border-gray-200 dark:border-gray-700 animate-pulse"
        aria-hidden="true" 
    > 
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        <div className="mt-6 flex gap-3">
            <div className="h-2 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-2 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
    </div>
);

// Framer Motion Variants for Staggered Children
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.6 
        } 
    },
};

// --- Custom Hook for Data Fetching and Caching (SWR with TTL) ---
const useGitHubRepos = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        let shouldFetch = true;
        let cachedData = null;
        
        // 1. Check Cache
        try {
            const cachedItem = localStorage.getItem(CACHE_KEY);
            if (cachedItem) {
                const parsedCache = JSON.parse(cachedItem);

                if (parsedCache?.data && parsedCache?.timestamp) {
                    const { data, timestamp } = parsedCache;
                    const isCacheExpired = Date.now() - timestamp > CACHE_EXPIRY_MS;
                    
                    if (isMounted) setRepos(data);
                    
                    if (!isCacheExpired) {
                        shouldFetch = false;
                        setLoading(false);
                    } else {
                        // Cache exists but is expired (Stale While Revalidate)
                        setLoading(true); // Keep loading state true to show we're refreshing
                    }
                    
                } else {
                    // Invalid cache structure - clear it and force fetch
                    localStorage.removeItem(CACHE_KEY);
                }
            } else {
                 // No cache found - force fetch, loading state is already true
            }
        } catch (e) {
            // Local Storage access denied or JSON parsing error
            console.error("Local Storage Error. Fetching directly.", e);
            localStorage.removeItem(CACHE_KEY);
            // Loading remains true, shouldFetch remains true
        }

        // 2. Fetch Logic (runs if no valid cache, or cache is expired)
        if (shouldFetch) {
            const fetchRepos = async () => {
                // Ensure loading indicator is visible if we don't have existing repos (from expired cache)
                if (repos.length === 0 && isMounted) setLoading(true);

                try {
                    const response = await fetch(
                        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
                    );
                    
                    if (!response.ok) {
                        throw new Error(`Failed to fetch: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    const filtered = data
                        .filter((repo) => !repo.fork) // Exclude forks
                        .map(({ name, description, html_url, stargazers_count, language, updated_at }) => ({
                            title: name,
                            subtitle: description || 'No description provided.',
                            link: html_url,
                            stars: stargazers_count,
                            language: language || 'N/A',
                            // Use a consistent, readable format
                            updatedAt: new Date(updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                        }));
                        
                    if (isMounted) {
                        setRepos(filtered);
                        // Save new data to cache
                        localStorage.setItem(CACHE_KEY, JSON.stringify({ data: filtered, timestamp: Date.now() }));
                        setError(null);
                    }
                } catch (err) {
                    console.error("GitHub Fetch Error:", err);
                    // Only set error if we couldn't load anything (no cached data)
                    if (repos.length === 0 && isMounted) {
                        setError('Failed to load projects. Please check your connection or GitHub access.');
                    }
                } finally {
                    if (isMounted) {
                        setLoading(false);
                    }
                }
            };
            fetchRepos();
        }
        
        return () => { isMounted = false; };
        
    }, []); // Empty dependency array ensures run once

    return { repos, loading, error };
};
// ---------------------------------------------------------------------

export default function Projects({ id }) {
    const { repos, loading, error } = useGitHubRepos();

    // Show skeletons only if loading AND we have no existing data (to prevent flashing)
    const showSkeletons = loading && repos.length === 0;
    
    // Prepare data: 6 placeholders if loading, otherwise the fetched repos
    const displayRepos = showSkeletons ? Array(6).fill(null) : repos; 

    if (error && repos.length === 0)
        return (
            <section id={id || "projects"} className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-[#131722] py-20">
                <p className="text-red-500 dark:text-red-400 p-4 border border-red-500 rounded-lg">
                    ⚠️ {error}
                </p>
            </section>
        );

    return (
        <section
            id={id || "projects"}
            className="min-h-screen flex flex-col justify-center items-center px-4 py-20 
                     bg-gray-100 dark:bg-[#131722] transition-colors duration-500"
        >
            <SectionTitle text="Projects" />

            <motion.div
                className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
            >
                {displayRepos.map((repo, index) => (
                    <motion.div
                        // Use unique key from repo title or index for skeletons
                        key={repo?.title || index} 
                        variants={itemVariants}
                    >
                        {showSkeletons ? (
                            <SkeletonCard />
                        ) : (
                            <Card
                                title={repo.title}
                                subtitle={repo.subtitle}
                                link={repo.link}
                                stars={repo.stars}
                                language={repo.language}
                                updatedAt={repo.updatedAt}
                            />
                        )}
                    </motion.div>
                ))}
            </motion.div>
            
            <a 
                href={`https://github.com/${GITHUB_USERNAME}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-12 inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold text-lg hover:underline transition-colors duration-300"
            >
                <Github size={20} />
                View All Projects on GitHub
            </a>

        </section>
    );
}
