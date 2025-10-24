// src/components/Simplified/Sections/Projects/Projects.jsx

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../UI/SectionTitle';
import Card from '../../UI/Card'; 

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
        
        // **CRITICAL FIX: Robust Local Storage Error Handling**
        try {
            const cachedItem = localStorage.getItem(CACHE_KEY);
            
            if (cachedItem) {
                const parsedCache = JSON.parse(cachedItem);

                // Defensive check against corrupt/malformed cache data
                if (parsedCache && parsedCache.data && parsedCache.timestamp) {
                    const { data, timestamp } = parsedCache;
                    const isCacheExpired = Date.now() - timestamp > CACHE_EXPIRY_MS;
                    
                    if (isMounted) setRepos(data);
                    
                    shouldFetch = isCacheExpired;
                    setLoading(shouldFetch);
                } else {
                    // Item exists but is bad JSON structure
                    localStorage.removeItem(CACHE_KEY);
                    setLoading(true); 
                    shouldFetch = true;
                }
            } else {
                // No cache found
                setLoading(true);
                shouldFetch = true;
            }
        } catch (e) {
            // Catches SecurityError (Local Storage Blocked) or JSON.parse errors
            console.error("Local Storage Error:", e);
            localStorage.removeItem(CACHE_KEY);
            setLoading(true);
            shouldFetch = true;
        }

        // --- Fetch Logic (Only runs if needed) ---
        if (shouldFetch) {
            const fetchRepos = async () => {
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
                        .filter((repo) => !repo.fork)
                        .map(({ name, description, html_url, stargazers_count, language, updated_at }) => ({
                            title: name,
                            subtitle: description || 'No description provided.',
                            link: html_url,
                            stars: stargazers_count,
                            language: language || 'N/A',
                            updatedAt: new Date(updated_at).toLocaleDateString('en-US'),
                        }));
                        
                    if (isMounted) { 
                        setRepos(filtered);
                        localStorage.setItem(CACHE_KEY, JSON.stringify({ data: filtered, timestamp: Date.now() })); 
                        setError(null);
                    }
                } catch (err) {
                    console.error("GitHub Fetch Error:", err);
                    if (repos.length === 0 && isMounted) { 
                        setError('Failed to load projects. Please try again later.');
                    }
                } finally {
                    if (isMounted) { 
                        setLoading(false);
                    }
                }
            };
            fetchRepos();
        } else {
            setLoading(false);
        }
        
        return () => { isMounted = false; };
        
    }, []); 

    return { repos, loading, error };
};
// ---------------------------------------------------------------------

export default function Projects() {
    const { repos, loading, error } = useGitHubRepos();

    const showSkeletons = loading && repos.length === 0;
    // Defensive check ensures displayRepos is always an array for the map operation
    const displayRepos = showSkeletons ? Array(6).fill(null) : repos || []; 

    if (error && repos.length === 0)
        return (
            <section id="projects" className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-[#131722]">
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
                className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full"
                initial="hidden"
                whileInView="visible" // Parent triggers animation when in view
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } } // Parent defines stagger timing
                }}
            >
                {displayRepos.map((repo, index) => (
                    <motion.div
                        key={repo?.title || index}
                        variants={itemVariants} // Child uses variants for animation
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
                className="mt-12 text-teal-600 dark:text-teal-400 font-semibold text-lg hover:underline transition-colors duration-300"
            >
                View All Projects on GitHub &rarr;
            </a>

        </section>
    );
}
