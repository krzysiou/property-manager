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
import type { Property } from '../../src/app/schemas/types.codegen.js';

import { getConfig } from '../../src/config/get-config.js';
import { loggerAdapter } from '../../src/core/adapters/logger/fake-logger.js';
import { errorBrokerAdapter } from '../../src/core/adapters/error-broker/real-error-broker.js';
import { fetcherAdapter } from '../../src/core/adapters/fetcher/axios.js';
import { databaseAdapter } from '../../src/core/adapters/database/prisma/index.js';
import { validationService } from '../../src/core/services/validation/validation-service.js';
import { fileLoadingService } from '../../src/core/services/file-loading/file-loading-service.js';
import { getServer } from '../../src/app/server.js';
import { getMockCurrentWeather } from '../utils/get-mock-current-weather.js';
import { pupulateDatabase } from '../utils/populate-database.js';
import { pruneDatabase } from '../utils/prune-database.js';
import { assumeType } from '../utils/assume-type.js';

describe('integration/get-property', () => {
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

  it('returns property data if property exists', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetProperty($getPropertyId: ID!) { 
        getProperty(id: $getPropertyId) { 
          id
        } 
      }`,
      variables: { getPropertyId: ids[0] },
    });

    assert(response.body.kind === 'single');

    const data = assumeType<Property>(
      response.body.singleResult.data?.getProperty
    );

    expect(data.id).toEqual(ids[0]);
  });

  it('returns null data if property does not exist', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetProperty($getPropertyId: ID!) { 
        getProperty(id: $getPropertyId) { 
          id
        } 
      }`,
      variables: { getPropertyId: 'invalid-id' },
    });

    assert(response.body.kind === 'single');

    const data = assumeType<Property>(
      response.body.singleResult.data?.getProperty
    );

    expect(data).toBeNull();
  });

  it('returns property data if property exists', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetProperty($getPropertyId: ID!) { 
        getProperty(id: $getPropertyId) { 
          id
          city
          street
          state
          zipCode
          lon
          lat
          creationDate
          weatherData {
            observationTime
            temperature
            weatherCode
            windSpeed
            windDegree
            windDir
            pressure
            precip
            humidity
            cloudcover
            feelslike
            uvIndex
            visibility
          } 
        } 
      }`,
      variables: { getPropertyId: ids[0] },
    });

    assert(response.body.kind === 'single');

    const data = assumeType<Property>(
      response.body.singleResult.data?.getProperty
    );

    expect(data).toMatchSnapshot({
      id: expect.any(String),
      creationDate: expect.any(String),
    });
  });
});
