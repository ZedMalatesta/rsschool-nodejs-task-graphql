import { ContextInterface } from '../types/types.js';

export const getAllMemberTypes = async (
    _: any,
    args: any,
    context: ContextInterface
  ) => {
    return await context.prisma.memberType.findMany();
};

export const getAllPosts = async (
  _: any,
  args: any,
  context: ContextInterface
) => {
  return await context.prisma.post.findMany();
};

export const getPostByID = async (
  _: any,
  args: { id:string },
  context: ContextInterface
)=> {
  const post = await context.prisma.post.findUnique({
    where: {
      id: args.id,
    },
  });
  if (post === null) {
    throw context.httpErrors.notFound();
  }
  return post;
}


