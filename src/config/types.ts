type Env = 'pro' | 'dev' | 'test';

type WeatherApiConfig = {
  url: string;
  key: string;
};

type Config = {
  port: string;
  env: Env;
  weatherApiConfig: WeatherApiConfig;
};

export type { Config, Env };
