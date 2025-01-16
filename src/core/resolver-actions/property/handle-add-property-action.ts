import { v4 as uuid } from 'uuid';

import type { MutationAddPropertyArgs } from '../../../app/modules/types.codegen';
import type { PropertyModule } from '../../../app/modules/property/types.codegen.js';

import { createDatabaseProperty } from '../../database/property/create-database-property.js';
import { getWeatherApiMockResponse } from '../../fetching/mock-api-response.js';

const handleAddPropertyAction = async (args: MutationAddPropertyArgs) => {
  const { city, street, state, zipCode } = args;

  const {
    location: { lon, lat },
    current: {
      observation_time,
      temperature,
      weather_code,
      wind_speed,
      wind_degree,
      wind_dir,
      pressure,
      precip,
      humidity,
      cloudcover,
      feelslike,
      uv_index,
      visibility,
    },
  } = getWeatherApiMockResponse();

  const id = uuid();
  const creationDate = new Date(Date.now()).toISOString();

  const property: PropertyModule.Property = {
    id,
    city,
    street,
    state,
    zipCode,
    lat,
    lon,
    creationDate,
    weatherData: {
      observationTime: observation_time,
      temperature: temperature,
      weatherCode: weather_code,
      windSpeed: wind_speed,
      windDegree: wind_degree,
      windDir: wind_dir,
      pressure: pressure,
      precip: precip,
      humidity: humidity,
      cloudcover: cloudcover,
      feelslike: feelslike,
      uvIndex: uv_index,
      visibility: visibility,
    },
  };

  await createDatabaseProperty(property);

  return property;
};

export { handleAddPropertyAction };
