import type { Config } from '../src/config/types.js';

import { getConfig } from '../src/config/get-config.js';
import { loggerAdapter } from '../src/core/adapters/logger/real-logger.js';
import { errorBrokerAdapter } from '../src/core/adapters/error-broker/real-error-broker.js';
import { databaseAdapter } from '../src/core/adapters/database/prisma/index.js';

export async function teardown() {
  const config: Config = { ...getConfig(), env: 'test' };
  const logger = loggerAdapter();
  const errorBroker = errorBrokerAdapter();
  const database = databaseAdapter({ config, logger, errorBroker });

  await database.purge();

  logger.info('[TEARDOWN]: Purged test database');
}
