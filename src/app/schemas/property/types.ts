import type { State } from '../types';

type WeatherData = {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
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

type Property = {
  id: string;
  city: string;
  street: string;
  state: State;
  zipCode: string;
  weatherData: WeatherData;
  lat: number;
  long: number;
  creationDate: string;
  updateDate: string;
};

export type { Property, WeatherData };
