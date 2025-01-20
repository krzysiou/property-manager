type Logger = {
  info: (payload: string | object) => void;
  warn: (payload: string | object) => void;
  error: (payload: string | object) => void;
};

type LoggerAdapter = () => Logger;

export type { LoggerAdapter, Logger };
