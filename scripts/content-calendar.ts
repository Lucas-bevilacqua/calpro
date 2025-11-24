import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import * as dotenv from 'dotenv'
import { generateContentCalendar, exportCalendarToJSON } from '../lib/seo-strategy'
import fs from 'fs'
import path from 'path'

// Force load .env file
dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient

async function main() {
    try {
        console.log('📅 Generating 30-day content calendar...\n')

        // Generate calendar
        const calendar = generateContentCalendar()

        console.log(`✅ Generated ${calendar.length} posts for the next 30 days\n`)

        // Display calendar
        console.log('📊 Content Calendar:\n')
        calendar.forEach((item, index) => {
            const date = item.scheduledDate?.toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
            console.log(`${index + 1}. ${date}`)
            console.log(`   📝 ${item.topic}`)
            console.log(`   🎯 Keywords: ${item.keywords.slice(0, 3).join(', ')}`)
            console.log(`   📈 Est. Traffic: ${item.estimatedTraffic}/month`)
            console.log(`   ⭐ Priority: ${item.priority}/6`)
            console.log('')
        })

        // Save to file
        const outputDir = path.join(process.cwd(), 'content-plans')
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true })
        }

        const filename = `content-calendar-${new Date().toISOString().split('T')[0]}.json`
        const filepath = path.join(outputDir, filename)

        fs.writeFileSync(filepath, exportCalendarToJSON(calendar))

        console.log(`💾 Calendar saved to: ${filepath}`)
        console.log(`\n📊 Summary:`)
        console.log(`   Total posts: ${calendar.length}`)
        console.log(`   Estimated monthly traffic: ${calendar.reduce((sum, item) => sum + item.estimatedTraffic, 0)}`)
        console.log(`   High priority posts: ${calendar.filter(item => item.priority >= 5).length}`)
        console.log(`\n💡 Next step: Run 'npx tsx scripts/generate-post.ts' to start creating posts!`)

    } catch (error: any) {
        console.error('❌ Error:', error.message)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
