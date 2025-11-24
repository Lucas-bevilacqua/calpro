import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

async function findPost() {
    const slug = 'financiamento-imobiliario-como-calcular-parcelas-e-escolher-a-melhor-opcao'
    const post = await prisma.post.findUnique({
        where: { slug }
    })

    if (post) {
        console.log('Post found:')
        console.log('Title:', post.title)
        console.log('Slug:', post.slug)
        console.log('\nContent preview (first 500 chars):')
        console.log(post.content.substring(0, 500))
        console.log('\n...')

        // Look for problematic patterns
        const problematicPatterns = [
            { name: 'Unescaped {', pattern: /(?<!\\)\{(?!\{)/ },
            { name: 'Unescaped }', pattern: /(?<!\\)\}(?!\})/ },
            { name: 'Unescaped <', pattern: /<(?![a-zA-Z/])/ },
        ]

        problematicPatterns.forEach(({ name, pattern }) => {
            const matches = post.content.match(pattern)
            if (matches) {
                console.log(`\nFound ${name}:`, matches.length, 'occurrences')
            }
        })
    } else {
        console.log('Post not found')
    }
}

findPost()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
