import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';

const DEPTH_LIMIT = 5;

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma, httpErrors } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const queryDoc = parse(req.body.query);
      const validationErrors = validate(schema, queryDoc, [depthLimit(DEPTH_LIMIT)]);

      if (validationErrors?.length > 0) {
        return { data: '', errors: validationErrors };
      }
      else{
        const result = await graphql({
          schema,
          source: req.body.query,
          variableValues: req.body.variables,
          contextValue: {
            prisma,
            httpErrors
          }
        });
        return result;
      }
    },
  });
};

export default plugin;
