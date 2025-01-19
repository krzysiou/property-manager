import type { CurrentWeather, Deps, FetchCurrentWeather } from '../types.js';
import type { WeatherStackApiResponse } from './types.js';

import { responseSchema } from './api-response.schema.js';

const initFetchCurrentWeather = ({
  config,
  logger,
  errorBroker,
  fetcher,
  validate,
}: Deps): FetchCurrentWeather => {
  const {
    weatherApiConfig: { url, key },
  } = config;

  return async (zipCode) => {
    const data = await fetcher.makeGetRequest<WeatherStackApiResponse>(
      `${url}/current?access_key=${key}&query=${zipCode}`
    );

    const error = validate(data, responseSchema);

    if (error) {
      logger.error(error.message);
      throw errorBroker.validationError(error.message);
    }

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
