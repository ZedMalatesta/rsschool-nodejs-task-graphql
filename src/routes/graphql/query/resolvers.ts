import { ContextInterface } from '../types/types.js';

export const getAllMemberTypes = async (
    _: any,
    _: any,
    context: ContextInterface
  ) => {
    return await context.prisma.memberType.findMany();
};

export const getAllPosts = async (
  _,
  _,
  context: ContextInterface
) => {
  return await context.prisma.post.findMany();
};


