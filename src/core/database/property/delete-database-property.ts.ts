import { dbClient } from '../db-client.js';

const deleteDatabaseProperty = async (propertyId: string) => {
  try {
    await dbClient.property.delete({
      where: {
        id: propertyId,
      },
    });

    return true;
  } catch {
    return false;
  }
};

export { deleteDatabaseProperty };
