import { Client } from 'pg'

const client = new Client({
    connectionString: "postgresql://postgres:postgres@localhost:5432/callpro?schema=public",
})

async function main() {
    await client.connect()

    const slug = "como-calcular-seu-valor-hora-como-freelancer-e-aumentar-sua-renda"
    const res = await client.query('SELECT content FROM "Post" WHERE slug = $1', [slug])

    if (res.rows.length > 0) {
        console.log(res.rows[0].content)
    } else {
        console.log("Post not found")
    }

    await client.end()
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})
