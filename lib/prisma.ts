import { PrismaClient } from "@prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"
import * as dotenv from "dotenv"

// Force load .env file (system env vars were overriding it)
dotenv.config({ path: ".env", override: true })

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma as any
