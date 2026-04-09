// Enhanced project metadata for the Mobile Mockup detail view
// This supplements the GitHub API data with richer content

export const PROJECT_ENHANCEMENTS = {
    // Map repo names to enhanced data
    // Keys should match the lowercase repo names from GitHub API
    
    // Example structure:
    // "repo-name": {
    //     gallery: ["/path/to/image1.jpg", "/path/to/image2.jpg"],
    //     systemSpecs: "Linux Kernel 6.x | Rust | systemd | Nginx",
    //     technicalDetails: "Architecture: microservices, Database: PostgreSQL, CDN: Cloudflare"
    // }
};

export const getProjectEnhancement = (repoName) => {
    const key = repoName?.toLowerCase().replace(/\s+/g, '-');
    return PROJECT_ENHANCEMENTS[key] || null;
};