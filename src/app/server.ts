import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import type { Deps } from './types.js';

import { loadSchemas } from './schemas/load-schemas.js';

const startServer = async (deps: Deps) => {
  const { typeDefs, resolvers } = loadSchemas(deps);

  const server = new ApolloServer({
    formatError: ({ message, extensions: { code } }) => ({
      message,
      code,
    }),
    typeDefs,
    resolvers,
  });

  return await startStandaloneServer(server, {
    listen: { port: Number(deps.config.port) },
  });
};

export { startServer };
