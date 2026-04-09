import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const SYSTEM_DATA = [
    { label: 'UPTIME', value: () => formatUptime() },
    { label: 'CACHE', value: () => getCacheStatus() },
    { label: 'SYNC', value: () => getSyncStatus() },
    { label: 'MEM', value: () => getMemoryUsage() },
];

const formatUptime = () => {
    const seconds = Math.floor((Date.now() - window.performance?.timing?.navigationStart || Date.now() - 1000000) / 1000);
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
};

const getCacheStatus = () => {
    const cached = localStorage.getItem('github_stats_cache');
    return cached ? 'HIT' : 'MISS';
};

const getSyncStatus = () => Math.random() > 0.1 ? 'SYNCED' : 'PENDING';

const getMemoryUsage = () => {
    if (!performance.memory) return '64MB';
    const mb = Math.round(performance.memory.usedJSHeapSize / 1048576);
    return `${Math.min(mb, 128)}MB`;
};

export const TelemetryBar = () => {
    const [data, setData] = useState(SYSTEM_DATA.map(d => ({ ...d, current: d.value() })));
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                const next = [...prev];
                const idx = Math.floor(Math.random() * next.length);
                next[idx] = { ...next[idx], current: next[idx].value() };
                setActiveIndex(idx);
                return next;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="mt-4 flex justify-center items-center gap-2 font-mono text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
        >
            <div className="flex items-center gap-1 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>SYS</span>
            </div>
            
            <div className="flex gap-2 overflow-hidden">
                {data.map((item, index) => (
                    <motion.span
                        key={item.label}
                        className={`px-2 py-1 rounded text-xs font-mono ${
                            index === activeIndex 
                                ? 'bg-cyan-500/20 text-cyan-300' 
                                : 'bg-transparent text-gray-500 dark:text-gray-500'
                        }`}
                    >
                        <span className="text-gray-400 mr-1">{item.label}:</span>
                        <span className="text-cyan-400">{item.current}</span>
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
};

export default TelemetryBar;