import assert from 'assert';

import { beforeAll, describe, expect, it } from 'vitest';

import type { ApolloServer } from '@apollo/server';
import type { GraphQLResolveInfo } from 'graphql';
import type { Deps } from '../src/app/types.js';
import type { PropertiesWithPageInfo } from '../src/app/schemas/types.codegen.js';

import { getServer } from '../src/app/server.js';
import { loggerAdapter } from '../src/core/adapters/logger/real-logger.js';
import { errorBrokerAdapter } from '../src/core/adapters/error-broker/real-error-broker.js';
import { fetcherAdapter } from '../src/core/adapters/fetcher/axios.js';
import { databaseAdapter } from '../src/core/adapters/database/prisma/index.js';
import { validationService } from '../src/core/services/validation/validation-service.js';
import { fileLoadingService } from '../src/core/services/file-loading/file-loading-service.js';
import { WeatherAdapter } from '../src/core/adapters/weather/weather-stack-api/index.js';
import { getConfig } from '../src/config/get-config.js';

describe('e2e', () => {
  let testServer: ApolloServer<GraphQLResolveInfo>;

  beforeAll(() => {
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

    testServer = getServer(deps);
  });

  it('adds 1 + 2 to equal 3', async () => {
    const response = await testServer.executeOperation({
      query: 'query { getProperties { properties { id } } }',
    });

    assert(response.body.kind === 'single');

    const data = response.body.singleResult.data
      .getProperties as unknown as PropertiesWithPageInfo;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(data.properties[0].id).toBeDefined();
  });
});
