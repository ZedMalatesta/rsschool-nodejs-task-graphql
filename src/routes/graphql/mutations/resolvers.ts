import { 
    ContextInterface,
    CreateProfileInterface,
    CreatePostInterface,
    CreateUserInterface,
    ChangeProfileInterface,
    ChangePostInterface,
    ChangeUserInterface 
  } from '../types/types.js';

export const createPost = async (
    _parent: any,
    args: CreatePostInterface,
    context: ContextInterface
  )=> {
    return context.prisma.post.create({
        data: args.dto,
    });
}

export const createProfile = async (
    _parent: any,
    args: CreateProfileInterface,
    context: ContextInterface
  )=> {
    return context.prisma.profile.create({
        data: args.dto,
    });
}

export const createUser = async (
    _parent: any,
    args: CreateUserInterface,
    context: ContextInterface
  )=> {
    return context.prisma.user.create({
        data: args.dto,
    });
}
  

export const deletePost = async (
    _parent: any,
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
    _parent: any,
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
    _parent: any,
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


export const updatePost = async (
    _parent,
    args: ChangePostInterface,
    context: ContextInterface
  )=> {
    return context.prisma.post.update({
        where: { id: args.id },
        data: args.dto,
    });
}

export const updateProfile = async (
    _parent,
    args: ChangeProfileInterface,
    context: ContextInterface
  )=> {
    return context.prisma.profile.update({
        where: { id: args.id },
        data: args.dto,
    });
}

export const updateUser = async (
    _parent,
    args: ChangeUserInterface,
    context: ContextInterface
  )=> {
    return context.prisma.user.update({
        where: { id: args.id },
        data: args.dto,
    });
}

