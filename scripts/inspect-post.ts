import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

async function inspectPost() {
    const slug = 'iss-para-prestadores-de-servico-como-calcular-3128'
    const post = await prisma.post.findUnique({
        where: { slug }
    })

    if (post) {
        fs.writeFileSync('temp_post_content.md', post.content)
        console.log('Content saved to temp_post_content.md')
    } else {
        console.log('Post not found')
    }
}

inspectPost()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
