import type { Fetcher } from '../fetcher/types';
import type { Config } from '../../../config/types.js';
import type { Validate } from '../../services/validation/validation-service.js';

type CurrentWeather = {
  location: {
    lat: string;
    lon: string;
  };
  current: {
    observationTime: string;
    temperature: number;
    weatherCode: number;
    windSpeed: number;
    windDegree: number;
    windDir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uvIndex: number;
    visibility: number;
  };
};

type Deps = {
  config: Config;
  fetcher: Fetcher;
  validate: Validate;
};

type FetchCurrentWeather = (zipCode: string) => Promise<CurrentWeather>;

type Weather = {
  fetchCurrentWeather: FetchCurrentWeather;
};

type WeatherAdapter = (deps: Deps) => Weather;

export type {
  WeatherAdapter,
  Weather,
  Deps,
  FetchCurrentWeather,
  CurrentWeather,
};
