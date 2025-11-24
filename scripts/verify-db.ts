import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
    try {
        console.log('Connecting to database...')
        const url = process.env.DATABASE_URL || 'UNDEFINED';
        console.log('URL:', url.substring(0, 20) + '...')
        fs.writeFileSync('db-url.log', url);
        await prisma.$connect()
        console.log('Connection successful!')

        const userCount = await prisma.user.count()
        console.log(`Found ${userCount} users.`)

    } catch (e: any) {
        console.error('Database connection failed:')
        console.error(e)
        fs.writeFileSync('db-error.log', JSON.stringify(e, null, 2) + '\n' + e.toString())
    } finally {
        await prisma.$disconnect()
    }
}

main()
