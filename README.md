# property-manager

## How to run

1. Make sure you have `Node` version described in `.nvmrc` file. If you have `nvm` installed you can run:

```text
nvm use
```

2. Install `npm` dependencies:

```text
npm i
```

3. Copy `.env.example` and pass your `WEATHER_API_KEY`

```text
cp .env.example .env
```

4. Create database clients by running

```text
npm run db:generate
```

5. Build the application

```text
npm run build
```

6. Start the application

```text
npm run start
```

## Additional npm scripts

- `build` - builds the application
- `start` - starts the application in production mode (requires `build`, `localhost:3000` by default)
- `dev` - starts the application in development mode (`localhost:3000` by default)
- `test` - tests the application
- `codegen` - generates `types.codegen.ts` files from `*.graphql` files
- `db:dev` - opens production database web interface (`localhost:5555` by default)
- `db:dev-test` - opens testing database web interface (`localhost:5555` by default)
- `db:generate` - generates production and testing database clients
- `clean` - removes `dist/` directory
- `clean:codegen` - removes all files generated with codegen
- `lint` - runs linter
- `lint:fix` - fixes code according to linter
- `typecheck` - checks type safety
