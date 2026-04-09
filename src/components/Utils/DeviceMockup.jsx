import React, { memo } from 'react';
import { motion } from 'framer-motion';

const DeviceMockup = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`relative mx-auto ${className}`}
      style={{
        width: '320px',
        height: '640px',
        borderRadius: '40px',
        border: '12px solid #1a1a1a',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        background: '#000',
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Notch */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1a1a1a] rounded-b-2xl z-20"
      />
      
      {/* Screen */}
      <div
        className="w-full h-full bg-white dark:bg-gray-900 overflow-hidden"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default memo(DeviceMockup);