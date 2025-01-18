import { PrismaClient } from '@prisma/client';

import type { DatabaseAdapter } from '../types';

import { initCreateProperty } from './property/create-property.js';
import { initDeleteProperty } from './property/delete-property.js';
import { initGetProperties } from './property/get-properties.js';

const prismaClient = new PrismaClient();

const databaseAdapter: DatabaseAdapter = (deps) => ({
  property: {
    createProperty: initCreateProperty(prismaClient, deps),
    getProperties: initGetProperties(prismaClient, deps),
    deleteProperty: initDeleteProperty(prismaClient, deps),
  },
});

export { databaseAdapter };
