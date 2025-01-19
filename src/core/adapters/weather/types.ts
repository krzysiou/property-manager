import type { Fetcher } from '../fetcher/types.js';
import type { Config } from '../../../config/types.js';
import type { Validate } from '../../services/validation/validation-service.js';
import type { Logger } from '../logger/types.js';
import type { ErrorBroker } from '../error-broker/types.js';

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
  logger: Logger;
  errorBroker: ErrorBroker;
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
