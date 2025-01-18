import type { CurrentWeather, Deps, FetchCurrentWeather } from '../types';
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

    const { data: validData, error } = validate(data, responseSchema);

    if (error) {
      logger.error(error.message);
      errorBroker.throwValidationError(error.message);
    }

    const currentWeather: CurrentWeather = {
      location: {
        lat: validData.location.lat,
        lon: validData.location.lon,
      },
      current: {
        observationTime: validData.current.observation_time,
        temperature: validData.current.temperature,
        weatherCode: validData.current.weather_code,
        windSpeed: validData.current.wind_speed,
        windDegree: validData.current.wind_degree,
        windDir: validData.current.wind_dir,
        pressure: validData.current.pressure,
        precip: validData.current.precip,
        humidity: validData.current.humidity,
        cloudcover: validData.current.cloudcover,
        feelslike: validData.current.feelslike,
        uvIndex: validData.current.uv_index,
        visibility: validData.current.visibility,
      },
    };

    return currentWeather;
  };
};

export { initFetchCurrentWeather };
