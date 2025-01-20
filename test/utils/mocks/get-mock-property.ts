import type {
  Property,
  State,
} from '../../../src/app/schemas/types.codegen.js';

const getMockProperty = (
  mockId: string = 'mock-id',
  mockCity: string = 'mock-city',
  mockStreet: string = 'mock-street',
  mockState: State = 'NY',
  mockZipCode: string = '12345',
  mockCreationDate: string = '2025-01-18T19:26:20.965Z'
): Property => ({
  id: mockId,
  city: mockCity,
  street: mockStreet,
  state: mockState,
  zipCode: mockZipCode,
  lat: '5',
  lon: '-5',
  creationDate: mockCreationDate,
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
