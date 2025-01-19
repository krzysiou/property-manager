import { beforeAll, describe, expect, it } from 'vitest';
import Joi from 'joi';

import type { Validate } from '../../src/core/services/validation/validation-service.js';

import { validationService } from '../../src/core/services/validation/validation-service.js';

describe('services/validation-service', () => {
  let validate: Validate;

  beforeAll(() => {
    validate = validationService();
  });

  it('returns null when object is valid', async () => {
    const objectToValidate = {
      name: 'mock-name',
    };

    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const validationResult = validate(objectToValidate, schema);

    expect(validationResult).toBeNull();
  });

  it('returns error when object is invalid', async () => {
    const objectToValidate = {
      surname: 'mock-surname',
    };

    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const validationResult = validate(objectToValidate, schema);

    expect(validationResult).toBeInstanceOf(Error);
  });
});
