import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

async function fixPost() {
    const slug = 'iss-para-prestadores-de-servico-como-calcular-3128'
    const post = await prisma.post.findUnique({
        where: { slug }
    })

    if (!post) {
        console.log('Post not found')
        return
    }

    let newContent = post.content

    // Fix the main formula
    newContent = newContent.replace(
        /\\\[\s*\\text\{ISS\} = \\text\{Valor do Serviço\} \\times \\text\{Alíquota\}\s*\\\]/g,
        '> **Fórmula:** ISS = Valor do Serviço x Alíquota'
    )

    // Fix the calculation examples
    newContent = newContent.replace(
        /\\\[\s*\\text\{ISS\} = R\\\$ ([\d\.,]+) \\times ([\d,]+) = R\\\$ ([\d\.,]+)\s*\\\]/g,
        '> **Cálculo:** ISS = R$ $1 x $2 = R$ $3'
    )

    // Fix any remaining LaTeX-like syntax that might cause issues
    newContent = newContent.replace(/\\text\{([^}]+)\}/g, '$1')
    newContent = newContent.replace(/\\times/g, 'x')
    newContent = newContent.replace(/\\\[/g, '')
    newContent = newContent.replace(/\\\]/g, '')

    await prisma.post.update({
        where: { slug },
        data: { content: newContent }
    })

    console.log('Post updated successfully')
}

fixPost()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
