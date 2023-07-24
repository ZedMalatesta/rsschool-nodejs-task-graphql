import { 
  GraphQLObjectType,
  GraphQLBoolean
} from "graphql";
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
  createProfile,
  deleteProfile,
  deletePost,
  deleteUser
} from './resolvers.js'
import { UUIDType } from "../types/uuid.js";

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
      deletePost: {
        type: GraphQLBoolean,
        args: { id: { type: UUIDType } },
        resolve: (
          parent, 
          args: { id:string },
          context:ContextInterface
        ) => deletePost(parent, args, context)
      },
      deleteProfile: {
        type: GraphQLBoolean,
        args: { id: { type: UUIDType } },
        resolve: (
          parent, 
          args: { id:string },
          context:ContextInterface
        ) => deleteProfile(parent, args, context)
      },
      deleteUser: {
        type: GraphQLBoolean,
        args: { id: { type: UUIDType } },
        resolve: (
          parent, 
          args: { id:string },
          context:ContextInterface
        ) => deleteUser(parent, args, context)
      },
    }),
    
});
