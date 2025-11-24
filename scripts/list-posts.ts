import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

async function listPosts() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
            content: true
        }
    })

    console.log(`\n📝 Total de posts publicados: ${posts.length}\n`)

    posts.forEach((post, index) => {
        console.log(`${index + 1}. ${post.title}`)
        console.log(`   Slug: ${post.slug}`)
        console.log(`   Data: ${post.createdAt.toLocaleDateString('pt-BR')}`)
        console.log(`   Tamanho: ${post.content.length} caracteres`)

        // Check for AI patterns
        const aiPatterns = [
            'É importante ressaltar',
            'Vale destacar',
            'É fundamental',
            'Neste artigo',
            'Ao longo deste',
            'Vamos explorar',
            'Primeiramente',
            'Por fim',
            'Em resumo',
            'Portanto'
        ]

        const foundPatterns = aiPatterns.filter(pattern =>
            post.content.includes(pattern)
        )

        if (foundPatterns.length > 0) {
            console.log(`   ⚠️  Padrões de IA encontrados: ${foundPatterns.length}`)
        }

        console.log('')
    })
}

listPosts()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
