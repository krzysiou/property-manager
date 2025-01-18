import type { WeatherAdapter } from '../types';

import { initFetchCurrentWeather } from './fetch-current-weather.js';

const WeatherAdapter: WeatherAdapter = (deps) => ({
  fetchCurrentWeather: initFetchCurrentWeather(deps),
});

export { WeatherAdapter };
