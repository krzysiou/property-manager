type WeatherApiConfig = {
  url: string;
  key: string;
};

type Config = {
  port: string;
  weatherApiConfig: WeatherApiConfig;
};

export type { Config };
