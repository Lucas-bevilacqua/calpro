
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.findFirst({
        where: { role: 'ADMIN' }
    })

    if (admin) {
        console.log('Admin found:', admin.email)
    } else {
        console.log('No admin found')
        const users = await prisma.user.findMany()
        console.log('Total users:', users.length)
        if (users.length > 0) {
            console.log('First user email:', users[0].email)
        }
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
