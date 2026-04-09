import { memo, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Terminal, Database, GitBranch, Zap, HardDrive, Clock, Activity } from 'lucide-react';

const PROFICIENCY_TIERS = {
    'Expert': { level: 'L3', verb: 'Kernel/Core', desc: 'Deep-level tinkering with the metal.' },
    'Intermediate': { level: 'L2', verb: 'Hardened', desc: 'Optimizing performance and security.' },
    'Familiar': { level: 'L1', verb: 'Operational', desc: 'Building features in production.' },
    'Learning': { level: 'L0', verb: 'Watching', desc: 'Currently studying the docs.' },
    'Niche': { level: 'L3', verb: 'Specialized', desc: 'Black-box expert only I understand.' },
};

const FIELD_NOTES = {
    'JavaScript': 'Closure prototypes, event loop debugging, and fighting V8 garbage collector.',
    'TypeScript': 'Generic constraints that shouldn’t exist, strict mode martyr.',
    'Python': 'GIL workarounds, NumPy vectorization, and subprocess management.',
    'C': 'Manual memory management, RAII patterns, and fighting linker errors.',
    'Rust': 'Borrow checker loses, fighting the borrow checker, winning the borrow checker.',
    'React': 'Virtual DOM diffing, custom hook addiction, and Context API tragedy.',
    'Linux': 'Custom kernel compilation, window manager ricing, and systemd issues.',
    'Docker': 'Layer caching, multi-stage builds, and container orchestration wars.',
    'Arch Linux': 'Custom kernel compilation, AUR helper addiction, BTW I use btwd.',
    'Proxmox': 'Nested VM hell, cluster management, and PCI passthrough struggles.',
    'Git': 'Rebase hell, merge conflicts, and force pushes I\'ll regret.',
    'HTML & CSS': 'Flexbox is magic until it isn’t. CSS war crimes committed daily.',
};

const UPCOME_YEARS = 2025;

const SkillDetailPanel = ({ skill, onClose }) => {
    const proficiency = PROFICIENCY_TIERS[skill.level] || PROFICIENCY_TIERS['Familiar'];
    const fieldNote = FIELD_NOTES[skill.name] || 'No field notes yet. Will document after next incident.';
    
    const [latency] = useState(() => Math.floor(Math.random() * 60 + 10));
    const [uptime] = useState(() => new Date().getFullYear() - UPCOME_YEARS);
    const lastDeploy = useMemo(() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[Math.floor(Math.random() * 12)];
        const year = 2020 + Math.floor(Math.random() * 5);
        return `${month} ${year}`;
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden border border-gray-200 dark:border-cyan-500/30 shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-cyan-500/20">
                            <skill.icon className="w-6 h-6 text-cyan-400" style={{ color: skill.color }} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{skill.name}</h3>
                            <span className="text-sm font-mono text-cyan-500">[{proficiency.level}] {proficiency.verb}</span>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* System Stats Grid */}
                <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatBox icon={Clock} label="Uptime" value={`${uptime}y`} />
                    <StatBox icon={HardDrive} label="Last Deploy" value={lastDeploy} />
                    <StatBox icon={Activity} label="Latency" value={`${latency}ms`} glow />
                    <StatBox icon={Zap} label="Tier" value={proficiency.level} />
                </div>

                {/* Field Notes */}
                <div className="px-6 pb-6">
                    <div className="p-4 bg-gray-50 dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2 mb-3">
                            <Terminal size={14} className="text-yellow-500" />
                            <span className="text-xs font-mono text-gray-500 uppercase">Field Notes</span>
                        </div>
                        <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                            {fieldNote}
                        </p>
                    </div>
                </div>

                {/* Related Deployments */}
                <div className="px-6 pb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <GitBranch size={14} className="text-cyan-500" />
                        <span className="text-xs font-mono text-gray-500 uppercase">Related Deployments</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-800 rounded">
                            Project COBALT
                        </span>
                        <span className="px-3 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-800 rounded">
                            Game Engine
                        </span>
                    </div>
                </div>

                {/* Hardware Targets */}
                {['C', 'Embedded C'].includes(skill.name) && (
                    <div className="px-6 pb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Cpu size={14} className="text-green-500" />
                            <span className="text-xs font-mono text-gray-500 uppercase">Hardware Targets</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <HardwareChip label="STM32" />
                            <HardwareChip label="ESP32" />
                            <HardwareChip label="AVR" />
                            <HardwareChip label="RP2040" />
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

const StatBox = ({ icon: Icon, label, value, glow }) => (
    <div className="p-3 bg-gray-50 dark:bg-black rounded-lg text-center border border-gray-200 dark:border-gray-800">
        <Icon size={14} className={`mx-auto mb-1 ${glow ? 'text-cyan-400' : 'text-gray-400'}`} />
        <span className="text-xs font-mono text-gray-500 uppercase block">{label}</span>
        <span className={`text-sm font-bold font-mono ${glow ? 'text-cyan-400' : 'text-gray-900 dark:text-white'}`}>
            {value}
        </span>
    </div>
);

const HardwareChip = ({ label }) => (
    <span className="px-2 py-1 text-xs font-mono bg-green-500/10 text-green-500 rounded border border-green-500/30">
        {label}
    </span>
);

export default SkillDetailPanel;