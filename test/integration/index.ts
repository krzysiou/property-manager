import type { ApolloServer, BaseContext } from '@apollo/server';
import type { Config } from '../../src/config/types';
import type { Deps } from '../../src/app/types.js';
import type { Database } from '../../src/core/adapters/database/types.js';
import type { Weather } from '../../src/core/adapters/weather/types.js';

import { getConfig } from '../../src/config/get-config.js';
import { databaseAdapter } from '../../src/core/adapters/database/prisma/index.js';
import { errorBrokerAdapter } from '../../src/core/adapters/error-broker/real-error-broker.js';
import { fetcherAdapter } from '../../src/core/adapters/fetcher/axios.js';
import { loggerAdapter } from '../../src/core/adapters/logger/fake-logger.js';
import { fileLoadingService } from '../../src/core/services/file-loading/file-loading-service.js';
import { validationService } from '../../src/core/services/validation/validation-service.js';
import { getServer } from '../../src/app/server.js';
import { getMockCurrentWeather } from '../utils/mocks/get-mock-current-weather.js';

const config: Config = { ...getConfig(), env: 'test' };
const logger = loggerAdapter();
const errorBroker = errorBrokerAdapter();
const fetcher = fetcherAdapter({ logger, errorBroker });
const database = databaseAdapter({ config, logger, errorBroker });
const validate = validationService();
const loadFile = fileLoadingService({ logger, errorBroker });
const weather: Weather = {
  fetchCurrentWeather: async () => getMockCurrentWeather(),
};

const testDeps: Deps = {
  config,
  logger,
  errorBroker,
  database,
  fetcher,
  validate,
  loadFile,
  weather,
};

const testServer = getServer(testDeps);

const getTestDatabase = (): Database => database;
const getTestServer = (): ApolloServer<BaseContext> => testServer;

export { getTestServer, getTestDatabase };
