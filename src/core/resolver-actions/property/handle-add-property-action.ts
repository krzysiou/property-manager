import { v4 as uuid } from 'uuid';

import type {
  MutationAddPropertyArgs,
  Property,
} from '../../../app/modules/types.codegen';

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

  const property: Property = {
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
