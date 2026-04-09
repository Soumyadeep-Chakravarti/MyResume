import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export const AnimatedCounter = ({ value, label, loading = false, highlight = false, showLive = false }) => {
  const springValue = useSpring(0, { stiffness: 50, damping: 20, easing: (t) => 1 - Math.pow(1 - t, 3) });
  const displayValue = useTransform(springValue, (val) => Math.round(val));
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!loading && value > 0) {
      springValue.set(value);
    }
  }, [value, loading, springValue]);

  useEffect(() => {
    const unsubscribe = displayValue.on('change', (latest) => {
      setDisplay(latest);
    });
    return unsubscribe;
  }, [displayValue]);

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-12 h-8 bg-silver/30 animate-pulse rounded" />
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</span>
      </div>
    );
  }

  return (
    <motion.div 
      className="flex flex-col items-center cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <motion.span 
          className={`text-3xl font-bold font-mono ${highlight ? 'text-yellow-500' : 'text-teal-600 dark:text-teal-400'}`}
          style={highlight ? { textShadow: '0 0 20px oklch(70% 0.15 50 / 0.5)' } : { textShadow: '0 0 20px oklch(70% 0.05 265 / 0.3)' }}
        >
          {display}
        </motion.span>
        {showLive && (
          <motion.span 
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</span>
    </motion.div>
  );
};

export default AnimatedCounter;