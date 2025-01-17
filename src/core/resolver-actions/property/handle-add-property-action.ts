import { v4 as uuid } from 'uuid';

import type { MutationAddPropertyArgs } from '../../../app/schemas/types.codegen';
import type { PropertyModule } from '../../../app/schemas/property/types.codegen.js';
import type { Context } from '../../../app/server.js';

import { createDatabaseProperty } from '../../database/property/create-database-property.js';
import { makeGetRequest } from '../../fetching/make-get-request.js';

type Location = {
  lon: string;
  lat: string;
};

type Current = {
  observation_time: string;
  temperature: number;
  weather_code: number;
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
};

type WeatherApiResponse = {
  location: Location;
  current: Current;
};

const handleAddPropertyAction = async (
  args: MutationAddPropertyArgs,
  context: Context
) => {
  const { city, street, state, zipCode } = args;
  const {
    config: {
      weatherApiConfig: { url, key },
    },
  } = context;

  const {
    data: {
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
    },
  } = await makeGetRequest<WeatherApiResponse>(
    `${url}/current?access_key=${key}&query=${zipCode}`
  );

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
