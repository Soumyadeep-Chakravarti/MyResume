// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // enables `next export` for static HTML
  distDir: 'out',   // default output dir for static export
  images: {
    unoptimized: true, // important for GitHub Pages
  },
  basePath: '/your-repo-name', // change to your GitHub repo name
  trailingSlash: true, // required for GitHub Pages
};

module.exports = nextConfig;
