import { 
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLNonNull
} from "graphql";
import { 
  ContextInterface,
  CreateProfileInterface,
  CreatePostInterface,
  CreateUserInterface,
  ChangeProfileInterface,
  ChangePostInterface,
  ChangeUserInterface 
} from '../types/types.js';
import { 
    postType, 
    profileType, 
    userType
 } from "../query/queryTypes.js";
 import {
  createPostInput,
  createProfileInput,
  createUserInput,
  changePostInput,
  changeProfileInput,
  changeUserInput
 } from './inputs.js'
import {
  createUser,
  createPost,
  createProfile,
  deleteProfile,
  deletePost,
  deleteUser,
  updatePost,
  updateProfile,
  updateUser,
  subscribeUser,
  unsubscribeFrom
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
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: (
          parent, 
          args: { id:string },
          context:ContextInterface
        ) => deletePost(parent, args, context)
      },
      deleteProfile: {
        type: GraphQLBoolean,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: (
          parent, 
          args: { id:string },
          context:ContextInterface
        ) => deleteProfile(parent, args, context)
      },
      deleteUser: {
        type: GraphQLBoolean,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: (
          parent, 
          args: { id:string },
          context:ContextInterface
        ) => deleteUser(parent, args, context)
      },
      changePost: {
        type: postType,
        args: { 
          id: { type: new GraphQLNonNull(UUIDType) },
          dto: { type: changePostInput } 
        },
        resolve: (
          parent, 
          args: ChangePostInterface,
          context:ContextInterface
        ) => updatePost(parent, args, context)
      },
      changeProfile: {
        type: profileType,
        args: { 
          id: { type: new GraphQLNonNull(UUIDType) },
          dto: { type: changeProfileInput } 
        },
        resolve: (
          parent, 
          args: ChangeProfileInterface,
          context:ContextInterface
        ) => updateProfile(parent, args, context)
      },
      changeUser: {
        type: userType,
        args: { 
          id: { type: new GraphQLNonNull(UUIDType) },
          dto: { type: changeUserInput } 
        },
        resolve: (
          parent, 
          args: ChangeUserInterface,
          context:ContextInterface
        ) => updateUser(parent, args, context)
      },
      subscribeTo: {
        type: userType,
        args: { 
          userId: { type: new GraphQLNonNull(UUIDType) }, 
          authorId: { type: new GraphQLNonNull(UUIDType) } 
        },
        resolve: (
          parent, 
          args: { 
            userId: string,
            authorId: string
          },
          context:ContextInterface
        ) => subscribeUser(parent, args, context)
      },
      unsubscribeFrom: {
        type: GraphQLBoolean,
        args: { 
          userId: { type: new GraphQLNonNull(UUIDType) }, 
          authorId: { type: new GraphQLNonNull(UUIDType) } 
        },
        resolve: (
          parent, 
          args: { 
            userId: string,
            authorId: string
          },
          context:ContextInterface
        ) => unsubscribeFrom(parent, args, context)
      },
    }),
    
});
