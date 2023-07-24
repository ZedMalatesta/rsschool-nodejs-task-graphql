import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLFloat,
    GraphQLEnumType
} from 'graphql';
import {
  getAllMemberTypes, 
  getAllPosts,
  getAllProfiles,
  getAllUsers,
  getPostByID,
  getUserByID,
  getPostsByUserID,
  getProfileByUserID,
} from './resolvers.js'
import { ContextInterface } from '../types/types.js';
import { UUIDType } from '../types/uuid.js'; 

const memberTypeEnum = new GraphQLEnumType({
    name: 'memberType',
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
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: UUIDType }
  }),
});

export const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberTypeId: { type: new GraphQLNonNull(memberTypeEnum) },
    userId: { type: UUIDType },
  }),
});

export const userType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    posts: {
      type: new GraphQLList(postType),
      resolve: (
        parent: { userId: string }, 
        args, 
        context:ContextInterface
      ) => getPostsByUserID(parent, args, context)
    },
    proflie: {
      type: profileType,
      resolve: (
        parent: { userId: string }, 
        args, 
        context:ContextInterface
      ) => getProfileByUserID(parent, args, context)
    }
  }),
});

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberTypes: {
      type: new GraphQLList(memberType),
      resolve: (
        parent, 
        args, 
        context:ContextInterface
      ) => getAllMemberTypes(parent, args, context)
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: (
        parent, 
        args, 
        context:ContextInterface
      ) => getAllPosts(parent, args, context)
    },
    post: {
      type: postType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: (
        parent, 
        args: { id:string },
        context:ContextInterface
      ) => getPostByID(parent, args, context)
    },
    profiles:{
      type: new GraphQLList(profileType),
      resolve: (
        parent, 
        args, 
        context:ContextInterface
      ) => getAllProfiles(parent, args, context)
    },
    users: {
      type: new GraphQLList(userType),
      resolve: (
        parent, 
        args, 
        context:ContextInterface
      ) => getAllUsers(parent, args, context)
    },
    user: {
      type: userType,
      args: { userId: { type: new GraphQLNonNull(UUIDType) } },
      resolve: (
        parent, 
        args: { userId:string },
        context:ContextInterface
      ) => getUserByID(parent, args, context)
    }
  }),
});

