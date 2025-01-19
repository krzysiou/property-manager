type ErrorBroker = {
  badUserInput: (message: string) => void;
  internalServerError: (message: string) => void;
  databaseError: (message: string) => void;
  fetchingError: (message: string) => void;
  validationError: (message: string) => void;
};

type ErrorBrokerAdapter = () => ErrorBroker;

export type { ErrorBrokerAdapter, ErrorBroker };
