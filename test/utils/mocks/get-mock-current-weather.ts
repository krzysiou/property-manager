import type { CurrentWeather } from '../../../src/core/adapters/weather/types';

const getMockCurrentWeather = (): CurrentWeather => ({
  location: {
    lat: '5',
    lon: '-5',
  },
  current: {
    observationTime: '07:24 PM',
    temperature: 22,
    weatherCode: 1,
    windSpeed: 15,
    windDegree: 270,
    windDir: 'W',
    pressure: 1013,
    precip: 0.0,
    humidity: 65,
    cloudcover: 20,
    feelslike: 23,
    uvIndex: 5,
    visibility: 10,
  },
});

export { getMockCurrentWeather };
