import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLFloat,
    GraphQLEnumType
} from 'graphql';
import {
  getAllMemberTypes, 
  getAllPosts,
  getPostByID
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
    name: 'MemberType',
    fields: () => ({
      id: { type: new GraphQLNonNull(memberTypeEnum) },
      discount: { type: new GraphQLNonNull(GraphQLFloat) },
      monthPostsLimit: { type: GraphQLInt },
    }),
});

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) }
  }),
});


export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberTypes: {
      type: new GraphQLList(memberType),
      resolve: (
        _source, 
        args, 
        context:ContextInterface
      ) => getAllMemberTypes(_source, args, context)
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: (
        _source, 
        args, 
        context:ContextInterface
      ) => getAllPosts(_source, args, context)
    },
    post: {
      type: postType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: (
        _source, 
        args,
        context:ContextInterface
      ) => getPostByID(_source, args, context)
    }
  }),
});

