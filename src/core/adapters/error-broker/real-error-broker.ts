import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

import type { ErrorBrokerAdapter } from './types.js';

const errorBrokerAdapter: ErrorBrokerAdapter = () => ({
  badUserInput: (message: string) => {
    return new GraphQLError(message, {
      extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
    });
  },
  internalServerError: (message: string) => {
    return new GraphQLError(message, {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    });
  },
  databaseError: (message: string) => {
    return new GraphQLError(message, {
      extensions: { code: 'DATABASE-ERROR' },
    });
  },
  fetchingError: (message: string) => {
    return new GraphQLError(message, {
      extensions: { code: 'FETCHING-ERROR' },
    });
  },
  validationError: (message: string) => {
    return new GraphQLError(message, {
      extensions: { code: 'VALIDATION-ERROR' },
    });
  },
});

export { errorBrokerAdapter };
