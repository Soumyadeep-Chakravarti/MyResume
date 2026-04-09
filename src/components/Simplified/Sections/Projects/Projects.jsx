// src/components/Simplified/Sections/Projects/Projects.jsx

import React, { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Code, Clock, X, Terminal, Cpu } from 'lucide-react';
import SectionTitle from '../../UI/SectionTitle';
import LivingCard from '../../../Utils/LivingCard';
import DeviceMockup from '../../../Utils/DeviceMockup';
import { getProjectEnhancement } from '../../../../config/projectEnhancements';

// NOTE: The environment variable must be named VITE_GITHUB_USERNAME in your .env file.
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'Soumyadeep-Chakravarti';

const CACHE_KEY = 'github_repos_cache';
const CACHE_EXPIRY_MS = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

// ===============================================
// 1. REPO CARD COMPONENT (Replaces generic Card)
// ===============================================

// Hypothetical RepoCard component structure
const RepoCard = memo(({ repo, onClick }) => {
    // Defensive check
    if (!repo) return <SkeletonCard />;

    return (
        <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 
                       hover:shadow-2xl hover:border-teal-400 dark:hover:border-teal-500 transition-all duration-300 flex flex-col h-full group cursor-pointer"
            whileHover={{ y: -5 }}
            onClick={() => onClick?.(repo)}
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
        </motion.div>
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

// Framer Motion Variants with organic randomness
const getRandomDelay = () => 0.05 + (Math.random() * 0.1 - 0.05);

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
            type: "spring",
            stiffness: 200,
            damping: 15,
            mass: 1.2,
            delay: getRandomDelay() 
        } 
    },
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
                    
                    // FIX: Only filter out forks. Use the map function to provide a fallback description.
                    const filtered = data
                        .filter((repo) => !repo.fork) // <--- Only filter out forks
                        .map(({ name, description, html_url, stargazers_count, language, updated_at, default_branch }) => ({
                            title: name,
                            // CRITICAL: Provide a sensible default if the description is null or empty.
                            subtitle: description || 'No description provided by the repository owner.', 
                            link: html_url,
                            stars: stargazers_count,
                            language: language || 'N/A',
                            updatedAt: new Date(updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                            branch: default_branch 
                        }));
                    if (isMounted) {
                        setRepos(filtered);
                        try {
                            localStorage.setItem(CACHE_KEY, JSON.stringify({ data: filtered, timestamp: Date.now() }));
                        } catch(e) { /* Ignore caching failure */ }
                        setError(null);
                    }
                } catch (err) {
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
    const [selectedRepo, setSelectedRepo] = useState(null);

    const showSkeletons = loading && repos.length === 0;
    const displayRepos = showSkeletons ? Array(6).fill(null) : repos || [];

    const getEnhancement = (repoTitle) => getProjectEnhancement(repoTitle);

    return (
        <section
            id="projects"
            className="min-h-screen flex flex-col justify-center items-center px-4 py-20
                       bg-gray-100 dark:bg-[#131722] transition-colors duration-500 relative"
        >
            <SectionTitle text="The Build History // Lab Results" />

            {/* Mobile Mockup Modal */}
            <AnimatePresence>
                {selectedRepo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedRepo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            layoutId={`project-${selectedRepo.index}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <DeviceMockup>
                                <div className="p-4 h-full overflow-y-auto">
                                    <button 
                                        onClick={() => setSelectedRepo(null)}
                                        className="absolute top-2 right-2 p-2 rounded-full bg-gray-800 text-white z-10"
                                    >
                                        <X size={16} />
                                    </button>
                                    
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 pr-8">
                                        {selectedRepo.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        {selectedRepo.subtitle}
                                    </p>
                                    
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-2 py-1 bg-cyan-600 text-white text-xs rounded font-mono">
                                            {selectedRepo.language}
                                        </span>
                                        <span className="flex items-center gap-1 text-yellow-500 text-sm font-mono">
                                            <Star size={14} /> {selectedRepo.stars}
                                        </span>
                                    </div>

                                    {/* System Specs from enhancement */}
                                    {getEnhancement(selectedRepo.title)?.systemSpecs && (
                                        <div className="mb-4 p-3 bg-gray-900 dark:bg-black rounded-lg border border-cyan-500/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Cpu size={14} className="text-cyan-400" />
                                                <span className="text-xs text-cyan-400 font-mono uppercase">System Specs</span>
                                            </div>
                                            <p className="text-xs text-gray-300 font-mono">
                                                {getEnhancement(selectedRepo.title).systemSpecs}
                                            </p>
                                        </div>
                                    )}

                                    {/* Technical Details from enhancement */}
                                    {getEnhancement(selectedRepo.title)?.technicalDetails && (
                                        <div className="mb-4 p-3 bg-gray-900 dark:bg-black rounded-lg border border-yellow-500/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Terminal size={14} className="text-yellow-400" />
                                                <span className="text-xs text-yellow-400 font-mono uppercase">Architecture</span>
                                            </div>
                                            <p className="text-xs text-gray-300 font-mono">
                                                {getEnhancement(selectedRepo.title).technicalDetails}
                                            </p>
                                        </div>
                                    )}

                                    <a 
                                        href={selectedRepo.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-center py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-semibold"
                                    >
                                        View on GitHub
                                    </a>
                                </div>
                            </DeviceMockup>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                    visible: { transition: { staggerChildren: 0.05 + (Math.random() * 0.1 - 0.05) } }
                }}
            >
                {displayRepos.map((repo, index) => (
                    <motion.div
                        key={repo?.title || index}
                        variants={itemVariants}
                        layoutId={`project-${index}`}
                    >
                        <LivingCard className="h-full">
                            <RepoCard repo={repo} onClick={(r) => setSelectedRepo({ ...r, index })} /> 
                        </LivingCard>
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
