import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

async function unpublishPost() {
    const slug = 'iss-para-prestadores-de-servico-como-calcular-3128'

    const post = await prisma.post.update({
        where: { slug },
        data: { published: false }
    })

    console.log(`✅ Post despublicado: ${post.title}`)
}

unpublishPost()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
