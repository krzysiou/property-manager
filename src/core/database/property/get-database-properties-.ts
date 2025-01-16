import type { PropertyModule } from '../../../app/schemas/property/types.codegen.js';

import { dbClient } from '../db-client.js';

const getDatabaseProperties = async (): Promise<PropertyModule.Property[]> =>
  await dbClient.property.findMany({
    include: { weatherData: true },
  });

export { getDatabaseProperties };
