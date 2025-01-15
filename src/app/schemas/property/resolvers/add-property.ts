import { v4 as uuid } from 'uuid';
import Joi from 'joi';

import type { Resolver } from '../../../types.js';
import type { Property, State } from '../types.js';

import {
  database,
  getWeatherApiMockResponse,
} from '../../../../database/database.js';
import { validateArgs } from '../../../../core/validation/validate-args.js';

const argsSchema = Joi.object({
  city: Joi.string().min(3).max(20).required(),
  street: Joi.string().alphanum().min(3).max(20).required(),
  state: Joi.string().length(2).required(),
  zipCode: Joi.string()
    .length(5)
    .regex(/^[0-9]+$/)
    .required(),
});

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
