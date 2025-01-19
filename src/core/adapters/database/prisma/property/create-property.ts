import { v4 as uuid } from 'uuid';

import type { PrismaClient } from '@prisma/client';
import type { CreateProperty, Deps } from '../../types.js';
import type { Property } from '../../../../../app/schemas/types.codegen.js';

const initCreateProperty = (
  prismaClient: PrismaClient,
  { logger, errorBroker }: Deps
): CreateProperty => {
  return async (property: Property) => {
    const { id: propertyId, weatherData, ...propertyData } = property;

    const propertyExists = Boolean(
      await prismaClient.property.findFirst({
        where: { id: propertyId },
      })
    );

    if (propertyExists) {
      const message = `Property with id ${propertyId} already exists`;

      logger.error(message);
      throw errorBroker.databaseError(message);
    }

    const weatherDataId = uuid();

    try {
      await prismaClient.weatherData.create({
        data: {
          id: weatherDataId,
          propertyId,
          ...weatherData,
        },
      });

      await prismaClient.property.create({
        data: {
          id: propertyId,
          weatherDataId,
          ...propertyData,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
        throw errorBroker.databaseError(error.message);
      }
    }
  };
};

export { initCreateProperty };
