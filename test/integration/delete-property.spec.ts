import assert from 'assert';

import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { v4 as uuid } from 'uuid';

import type { ApolloServer, BaseContext } from '@apollo/server';
import type { Config } from '../../src/config/types.js';
import type { Database } from '../../src/core/adapters/database/types.js';

import { getConfig } from '../../src/config/get-config.js';
import { loggerAdapter } from '../../src/core/adapters/logger/fake-logger.js';
import { errorBrokerAdapter } from '../../src/core/adapters/error-broker/real-error-broker.js';
import { fetcherAdapter } from '../../src/core/adapters/fetcher/axios.js';
import { databaseAdapter } from '../../src/core/adapters/database/prisma/index.js';
import { validationService } from '../../src/core/services/validation/validation-service.js';
import { fileLoadingService } from '../../src/core/services/file-loading/file-loading-service.js';
import { getServer } from '../../src/app/server.js';
import { getMockCurrentWeather } from '../utils/mocks/get-mock-current-weather.js';
import { assumeType } from '../utils/assume-type.js';
import { getMockProperty } from '../utils/mocks/get-mock-property.js';

describe('integration/delete-property', () => {
  let testServer: ApolloServer<BaseContext>;

  let database: Database;

  beforeAll(() => {
    const config: Config = { ...getConfig(), env: 'test' };
    const logger = loggerAdapter();
    const errorBroker = errorBrokerAdapter();
    const fetcher = fetcherAdapter({ logger, errorBroker });
    const validate = validationService();
    const loadFile = fileLoadingService({ logger, errorBroker });
    const weather = {
      fetchCurrentWeather: vi.fn().mockResolvedValue(getMockCurrentWeather()),
    };

    database = databaseAdapter({ config, logger, errorBroker });

    testServer = getServer({
      config,
      logger,
      errorBroker,
      database,
      fetcher,
      validate,
      loadFile,
      weather,
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('deletes property from database', async () => {
    const mockId = uuid();
    const mockProperty = getMockProperty(mockId);

    await database.property.createProperty(mockProperty);

    const responseDelete = await testServer.executeOperation({
      query: `
      mutation DeleteProperty($deletePropertyId: ID!) {
        deleteProperty(id: $deletePropertyId)
      }`,
      variables: { deletePropertyId: mockId },
    });

    assert(responseDelete.body.kind === 'single');

    const dataDelete = assumeType<boolean>(
      responseDelete.body.singleResult.data?.deleteProperty
    );

    expect(dataDelete).toEqual(true);
  });
});
