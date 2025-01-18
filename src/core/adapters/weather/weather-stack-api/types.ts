type Location = {
  lat: string;
  lon: string;
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

type WeatherStackApiResponse = {
  location: Location;
  current: Current;
};

export type { WeatherStackApiResponse };
