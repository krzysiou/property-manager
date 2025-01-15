import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import type { Context } from './types.js';

import { getConfig } from '../config/get-config.js';
import { getSchemas } from './get-schemas.js';
import { formatError } from './format-error.js';

const config = getConfig();

const { typeDefs, resolvers } = getSchemas();

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  formatError,
});

const startServer = async () =>
  await startStandaloneServer(server, {
    listen: { port: Number(config.port) },
    context: async () => ({
      config,
    }),
  });

export { startServer };
