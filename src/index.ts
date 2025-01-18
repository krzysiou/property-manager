import type { Deps } from './app/types.js';

import { startServer } from './app/server.js';
import { getConfig } from './config/get-config.js';
import { loggerAdapter } from './core/adapters/logger/real-logger.js';
import { errorBrokerAdapter } from './core/adapters/error-broker/real-error-broker.js';
import { databaseAdapter } from './core/adapters/database/prisma/index.js';
import { validationService } from './core/services/validation/validation-service.js';
import { fileLoadingService } from './core/services/file-loading/file-loading-service.js';
import { fetcherAdapter } from './core/adapters/fetcher/axios.js';
import { WeatherAdapter } from './core/adapters/weather/weather-stack-api/index.js';

const config = getConfig();

const logger = loggerAdapter();
const errorBroker = errorBrokerAdapter();
const fetcher = fetcherAdapter({ logger, errorBroker });
const database = databaseAdapter({ logger, errorBroker });
const validate = validationService();
const loadFile = fileLoadingService({ logger, errorBroker });
const weather = WeatherAdapter({
  config,
  logger,
  errorBroker,
  fetcher,
  validate,
});

const deps: Deps = {
  config,
  logger,
  errorBroker,
  database,
  fetcher,
  validate,
  loadFile,
  weather,
};

const { url } = await startServer(deps);

console.log(`🚀 Listening on ${url}`);
