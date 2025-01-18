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
  return async (args) => {
    const { city, street, state, zipCode } = args;

    const id = uuid();
    const creationDate = new Date(Date.now()).toISOString();

    const { location, current } = await weather.fetchCurrentWeather(zipCode);

    const property: Property = {
      id,
      city,
      street,
      state,
      zipCode,
      lat: location.lat,
      lon: location.lon,
      weatherData: current,
      creationDate,
    };

    await database.property.createProperty(property);

    return property;
  };
};

export { addPropertyActionService };
