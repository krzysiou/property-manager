type Logger = {
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
};

type LoggerAdapter = () => Logger;

export type { LoggerAdapter, Logger };
