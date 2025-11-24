import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import * as dotenv from 'dotenv'
import { runSEOAgent } from '@/lib/seo-agent'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient

export async function POST(request: Request) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Check if user is admin
        const user = await (prisma.user as any).findUnique({
            where: { email: session.user.email }
        })

        if (user?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        // Get options from request
        const body = await request.json()
        const options = {
            generateNewPosts: body.generateNewPosts || 1,
            refreshOldPosts: body.refreshOldPosts !== false,
            addInternalLinks: body.addInternalLinks !== false,
            generateReport: body.generateReport !== false
        }

        // Run SEO Agent
        const result = await runSEOAgent(prisma, options)

        return NextResponse.json(result)

    } catch (error: any) {
        console.error('Error running SEO agent:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to run SEO agent' },
            { status: 500 }
        )
    }
}
