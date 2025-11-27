/**
 * Script para limpar posts quebrados do banco de dados
 * 
 * Uso:
 * npx ts-node scripts/clean-broken-posts.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const brokenSlugs = [
  'adicional-noturno-entenda-seus-direitos-e-horas-extras',
  'como-calcular-seu-valor-hora-como-freelancer-e-aumentar-sua-renda'
]

async function cleanBrokenPosts() {
  console.log('🧹 Limpando posts quebrados do banco de dados...\n')

  for (const slug of brokenSlugs) {
    try {
      const post = await prisma.post.findUnique({
        where: { slug }
      })

      if (post) {
        await prisma.post.delete({
          where: { slug }
        })
        console.log(`✅ Deletado: ${slug}`)
      } else {
        console.log(`ℹ️  Não encontrado: ${slug}`)
      }
    } catch (error: any) {
      console.error(`❌ Erro ao deletar ${slug}:`, error.message)
    }
  }

  console.log('\n✅ Limpeza concluída!')
  
  // Listar posts restantes
  const remainingPosts = await prisma.post.findMany({
    select: {
      slug: true,
      title: true,
      published: true
    }
  })

  console.log(`\n📊 Posts restantes no banco: ${remainingPosts.length}`)
  remainingPosts.forEach(post => {
    console.log(`   ${post.published ? '✅' : '⏸️ '} ${post.title} (${post.slug})`)
  })

  await prisma.$disconnect()
}

cleanBrokenPosts()
  .catch((error) => {
    console.error('❌ Erro:', error)
    process.exit(1)
  })
