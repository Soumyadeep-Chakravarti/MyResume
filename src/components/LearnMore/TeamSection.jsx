// src/components/LearnMore/TeamSection.jsx
import React from 'react'; // Removed useState as carousel logic is gone
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { teamMembersData } from '../../data/teamMembersData';
import TeamMemberCard from './TeamMemberCard'; // Import the enhanced TeamMemberCard

// Animation variants for the overall section container
const sectionVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
            staggerChildren: 0.1, // Stagger children animations within the section
            delayChildren: 0.2,   // Delay the start of children animations
        },
    },
};

// Animation variants for individual items within sections (like the heading and paragraph)
const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const TeamSection = () => {
    return (
        <motion.section
            className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-center"
            initial="hidden" // Initial state for the section
            whileInView="visible" // Animate when the section comes into view
            viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of section is visible
            variants={sectionVariants} // Apply section-level animation variants
        >
            {/* Section Header */}
            <motion.div className="mb-12" variants={itemVariants}>
                <Users size={64} className="text-primary mx-auto mb-4 drop-shadow-lg" />
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">Meet the Minds Behind Team ByteOps</h2>
                <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                    Our diverse team of innovators, engineers, and designers are passionate about solving complex problems and building exceptional products.
                </p>
            </motion.div>

            {/* Team Member Cards - displayed in a vertical stack with a large gap */}
            {/* Each TeamMemberCard will handle its own scroll-based animation */}
            <div className="flex flex-col gap-24"> {/* Increased gap for better separation between cards */}
                {/*
                    To make each card truly unique, ensure your teamMembersData (in src/data/teamMembersData.js or .jsx)
                    contains distinct values for 'name', 'role', 'image', and optionally 'description' and 'icon'.
                    The TeamMemberCard component will render these unique properties.
                */}
                {teamMembersData.map((member, index) => (
                    // Render each TeamMemberCard, passing member data and index for alternating layout/animation
                    <TeamMemberCard key={index} member={member} index={index} />
                ))}
            </div>
        </motion.section>
    );
};

export default TeamSection;
