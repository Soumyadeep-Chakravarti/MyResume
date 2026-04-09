import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const RABBIT_NODES = [
    { id: 'Arch', x: 0, y: 0, connections: ['Kernel', 'Linux', 'Bash'] },
    { id: 'Kernel', x: 80, y: -60, connections: ['Arch', 'C'] },
    { id: 'Linux', x: 90, y: 40, connections: ['Arch', 'Proxmox'] },
    { id: 'C', x: 140, y: -30, connections: ['Kernel', 'Rust'] },
    { id: 'Rust', x: 180, y: 20, connections: ['C', 'Systems'] },
    { id: 'Proxmox', x: 160, y: 80, connections: ['Linux', 'KVM'] },
    { id: 'KVM', x: 220, y: 70, connections: ['Proxmox'] },
    { id: 'Systems', x: 240, y: -20, connections: ['Rust'] },
    { id: 'Drift', x: 50, y: 120, connections: ['Physics'] },
    { id: 'Physics', x: 100, y: 150, connections: ['Drift'] },
    { id: 'Cybersec', x: -60, y: 80, connections: ['Network'] },
    { id: 'Network', x: -20, y: 130, connections: ['Cybersec'] },
    { id: 'Bash', x: 30, y: -80, connections: ['Arch', 'Linux'] },
];

export const RabbitHolesGraph = () => {
    const [nodes, setNodes] = useState(RABBIT_NODES);
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let animationFrame;
        
        const animate = () => {
            setNodes(prev => prev.map(node => {
                const dx = node.x - mousePos.x;
                const dy = node.y - mousePos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150 && dist > 0) {
                    const force = (150 - dist) / 150;
                    const pushX = (dx / dist) * force * 5;
                    const pushY = (dy / dist) * force * 5;
                    return { ...node, x: node.x + pushX, y: node.y + pushY };
                }
                
                const targetX = RABBIT_NODES.find(n => n.id === node.id)?.x || node.x;
                const targetY = RABBIT_NODES.find(n => n.id === node.id)?.y || node.y;
                return {
                    ...node,
                    x: node.x + (targetX - node.x) * 0.05,
                    y: node.y + (targetY - node.y) * 0.05,
                };
            }));
            animationFrame = requestAnimationFrame(animate);
        };
        
        animate();
        return () => cancelAnimationFrame(animationFrame);
    }, [mousePos]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left - rect.width / 2,
            y: e.clientY - rect.top - rect.height / 2,
        });
    };

    return (
        <motion.div
            ref={containerRef}
            className="relative w-full h-64 overflow-hidden bg-black/50 dark:bg-black/80 rounded-lg cursor-move"
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            <svg className="w-full h-full">
                {nodes.map(node => 
                    node.connections?.map(targetId => {
                        const target = nodes.find(n => n.id === targetId);
                        if (!target) return null;
                        return (
                            <line
                                key={`${node.id}-${targetId}`}
                                x1={node.x + 150}
                                y1={node.y + 64}
                                x2={target.x + 150}
                                y2={target.y + 64}
                                stroke="rgba(6, 182, 212, 0.3)"
                                strokeWidth="1"
                            />
                        );
                    })
                )}
            </svg>
            
            {nodes.map(node => (
                <motion.div
                    key={node.id}
                    className="absolute text-xs font-mono px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 cursor-pointer hover:bg-cyan-500/40"
                    style={{
                        left: node.x + 150,
                        top: node.y + 64,
                        x: '-50%',
                        y: '-50%',
                    }}
                    whileHover={{ scale: 1.2 }}
                    animate={{
                        x: node.x,
                        y: node.y,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                    {node.id}
                </motion.div>
            ))}
            
            <div className="absolute bottom-2 right-2 text-xs text-gray-500 font-mono">
                Interactive // Drag to disturb
            </div>
        </motion.div>
    );
};

export default RabbitHolesGraph;