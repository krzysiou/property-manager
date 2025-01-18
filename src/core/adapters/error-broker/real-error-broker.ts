import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

import type { ErrorBrokerAdapter } from './types.js';

const errorBrokerAdapter: ErrorBrokerAdapter = () => ({
  throwBadUserInput: (message: string) => {
    throw new GraphQLError(message, {
      extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
    });
  },
  throwInternalServerError: (message: string) => {
    throw new GraphQLError(message, {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    });
  },
  throwDatabaseError: (message: string) => {
    throw new GraphQLError(message, {
      extensions: { code: 'DATABASE-ERROR' },
    });
  },
  throwFetchingError: (message: string) => {
    throw new GraphQLError(message, {
      extensions: { code: 'FETCHING-ERROR' },
    });
  },
  throwValidationError: (message: string) => {
    throw new GraphQLError(message, {
      extensions: { code: 'VALIDATION-ERROR' },
    });
  },
});

export { errorBrokerAdapter };
