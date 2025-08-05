// src/components/Backgrounds/FluidAnimationBackground.jsx
import React, { useRef, useEffect } from 'react';

const FluidAnimationBackground = ({ isDarkMode }) => {
    const canvasRef = useRef(null);
    const animationFrameId = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        const particles = [];
        const numParticles = 30; // Optimized number of particles for performance

        // Function to set canvas dimensions based on parent
        const setCanvasSize = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        };

        // Particle class for the fluid effect
        class Particle {
            constructor(x, y, radius, color) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;
                this.vx = (Math.random() - 0.5) * 0.3; // Slower movement
                this.vy = (Math.random() - 0.5) * 0.3; // Slower movement
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x + this.radius > width || this.x - this.radius < 0) {
                    this.vx *= -1;
                }
                if (this.y + this.radius > height || this.y - this.radius < 0) {
                    this.vy *= -1;
                }

                // Add a slight random nudge for more fluid motion
                this.vx += (Math.random() - 0.5) * 0.005; // Even smaller nudge
                this.vy += (Math.random() - 0.5) * 0.005;

                // Clamp velocity to prevent particles from going too fast
                const maxSpeed = 0.5; // Reduced max speed
                this.vx = Math.max(-maxSpeed, Math.min(maxSpeed, this.vx));
                this.vy = Math.max(-maxSpeed, Math.min(maxSpeed, this.vy));
            }
        }

        // Initialize particles based on theme
        const initParticles = () => {
            particles.length = 0; // Clear existing particles

            // Define RGBA colors for light and dark modes
            // These are adjusted to be more visible and distinct in light mode
            const lightModeColors = [
                'rgba(135, 206, 250, 0.3)',   // Sky Blue (more visible on light)
                'rgba(255, 140, 0, 0.3)',     // Dark Orange (more visible on light)
                'rgba(255, 215, 0, 0.3)'      // Gold (more visible on light)
            ];
            const darkModeColors = [
                'rgba(128, 149, 255, 0.3)',  // Approximate Primary (dark mode)
                'rgba(255, 204, 153, 0.3)',  // Approximate Secondary (dark mode)
                'rgba(255, 215, 0, 0.3)'     // Approximate Accent (dark mode)
            ];

            const currentColors = isDarkMode ? darkModeColors : lightModeColors;

            for (let i = 0; i < numParticles; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const radius = Math.random() * 20 + 15; // Random radius between 15 and 35
                const color = currentColors[Math.floor(Math.random() * currentColors.length)];
                particles.push(new Particle(x, y, radius, color));
            }

            // Initial solid fill of the canvas based on mode to ensure correct starting background
            ctx.fillStyle = isDarkMode ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)'; // Solid fill initially
            ctx.fillRect(0, 0, width, height);
        };

        // Animation loop
        const animate = () => {
            // Draw a semi-transparent rectangle for the "trailing" effect,
            // color depends on the current theme.
            ctx.fillStyle = isDarkMode ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.15)'; // Increased alpha for light mode to clear better
            ctx.fillRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        // Set initial size and start animation
        setCanvasSize();
        initParticles(); // This will now also do an initial fill
        animate();

        // Handle resize events
        const resizeObserver = new ResizeObserver(() => {
            setCanvasSize();
            initParticles(); // Re-initialize particles on resize to distribute them correctly
        });
        resizeObserver.observe(canvas);

        // Cleanup function
        return () => {
            cancelAnimationFrame(animationFrameId.current);
            resizeObserver.disconnect();
        };
    }, [isDarkMode]); // Re-run effect when isDarkMode changes to update colors and re-init particles

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0 filter blur-2xl opacity-70" // CSS blur and opacity
        ></canvas>
    );
};

export default FluidAnimationBackground;
