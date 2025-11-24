import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

// Posts com erro MDX identificados
const PROBLEMATIC_SLUGS = [
    'financiamento-imobiliario-como-calcular-parcelas-e-escolher-a-melhor-opcao',
    'iss-para-prestadores-de-servico-como-calcular-3128',
    'como-a-inflacao-afeta-seu-dinheiro-calculadora-pratica-1856',
    'emprestimo-pessoal-como-calcular-juros-e-parcelas-7124'
]

async function unpublishProblematicPosts() {
    console.log('🔍 Despublicando posts com erro MDX...\n')

    for (const slug of PROBLEMATIC_SLUGS) {
        try {
            const post = await prisma.post.update({
                where: { slug },
                data: { published: false }
            })
            console.log(`✅ Despublicado: ${post.title}`)
        } catch (error) {
            console.log(`⏭️  Post não encontrado: ${slug}`)
        }
    }

    // Contar posts publicados
    const publishedCount = await prisma.post.count({
        where: { published: true }
    })

    console.log(`\n📊 Total de posts publicados: ${publishedCount}`)
}

unpublishProblematicPosts()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
