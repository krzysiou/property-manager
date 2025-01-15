import type { GraphQLFormattedError } from 'graphql';

const formatError = (formattedError: GraphQLFormattedError) => {
  const {
    message,
    extensions: { code },
  } = formattedError;

  return { code, message };
};

export { formatError };
