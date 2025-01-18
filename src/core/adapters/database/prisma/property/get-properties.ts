import type { PrismaClient } from '@prisma/client';
import type { Deps, GetProperties } from '../../types.js';

const initGetProperties = (
  prismaClient: PrismaClient,
  { logger, errorBroker }: Deps
): GetProperties => {
  return async ({ city, zipCode, state, limit, offset, sort }) => {
    try {
      return await prismaClient.property.findMany({
        include: { weatherData: true },
        where: {
          city,
          zipCode,
          state,
        },
        orderBy: {
          creationDate: sort,
        },
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
