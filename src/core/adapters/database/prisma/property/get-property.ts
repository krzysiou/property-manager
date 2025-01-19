import type { PrismaClient } from '@prisma/client';
import type { Deps, GetProperty } from '../../types.js';

const initGetProperty = (
  prismaClient: PrismaClient,
  { logger, errorBroker }: Deps
): GetProperty => {
  return async ({ id }) => {
    try {
      const property = await prismaClient.property.findFirst({
        include: { weatherData: true },
        where: { id },
      });

      return property;
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
        throw errorBroker.databaseError(error.message);
      }

      return null;
    }
  };
};

export { initGetProperty };
