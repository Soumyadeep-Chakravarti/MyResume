//src/components/LandingFeatures/Features.jsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import IconGrid from '../IconGrid/IconGrid.jsx'

// Import icon grids
import { SYSTEM_PROGRAMMING_ICONS } from '../IconGrid/SystemProgrammingIcons';
import { AI_ICONS } from '../IconGrid/AiIcons';
import { OPEN_SOURCE_ICONS } from '../IconGrid/OpenSourceIcons';
import { PROBLEM_SOLVING_ICONS } from '../IconGrid/ProblemSolvingIcons';
import { CROSS_PLATFORM_ICONS } from '../IconGrid/CrossPlatformIcons';
import { CONTINUOUS_LEARNING_ICONS } from '../IconGrid/ContinuousLearningIcons';

// Import descriptions
import SystemProgrammingDescription from './descriptions/SystemProgrammingDescription';
import AiAndDataDrivenDevelopmentDescription from './descriptions/AiAndDataDrivenDevelopmentDescription';
import OpenSourceAndDocumentationDescritpion from './descriptions/OpenSourceAndDocumentationDescritpion';
import ProblemSolvingAndArchitectureDescription from './descriptions/ProblemSolvingAndArchitectureDescription';
import CrossPlatformAndLinuxExpertiseDescription from './descriptions/CrossPlatformAndLinuxExpertiseDescription';
import ContinuousLearningAndInnovationDescription from './descriptions/ContinuousLearningAndInnovationDescription';

const Features = () => {
  const features = [
    {
      icons: SYSTEM_PROGRAMMING_ICONS,
      title: 'Systems Programming',
      description: <SystemProgrammingDescription />,
    },
    {
      icons: AI_ICONS,
      title: 'AI & Data-Driven Development',
      description: <AiAndDataDrivenDevelopmentDescription />,
    },
    {
      icons: OPEN_SOURCE_ICONS,
      title: 'Open Source & Description',
      description: <OpenSourceAndDocumentationDescritpion />,
    },
    {
      icons: PROBLEM_SOLVING_ICONS,
      title: 'Problem Solving & Architecture',
      description: <ProblemSolvingAndArchitectureDescription />,
    },
    {
      icons: CROSS_PLATFORM_ICONS,
      title: 'Cross Platform & Linux Expertise',
      description: <ContinuousLearningAndInnovationDescription />
    },
    {
      icons: CONTINUOUS_LEARNING_ICONS,
      title: 'Continuous Learning & Innovation',
      description: <ContinuousLearningAndInnovationDescription />,
    },
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 md:px-8 bg-background text-text-primary">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          Powerful Features for You
        </motion.h2>
        <motion.p
          className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          variants={textVariants}
        >
          Explore what makes our platform stand out and how it can benefit your daily tasks.
        </motion.p>

        <div className="flex flex-col gap-32">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.9, 1, 1, 0.9]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    index % 2 === 0 ? [-300, 0, 0, 300] : [300, 0, 0, -300]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale, x }}
      className="bg-card-background p-8 rounded-xl shadow-lg border border-border-color/50 flex flex-col items-center text-center group transition-all duration-300 hover:shadow-xl hover:scale-[1.02] max-w-2xl mx-auto"
    >
      <IconGrid icons={feature.icons} size={28} showLabels={false} />
      <h3 className="text-2xl font-semibold text-text-primary mb-3">{feature.title}</h3>
      {feature.description}
    </motion.div>
  );
};

export default Features;
