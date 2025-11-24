import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

async function keepOnlyOriginalPosts() {
    console.log('🔍 Identificando posts originais vs novos...\n')

    // Pegar todos os posts
    const allPosts = await prisma.post.findMany({
        orderBy: { createdAt: 'asc' },
        select: { id: true, slug: true, title: true, createdAt: true, published: true }
    })

    console.log(`📝 Total de posts no banco: ${allPosts.length}\n`)

    // Os primeiros 9 posts são os originais (que funcionam)
    const originalPosts = allPosts.slice(0, 9)
    const newPosts = allPosts.slice(9)

    console.log(`✅ Posts originais (mantendo publicados): ${originalPosts.length}`)
    originalPosts.forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.title}`)
    })

    console.log(`\n❌ Posts novos (despublicando): ${newPosts.length}`)
    newPosts.forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.title}`)
    })

    // Despublicar todos os posts novos
    console.log(`\n🔧 Despublicando ${newPosts.length} posts novos...\n`)

    for (const post of newPosts) {
        await prisma.post.update({
            where: { id: post.id },
            data: { published: false }
        })
        console.log(`✅ Despublicado: ${post.title}`)
    }

    // Garantir que os originais estão publicados
    for (const post of originalPosts) {
        if (!post.published) {
            await prisma.post.update({
                where: { id: post.id },
                data: { published: true }
            })
            console.log(`✅ Republicado: ${post.title}`)
        }
    }

    const publishedCount = await prisma.post.count({
        where: { published: true }
    })

    console.log(`\n📊 Posts publicados finais: ${publishedCount}`)
    console.log(`📊 Posts despublicados: ${newPosts.length}`)
}

keepOnlyOriginalPosts()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
