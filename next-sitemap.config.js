/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://calcprobr.com',
    generateRobotsTxt: false, // We use app/robots.ts
    exclude: ['/admin/*', '/api/*', '/auth/*', '/dashboard/*', '/pro', '/precos'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://calcprobr.com/sitemap.xml', // Default
        ],
    },
}
