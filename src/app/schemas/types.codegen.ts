/* eslint-disable */
// THIS FILE HAS BEEN GENERATED, DO NOT EDIT
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  addProperty: Property;
  deleteProperty: Scalars['Boolean']['output'];
};

export type MutationAddPropertyArgs = {
  city: Scalars['String']['input'];
  state: State;
  street: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export type MutationDeletePropertyArgs = {
  id: Scalars['ID']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
};

export type PropertiesWithPageInfo = {
  __typename?: 'PropertiesWithPageInfo';
  pageInfo: PageInfo;
  properties: Array<Property>;
};

export type Property = {
  __typename?: 'Property';
  city: Scalars['String']['output'];
  creationDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lat: Scalars['String']['output'];
  lon: Scalars['String']['output'];
  state: State;
  street: Scalars['String']['output'];
  weatherData: WeatherData;
  zipCode: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getProperties: PropertiesWithPageInfo;
  getProperty?: Maybe<Property>;
};


export type QueryGetPropertiesArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Sort>;
  state?: InputMaybe<State>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetPropertyArgs = {
  id: Scalars['ID']['input'];
};

export type Sort =
  | 'asc'
  | 'desc';

export type State =
  | 'AK'
  | 'AL'
  | 'AR'
  | 'AZ'
  | 'CA'
  | 'CO'
  | 'CT'
  | 'DE'
  | 'FL'
  | 'GA'
  | 'HI'
  | 'IA'
  | 'ID'
  | 'IL'
  | 'IN'
  | 'KS'
  | 'KY'
  | 'LA'
  | 'MA'
  | 'MD'
  | 'ME'
  | 'MI'
  | 'MN'
  | 'MO'
  | 'MS'
  | 'MT'
  | 'NC'
  | 'ND'
  | 'NE'
  | 'NH'
  | 'NJ'
  | 'NM'
  | 'NV'
  | 'NY'
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
  | 'VA'
  | 'VT'
  | 'WA'
  | 'WI'
  | 'WV'
  | 'WY';

export type WeatherData = {
  __typename?: 'WeatherData';
  cloudcover: Scalars['Float']['output'];
  feelslike: Scalars['Float']['output'];
  humidity: Scalars['Float']['output'];
  observationTime: Scalars['String']['output'];
  precip: Scalars['Float']['output'];
  pressure: Scalars['Float']['output'];
  temperature: Scalars['Float']['output'];
  uvIndex: Scalars['Float']['output'];
  visibility: Scalars['Float']['output'];
  weatherCode: Scalars['Int']['output'];
  windDegree: Scalars['Float']['output'];
  windDir: Scalars['String']['output'];
  windSpeed: Scalars['Float']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PropertiesWithPageInfo: ResolverTypeWrapper<PropertiesWithPageInfo>;
  Property: ResolverTypeWrapper<Property>;
  Query: ResolverTypeWrapper<{}>;
  Sort: Sort;
  State: State;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  WeatherData: ResolverTypeWrapper<WeatherData>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  PageInfo: PageInfo;
  PropertiesWithPageInfo: PropertiesWithPageInfo;
  Property: Property;
  Query: {};
  String: Scalars['String']['output'];
  WeatherData: WeatherData;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addProperty?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationAddPropertyArgs, 'city' | 'state' | 'street' | 'zipCode'>>;
  deleteProperty?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePropertyArgs, 'id'>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PropertiesWithPageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PropertiesWithPageInfo'] = ResolversParentTypes['PropertiesWithPageInfo']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  properties?: Resolver<Array<ResolversTypes['Property']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PropertyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Property'] = ResolversParentTypes['Property']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lat?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['State'], ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  weatherData?: Resolver<ResolversTypes['WeatherData'], ParentType, ContextType>;
  zipCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getProperties?: Resolver<ResolversTypes['PropertiesWithPageInfo'], ParentType, ContextType, Partial<QueryGetPropertiesArgs>>;
  getProperty?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType, RequireFields<QueryGetPropertyArgs, 'id'>>;
};

export type WeatherDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['WeatherData'] = ResolversParentTypes['WeatherData']> = {
  cloudcover?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  feelslike?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  humidity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  observationTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  precip?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  pressure?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  temperature?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  uvIndex?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  weatherCode?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  windDegree?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  windDir?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  windSpeed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PropertiesWithPageInfo?: PropertiesWithPageInfoResolvers<ContextType>;
  Property?: PropertyResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  WeatherData?: WeatherDataResolvers<ContextType>;
};

