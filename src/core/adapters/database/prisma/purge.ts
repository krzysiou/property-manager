import type { PrismaClient } from '@prisma/client';
import type { Purge } from '../types.js';

const initPurge = (
  prismaClient: PrismaClient,
): Purge => {
  return async () => {
    await prismaClient.property.deleteMany();
    await prismaClient.weatherData.deleteMany();
  };
};

export { initPurge };
