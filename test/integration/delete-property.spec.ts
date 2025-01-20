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
import type { Weather } from '../../src/core/adapters/weather/types.js';
import type { PropertiesWithPageInfo } from '../../src/app/schemas/types.codegen.js';

import { getConfig } from '../../src/config/get-config.js';
import { loggerAdapter } from '../../src/core/adapters/logger/fake-logger.js';
import { errorBrokerAdapter } from '../../src/core/adapters/error-broker/real-error-broker.js';
import { fetcherAdapter } from '../../src/core/adapters/fetcher/axios.js';
import { databaseAdapter } from '../../src/core/adapters/database/prisma/index.js';
import { validationService } from '../../src/core/services/validation/validation-service.js';
import { fileLoadingService } from '../../src/core/services/file-loading/file-loading-service.js';
import { getServer } from '../../src/app/server.js';
import { getMockCurrentWeather } from '../utils/get-mock-current-weather.js';
import { pruneDatabase } from '../utils/prune-database.js';
import { assumeType } from '../utils/assume-type.js';
import { pupulateDatabase } from '../utils/populate-database.js';

describe('integration/delete-property', () => {
  let testServer: ApolloServer<BaseContext>;

  let weather: Weather;

  let ids: string[];

  beforeAll(() => {
    const config: Config = { ...getConfig(), env: 'test' };
    const logger = loggerAdapter();
    const errorBroker = errorBrokerAdapter();
    const fetcher = fetcherAdapter({ logger, errorBroker });
    const database = databaseAdapter({ config, logger, errorBroker });
    const validate = validationService();
    const loadFile = fileLoadingService({ logger, errorBroker });
    weather = {
      fetchCurrentWeather: vi.fn().mockResolvedValue(getMockCurrentWeather()),
    };

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
    ids = await pupulateDatabase(testServer);
  });

  afterEach(async () => {
    await pruneDatabase(ids, testServer);
  });

  it('deletes property from database', async () => {
    const responseDelete = await testServer.executeOperation({
      query: `
      mutation DeleteProperty($deletePropertyId: ID!) {
        deleteProperty(id: $deletePropertyId)
      }`,
      variables: { deletePropertyId: ids[0] },
    });

    const responseGet = await testServer.executeOperation({
      query: `
      query GetProperties { 
        getProperties { 
          properties { 
            id
          } 
        } 
      }`,
    });

    assert(responseDelete.body.kind === 'single');
    assert(responseGet.body.kind === 'single');

    const dataDelete = assumeType<boolean>(
      responseDelete.body.singleResult.data?.deleteProperty
    );

    const dataGet = assumeType<PropertiesWithPageInfo>(
      responseGet.body.singleResult.data?.getProperties
    );

    expect(dataDelete).toEqual(true);
    dataGet.properties.forEach((property) => {
      expect(property.id).not.toEqual(ids[0]);
    });
  });
});
