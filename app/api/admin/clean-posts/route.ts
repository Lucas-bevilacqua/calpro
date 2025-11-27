import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    // Check authentication and admin role
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const brokenSlugs = [
      'adicional-noturno-entenda-seus-direitos-e-horas-extras',
      'como-calcular-seu-valor-hora-como-freelancer-e-aumentar-sua-renda'
    ]

    const deleted = []
    const notFound = []

    for (const slug of brokenSlugs) {
      const post = await prisma.post.findUnique({
        where: { slug }
      })

      if (post) {
        await prisma.post.delete({
          where: { slug }
        })
        deleted.push(slug)
      } else {
        notFound.push(slug)
      }
    }

    // List remaining posts
    const remainingPosts = await prisma.post.findMany({
      select: {
        slug: true,
        title: true,
        published: true
      }
    })

    return NextResponse.json({
      success: true,
      deleted,
      notFound,
      remainingCount: remainingPosts.length,
      remainingPosts
    })

  } catch (error: any) {
    console.error('Error cleaning posts:', error)
    return new NextResponse(
      error.message || 'Failed to clean posts',
      { status: 500 }
    )
  }
}
