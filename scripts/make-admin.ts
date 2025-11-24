import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import * as dotenv from 'dotenv'

// Force load .env file
dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient

async function main() {
    const email = process.argv[2]

    if (!email) {
        console.error('Usage: npx tsx scripts/make-admin.ts <email>')
        process.exit(1)
    }

    try {
        const user = await (prisma.user as any).update({
            where: { email },
            data: { role: 'ADMIN' }
        })

        console.log(`✅ User ${user.email} is now an ADMIN!`)
    } catch (e: any) {
        console.error('Error:', e.message)
    } finally {
        await prisma.$disconnect()
    }
}

main()
