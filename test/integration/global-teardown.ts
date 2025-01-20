import { getTestDatabase } from './index.js';

export async function teardown() {
  await getTestDatabase().purge();

  console.log('[TEARDOWN]: Purged test database');
}
