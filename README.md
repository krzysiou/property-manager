# property-manager

This is a back-end of an application that allows management of records of properties, as GraphQL API. This Api allows querying all properties, filtering them by location, sorting them by date of creation, adding properties and deleting properties records.

## Tech Stack

Main stack:

- `typescript` - code language.
- `node` - runtime environment.
- `@graphql` - querying language for type definitions and schemas.
- `@apollo/server` - framework for handling graphql queries.
- `@graphql-codegen/cli` - codegen which transforms graphql schema definitions into typescript types.
- `@prisma/client` - an ORM used with SQLite to create local databases.
- `axios` - fetching http client.
- `joi` - library used for object validation.
- `uuidv4` - library used to generate UUID's.
- `vitest` - unit and integration testing.

Tool stack:

- `eslint`, `prettier` - enforcing coding style.
- `husky`, `lint-staged`, `commitlint` - enforcing commit style.
- `graphql-modules` - allows codegen to transpile graphql into many modules rather than single file.

## How To Run

1. Make sure you have `Node` version described in `.nvmrc` file. If you have `nvm` installed you can run:<br/>

> ```text
> nvm use
> ```

2. Install `npm` dependencies:<br/>

> ```text
> npm i
> ```

3. Copy `.env.example` and pass your `WEATHER_API_KEY`:<br/>

> ```text
> cp .env.example .env
> ```

4. Create database clients by running:<br/>

> ```text
> npm run db:generate
> ```

5. Build the application:<br/>

> ```text
> npm run build
> ```

6. Start the application:<br/>

> ```text
> npm run start
> ```

## Env Vars

Required:

- `WEATHER_API_KEY`<br/>

  > Api key to Weather Stack API.

Optional:

- `PORT` (defaults to `3000`)<br/>

  > Port which will be used to host application.<br/>

- `ENV` (defaults to `dev`)<br/>

  > Environments `pro` and `dev` use production database, `test` uses testing database.

- `WEATHER_API_URL` (defaults to `https://api.weatherstack.com`)<br/>
  > Url of Weather Stack Api

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
