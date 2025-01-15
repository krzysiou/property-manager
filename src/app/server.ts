import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import type { Context } from './types.js';

import { getConfig } from '../config/get-config.js';
import { parseSchemas } from './parse-schemas.js';
import { mountedSchemas } from './mounted-schemas.js';

const config = getConfig();

const { typeDefs, resolvers } = parseSchemas(mountedSchemas);

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const startServer = async () =>
  await startStandaloneServer(server, {
    listen: { port: Number(config.port) },
    context: async () => ({
      config,
    }),
  });

export { startServer };
