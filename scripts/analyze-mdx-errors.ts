import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

const PROBLEMATIC_SLUGS = [
    'como-a-inflacao-afeta-seu-dinheiro-calculadora-pratica-1856',
    'emprestimo-pessoal-como-calcular-juros-e-parcelas-7124',
    '13-salario-2024-como-calcular-e-quando-receber-8519'
]

async function analyzeAndFixPosts() {
    console.log('🔍 Analisando posts com erro MDX...\n')

    for (const slug of PROBLEMATIC_SLUGS) {
        try {
            const post = await prisma.post.findUnique({
                where: { slug }
            })

            if (!post) {
                console.log(`⏭️  Post não encontrado: ${slug}`)
                continue
            }

            console.log(`\n📄 ${post.title}`)
            console.log(`   Status: ${post.published ? 'Publicado' : 'Rascunho'}`)

            // Save content to file for inspection
            const filename = `temp_${slug.substring(0, 30)}.md`
            fs.writeFileSync(filename, post.content)
            console.log(`   💾 Conteúdo salvo em: ${filename}`)

            // Common MDX errors to look for
            const hasUnescapedBraces = post.content.includes('{') && !post.content.includes('\\{')
            const hasUnescapedDollar = post.content.includes('$') && !post.content.includes('\\$')
            const hasInvalidJSX = /<[^>]*[^/]>(?!.*<\/)/

            console.log(`   🔍 Possíveis problemas:`)
            console.log(`      - Chaves não escapadas: ${hasUnescapedBraces ? '⚠️  SIM' : '✅ Não'}`)
            console.log(`      - Cifrão não escapado: ${hasUnescapedDollar ? '⚠️  SIM' : '✅ Não'}`)

        } catch (error: any) {
            console.log(`   ❌ Erro ao processar: ${error.message}`)
        }
    }

    console.log('\n\n💡 Próximos passos:')
    console.log('1. Revise os arquivos temp_*.md gerados')
    console.log('2. Corrija os erros MDX (escape {, $, etc)')
    console.log('3. Use o admin para editar e republicar')
}

analyzeAndFixPosts()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
