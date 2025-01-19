import type { ErrorBrokerAdapter } from './types.js';

const errorBrokerAdapter: ErrorBrokerAdapter = () => ({
  badUserInput: () => {},
  internalServerError: () => {},
  databaseError: () => {},
  fetchingError: () => {},
  validationError: () => {},
});

export { errorBrokerAdapter };
