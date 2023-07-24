import { Type } from '@fastify/type-provider-typebox';
import { GraphQLSchema } from 'graphql';
import { queryType } from './query/queryTypes.js';
import { mutationType } from './mutations/mutations.js';
import { 
  memberTypeEnum,
  memberType,
  postType,
  profileType,
  userType
} from './query/queryTypes.js';
import { 
  changePostInput,
  changeProfileInput,
  changeUserInput,
  createPostInput,
  createProfileInput,
  createUserInput
} from './mutations/inputs.js';


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
  mutation: mutationType,
  types: [
    memberTypeEnum, 
    memberType,
    postType,
    profileType,
    userType,
    changePostInput,
    changeProfileInput,
    changeUserInput,
    createPostInput,
    createProfileInput,
    createUserInput
  ]
});

