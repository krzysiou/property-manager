import type { Property } from '../../src/app/schemas/types.codegen.js';

const getMockProperty = (mockId: string = 'mock-id'): Property => ({
  id: mockId,
  city: 'mock-city',
  street: 'mock-street',
  state: 'NY',
  zipCode: '12345',
  lat: '5',
  lon: '-5',
  creationDate: '2025-01-18T19:26:20.965Z',
  weatherData: {
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

export { getMockProperty };
