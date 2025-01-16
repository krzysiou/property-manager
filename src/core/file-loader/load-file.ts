import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const loadFile = (filePath: string) =>
  readFileSync(resolve(filePath), { encoding: 'utf-8' });

export { loadFile };
