import assert from 'assert';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import type {
  PropertiesWithPageInfo,
  State,
} from '../../src/app/schemas/types.codegen.js';

import { pupulateDatabase } from '../utils/database-utility/populate-database.js';
import { pruneDatabase } from '../utils/database-utility/prune-database.js';
import { assumeType } from '../utils/assume-type.js';
import { getTestDatabase, getTestServer } from './index.js';

describe('integration/get-properties', () => {
  const testServer = getTestServer();
  const database = getTestDatabase();

  let mockIds: string[];

  beforeEach(async () => {
    mockIds = await pupulateDatabase(database);
  });

  afterEach(async () => {
    await pruneDatabase(mockIds, database);
  });

  it('returns 10 properties with 0 offset when limit and offset are not set', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetProperties { 
        getProperties { 
          properties { 
            id
          } 
          pageInfo {
            limit 
            offset 
          } 
        } 
      }`,
    });

    assert(response.body.kind === 'single');

    const data = assumeType<PropertiesWithPageInfo>(
      response.body.singleResult.data?.getProperties
    );

    expect(data.properties.length).toEqual(10);
    expect(data.pageInfo.limit).toEqual(10);
    expect(data.pageInfo.offset).toEqual(0);
  });

  it('returns set amount of properties with offset when limit and offset are set', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetProperties($limit: Int!, $offset: Int!) { 
        getProperties(limit: $limit, offset: $offset) { 
          properties { 
            id 
          } 
          pageInfo {
            limit 
            offset 
          } 
        } 
      }`,
      variables: { limit: 3, offset: 1 },
    });

    assert(response.body.kind === 'single');

    const data = assumeType<PropertiesWithPageInfo>(
      response.body.singleResult.data?.getProperties
    );

    expect(data.properties.length).toEqual(3);
    expect(data.pageInfo.limit).toEqual(3);
    expect(data.pageInfo.offset).toEqual(1);
  });

  it('returns properties with proper ofset when ofset is set', async () => {
    const responseWithoutOffset = await testServer.executeOperation({
      query: `
      query GetProperties($offset: Int!) { 
        getProperties(offset: $offset) { 
          properties { 
            id 
          } 
          pageInfo {
            offset 
          } 
        } 
      }`,
      variables: { offset: 0 },
    });

    const responseWithOffset = await testServer.executeOperation({
      query: `
      query GetProperties($offset: Int!) { 
        getProperties(offset: $offset) { 
          properties { 
            id 
          } 
          pageInfo {
            offset 
          } 
        } 
      }`,
      variables: { offset: 1 },
    });

    assert(responseWithoutOffset.body.kind === 'single');
    assert(responseWithOffset.body.kind === 'single');

    const dataWithoutOffset = assumeType<PropertiesWithPageInfo>(
      responseWithoutOffset.body.singleResult.data?.getProperties
    );

    const dataWithOffset = assumeType<PropertiesWithPageInfo>(
      responseWithOffset.body.singleResult.data?.getProperties
    );

    expect(dataWithoutOffset.pageInfo.offset).toEqual(0);
    expect(dataWithOffset.pageInfo.offset).toEqual(1);
    expect(dataWithoutOffset.properties[1]).toEqual(
      dataWithOffset.properties[0]
    );
  });

  it('returns only properties with chosen city', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetProperties($city: String) { 
        getProperties(city: $city) { 
          properties { 
            city 
          } 
        } 
      }`,
      variables: { city: 'Detroit' },
    });

    assert(response.body.kind === 'single');

    const data = assumeType<PropertiesWithPageInfo>(
      response.body.singleResult.data?.getProperties
    );

    data.properties.forEach((property) => {
      expect(property.city).toEqual('Detroit');
    });
  });

  it('returns only properties with chosen state', async () => {
    const state: State = 'MO';

    const response = await testServer.executeOperation({
      query: `
      query GetProperties($state: State) { 
        getProperties(state: $state) { 
          properties { 
            state 
          } 
        } 
      }`,
      variables: { state },
    });

    assert(response.body.kind === 'single');

    const data = assumeType<PropertiesWithPageInfo>(
      response.body.singleResult.data?.getProperties
    );

    data.properties.forEach((property) => {
      expect(property.state).toEqual(state);
    });
  });

  it('returns only properties with chosen zipCode', async () => {
    const zipCode = '12345';

    const response = await testServer.executeOperation({
      query: `query GetProperties($zipCode: String) { 
        getProperties(zipCode: $zipCode) { 
          properties { 
            zipCode 
          } 
        } 
      }`,
      variables: { zipCode },
    });

    assert(response.body.kind === 'single');

    const data = assumeType<PropertiesWithPageInfo>(
      response.body.singleResult.data?.getProperties
    );

    data.properties.forEach((property) => {
      expect(property.zipCode).toEqual(zipCode);
    });
  });

  it('returns sorted properties when asc is used', async () => {
    const response = await testServer.executeOperation({
      query: `query GetProperties($sort: Sort) { 
        getProperties(sort: $sort) { 
          properties { 
            creationDate 
          } 
        } 
      }`,
      variables: { sort: 'asc' },
    });

    assert(response.body.kind === 'single');

    const data = assumeType<PropertiesWithPageInfo>(
      response.body.singleResult.data?.getProperties
    );

    const date1 = new Date(data.properties[0].creationDate);
    const date2 = new Date(data.properties[1].creationDate);

    expect(date1.getTime()).toBeLessThanOrEqual(date2.getTime());
  });

  it('returns sorted properties when desc is used', async () => {
    const response = await testServer.executeOperation({
      query: `query GetProperties($sort: Sort) { 
        getProperties(sort: $sort) { 
          properties { 
            creationDate 
          } 
        } 
      }`,
      variables: { sort: 'desc' },
    });

    assert(response.body.kind === 'single');

    const data = assumeType<PropertiesWithPageInfo>(
      response.body.singleResult.data?.getProperties
    );

    const date1 = new Date(data.properties[0].creationDate);
    const date2 = new Date(data.properties[1].creationDate);

    expect(date1.getTime()).toBeGreaterThanOrEqual(date2.getTime());
  });

  it('returns all properties which were requested', async () => {
    const response = await testServer.executeOperation({
      query: `query GetProperties($limit: Int, $sort: Sort) { 
        getProperties(limit: $limit, sort: $sort) { 
          properties { 
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
          pageInfo {
            limit
            offset
          }
        } 
      }`,
      variables: { limit: 1, sort: 'asc' },
    });

    assert(response.body.kind === 'single');

    const data = assumeType<PropertiesWithPageInfo>(
      response.body.singleResult.data?.getProperties
    );

    expect(data.properties[0]).toMatchSnapshot({
      id: expect.any(String),
    });
  });
});
