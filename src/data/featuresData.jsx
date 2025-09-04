// src/data/featuresData.jsx (REMINDER: This file should be renamed to .jsx)
import React from 'react';
import { Zap, Shield, Cloud, Settings, Layout, LifeBuoy } from 'lucide-react';

// Import individual feature description components - CORRECTED PATHS
import SystemProgrammingDescription from '../components/LandingFeatures/descriptions/SystemProgrammingDescription.jsx';
import OpenSourceAndDocumentationDescritpion from '../components/LandingFeatures/descriptions/OpenSourceAndDocumentationDescritpion.jsx';
import AiAndDataDrivenDevelopmentDescription from '../components/LandingFeatures/descriptions/AiAndDataDrivenDevelopmentDescription.jsx';
import ProblemSolvingAndArchitectureDescription from '../components/LandingFeatures/descriptions/ProblemSolvingAndArchitectureDescription.jsx';
import CrossPlatformAndLinuxExpertiseDescription from '../components/LandingFeatures/descriptions/CrossPlatformAndLinuxExpertiseDescription.jsx';
import ContinuousLearningAndInnovationDescription from '../components/LandingFeatures/descriptions/ContinuousLearningAndInnovationDescription.jsx';

const featuresData = [
    {
        icon: < Zap size={36} className="text-primary" />,
        title: "Systems Programming",
        description: <SystemProgrammingDescription />,
        image: "https://placehold.co/600x400/87CEEB/FFFFFF/png?text=Performance+Image", // Placeholder image
    },
    {
        icon: <Shield size={36} className="text-secondary" />,
        title: "AI & Data-Driven Development",
        description: <AiAndDataDrivenDevelopmentDescription />,
        image: "https://placehold.co/600x400/90EE90/000000/png?text=Security+Image", // Placeholder image
    },
    {
        icon: <Cloud size={36} className="text-accent" />,
        title: "Open-Source & Documentation",
        description: <OpenSourceAndDocumentationDescritpion />,
        image: "https://placehold.co/600x400/ADD8E6/000000/png?text=Cloud+Image", // Placeholder image
    },
    {
        icon: <Settings size={36} className="text-primary" />,
        title: "Problem-Solving & Architecture",
        description: <ProblemSolvingAndArchitectureDescription />,
        image: "https://placehold.co/600x400/FFB6C1/000000/png?text=Scalability+Image", // Placeholder image
    },
    {
        icon: <Layout size={36} className="text-secondary" />,
        title: "Cross-Platform & Linux Expertise",
        description: <CrossPlatformAndLinuxExpertiseDescription/>,
        image: "https://placehold.co/600x400/FFD700/000000/png?text=UI+Image", // Placeholder image
    },
    {
        icon: <LifeBuoy size={36} className="text-accent" />,
        title: "Continuous Learning & Innovation",
        description: <ContinuousLearningAndInnovationDescription />,
        image: "https://placehold.co/600x400/DDA0DD/000000/png?text=Support+Image", // Placeholder image
    },
];

export default featuresData;
