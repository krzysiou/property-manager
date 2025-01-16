import { startServer } from './app/server.js';
import { getConfig } from './config/get-config.js';

const { port } = getConfig();

const { url } = await startServer(port);

console.log(`🚀 Listening on ${url}`);
