import { v4 as uuid } from 'uuid';

import type {
  MutationAddPropertyArgs,
  Property,
} from '../../../../app/schemas/types.codegen.js';
import type { Database } from '../../../adapters/database/types.js';
import type { Weather } from '../../../adapters/weather/types.js';

type Deps = {
  database: Database;
  weather: Weather;
};

type AddPropertyAction = (args: MutationAddPropertyArgs) => Promise<Property>;

type AddPropertyActionService = (deps: Deps) => AddPropertyAction;

const addPropertyActionService: AddPropertyActionService = ({
  database,
  weather,
}) => {
  return async ({ city, street, state, zipCode }) => {
    const { location, current } = await weather.fetchCurrentWeather(zipCode);

    const property: Property = {
      id: uuid(),
      city,
      street,
      state,
      zipCode,
      lat: location.lat,
      lon: location.lon,
      weatherData: current,
      creationDate: new Date(Date.now()).toISOString(),
    };

    await database.property.createProperty(property);

    return property;
  };
};

export { addPropertyActionService, type AddPropertyAction };
