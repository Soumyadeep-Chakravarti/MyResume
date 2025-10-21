import React, { useEffect, useState } from 'react';
import SectionTitle from '../../UI/SectionTitle';
import Card from '../../UI/Card';

const GITHUB_USERNAME = 'Soumyadeep-Chakravarti';

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=created&per_page=6`
        );
        if (!response.ok) throw new Error('Failed to fetch repos');
        const data = await response.json();
        const filtered = data
          .filter((repo) => !repo.fork)
          .map((repo) => ({
            title: repo.name,
            description: repo.description || 'No description',
            link: repo.html_url,
            stars: repo.stargazers_count,
            language: repo.language || 'N/A',
            updatedAt: new Date(repo.updated_at).toLocaleDateString(),
          }));
        setRepos(filtered);
      } catch (err) {
        console.error(err);
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading)
    return (
      <section id="projects" className="min-h-screen flex justify-center items-center">
        <p className="text-text-primary">Loading projects...</p>
      </section>
    );

  if (error)
    return (
      <section id="projects" className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </section>
    );

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-50 dark:bg-gray-900"
    >
      <SectionTitle text="Projects" />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
        {repos.map((repo) => (
          <Card
            key={repo.title}
            title={repo.title}
            subtitle={repo.description}
            link={repo.link}
            stars={repo.stars}
            language={repo.language}
            updatedAt={repo.updatedAt}
          />
        ))}
      </div>
    </section>
  );
}

