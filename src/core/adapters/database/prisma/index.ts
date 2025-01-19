import type { PrismaClient } from '@prisma/client';
import type { DatabaseAdapter } from '../types.js';

import { PrismaClient as DevPrismaClient } from '../../../../../prisma/dev/client/index.js';
import { PrismaClient as TestPrismaClient } from '../../../../../prisma/dev-test/client/index.js';
import { initCreateProperty } from './property/create-property.js';
import { initDeleteProperty } from './property/delete-property.js';
import { initGetProperty } from './property/get-property.js';
import { initGetProperties } from './property/get-properties.js';

const databaseAdapter: DatabaseAdapter = (deps) => {
  const {
    config: { env },
  } = deps;

  const prismaClient =
    env === 'test'
      ? (new TestPrismaClient() as PrismaClient)
      : (new DevPrismaClient() as PrismaClient);

  return {
    property: {
      getProperties: initGetProperties(prismaClient, deps),
      getProperty: initGetProperty(prismaClient, deps),
      createProperty: initCreateProperty(prismaClient, deps),
      deleteProperty: initDeleteProperty(prismaClient, deps),
    },
  };
};

export { databaseAdapter };
