import { v4 as uuid } from 'uuid';

import type { State } from '../../../src/app/schemas/types.codegen.js';
import type { Database } from '../../../src/core/adapters/database/types.js';

import { getMockProperty } from '../mocks/get-mock-property.js';

const NUMBER_OF_MOCK_PROPERTIES = 10;

const mockCities: string[] = [
  'New York',
  'Las Vegas',
  'Kansas City',
  'Baytown',
  'Detroit',
];

const mockStreets: string[] = [
  'Angel st.',
  'Funk st.',
  'Lake st.',
  'Russel st.',
  'Laurel st.',
];

const mockStates: State[] = ['AK', 'FL', 'DE', 'UT', 'SD'];

const mockZipCodes: string[] = ['12345', '54321', '12321', '54332', '12543'];

const mockCreationDates: string[] = [
  '2025-01-18T19:26:20.965Z',
  '2025-01-18T19:27:20.965Z',
  '2025-01-18T19:28:20.965Z',
  '2025-01-18T19:29:20.965Z',
  '2025-01-18T19:30:20.965Z',
  '2025-01-18T19:31:20.965Z',
  '2025-01-18T19:32:20.965Z',
  '2025-01-18T19:33:20.965Z',
  '2025-01-18T19:34:20.965Z',
  '2025-01-18T19:35:20.965Z',
];

const pupulateDatabase = async (database: Database) => {
  const mockIds: string[] = [];

  for (let i = 0; i < NUMBER_OF_MOCK_PROPERTIES; i++) {
    const mockId = uuid();

    const mockProperty = getMockProperty(
      mockId,
      mockCities[i % 5],
      mockStreets[i % 5],
      mockStates[i % 5],
      mockZipCodes[i % 5],
      mockCreationDates[i]
    );

    await database.property.createProperty(mockProperty);

    mockIds.push(mockId);
  }

  return mockIds;
};

export { pupulateDatabase };
