import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import * as dotenv from 'dotenv'
import { generateMonthlyReport, exportReport } from '../lib/seo-reporting'
import fs from 'fs'
import path from 'path'

// Force load .env file
dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient

async function main() {
    try {
        console.log('📊 Generating SEO Report...\n')

        // Get all posts
        const posts = await (prisma.post as any).findMany({
            orderBy: { createdAt: 'desc' }
        })

        // Generate report
        const report = generateMonthlyReport(posts)

        // Format as markdown
        const markdown = exportReport(report, 'markdown')

        console.log(markdown)

        // Save to file
        const reportsDir = path.join(process.cwd(), 'reports')
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true })
        }

        const filename = `seo-report-${new Date().toISOString().split('T')[0]}.md`
        const filepath = path.join(reportsDir, filename)

        fs.writeFileSync(filepath, markdown)

        console.log(`\n💾 Report saved to: ${filepath}`)

    } catch (error: any) {
        console.error('❌ Error:', error.message)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
