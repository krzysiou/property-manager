import type { Resolvers } from '../../types.js';

import { getProperties } from './resolvers/get-properties.js';
import { getProperty } from './resolvers/get-property.js';

const typeDefs = `#graphql
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
    state: String!
    zipCode: String!
    weatherData: WeatherData!
    lat: Float!
    long: Float!
    creationDate: String!
    updateDate: String!
  }

  type Query {
    getProperties(city: String, zipCode: String, state: String, sort: Sort): [Property!]!
    getProperty(id: ID!): Property
  }

  type Mutation {
    addProperty(city: String!, street: String!, state: String!, zipCode: String!): Property!
    deleteProperty(id: ID!): Boolean!
  }
`;

const resolvers: Resolvers = {
  Query: {
    getProperties,
    getProperty,
  },
};

export default { typeDefs, resolvers };
