import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import type { Config } from '../config/types.js';

import { getConfig } from '../config/get-config.js';
import { getModules } from './get-modules.js';
import { formatError } from './format-error.js';

type Context = {
  config: Config;
};

const config = getConfig();

const { typeDefs, resolvers } = getModules();

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  formatError,
});

const startServer = async (port: string) =>
  await startStandaloneServer(server, {
    listen: { port: Number(port) },
    context: async () => ({
      config,
    }),
  });

export { startServer, type Context };
