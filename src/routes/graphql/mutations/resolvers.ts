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
  