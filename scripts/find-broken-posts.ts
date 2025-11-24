import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

async function findAndUnpublishBrokenPosts() {
    console.log('🔍 Buscando todos os posts publicados...\n')

    const posts = await prisma.post.findMany({
        where: { published: true },
        select: { id: true, slug: true, title: true, content: true }
    })

    console.log(`📝 Encontrados ${posts.length} posts publicados\n`)

    const problematicPosts: string[] = []

    // Padrões que causam erro MDX
    const mdxErrorPatterns = [
        /\{[^}]*\n/,  // Chaves com quebra de linha
        /\$\{/,       // Template literals
        /<[^>]*\n/,   // Tags HTML quebradas
    ]

    for (const post of posts) {
        let hasError = false

        // Verificar padrões problemáticos
        for (const pattern of mdxErrorPatterns) {
            if (pattern.test(post.content)) {
                hasError = true
                break
            }
        }

        if (hasError) {
            problematicPosts.push(post.slug)
            console.log(`❌ Erro encontrado: ${post.title}`)
            console.log(`   Slug: ${post.slug}\n`)
        }
    }

    if (problematicPosts.length === 0) {
        console.log('✅ Nenhum post com erro encontrado!')
        return
    }

    console.log(`\n🔧 Despublicando ${problematicPosts.length} posts...\n`)

    for (const slug of problematicPosts) {
        await prisma.post.update({
            where: { slug },
            data: { published: false }
        })
        console.log(`✅ Despublicado: ${slug}`)
    }

    const remainingPublished = await prisma.post.count({
        where: { published: true }
    })

    console.log(`\n📊 Posts publicados restantes: ${remainingPublished}`)
    console.log(`📊 Posts despublicados: ${problematicPosts.length}`)
}

findAndUnpublishBrokenPosts()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
