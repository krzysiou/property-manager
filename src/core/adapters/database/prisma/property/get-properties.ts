import type { PrismaClient } from '@prisma/client';
import type { Deps, GetProperties } from '../../types.js';

const initGetProperties = (
  prismaClient: PrismaClient,
  { logger, errorBroker }: Deps
): GetProperties => {
  return async () => {
    try {
      return await prismaClient.property.findMany({
        include: { weatherData: true },
      });
    } catch (error) {
      logger.error(error.message);
      errorBroker.throwDatabaseError(error.message);
    }
  };
};

export { initGetProperties };
