import type { PrismaClient } from '@prisma/client';
import type { Deps, GetProperties } from '../../types.js';

const initGetProperties = (
  prismaClient: PrismaClient,
  { logger, errorBroker }: Deps
): GetProperties => {
  return async (limit = 10, offset = 0) => {
    try {
      return await prismaClient.property.findMany({
        include: { weatherData: true },
        skip: offset,
        take: limit,
      });
    } catch (error) {
      logger.error(error.message);
      errorBroker.throwDatabaseError(error.message);
    }
  };
};

export { initGetProperties };
