type ErrorBroker = {
  throwBadUserInput: (message: string) => void;
  throwInternalServerError: (message: string) => void;
  throwDatabaseError: (message: string) => void;
  throwFetchingError: (message: string) => void;
  throwValidationError: (message: string) => void;
};

type ErrorBrokerAdapter = () => ErrorBroker;

export type { ErrorBrokerAdapter, ErrorBroker };
