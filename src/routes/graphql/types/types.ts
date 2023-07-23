import { HttpError } from "@fastify/sensible/lib/httpError.js"
import { PrismaClient } from "@prisma/client"

export interface ContextInterface {
    prisma: PrismaClient,
    httpError: HttpError
}