import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
} from 'graphql-iso-date';

import relay from './relay';

export default () => ({
  schema: `
    scalar JSON
    scalar Date
    scalar Time
    scalar DateTime
  `,
  resolvers: {
    JSON: GraphQLJSON,
    Date: GraphQLDate,
    Time: GraphQLTime,
    DateTime: GraphQLDateTime,
  },
  modules: [relay],
});