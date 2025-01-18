/* eslint-disable */
// THIS FILE HAS BEEN GENERATED, DO NOT EDIT
import * as Types from '../types.codegen';
import * as gm from 'graphql-modules';
export namespace PropertyModule {
  interface DefinedFields {
    WeatherData:
      | 'observationTime'
      | 'temperature'
      | 'weatherCode'
      | 'windSpeed'
      | 'windDegree'
      | 'windDir'
      | 'pressure'
      | 'precip'
      | 'humidity'
      | 'cloudcover'
      | 'feelslike'
      | 'uvIndex'
      | 'visibility';
    Property:
      | 'id'
      | 'city'
      | 'street'
      | 'state'
      | 'zipCode'
      | 'weatherData'
      | 'lat'
      | 'lon'
      | 'creationDate';
    Metadata: 'offset' | 'limit';
    PropertiesWithMetadata: 'properties' | 'metadata';
    Query: 'getProperties' | 'getProperty';
    Mutation: 'addProperty' | 'deleteProperty';
  }

  interface DefinedEnumValues {
    Sort: 'asc' | 'desc';
    State:
      | 'AL'
      | 'AK'
      | 'AZ'
      | 'AR'
      | 'CA'
      | 'CO'
      | 'CT'
      | 'DE'
      | 'FL'
      | 'GA'
      | 'HI'
      | 'ID'
      | 'IL'
      | 'IN'
      | 'IA'
      | 'KS'
      | 'KY'
      | 'LA'
      | 'ME'
      | 'MD'
      | 'MA'
      | 'MI'
      | 'MN'
      | 'MS'
      | 'MO'
      | 'MT'
      | 'NE'
      | 'NV'
      | 'NH'
      | 'NJ'
      | 'NM'
      | 'NY'
      | 'NC'
      | 'ND'
      | 'OH'
      | 'OK'
      | 'OR'
      | 'PA'
      | 'RI'
      | 'SC'
      | 'SD'
      | 'TN'
      | 'TX'
      | 'UT'
      | 'VT'
      | 'VA'
      | 'WA'
      | 'WV'
      | 'WI'
      | 'WY';
  }

  export type Sort = DefinedEnumValues['Sort'];
  export type State = DefinedEnumValues['State'];
  export type WeatherData = Pick<
    Types.WeatherData,
    DefinedFields['WeatherData']
  >;
  export type Property = Pick<Types.Property, DefinedFields['Property']>;
  export type Metadata = Pick<Types.Metadata, DefinedFields['Metadata']>;
  export type PropertiesWithMetadata = Pick<
    Types.PropertiesWithMetadata,
    DefinedFields['PropertiesWithMetadata']
  >;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;

  export type WeatherDataResolvers = Pick<
    Types.WeatherDataResolvers,
    DefinedFields['WeatherData'] | '__isTypeOf'
  >;
  export type PropertyResolvers = Pick<
    Types.PropertyResolvers,
    DefinedFields['Property'] | '__isTypeOf'
  >;
  export type MetadataResolvers = Pick<
    Types.MetadataResolvers,
    DefinedFields['Metadata'] | '__isTypeOf'
  >;
  export type PropertiesWithMetadataResolvers = Pick<
    Types.PropertiesWithMetadataResolvers,
    DefinedFields['PropertiesWithMetadata'] | '__isTypeOf'
  >;
  export type QueryResolvers = Pick<
    Types.QueryResolvers,
    DefinedFields['Query']
  >;
  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields['Mutation']
  >;

  export interface Resolvers {
    WeatherData?: WeatherDataResolvers;
    Property?: PropertyResolvers;
    Metadata?: MetadataResolvers;
    PropertiesWithMetadata?: PropertiesWithMetadataResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
  }

  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    WeatherData?: {
      '*'?: gm.Middleware[];
      observationTime?: gm.Middleware[];
      temperature?: gm.Middleware[];
      weatherCode?: gm.Middleware[];
      windSpeed?: gm.Middleware[];
      windDegree?: gm.Middleware[];
      windDir?: gm.Middleware[];
      pressure?: gm.Middleware[];
      precip?: gm.Middleware[];
      humidity?: gm.Middleware[];
      cloudcover?: gm.Middleware[];
      feelslike?: gm.Middleware[];
      uvIndex?: gm.Middleware[];
      visibility?: gm.Middleware[];
    };
    Property?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      city?: gm.Middleware[];
      street?: gm.Middleware[];
      state?: gm.Middleware[];
      zipCode?: gm.Middleware[];
      weatherData?: gm.Middleware[];
      lat?: gm.Middleware[];
      lon?: gm.Middleware[];
      creationDate?: gm.Middleware[];
    };
    Metadata?: {
      '*'?: gm.Middleware[];
      offset?: gm.Middleware[];
      limit?: gm.Middleware[];
    };
    PropertiesWithMetadata?: {
      '*'?: gm.Middleware[];
      properties?: gm.Middleware[];
      metadata?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      getProperties?: gm.Middleware[];
      getProperty?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      addProperty?: gm.Middleware[];
      deleteProperty?: gm.Middleware[];
    };
  }
}
