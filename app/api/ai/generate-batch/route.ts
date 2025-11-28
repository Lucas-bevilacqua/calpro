import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { POST_TOPICS } from '@/lib/post-topics'

export async function POST(req: Request) {
  try {
    // Check authentication and admin role
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { count = 5, topicIds = [] } = await req.json()

    console.log(`🚀 Starting batch generation of ${count} articles...`)

    const results = []
    const errors = []

    // Get topics to generate
    let topicsToGenerate = []
    
    if (topicIds.length > 0) {
      // Use specific topics
      topicsToGenerate = topicIds.slice(0, count)
    } else {
      // Use first N topics
      topicsToGenerate = POST_TOPICS.slice(0, count).map(t => 
        `${t.category}-${t.calculator}`
      )
    }

    // Generate articles one by one
    for (let i = 0; i < topicsToGenerate.length; i++) {
      const topicId = topicsToGenerate[i]
      
      try {
        console.log(`\n📝 Generating article ${i + 1}/${topicsToGenerate.length}: ${topicId}`)
        
        // Call the generate-post API
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/ai/generate-post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': req.headers.get('cookie') || ''
          },
          body: JSON.stringify({ topicId })
        })

        if (!response.ok) {
          throw new Error(`Failed to generate: ${response.statusText}`)
        }

        const data = await response.json()
        results.push({
          topicId,
          title: data.title,
          slug: data.slug,
          success: true
        })

        console.log(`✅ Generated: ${data.title}`)

        // Wait 2 seconds between requests to avoid rate limits
        if (i < topicsToGenerate.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000))
        }

      } catch (error: any) {
        console.error(`❌ Error generating ${topicId}:`, error.message)
        errors.push({
          topicId,
          error: error.message
        })
      }
    }

    return NextResponse.json({
      success: true,
      generated: results.length,
      failed: errors.length,
      results,
      errors
    })

  } catch (error: any) {
    console.error('Batch generation error:', error)
    return new NextResponse(
      error.message || 'Failed to generate batch',
      { status: 500 }
    )
  }
}
