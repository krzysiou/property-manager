import { afterEach } from 'node:test';

import { beforeAll, describe, expect, it, vi } from 'vitest';

import type { Database } from '../../src/core/adapters/database/types.js';
import type { GetPropertyAction } from '../../src/core/services/action-handling/property/get-property-action-service.js';

import { getPropertyActionService } from '../../src/core/services/action-handling/property/get-property-action-service.js';
import { getMockProperty } from '../utils/mocks/get-mock-property.js';

describe('services/get-property-action-service', () => {
  let getPropertyAction: GetPropertyAction;

  let database: Database;

  const id = 'mock-id';

  beforeAll(() => {
    database = {
      property: {
        getProperties: vi.fn(),
        getProperty: vi.fn(),
        deleteProperty: vi.fn(),
        createProperty: vi.fn(),
      },
    };

    getPropertyAction = getPropertyActionService({ database });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('calls database to get property with success', async () => {
    const mockProperty = getMockProperty();

    vi.mocked(database.property.getProperty).mockResolvedValue(mockProperty);

    const property = await getPropertyAction({ id });

    expect(property).toEqual(mockProperty);
    expect(database.property.getProperty).toHaveBeenCalledWith({ id });
  });

  it('calls database to get property without success', async () => {
    vi.mocked(database.property.getProperty).mockResolvedValue(null);

    const property = await getPropertyAction({ id });

    expect(property).toBe(null);
    expect(database.property.getProperty).toHaveBeenCalledWith({ id });
  });
});
