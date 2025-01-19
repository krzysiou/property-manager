import { afterEach } from 'node:test';

import { beforeAll, describe, expect, it, vi } from 'vitest';

import type { Database } from '../../src/core/adapters/database/types.js';
import type { DeletePropertyAction } from '../../src/core/services/action-handling/property/delete-property-action-service.js';

import { deletePropertyActionService } from '../../src/core/services/action-handling/property/delete-property-action-service.js';

describe('services/delete-property-action-service', () => {
  let deletePropertyAction: DeletePropertyAction;

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

    deletePropertyAction = deletePropertyActionService({ database });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('calls database to delete property with success', async () => {
    vi.mocked(database.property.deleteProperty).mockResolvedValue(true);

    const hasSuccedeed = await deletePropertyAction({ id });

    expect(hasSuccedeed).toBe(true);
    expect(database.property.deleteProperty).toHaveBeenCalledWith({ id });
  });

  it('calls database to delete property without success', async () => {
    vi.mocked(database.property.deleteProperty).mockResolvedValue(false);

    const hasSuccedeed = await deletePropertyAction({ id });

    expect(hasSuccedeed).toBe(false);
    expect(database.property.deleteProperty).toHaveBeenCalledWith({ id });
  });
});
