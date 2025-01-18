import Joi from 'joi';

import type { CurrentWeather, Deps, FetchCurrentWeather } from '../types';
import type { WeatherStackApiResponse } from './types.js';

const initFetchCurrentWeather = ({
  config,
  fetcher,
  validate,
}: Deps): FetchCurrentWeather => {
  const {
    weatherApiConfig: { url, key },
  } = config;

  const locationSchema = Joi.object({
    lat: Joi.string().required(),
    lon: Joi.string().required(),
  }).unknown(true);

  const currentSchema = Joi.object({
    observation_time: Joi.string().required(),
    temperature: Joi.number().required(),
    weather_code: Joi.number().required(),
    wind_speed: Joi.number().required(),
    wind_degree: Joi.number().required(),
    wind_dir: Joi.string().required(),
    pressure: Joi.number().required(),
    precip: Joi.number().required(),
    humidity: Joi.number().required(),
    cloudcover: Joi.number().required(),
    feelslike: Joi.number().required(),
    uv_index: Joi.number().required(),
    visibility: Joi.number().required(),
  }).unknown(true);

  const responseSchema = Joi.object({
    location: locationSchema,
    current: currentSchema,
  }).unknown(true);

  return async (zipCode) => {
    const data = await fetcher.makeGetRequest<WeatherStackApiResponse>(
      `${url}/current?access_key=${key}&query=${zipCode}`
    );

    validate(data, responseSchema);

    const currentWeather: CurrentWeather = {
      location: {
        lat: data.location.lat,
        lon: data.location.lon,
      },
      current: {
        observationTime: data.current.observation_time,
        temperature: data.current.temperature,
        weatherCode: data.current.weather_code,
        windSpeed: data.current.wind_speed,
        windDegree: data.current.wind_degree,
        windDir: data.current.wind_dir,
        pressure: data.current.pressure,
        precip: data.current.precip,
        humidity: data.current.humidity,
        cloudcover: data.current.cloudcover,
        feelslike: data.current.feelslike,
        uvIndex: data.current.uv_index,
        visibility: data.current.visibility,
      },
    };

    return currentWeather;
  };
};

export { initFetchCurrentWeather };
