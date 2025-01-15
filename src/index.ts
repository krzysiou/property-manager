import { startServer } from './app/server.js';

const { url } = await startServer();

console.log(`🚀 Listening on ${url}`);
