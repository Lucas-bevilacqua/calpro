// Image generation using DALL-E
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import https from 'https'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export interface GeneratedImage {
    url: string
    localPath: string
    altText: string
}

export async function generateFeaturedImage(
    topic: string,
    keywords: string[]
): Promise<GeneratedImage> {
    try {
        // Create prompt for professional blog image
        const prompt = `
Professional, modern blog header image for an article about "${topic}".
Style: Clean, minimalist, professional business illustration.
Colors: Blue and white corporate colors.
Include: Abstract representations of ${keywords.slice(0, 2).join(' and ')}.
No text, no people faces, just clean professional graphics.
High quality, 16:9 aspect ratio.
`.trim()

        console.log('🎨 Generating image with DALL-E...')

        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt,
            n: 1,
            size: '1792x1024', // 16:9 ratio
            quality: 'standard', // 'hd' for better quality but more expensive
        })

        const imageUrl = response.data?.[0]?.url
        if (!imageUrl) {
            throw new Error('No image URL returned from DALL-E')
        }

        // Download image
        const imageName = `${Date.now()}-${slugify(topic)}.png`
        const publicDir = path.join(process.cwd(), 'public', 'blog-images')

        // Create directory if it doesn't exist
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true })
        }

        const localPath = path.join(publicDir, imageName)
        await downloadImage(imageUrl, localPath)

        // Generate alt text
        const altText = `Ilustração sobre ${topic} - ${keywords.slice(0, 2).join(', ')}`

        console.log(`✅ Image saved: /blog-images/${imageName}`)

        return {
            url: imageUrl,
            localPath: `/blog-images/${imageName}`,
            altText
        }

    } catch (error: any) {
        console.error('Error generating image:', error.message)
        throw error
    }
}

// Download image from URL
function downloadImage(url: string, filepath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download image: ${response.statusCode}`))
                return
            }

            const fileStream = fs.createWriteStream(filepath)
            response.pipe(fileStream)

            fileStream.on('finish', () => {
                fileStream.close()
                resolve()
            })

            fileStream.on('error', (err) => {
                fs.unlink(filepath, () => { }) // Delete partial file
                reject(err)
            })
        }).on('error', reject)
    })
}

// Slugify helper
function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .substring(0, 50)
}
