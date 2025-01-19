import { PrismaClient } from '@prisma/client';

import type { DatabaseAdapter } from '../types.js';

import { initCreateProperty } from './property/create-property.js';
import { initDeleteProperty } from './property/delete-property.js';
import { initGetProperty } from './property/get-property.js';
import { initGetProperties } from './property/get-properties.js';

const prismaClient = new PrismaClient();

const databaseAdapter: DatabaseAdapter = (deps) => ({
  property: {
    getProperties: initGetProperties(prismaClient, deps),
    getProperty: initGetProperty(prismaClient, deps),
    createProperty: initCreateProperty(prismaClient, deps),
    deleteProperty: initDeleteProperty(prismaClient, deps),
  },
});

export { databaseAdapter };
