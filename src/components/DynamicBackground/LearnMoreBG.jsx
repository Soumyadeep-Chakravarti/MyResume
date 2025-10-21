// src/components/DynamicBackgrounds/LearnMoreBG.jsx
import React, { useRef, useEffect } from 'react';
import './LearnMoreBG.css';

const FluidAnimationBackground = ({ isDarkMode }) => {
    const canvasRef = useRef(null);
    const animationFrameId = useRef(null);
    const particles = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;

        const numParticles = 20; // further reduced
        const maxSpeed = 0.2; // smoother movement

        class Particle {
            constructor(x, y, radius, color) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;
                this.vx = (Math.random() - 0.5) * maxSpeed;
                this.vy = (Math.random() - 0.5) * maxSpeed;
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
                if (this.x + this.radius > width || this.x - this.radius < 0) this.vx *= -1;
                if (this.y + this.radius > height || this.y - this.radius < 0) this.vy *= -1;
            }
        }

        const initParticles = () => {
            particles.current = [];
            const colors = isDarkMode
                ? ['rgba(128,149,255,0.25)', 'rgba(255,204,153,0.25)', 'rgba(255,215,0,0.25)']
                : ['rgba(135,206,250,0.25)', 'rgba(255,140,0,0.25)', 'rgba(255,215,0,0.25)'];

            for (let i = 0; i < numParticles; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const radius = Math.random() * 20 + 10;
                const color = colors[Math.floor(Math.random() * colors.length)];
                particles.current.push(new Particle(x, y, radius, color));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height); // just clear, CSS handles background color
            for (const p of particles.current) {
                p.update();
                p.draw();
            }
            animationFrameId.current = requestAnimationFrame(animate);
        };

        const resizeObserver = new ResizeObserver(() => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        });
        resizeObserver.observe(canvas);

        canvas.width = width;
        canvas.height = height;
        initParticles();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId.current);
            resizeObserver.disconnect();
        };
    }, [isDarkMode]);

    return (
        <>
            <div className="animated-gradient-bg" /> {/* CSS handles the gradient */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-0 opacity-70"
            />
        </>
    );
};

export default FluidAnimationBackground;

