import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const ScenePlaza = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const sceneRef = React.useRef(null);

  // Calculate this scene's scroll progress (fourth scene: 0.6-0.8 of total)
  const sceneStart = 0.6;
  const sceneEnd = 0.8;
  const sceneProgress = useTransform(
    scrollYProgress,
    [sceneStart, sceneEnd],
    [0, 1]
  );

  // Depth effects
  const translateZ = useTransform(sceneProgress, [0, 1], [-200, 0]);
  const scale = useTransform(sceneProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(sceneProgress, [0, 1], [0, 1]);

  // Placeholder projects data (in real implementation, fetch from GitHub API)
  const projects = [
    { title: "Project 1", description: "A remarkable creation", link: "#" },
    { title: "Project 2", description: "Built with passion", link: "#" },
    { title: "Project 3", description: "Innovation meets design", link: "#" },
    { title: "Project 4", description: "Solving real problems", link: "#" },
    { title: "Project 5", description: "Clean and efficient", link: "#" },
    { title: "Project 6", description: "User-focused solution", link: "#" },
  ];

  // Pedestal rise animation
  const getPedestalY = (index) => {
    return useTransform(
      sceneProgress,
      [
        0.2 + (index / projects.length) * 0.4,
        0.2 + ((index + 1) / projects.length) * 0.4,
      ],
      [300, 0]
    );
  };

  return (
    <section
      ref={sceneRef}
      className="sticky top-0 flex items-center justify-center overflow-hidden"
      style={{ height: "100vh", willChange: "transform" }}
    >
      {/* Background layer - Central plaza */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-amber-900 via-orange-900 to-red-900"
        style={{
          opacity: 0.8,
          willChange: "transform",
        }}
      >
        {/* Plaza circular pattern */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] opacity-20">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <circle
              cx="200"
              cy="200"
              r="180"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
            />
            <circle
              cx="200"
              cy="200"
              r="120"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1"
            />
            <circle
              cx="200"
              cy="200"
              r="60"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1"
            />
          </svg>
        </div>
      </motion.div>

      {/* Main content layer - Project Relics on Pedestals */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-8"
        style={{
          translateZ: translateZ,
          scale: scale,
          opacity: opacity,
          willChange: "transform",
        }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-amber-400"
          style={{ textShadow: "0 0 30px rgba(245, 158, 11, 0.8)" }}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          The Central Plaza
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const pedestalY = getPedestalY(index);
            const cardTilt = useTransform(
              sceneProgress,
              [0.5 + index * 0.05, 0.7 + index * 0.05],
              [0, -5]
            );

            return (
              <motion.div
                key={project.title}
                className="relative flex flex-col items-center"
                style={{
                  y: pedestalY,
                  rotateX: cardTilt,
                  willChange: "transform",
                }}
              >
                {/* Pedestal */}
                <motion.div
                  className="w-32 h-32 bg-gradient-to-t from-gray-800 via-gray-700 to-gray-600 
                             rounded-t-lg border-2 border-amber-400/50 shadow-xl
                             relative overflow-hidden"
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Pedestal glow */}
                  <motion.div
                    className="absolute inset-0 bg-amber-400/20 rounded-t-lg"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      boxShadow: [
                        "inset 0 0 20px rgba(245, 158, 11, 0.3)",
                        "inset 0 0 40px rgba(245, 158, 11, 0.6)",
                        "inset 0 0 20px rgba(245, 158, 11, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                {/* Project Relic Card */}
                <motion.div
                  className="relative -mt-16 w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black 
                             p-6 rounded-lg border-2 border-amber-400/50 shadow-2xl
                             group cursor-pointer"
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{
                    rotateX: -10,
                    rotateY: 5,
                    y: -10,
                    scale: 1.05,
                    borderColor: "rgba(245, 158, 11, 1)",
                    boxShadow:
                      "0 30px 60px rgba(245, 158, 11, 0.4), inset 0 0 50px rgba(245, 158, 11, 0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() =>
                    project.link !== "#" && window.open(project.link, "_blank")
                  }
                >
                  {/* Card glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <h3 className="text-xl font-bold text-amber-400 mb-2 relative z-10">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm relative z-10">
                    {project.description}
                  </p>

                  {/* Glowing corner accent */}
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.5, 1],
                      boxShadow: [
                        "0 0 5px rgba(245, 158, 11, 0.5)",
                        "0 0 15px rgba(245, 158, 11, 0.8)",
                        "0 0 5px rgba(245, 158, 11, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Foreground layer - Atmospheric effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.3,
          willChange: "transform",
        }}
      >
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-15, -60, -105],
              opacity: [0.3, 0.7, 0],
              scale: [1, 1.5, 2],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default ScenePlaza;
