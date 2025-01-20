import { afterEach } from 'node:test';

import { beforeAll, describe, expect, it, vi } from 'vitest';

import type { Database } from '../../src/core/adapters/database/types.js';
import type { GetPropertiesAction } from '../../src/core/services/action-handling/property/get-properties-action-service.js';

import { getMockProperty } from '../utils/mocks/get-mock-property.js';
import { getPropertiesActionService } from '../../src/core/services/action-handling/property/get-properties-action-service.js';

describe('services/get-property-action-service', () => {
  let getPropertiesAction: GetPropertiesAction;

  let database: Database;

  beforeAll(() => {
    database = {
      property: {
        getProperties: vi.fn(),
        getProperty: vi.fn(),
        deleteProperty: vi.fn(),
        createProperty: vi.fn(),
      },
    };

    getPropertiesAction = getPropertiesActionService({ database });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('calls database to get properties with success', async () => {
    const mockProperty1 = getMockProperty('mock-id-1');
    const mockProperty2 = getMockProperty('mock-id-2');

    const mockProperties = [mockProperty1, mockProperty2];

    vi.mocked(database.property.getProperties).mockResolvedValue(
      mockProperties
    );

    const properties = await getPropertiesAction({});

    expect(properties).toEqual(mockProperties);
    expect(database.property.getProperties).toBeCalled();
  });

  it('calls database to get properties without success', async () => {
    vi.mocked(database.property.getProperties).mockResolvedValue([]);

    const properties = await getPropertiesAction({});

    expect(properties).toEqual([]);
    expect(database.property.getProperties).toBeCalled();
  });
});
