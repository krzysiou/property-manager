import type { PrismaClient } from '@prisma/client';
import type { Deps, GetProperty } from '../../types.js';

const initGetProperty = (
  prismaClient: PrismaClient,
  { logger, errorBroker }: Deps
): GetProperty => {
  return async ({ id }) => {
    try {
      return await prismaClient.property.findUnique({
        include: { weatherData: true },
        where: {
          id,
        },
      });
    } catch (error) {
      logger.error(error.message);
      errorBroker.throwDatabaseError(error.message);
    }
  };
};

export { initGetProperty };
