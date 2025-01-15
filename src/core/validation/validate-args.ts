import { GraphQLError } from 'graphql';

import type Joi from 'joi';

const validateArgs = (args: unknown, validationSchema: Joi.ObjectSchema) => {
  const { error } = validationSchema.validate(args);

  if (error) {
    throw new GraphQLError(error.message, {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
};

export { validateArgs };
