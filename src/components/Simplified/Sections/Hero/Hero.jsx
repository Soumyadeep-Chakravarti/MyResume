import { memo, useState, useRef } from 'react';
import { motion, useReducedMotion, useSpring, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react'; 
import useGithubStats from '../../../../hooks/useGithubStats';
import AnimatedCounter from '../../../Utils/AnimatedCounter';
import TelemetryBar from '../../../Utils/TelemetryBar';
import TerminalFeed from '../../../Utils/TerminalFeed';
import RabbitHolesGraph from '../../../Utils/RabbitHolesGraph';

const HERO_DATA = {
    NAME: "Soumyadeep Chakravarti",
    TITLE: "If it's tech, I'm into it.",
    DESCRIPTION: "Chasing rabbit holes across the entire stack — from Arch kernel tuning and Proxmox nested-VM hell to the physics of a perfect drift. If it's got a processor or a piston, I'm probably trying to break it.",
    LINKS: [
        { label: "GitHub", href: "https://github.com/Soumyadeep-Chakravarti" },
        { label: "LinkedIn", href: "https://linkedin.com/in/soumyadeep-chakravarti" },
        { label: "Email", href: "mailto:soumyadeepsai1@gmail.com" },
    ],
    RABBIT_HOLES: ["Systems", "Cybersec", "Drifting", "ML", "Rust"],
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { 
        staggerChildren: 0.1 + (Math.random() * 0.1 - 0.05),
    }, },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (customDelay = 0.0) => ({ 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: "easeOut", delay: customDelay } 
    }),
};

import profileImg from '../../../../assets/images/SoumyadeepChakravarti.png';

const ProfileFrame = () => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 1.2 });
    const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 1.2 });
    const rotateX = useTransform(springY, [-100, 100], [15, -15]);
    const rotateY = useTransform(springX, [-100, 100], [-15, 15]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className="relative aspect-square max-w-sm mx-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
            <motion.div
                className="w-full h-full rounded-2xl overflow-hidden"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
            >
                <div className="w-full h-full relative group">
                    <img 
                        src={profileImg} 
                        alt="Soumyadeep Chakravarti" 
                        className="w-full h-full object-cover rounded-2xl
                                   invert-[0.15] contrast-125 brightness-105
                                   dark:invert-0 dark:contrast-100 dark:brightness-90 dark:sepia-[0.15]
                                   sepia-[0.1] satur-80"
                    />
                    <div className="absolute inset-0 rounded-2xl border-4 border-yellow-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300
                         shadow-[0_0_20px_rgba(234,179,8,0.4),0_0_40px_rgba(234,179,8,0.15)]
                         dark:shadow-[0_0_20px_rgba(234,179,8,0.5),0_0_40px_rgba(234,179,8,0.25)]" />
                </div>
            </motion.div>
        </motion.div>
    );
};

const GitHubStatsPulse = () => {
    const { stats, loading } = useGithubStats();
    const rabbitHoles = HERO_DATA.RABBIT_HOLES.length;
    const [showTerminal, setShowTerminal] = useState(false);
    
    return (
        <>
            <motion.div 
                className="mt-8 flex justify-center gap-6 md:gap-10 flex-wrap"
                variants={itemVariants}
                custom={0.5}
            >
                <AnimatedCounter 
                    value={stats.repos} 
                    label="Repos" 
                    loading={loading} 
                    showLive
                />
                <AnimatedCounter 
                    value={stats.followers} 
                    label="Followers" 
                    loading={loading} 
                    showLive
                />
                <motion.div 
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => setShowTerminal(!showTerminal)}
                    whileHover={{ scale: 1.05 }}
                >
                    <AnimatedCounter 
                        value={rabbitHoles} 
                        label="Rabbit Holes" 
                        loading={false}
                        highlight
                    />
                </motion.div>
            </motion.div>

            {/* Rabbit Holes Graph */}
            <AnimatePresence>
                {showTerminal && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="mt-4 max-w-sm mx-auto"
                    >
                        <RabbitHolesGraph />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

function Hero() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section
            id="hero"
            className="min-h-screen py-20 px-4 bg-transparent dark:bg-black/30 transition-colors duration-500 relative overflow-hidden flex items-center"
        >
            {/* Ambient Float Container */}
            <motion.div
                className="relative z-0 w-full"
                animate={{ 
                    y: [-5, 5, -5],
                    rotate: [-0.5, 0.5, -0.5]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Background Glow */}
                {!shouldReduceMotion && (
                    <motion.div 
                        className="absolute w-60 h-60 md:w-80 md:h-80 bg-teal-500/20 dark:bg-teal-400/10 rounded-full blur-3xl will-change-transform -top-20 -left-20 md:-left-40"
                        animate={{ 
                            opacity: [0.1, 0.3, 0.1], 
                            scale: [1, 1.2, 1], 
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                )}
                
                {/* Grid Layout - Centered */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-6xl mx-auto items-center">
                    {/* Left Column: Profile Frame */}
                    <motion.div
                        variants={itemVariants}
                        custom={0.1}
                        className="order-1 md:order-1"
                    >
                        <ProfileFrame />
                    </motion.div>

                    {/* Right Column: Bio & Stats */}
                    <motion.div
                        className="order-2 md:order-2 text-center md:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Name - Simple, no wave animation */}
                        <motion.h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white whitespace-nowrap md:whitespace-normal"
                            variants={itemVariants}
                            custom={0.0}
                        >
                            {HERO_DATA.NAME}
                        </motion.h1>

                        <motion.h2
                            className="mt-2 text-xl md:text-2xl lg:text-3xl font-bold text-teal-600 dark:text-teal-400 transition-colors duration-500"
                            variants={itemVariants} 
                            custom={0.2}
                        >
                            {HERO_DATA.TITLE}
                        </motion.h2>

                        <motion.p
                            className="mt-4 text-base md:text-lg max-w-xl text-gray-600 dark:text-gray-300 font-light transition-colors duration-500 mx-auto md:mx-0"
                            variants={itemVariants} 
                            custom={0.3}
                        >
                            {HERO_DATA.DESCRIPTION}
                        </motion.p>

                        <GitHubStatsPulse />

                        <TelemetryBar />

                        <TerminalFeed />

                        {/* Action Buttons */}
                        <motion.div
                            className="mt-8 flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4"
                            variants={itemVariants}
                            custom={0.7}
                        >
                            <motion.a 
                                href="#projects"
                                className="px-8 py-3 rounded-full text-white font-semibold transition-all duration-300
                                           bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl active:scale-95 whitespace-nowrap
                                           inline-flex items-center justify-center gap-2"
                                style={{ boxShadow: '0 0 20px oklch(60% 0.2 170 / 0.3)' }}
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: '0 0 40px oklch(60% 0.2 170 / 0.5)'
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Projects <ArrowRight size={20} />
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div 
                            className="mt-6 flex justify-center md:justify-start gap-6"
                            variants={itemVariants}
                            custom={0.8}
                        >
                            {HERO_DATA.LINKS.map((link) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400
                                               transition-colors duration-300 font-mono"
                                    whileHover={{ 
                                        textShadow: "0 0 8px oklch(70% 0.05 265 / 0.5)",
                                    }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

export default memo(Hero);