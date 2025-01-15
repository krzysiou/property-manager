import type { Schema } from './types';

import CommonSchema from './schemas/common.js';
import PropertySchema from './schemas/property/schema.js';

const mountedSchemas: Schema[] = [CommonSchema, PropertySchema];

export { mountedSchemas };
