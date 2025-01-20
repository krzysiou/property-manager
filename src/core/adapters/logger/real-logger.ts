import type { LoggerAdapter } from './types.js';

const loggerAdapter: LoggerAdapter = () => ({
  info: (payload) => console.info(payload),
  warn: (payload) => console.warn(payload),
  error: (payload) => console.error(payload),
});

export { loggerAdapter };
