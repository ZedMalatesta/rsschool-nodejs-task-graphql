import { Type } from '@fastify/type-provider-typebox';
import { GraphQLSchema } from 'graphql';
import { queryType } from './query/queryTypes.js';
import { 
  memberTypeEnum,
  memberType,
  postType,
  profileType,
  userType
} from './query/queryTypes.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const schema: GraphQLSchema = new GraphQLSchema({
  query: queryType,
  types: [
    memberTypeEnum, 
    memberType,
    postType,
    profileType,
    userType
  ]
});

