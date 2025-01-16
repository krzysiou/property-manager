import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/app/schemas/**/*.graphql',
  generates: {
    './src/app/schemas/': {
      preset: 'graphql-modules',
      presetConfig: {
        baseTypesPath: './types.codegen.ts',
        filename: 'types.codegen.ts',
      },
      plugins: [
        {
          add: {
            content:
              '/* eslint-disable */\n// THIS FILE HAS BEEN GENERATED, DO NOT EDIT',
          },
        },
        'typescript',
        'typescript-resolvers',
      ],
      config: {
        contextType: '../server#Context',
      },
    },
  },
};
export default config;
