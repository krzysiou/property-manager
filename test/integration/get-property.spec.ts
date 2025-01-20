import assert from 'assert';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import type { Property } from '../../src/app/schemas/types.codegen.js';

import { pupulateDatabase } from '../utils/database-utility/populate-database.js';
import { pruneDatabase } from '../utils/database-utility/prune-database.js';
import { assumeType } from '../utils/assume-type.js';
import { getTestDatabase, getTestServer } from './index.js';

describe('integration/get-property', () => {
  const testServer = getTestServer();
  const database = getTestDatabase();

  let mockIds: string[];

  beforeEach(async () => {
    mockIds = await pupulateDatabase(database);
  });

  afterEach(async () => {
    await pruneDatabase(mockIds, database);
  });

  it('returns property data if property exists', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetProperty($getPropertyId: ID!) { 
        getProperty(id: $getPropertyId) { 
          id
        } 
      }`,
      variables: { getPropertyId: mockIds[0] },
    });

    assert(response.body.kind === 'single');

    const data = assumeType<Property>(
      response.body.singleResult.data?.getProperty
    );

    expect(data.id).toEqual(mockIds[0]);
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
      variables: { getPropertyId: mockIds[0] },
    });

    assert(response.body.kind === 'single');

    const data = assumeType<Property>(
      response.body.singleResult.data?.getProperty
    );

    expect(data).toMatchSnapshot({
      id: expect.any(String),
    });
  });
});
