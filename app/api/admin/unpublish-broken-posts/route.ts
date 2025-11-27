import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// This route unpublishes posts with MDX errors
// Call it via: /api/admin/unpublish-broken-posts

export async function POST() {
    try {
        const brokenSlugs = [
            'adicional-noturno-entenda-seus-direitos-e-horas-extras'
        ]

        const results = []

        for (const slug of brokenSlugs) {
            const post = await prisma.post.update({
                where: { slug },
                data: { status: 'DRAFT' }
            })
            results.push({ slug, title: post.title, status: post.status })
        }

        return NextResponse.json({
            success: true,
            message: 'Posts unpublished successfully',
            results
        })
    } catch (error: any) {
        console.error('Error unpublishing posts:', error)
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
