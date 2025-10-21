// src/components/GitHubSection/GitHubSection.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const GitHubSection = ({ username }) => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const res = await fetch(`https://api.github.com/users/${username}/repos`);
                if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
                const data = await res.json();
                setRepos(data);
            } catch (err) {
                console.error("Error fetching GitHub repos:", err);
                setError("Failed to load repositories. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [username]);

    if (loading) {
        // Skeleton loading
        return (
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10 px-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="p-4 bg-gray-200 rounded-lg animate-pulse h-32"></div>
                ))}
            </div>
        );
    }

    if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
    if (!repos.length) return <p className="text-center py-10">No repositories found.</p>;

    // Sort by stars and pick top 12
    const topRepos = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 12);

    return (
        <section className="w-full py-10 px-4">
            <h2 className="text-2xl font-bold text-center mb-8">My GitHub Projects</h2>
            <motion.div
                className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } },
                }}
            >
                {topRepos.map((repo) => (
                    <motion.a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                        p-4 rounded-lg border border-border-primary
                        bg-white/20 backdrop-blur-md text-card-text
                        hover:bg-white/30 focus:bg-white/30
                        hover:shadow-lg focus:shadow-lg
                        transition-all duration-300
                        cursor-pointer
                        "
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 className="font-semibold">{repo.name}</h3>
                        <p className="text-sm mt-1">{repo.description || "No description"}</p>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-200">
                            <span>⭐ {repo.stargazers_count}</span>
                            {repo.language && <span className="px-2 py-0.5 rounded bg-card-badge/40">{repo.language}</span>}
                        </div>
                    </motion.a>


                ))}
      </motion.div>
    </section>
  );
};

export default GitHubSection;

