import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import { serialize } from 'next-mdx-remote/serialize'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

async function findAllMDXErrors() {
    console.log('🔍 Verificando todos os posts publicados...\n')

    const posts = await prisma.post.findMany({
        where: { published: true },
        select: { id: true, slug: true, title: true, content: true }
    })

    console.log(`📊 Total de posts publicados: ${posts.length}\n`)

    const problematicPosts = []

    for (const post of posts) {
        try {
            await serialize(post.content)
            process.stdout.write('.')
        } catch (error) {
            problematicPosts.push(post)
            console.log(`\n❌ Erro em: ${post.slug}`)
        }
    }

    console.log('\n\n📋 Posts com erro MDX:')
    for (const post of problematicPosts) {
        console.log(`  - ${post.slug}`)
    }

    if (problematicPosts.length > 0) {
        console.log(`\n🔧 Despublicando ${problematicPosts.length} posts...`)

        for (const post of problematicPosts) {
            await prisma.post.update({
                where: { id: post.id },
                data: { published: false }
            })
            console.log(`  ✅ ${post.title}`)
        }

        const finalCount = await prisma.post.count({
            where: { published: true }
        })

        console.log(`\n✅ Concluído! Posts publicados agora: ${finalCount}`)
    } else {
        console.log('\n✅ Nenhum erro encontrado!')
    }
}

findAllMDXErrors()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
