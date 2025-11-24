import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

async function unpublishPost() {
    const slug = 'financiamento-imobiliario-como-calcular-parcelas-e-escolher-a-melhor-opcao'

    const updated = await prisma.post.update({
        where: { slug },
        data: { published: false }
    })

    console.log(`Unpublished post: ${updated.title}`)
    console.log(`Slug: ${updated.slug}`)
}

unpublishPost()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
