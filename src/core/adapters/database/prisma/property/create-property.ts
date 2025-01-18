import { v4 as uuid } from 'uuid';

import type { PrismaClient } from '@prisma/client';
import type { CreateProperty, Deps } from '../../types.js';
import type { Property } from '../../../../../app/schemas/types.codegen.js';

const initCreateProperty = (
  prismaClient: PrismaClient,
  { logger, errorBroker }: Deps
): CreateProperty => {
  return async (property: Property) => {
    try {
      const { id: propertyId, weatherData, ...rest } = property;

      const propertyExists = await prismaClient.property.findFirst({
        where: { id: propertyId },
      });

      if (propertyExists) {
        const message = `Property with id ${propertyId} already exists`;

        logger.error(message);
        errorBroker.throwDatabaseError(message);
      }

      const weatherDataId = uuid();

      await prismaClient.property.create({
        data: {
          id: propertyId,
          weatherDataId,
          ...rest,
          weatherData: {
            create: {
              id: weatherDataId,
              ...weatherData,
            },
          },
        },
      });
    } catch (error) {
      logger.error(error.message);
      errorBroker.throwDatabaseError(error.message);
    }
  };
};

export { initCreateProperty };
