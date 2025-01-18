import type { LoggerAdapter } from './types';

const loggerAdapter: LoggerAdapter = () => ({
  info: (message: string) => console.info(message),
  warn: (message: string) => console.warn(message),
  error: (message: string) => console.error(message),
});

export { loggerAdapter };
