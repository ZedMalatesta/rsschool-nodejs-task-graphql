import { ContextInterface } from '../types/types.js';

export const getAllMemberTypes = async (
    parent: any,
    args: any,
    context: ContextInterface
  ) => {
    return await context.prisma.memberType.findMany();
};

export const getAllProfiles = async (
  parent: any,
  args: any,
  context: ContextInterface
) => {
  return await context.prisma.profile.findMany();
};

export const getAllPosts = async (
  parent: any,
  args: any,
  context: ContextInterface
) => {
  return await context.prisma.post.findMany();
};

export const getAllUsers = async (
  parent: any,
  args: any,
  context: ContextInterface
) => {
  return await context.prisma.user.findMany();
};

export const getUserByID = async (
  parent: any,
  args: { userId:string },
  context: ContextInterface
)=> {
  const user = await context.prisma.user.findUnique({
    where: {
      id: args.userId,
    },
  });
  if (user === null) {
    throw context.httpErrors.notFound();
  }
  return user;
}


export const getPostByID = async (
  parent: any,
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


export const getPostsByUserID = async (
  parent: { userId: string },
  args: any,
  context: ContextInterface
)=> {
  return await context.prisma.post.findMany({
    where: {
      authorId: parent.userId,
    },
  });
}

export const getProfileByUserID = async (
  parent: { userId: string },
  args: any,
  context: ContextInterface
)=> {
  const profile = await context.prisma.profile.findUnique({
    where: {
      userId: parent.userId,
    },
  });
  if (profile === null) {
    throw context.httpErrors.notFound();
  }
  return profile;
}




