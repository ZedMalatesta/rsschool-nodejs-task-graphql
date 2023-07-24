import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLFloat,
    GraphQLEnumType
} from 'graphql';
import { memberTypeEnum } from '../query/queryTypes.js';
import { UUIDType } from '../types/uuid.js'; 

export const createPostInput = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: () => ({
      authorId: { type: new GraphQLNonNull(UUIDType) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      content: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

export const createProfileInput = new GraphQLInputObjectType({
    name: 'CreateProfileInput',
    fields: () => ({
      userId: { type: new GraphQLNonNull(UUIDType) },
      memberTypeId: { type: new GraphQLNonNull(memberTypeEnum) },
      isMale: { type: GraphQLBoolean },
      yearOfBirth: { type: GraphQLInt },
    }),
});

export const createUserInput = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: () => ({
      name: { type: new GraphQLNonNull(GraphQLString) },
      balance: { type: new GraphQLNonNull(GraphQLFloat) },
    })
});