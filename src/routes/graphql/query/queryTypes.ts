import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLEnumType,
    GraphQLSchema
} from 'graphql';
import {
  getAllMemberTypes
} from './resolvers.js'
import { ContextInterface } from '../types/types.js';
import { UUIDType } from '../types/uuid.js'; 

const memberTypeEnum = new GraphQLEnumType({
    name: 'memberType',
    description: 'memberType',
    values: {
        BASIC: {
            value: 'basic'
        },
        BUSINESS: {
            value: 'business'
        }
    },
});

const memberType = new GraphQLObjectType({
    name: 'memberType',
    fields: () => ({
      id: { type: new GraphQLNonNull(memberTypeEnum) },
      discount: { type: new GraphQLNonNull(GraphQLInt) },
      monthPostsLimit: { type: new GraphQLNonNull(GraphQLInt) }
    }),
});

const postType = new GraphQLObjectType({
  name: 'memberType',
  fields: () => ({
    id: { type: new GraphQLNonNull(memberTypeEnum) },
    discount: { type: new GraphQLNonNull(GraphQLInt) },
    monthPostsLimit: { type: new GraphQLNonNull(GraphQLInt) },
    monthPostsLimit: { type: new GraphQLNonNull(GraphQLInt) }
  }),
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberTypes: {
      type: new GraphQLList(memberType),
      resolve: (
        _source, 
        args, 
        context:ContextInterface
      ) => getAllMemberTypes(_source, args, context)
    }
  }),
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export const MainQuery: GraphQLSchema = new GraphQLSchema({
  query: queryType,
  types: [memberType],
});
