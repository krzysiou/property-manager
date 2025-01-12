import { startStandaloneServer } from '@apollo/server/standalone';

import { server } from './server.js';

const { PORT } = process.env;

const { url } = await startStandaloneServer(server, {
  listen: { port: Number(PORT) },
});

console.log(`Listening at: ${url}`);
