import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import type { Deps } from './types.js';

import { loadSchemas } from './schemas/load-schemas.js';

const getServer = (deps: Deps) => {
  const { typeDefs, resolvers } = loadSchemas(deps);

  const server = new ApolloServer({
    formatError: ({ message, extensions: { code } }) => ({
      message,
      code,
    }),
    typeDefs,
    resolvers,
  });

  return server;
};

const startServer = async (deps: Deps) => {
  const server = getServer(deps);

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(deps.config.port) },
  });

  return { server, url };
};

export { startServer, getServer };
