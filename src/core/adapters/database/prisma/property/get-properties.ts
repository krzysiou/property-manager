import type { PrismaClient } from '@prisma/client';
import type { Deps, GetProperties } from '../../types.js';

const initGetProperties = (
  prismaClient: PrismaClient,
  { logger, errorBroker }: Deps
): GetProperties => {
  return async ({ city, zipCode, state, limit, offset, sort }) => {
    try {
      let where: Record<string, string | undefined> = {};
      let orderBy: Record<string, string | undefined> = {};

      const skip = offset || undefined;
      const take = limit || undefined;

      if (city) {
        where = { ...where, city };
      }

      if (zipCode) {
        where = { ...where, zipCode };
      }

      if (state) {
        where = { ...where, state };
      }

      if (sort) {
        orderBy = { ...orderBy, creationDate: sort };
      }

      const properties = await prismaClient.property.findMany({
        include: { weatherData: true },
        where,
        orderBy,
        skip,
        take,
      });

      return properties;
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
        throw errorBroker.databaseError(error.message);
      }

      return [];
    }
  };
};

export { initGetProperties };
