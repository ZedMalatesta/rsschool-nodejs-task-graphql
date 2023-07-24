import { GraphQLObjectType } from "graphql";
import { 
  ContextInterface,
  CreateProfileInterface,
  CreatePostInterface,
  CreateUserInterface 
} from '../types/types.js';
import { 
    postType, 
    profileType, 
    userType
 } from "../query/queryTypes.js";
 import {
  createPostInput,
  createProfileInput,
  createUserInput
 } from './inputs.js'
import {
  createUser,
  createPost,
  createProfile
} from './resolvers.js'

export const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      createPost: {
        type: postType,
        args: { dto: { type: createPostInput } },
        resolve: (
          parent, 
          args: CreatePostInterface,
          context:ContextInterface
        ) => createPost(parent, args, context)
      },
      createProfile: {
        type: profileType,
        args: { dto: { type: createProfileInput } },
        resolve: (
          parent, 
          args: CreateProfileInterface,
          context:ContextInterface
        ) => createProfile(parent, args, context)
      },
      createUser: {
        type: userType,
        args: { dto: { type: createUserInput } },
        resolve: (
          parent, 
          args: CreateUserInterface,
          context:ContextInterface
        ) => createUser(parent, args, context)
      },
    }),
});
