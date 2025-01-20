import type { Database } from '../../../src/core/adapters/database/types.js';

const pruneDatabase = async (mockIds: string[], database: Database) => {
  await Promise.all(
    mockIds.map(async (mockId) => {
      await database.property.deleteProperty({ id: mockId });
    })
  );
};

export { pruneDatabase };
