import type { LoggerAdapter } from './types.js';

const loggerAdapter: LoggerAdapter = () => ({
  info: () => {},
  warn: () => {},
  error: () => {},
});

export { loggerAdapter };
