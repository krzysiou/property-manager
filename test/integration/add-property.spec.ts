import assert from 'assert';

import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import type { ApolloServer, BaseContext } from '@apollo/server';
import type { Config } from '../../src/config/types.js';
import type { Property } from '../../src/app/schemas/types.codegen.js';
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
import { pruneDatabase } from '../utils/database-utility/prune-database.js';
import { assumeType } from '../utils/assume-type.js';
import { pupulateDatabase } from '../utils/database-utility/populate-database.js';

describe('integration/add-property', () => {
  let testServer: ApolloServer<BaseContext>;

  let database: Database;

  let mockIds: string[];

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

  beforeEach(async () => {
    mockIds = await pupulateDatabase(database);
  });

  afterEach(async () => {
    await pruneDatabase(mockIds, testServer);
  });

  it('adds property to database', async () => {
    const responseAdd = await testServer.executeOperation({
      query: `
      mutation AddProperty($city: String!, $street: String!, $state: State!, $zipCode: String!) { 
        addProperty(city: $city, street: $street, state: $state, zipCode: $zipCode) { 
          id
        } 
      }`,
      variables: {
        city: 'New York',
        street: 'Angel st.',
        state: 'AK',
        zipCode: '12345',
      },
    });

    assert(responseAdd.body.kind === 'single');

    const dataAdd = assumeType<Property>(
      responseAdd.body.singleResult.data?.addProperty
    );

    mockIds.push(dataAdd.id);

    const responseGet = await testServer.executeOperation({
      query: `
      query GetProperty($getPropertyId: String!) { 
        getProperty(id: $getPropertyId) { 
          id
        } 
      }`,
      variables: { getPropertyId: dataAdd.id },
    });

    assert(responseGet.body.kind === 'single');

    const dataGet = assumeType<Property>(
      responseGet.body.singleResult.data?.getProperty
    );

    expect(dataGet).not.toBeNull();
  });
});
