import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/admin/', '/api/', '/auth/', '/dashboard/'],
        },
        sitemap: 'https://www.calcprobr.com/sitemap.xml',
    }
}
