// eslint-disable-next-line
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globalSetup: ['./test/integration/global-teardown.ts'],
  },
});
