import type { GraphQLResolveInfo } from 'graphql';
import type { Config } from '../config/types.js';

type Context = {
  config: Config;
};

type ResolverFunction<T = unknown, M = unknown> = (
  parent: object,
  args: T,
  contextValue: Context,
  info: GraphQLResolveInfo
) => M;

type Resolvers = {
  Query?: Record<string, ResolverFunction>;
  Mutation?: Record<string, ResolverFunction>;
  Subscription?: Record<string, ResolverFunction>;
};

type Schema = {
  typeDefs: string;
  resolvers?: Resolvers;
};

export type { Schema, Resolvers, Context, ResolverFunction };
