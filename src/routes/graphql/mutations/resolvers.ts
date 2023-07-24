import { 
    ContextInterface,
    CreatePostInterface,
    CreateProfileInterface,
    CreateUserInterface,
} from "../types/types.js";

export const createPost = async (
    parent: any,
    args: CreatePostInterface,
    context: ContextInterface
  )=> {
    return context.prisma.post.create({
        data: args.dto,
    });
}

export const createProfile = async (
    parent: any,
    args: CreateProfileInterface,
    context: ContextInterface
  )=> {
    return context.prisma.profile.create({
        data: args.dto,
    });
}

export const createUser = async (
    parent: any,
    args: CreateUserInterface,
    context: ContextInterface
  )=> {
    return context.prisma.user.create({
        data: args.dto,
    });
}
  

export const deletePost = async (
    parent: any,
    args: { id:string },
    context: ContextInterface
  )=> {
    try{
        await context.prisma.post.delete({
            where: {
              id: args.id,
            },
        });
    }
    catch(err) { return false }
    return true
}

export const deleteProfile = async (
    parent: any,
    args: { id:string },
    context: ContextInterface
  )=> {
    try{
        await context.prisma.profile.delete({
            where: {
              id: args.id,
            },
        });
    }
    catch(err) { return false }
    return true
}

export const deleteUser = async (
    parent: any,
    args: { id:string },
    context: ContextInterface
  )=> {
    try{
        await context.prisma.user.delete({
            where: {
              id: args.id,
            },
        });
    }
    catch(err) { return false }
    return true
}