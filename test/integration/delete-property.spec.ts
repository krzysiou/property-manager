import assert from 'assert';

import { describe, expect, it } from 'vitest';
import { v4 as uuid } from 'uuid';

import { assumeType } from '../utils/assume-type.js';
import { getMockProperty } from '../utils/mocks/get-mock-property.js';
import { getTestDatabase, getTestServer } from './index.js';

describe('integration/delete-property', () => {
  const testServer = getTestServer();
  const database = getTestDatabase();

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
