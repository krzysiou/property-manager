import Joi from 'joi';

import type { Resolver } from '../../../types.js';
import type { Property, Sort, State } from '../types.js';

import { database } from '../../../../database/database.js';
import { validateArgs } from '../../../../core/validation/validate-args.js';

const argsSchema = Joi.object({
  city: Joi.string().min(3).max(20),
  state: Joi.string().length(2),
  zipCode: Joi.string()
    .length(5)
    .regex(/^[0-9]+$/),
  sort: Joi.string().valid('asc', 'desc'),
});

type GetPropertiesArgs = {
  city: string;
  zipCode: string;
  state: State;
  sort: Sort;
};

const getProperties: Resolver<GetPropertiesArgs, Property[]> = (_, args) => {
  validateArgs(args, argsSchema);

  const { city, zipCode, state, sort } = args;

  let filteredProperties = database;

  if (city) {
    filteredProperties = database.filter((prop) => prop.city === city);
  }

  if (zipCode) {
    filteredProperties = filteredProperties.filter(
      (prop) => prop.zipCode === zipCode
    );
  }

  if (state) {
    filteredProperties = filteredProperties.filter(
      (prop) => prop.state === state
    );
  }

  if (sort) {
    filteredProperties = filteredProperties.sort((a, b) =>
      sort === 'desc'
        ? new Date(b.creationDate).getTime() -
          new Date(a.creationDate).getTime()
        : new Date(a.creationDate).getTime() -
          new Date(b.creationDate).getTime()
    );
  }

  return filteredProperties;
};

export { getProperties };
