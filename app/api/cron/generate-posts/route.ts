import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import * as dotenv from 'dotenv'
import { runSEOAgent } from '@/lib/seo-agent'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient

// This endpoint can be called by Vercel Cron or any scheduler
// Configure in vercel.json:
// {
//   "crons": [{
//     "path": "/api/cron/generate-posts",
//     "schedule": "0 10 * * 1,2,3,4,5"  // Monday-Friday at 10am (5 posts/week)
//   }]
// }

export async function GET(request: Request) {
    try {
        // Verify cron secret to prevent unauthorized access
        const authHeader = request.headers.get('authorization')
        const cronSecret = process.env.CRON_SECRET || 'development_secret'

        if (authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        console.log('🤖 Cron job started: Generating posts...')

        // Run SEO Agent automatically
        const result = await runSEOAgent(prisma, {
            generateNewPosts: 1, // Generate 1 post per run (5 per week)
            refreshOldPosts: true,
            addInternalLinks: true,
            generateReport: false // Don't generate report on cron
        })

        console.log('✅ Cron job completed:', result.summary)

        return NextResponse.json({
            success: true,
            summary: result.summary,
            message: 'Posts generated successfully'
        })

    } catch (error: any) {
        console.error('❌ Cron job error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to generate posts' },
            { status: 500 }
        )
    }
}
