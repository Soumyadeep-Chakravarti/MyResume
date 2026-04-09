// Logger utility for consistent logging
// In production, these can be routed to a logging service

const isDev = import.meta.env.DEV;

export const logger = {
  info: (message, ...args) => {
    if (isDev) console.log(`[INFO] ${message}`, ...args);
  },
  error: (message, ...args) => {
    if (isDev) console.error(`[ERROR] ${message}`, ...args);
  },
  warn: (message, ...args) => {
    if (isDev) console.warn(`[WARN] ${message}`, ...args);
  },
};

export default logger;