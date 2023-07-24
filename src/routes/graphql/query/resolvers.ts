import { ContextInterface } from '../types/types.js';
import { 
  UserInterface,
  ProfileInterface,
  PostInterface, 
  MemberTypeInterface 
} from '../types/types.js';

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

export const getMemberTypeByID = async (
  parent: any,
  args: { id:string },
  context: ContextInterface
)=> {
  const memberType = await context.prisma.memberType.findUnique({
    where: {
      id: args.id,
    },
  });
  return memberType;
}

export const getMemberTypeByParentID = async (
  parent: { memberTypeId: string },
  args: any,
  context: ContextInterface
)=> {
  const memberType = await context.prisma.memberType.findUnique({
    where: {
      id: parent.memberTypeId,
    },
  });
  return memberType;
}

export const getUserByID = async (
  parent: any,
  args: { id:string },
  context: ContextInterface
): Promise<UserInterface> => {
  const user = await context.prisma.user.findUnique({
    where: {
      id: args.id,
    },
  });
  return user as UserInterface;
}

export const getUserSubscribedTo = async (
  parent: { id:string },
  args: any,
  context: ContextInterface
)=> {
  return await context.prisma.user.findMany({
    where: {
      subscribedToUser: {
        some: {
          subscriberId: parent.id,
        },
      },
    },
  });
}

export const getSubscribedToUser = async (
  parent: { id:string },
  args: any,
  context: ContextInterface
)=> {
  return await context.prisma.user.findMany({
    where: {
      userSubscribedTo: {
        some: {
          authorId: parent.id,
        },
      },
    },
  });
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
  return post;
}


export const getPostsByUserID = async (
  parent: { id: string },
  args: any,
  context: ContextInterface
)=> {
  return await context.prisma.post.findMany({
    where: {
      authorId: parent.id,
    },
  });
}

export const getProfileByID = async (
  parent: any,
  args: { id:string },
  context: ContextInterface
)=> {
  const profile = await context.prisma.profile.findUnique({
    where: {
      id: args.id,
    },
  });
  return profile;
}


export const getProfileByUserID = async (
  parent: { id: string },
  args: any,
  context: ContextInterface
)=> {
  const profile = await context.prisma.profile.findUnique({
    where: {
      userId: parent.id,
    },
  });
  return profile;
}




