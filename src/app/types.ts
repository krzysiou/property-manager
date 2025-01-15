import type { GraphQLResolveInfo } from 'graphql';
import type { Config } from '../config/types.js';

type Context = {
  config: Config;
};

type Resolver<T = unknown, M = unknown> = (
  parent: object,
  args: T,
  contextValue: Context,
  info: GraphQLResolveInfo
) => M;

type Resolvers = {
  Query?: Record<string, Resolver>;
  Mutation?: Record<string, Resolver>;
  Subscription?: Record<string, Resolver>;
};

type Schema = {
  typeDefs: string;
  resolvers?: Resolvers;
};

export type { Schema, Resolvers, Context, Resolver };
