import type { ErrorBrokerAdapter } from './types.js';

const errorBrokerAdapter: ErrorBrokerAdapter = () => ({
  throwBadUserInput: () => {},
  throwInternalServerError: () => {},
  throwDatabaseError: () => {},
  throwFetchingError: () => {},
  throwValidationError: () => {},
});

export { errorBrokerAdapter };
