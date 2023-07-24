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
  getMemberTypeByID,
  getMemberTypeByParentID,
  getPostByID,
  getUserByID,
  getPostsByUserID,
  getProfileByUserID,
  getProfileByID,
  getSubscribedToUser,
  getUserSubscribedTo
} from './resolvers.js'
import { ContextInterface } from '../types/types.js';
import { UUIDType } from '../types/uuid.js'; 

export const memberTypeEnum = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
      basic: {
            value: 'basic'
        },
        business: {
            value: 'business'
        }
    },
});

export const memberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
      id: { type: new GraphQLNonNull(memberTypeEnum) },
      discount: { type: new GraphQLNonNull(GraphQLFloat) },
      postsLimitPerMonth: { type: GraphQLInt },
    }),
});

export const postType = new GraphQLObjectType({
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
    memberType: {
      type: memberType,
      resolve: (
        parent: { memberTypeId: string }, 
        args, 
        context:ContextInterface
      ) => getMemberTypeByParentID(parent, args, context)
    },
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
        parent: { id: string }, 
        args, 
        context:ContextInterface
      ) => getPostsByUserID(parent, args, context)
    },
    profile: {
      type: profileType,
      resolve: (
        parent: { id: string }, 
        args, 
        context:ContextInterface
      ) => getProfileByUserID(parent, args, context)
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: (
        parent: { id: string }, 
        args, 
        context:ContextInterface
      ) => getUserSubscribedTo(parent, args, context)
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: (
        parent: { id: string }, 
        args, 
        context:ContextInterface
      ) => getSubscribedToUser(parent, args, context)
    },
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
    memberType: {
      type: memberType,
      args: { id: { type: memberTypeEnum } },
      resolve: (
        parent, 
        args: { id:any },
        context:ContextInterface
      ) => getMemberTypeByID(parent, args, context)
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
    profile: {
      type: profileType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: (
        parent, 
        args: { id:string },
        context:ContextInterface
      ) => getProfileByID(parent, args, context)
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
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: (
        parent, 
        args: { id:string },
        context:ContextInterface
      ) => getUserByID(parent, args, context)
    }
  }),
});

