require('dotenv').config()
const { execSync } = require('child_process')

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set')
console.log('DIRECT_URL:', process.env.DIRECT_URL ? 'Set' : 'Not set')

try {
    execSync('npx prisma generate', { stdio: 'inherit' })
    console.log('\n✅ Prisma Client generated successfully!')
} catch (error) {
    console.error('\n❌ Failed to generate Prisma Client')
    process.exit(1)
}
