
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

async function verifyPosts() {
    const count = await prisma.post.count({
        where: { published: true }
    })
    console.log(`Total published posts: ${count}`)

    const recent = await prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { title: true, slug: true }
    })

    console.log('Recent posts:')
    recent.forEach(p => console.log(`- ${p.title} (${p.slug})`))
}

verifyPosts()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
