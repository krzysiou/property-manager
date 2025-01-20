import { afterEach } from 'node:test';

import { beforeAll, describe, expect, it, vi } from 'vitest';

import type { Database } from '../../src/core/adapters/database/types.js';
import type { Weather } from '../../src/core/adapters/weather/types.js';
import type { AddPropertyAction } from '../../src/core/services/action-handling/property/add-property-action-service.js';
import type { Validate } from '../../src/core/services/validation/validation-service.js';

import { addPropertyActionService } from '../../src/core/services/action-handling/property/add-property-action-service.js';
import { getMockCurrentWeather } from '../utils/mocks/get-mock-current-weather.js';
import { validationService } from '../../src/core/services/validation/validation-service.js';
import { propertySchema } from '../utils/property-schema.js';

describe('services/add-property-action-service', () => {
  let addPropertyAction: AddPropertyAction;

  let database: Database;
  let weather: Weather;
  let validate: Validate;

  const city = 'mock-city';
  const street = 'mock-street';
  const state = 'NY';
  const zipCode = '12345';

  const mockCurrentWeather = getMockCurrentWeather();

  beforeAll(() => {
    validate = validationService();

    database = {
      purge: vi.fn(),
      property: {
        getProperties: vi.fn(),
        getProperty: vi.fn(),
        deleteProperty: vi.fn(),
        createProperty: vi.fn(),
      },
    };

    weather = {
      fetchCurrentWeather: vi.fn(),
    };

    addPropertyAction = addPropertyActionService({ database, weather });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('calls weather to fetch current weather', async () => {
    vi.mocked(weather.fetchCurrentWeather).mockResolvedValue(
      mockCurrentWeather
    );

    await addPropertyAction({ city, street, state, zipCode });

    expect(weather.fetchCurrentWeather).toHaveBeenCalledWith(zipCode);
  });

  it('calls database to create property', async () => {
    vi.mocked(weather.fetchCurrentWeather).mockResolvedValue(
      mockCurrentWeather
    );

    const mockProperty = await addPropertyAction({
      city,
      street,
      state,
      zipCode,
    });

    expect(database.property.createProperty).toHaveBeenCalledWith(mockProperty);
  });

  it('composes valid property', async () => {
    vi.mocked(weather.fetchCurrentWeather).mockResolvedValue(
      mockCurrentWeather
    );

    const mockProperty = await addPropertyAction({
      city,
      street,
      state,
      zipCode,
    });

    const validationResult = validate(mockProperty, propertySchema);

    expect(validationResult).toBeNull();
  });
});
