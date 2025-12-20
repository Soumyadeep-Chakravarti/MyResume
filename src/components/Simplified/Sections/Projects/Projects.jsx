// src/components/Simplified/Sections/Projects/Projects.jsx

import React, { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Star, Code, Clock, GitBranch } from 'lucide-react'; // Added icons for the Card
import SectionTitle from '../../UI/SectionTitle';

// NOTE: The environment variable must be named VITE_GITHUB_USERNAME in your .env file.
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'Soumyadeep-Chakravarti';

const CACHE_KEY = 'github_repos_cache';
const CACHE_EXPIRY_MS = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

// ===============================================
// 1. REPO CARD COMPONENT (Replaces generic Card)
// ===============================================

// Hypothetical RepoCard component structure
const RepoCard = memo(({ repo }) => {
    // Defensive check
    if (!repo) return <SkeletonCard />;

    return (
        <motion.a
            href={repo.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 
                       hover:shadow-2xl hover:border-teal-400 dark:hover:border-teal-500 transition-all duration-300 flex flex-col h-full group"
            whileHover={{ y: -5 }} // Subtle lift on hover
        >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {repo.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow mb-4">
                {repo.subtitle}
            </p>
            
            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
                {/* Language and Stars */}
                <div className="flex justify-between items-center text-xs font-medium text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                        <Code size={16} className="mr-1 text-teal-500" />
                        {repo.language}
                    </span>
                    <span className="flex items-center">
                        <Star size={16} className="mr-1 text-yellow-500" />
                        {repo.stars.toLocaleString()}
                    </span>
                </div>

                {/* Last Updated */}
                <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
                    <Clock size={14} className="mr-2" />
                    Last updated: {repo.updatedAt}
                </div>
            </div>
        </motion.a>
    );
});

// Skeleton Card component (Simplified)
const SkeletonCard = () => (
    <div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md h-full min-h-[160px] border border-gray-200 dark:border-gray-700 animate-pulse"
        aria-hidden="true"
    >
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6" />
        <div className="mt-6 flex gap-3 justify-between border-t pt-4 border-gray-100 dark:border-gray-700">
            <div className="h-2 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-2 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
    </div>
);

// Framer Motion Variants
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// --- Custom Hook for Data Fetching and Caching (Logic Unchanged) ---
const useGitHubRepos = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        let shouldFetch = true;
        setLoading(true);

        try {
            const cachedItem = localStorage.getItem(CACHE_KEY);
            if (cachedItem) {
                const parsedCache = JSON.parse(cachedItem);
                if (parsedCache && parsedCache.data && parsedCache.timestamp) {
                    const { data, timestamp } = parsedCache;
                    const isCacheExpired = Date.now() - timestamp > CACHE_EXPIRY_MS;
                    if (isMounted) setRepos(data);
                    shouldFetch = isCacheExpired;
                    if (!shouldFetch && isMounted) setLoading(false);
                } else {
                    localStorage.removeItem(CACHE_KEY);
                }
            }
        } catch (e) {
            console.error("Local Storage Error:", e);
            try { localStorage.removeItem(CACHE_KEY); } catch(removeError) { /* Ignore */ }
        }

        if (shouldFetch) {
            const fetchRepos = async () => {
                const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`;

                try {
                    const response = await fetch(API_URL);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
                    }

                    const data = await response.json();
                    const filtered = data
                        .filter((repo) => !repo.fork && repo.description) 
                        .map(({ name, description, html_url, stargazers_count, language, updated_at, default_branch }) => ({
                            title: name,
                            subtitle: description,
                            link: html_url,
                            stars: stargazers_count,
                            language: language || 'N/A',
                            updatedAt: new Date(updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                            branch: default_branch // Added branch info for future expansion
                        }));

                    if (isMounted) {
                        setRepos(filtered);
                        try {
                            localStorage.setItem(CACHE_KEY, JSON.stringify({ data: filtered, timestamp: Date.now() }));
                        } catch(e) { /* Ignore caching failure */ }
                        setError(null);
                    }
                } catch (err) {
                    console.error("GitHub Fetch Error:", err);
                    if (isMounted) {
                        if (repos.length === 0) {
                            setError(err.message || 'Failed to load projects. Please check your connection.');
                        }
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

    }, []);

    return { repos, loading, error };
};
// ---------------------------------------------------------------------

export default function Projects() {
    const { repos, loading, error } = useGitHubRepos();

    const showSkeletons = loading && repos.length === 0;
    const displayRepos = showSkeletons ? Array(6).fill(null) : repos || [];

    return (
        <section
            id="projects"
            className="min-h-screen flex flex-col justify-center items-center px-4 py-20
                       bg-gray-100 dark:bg-[#131722] transition-colors duration-500"
        >
            <SectionTitle text="Key Projects" />

            {/* Error Message Display (Improved) */}
            {error && repos.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-center bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-400 max-w-xl mx-auto"
                >
                    <p className="text-red-700 dark:text-red-300 font-medium">
                        ⚠️ **API Error:** {error} 
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                        Displaying cached data if available, otherwise projects cannot be loaded.
                    </p>
                </motion.div>
            )}

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
                        key={repo?.title || index}
                        variants={itemVariants}
                    >
                        {/* Use the new RepoCard component */}
                        <RepoCard repo={repo} /> 
                    </motion.div>
                ))}
            </motion.div>

            {/* Footer CTA and Disclaimer */}
            <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 text-teal-600 dark:text-teal-400 font-semibold text-lg hover:underline transition-colors duration-300"
            >
                View All Projects on GitHub &rarr;
            </a>

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 max-w-3xl text-center">
                Project data is dynamically sourced from GitHub and cached locally for performance and resilience.
            </p>
        </section>
    );
}
