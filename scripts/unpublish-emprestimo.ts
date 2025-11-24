import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

const slug = 'emprestimo-pessoal-como-calcular-juros-e-parcelas-7124'

async function unpublish() {
    const post = await prisma.post.update({
        where: { slug },
        data: { published: false }
    })
    console.log(`✅ Despublicado: ${post.title}`)

    const count = await prisma.post.count({ where: { published: true } })
    console.log(`📊 Posts publicados: ${count}`)
}

unpublish()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
