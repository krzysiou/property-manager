// eslint-disable-next-line
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globalSetup: ['./test/global-teardown.ts'],
  },
});
