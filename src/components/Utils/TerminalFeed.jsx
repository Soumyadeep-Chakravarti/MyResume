import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const TERMINAL_LOGS = [
    { cmd: 'FETCH_REPO_DATA', status: 'OK' },
    { cmd: 'INIT_KERNEL', status: 'OK' },
    { cmd: 'VERIFY_CERTIFICATES', status: 'OK' },
    { cmd: 'LOAD_MODULES', status: 'OK' },
    { cmd: 'MOUNT_STORAGE', status: 'OK' },
    { cmd: 'SYNC_DNS', status: 'OK' },
    { cmd: 'CHECK_DEPENDENCIES', status: 'OK' },
    { cmd: 'VERIFY_SIGNATURES', status: 'OK' },
    { cmd: 'LOAD_BALANCER', status: 'OK' },
    { cmd: 'INIT_CACHE', status: 'OK' },
    { cmd: 'VERIFY_FIRMWARE', status: 'OK' },
    { cmd: 'LOAD_TERMINAL', status: 'OK' },
    { cmd: 'MOUNT_PROC', status: 'OK' },
    { cmd: 'VERIFY_STACK', status: 'OK' },
    { cmd: 'INIT_SECURITY', status: 'OK' },
    { cmd: 'LOAD_DRIVERS', status: 'OK' },
    { cmd: 'KERNEL_STABLE', status: 'OK' },
    { cmd: 'VERIFY_MODULES', status: 'OK' },
    { cmd: 'INIT_NETWORK', status: 'OK' },
    { cmd: 'CHECK_PERMS', status: 'OK' },
];

export const TerminalFeed = () => {
    const [logs, setLogs] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setLogs(prev => {
                const newLog = TERMINAL_LOGS[Math.floor(Math.random() * TERMINAL_LOGS.length)];
                const time = new Date().toLocaleTimeString('en-US', { 
                    hour12: false, 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit' 
                });
                return [...prev.slice(-8), { ...newLog, time }].slice(-8);
            });
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="mt-4 p-3 bg-black dark:bg-black rounded-lg border border-cyan-500/30 font-mono text-xs max-w-sm overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-cyan-500/30">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-400 text-xs uppercase tracking-wider">System Log</span>
            </div>
            
            <div ref={containerRef} className="space-y-1 max-h-32 overflow-y-auto">
                {logs.map((log, index) => (
                    <motion.div
                        key={`${log.time}-${index}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-xs"
                    >
                        <span className="text-gray-500">[{log.time}]</span>
                        <span className="text-gray-400">{log.cmd}</span>
                        <span className={`${log.status === 'OK' ? 'text-green-500' : 'text-red-500'}`}>
                            [{log.status}]
                        </span>
                    </motion.div>
                ))}
                {logs.length === 0 && (
                    <span className="text-gray-600 text-xs">Initializing...</span>
                )}
            </div>
        </motion.div>
    );
};

export default TerminalFeed;