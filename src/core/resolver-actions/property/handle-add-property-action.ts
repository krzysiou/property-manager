import { v4 as uuid } from 'uuid';

import type { MutationAddPropertyArgs } from '../../../app/modules/types.codegen';
import type { PropertyModule } from '../../../app/modules/property/types.codegen.js';

import {
  database,
  getWeatherApiMockResponse,
} from '../../../database/database.js';

const handleAddPropertyAction = (args: MutationAddPropertyArgs) => {
  const { city, street, state, zipCode } = args;

  const {
    location: { lon, lat },
    current: weatherData,
  } = getWeatherApiMockResponse();

  const creationDate = new Date(Date.now()).toISOString();

  const property: PropertyModule.Property = {
    id: uuid(),
    city,
    street,
    state,
    zipCode,
    weatherData,
    lat,
    lon,
    creationDate,
  };

  database.push(property);

  return property;
};

export { handleAddPropertyAction };
