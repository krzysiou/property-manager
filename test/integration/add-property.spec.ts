import assert from 'assert';

import { describe, expect, it } from 'vitest';

import type { Property } from '../../src/app/schemas/types.codegen.js';

import { assumeType } from '../utils/assume-type.js';
import { getTestDatabase, getTestServer } from './index.js';

describe('integration/add-property', () => {
  const testServer = getTestServer();
  const database = getTestDatabase();

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

    const { id } = assumeType<Property>(
      responseAdd.body.singleResult.data?.addProperty
    );

    const addedProperty = await database.property.getProperty({ id });

    await database.property.deleteProperty({ id });

    expect(addedProperty).not.toBeNull();
  });
});
