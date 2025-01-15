import type { Resolvers } from '../../types.js';

import { addProperty } from './resolvers/add-property.js';
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
    temperature: Float!
    weather_code: Int!
    weather_icons: [String!]!
    weather_descriptions: [String!]!
    wind_speed: Float!
    wind_degree: Float!
    wind_dir: String!
    pressure: Float!
    precip: Float!
    humidity: Float!
    cloudcover: Float!
    feelslike: Float!
    uv_index: Float!
    visibility: Float!
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
