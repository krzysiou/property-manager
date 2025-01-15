import { v4 as uuid } from 'uuid';

import type { Resolver } from '../../../types.js';
import type { Property, State } from '../types.js';

import {
  database,
  getWeatherApiMockResponse,
} from '../../../../database/database.js';
import { argsSchema } from '../validation/add-property.schema.js';
import { validateArgs } from '../../../../core/validate-args/validate-args.js';

type AddPropertyArgs = {
  city: string;
  street: string;
  state: State;
  zipCode: string;
};

const addProperty: Resolver<AddPropertyArgs, Property> = (_, args) => {
  validateArgs(args, argsSchema);

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

export { addProperty };
