import { GraphQLObjectType } from "graphql";
import { 
    postType
 } from "../query/queryTypes.js";

export const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      createPost: {
        type: postType,
        args: { dto: { type: CreatePostInputType } },
        resolve: createPost
      },
      createProfile: {
        type: ProfileType,
        args: { dto: { type: CreateProfileInputType } },
        resolve: createProfile
      },
      createUser: {
        type: UserType,
        args: { dto: { type: CreateUserInputType } },
        resolve: CreateUser,
      },
    }),
  });
  