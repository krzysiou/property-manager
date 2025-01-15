import type { Resolvers } from '../../types.js';

import { addProperty } from './resolvers/add-property.ts.js';
import { deleteProperty } from './resolvers/delete-property.js';
import { getProperties } from './resolvers/get-properties.js';
import { getProperty } from './resolvers/get-property.js';

const typeDefs = `#graphql
  enum Sort {
    asc
    desc
  }
  
  enum State {
    AL 
    AK
    AZ
    AR
    CA
    CO
    CT
    DE
    FL
    GA
    HI
    ID
    IL
    IN
    IA
    KS
    KY
    LA
    ME
    MD
    MA
    MI
    MN
    MS
    MO
    MT
    NE
    NV
    NH
    NJ
    NM
    NY
    NC
    ND
    OH
    OK
    OR
    PA
    RI
    SC
    SD
    TN
    TX
    UT
    VT
    VA
    WA
    WV
    WI
    WY
  }

  type WeatherData {
    observation_time: String!
    temperature: Int!
    weather_code: Int!
    weather_icons: [String!]!
    weather_descriptions: [String!]!
    wind_speed: Int!
    wind_degree: Int!
    wind_dir: String!
    pressure: Int!
    precip: Int!
    humidity: Int!
    cloudcover: Int!
    feelslike: Int!
    uv_index: Int!
    visibility: Int!
  }
  
  type Property {
    id: ID!
    city: String!
    street: String!
    state: State!
    zipCode: String!
    weatherData: WeatherData!
    lat: String!
    lon: String!
    creationDate: String!
  }

  type Query {
    getProperties(city: String, zipCode: String, state: State, sort: Sort): [Property!]!
    getProperty(id: ID!): Property
  }

  type Mutation {
    addProperty(city: String!, street: String!, state: State!, zipCode: String!): Property!
    deleteProperty(id: ID!): Boolean!
  }
`;

const resolvers: Resolvers = {
  Query: {
    getProperties,
    getProperty,
  },
  Mutation: {
    addProperty,
    deleteProperty,
  },
};

export default { typeDefs, resolvers };
