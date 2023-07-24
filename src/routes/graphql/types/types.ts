import { HttpErrors } from "@fastify/sensible/lib/httpError.js"
import { PrismaClient } from "@prisma/client"


export interface ContextInterface {
    prisma: PrismaClient,
    httpErrors: HttpErrors
}

export interface UserInterface {
    id: string;
    name: string;
    balance: number;
}

export interface ProfileInterface {
    id: string;
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    memberTypeId: string;
};

export interface PostInterface {
    id: string;
    title: string;
    content: string;
    authorId: string;
}

export interface MemberTypeInterface {
    id: string;
    discount: number;
    postsLimitPerMonth: number;
  };
  
  