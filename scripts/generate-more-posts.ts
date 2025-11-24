import { PrismaClient } from '@prisma/client'
import OpenAI from 'openai'
import * as dotenv from 'dotenv'
import { POST_TOPICS, getRandomAngle } from '../lib/post-topics'
import { generateFeaturedImage } from '../lib/generate-image'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Novos tópicos para diversificar conteúdo
const NEW_TOPICS = [
    {
        category: 'Trabalhista',
        calculator: '13º Salário',
        angle: '13º Salário 2024: Como Calcular e Quando Receber',
        keywords: ['13º salário', 'décimo terceiro', 'gratificação natalina', 'CLT']
    },
    {
        category: 'Trabalhista',
        calculator: 'Aviso Prévio',
        angle: 'Aviso Prévio: Direitos, Prazos e Como Calcular',
        keywords: ['aviso prévio', 'demissão', 'rescisão', 'CLT']
    },
    {
        category: 'Trabalhista',
        calculator: 'FGTS',
        angle: 'FGTS: Como Funciona, Quando Sacar e Como Calcular',
        keywords: ['FGTS', 'fundo de garantia', 'saque', 'trabalhador']
    },
    {
        category: 'Financeira',
        calculator: 'Empréstimo',
        angle: 'Empréstimo Pessoal: Como Calcular Juros e Parcelas',
        keywords: ['empréstimo', 'juros', 'parcelas', 'crédito']
    },
    {
        category: 'Financeira',
        calculator: 'Investimento',
        angle: 'Quanto Rende Meu Investimento? Calculadora Completa',
        keywords: ['investimento', 'rentabilidade', 'poupança', 'CDB']
    },
    {
        category: 'Financeira',
        calculator: 'Inflação',
        angle: 'Como a Inflação Afeta Seu Dinheiro: Calculadora Prática',
        keywords: ['inflação', 'IPCA', 'poder de compra', 'economia']
    },
    {
        category: 'Impostos',
        calculator: 'IRPF',
        angle: 'Imposto de Renda 2024: Como Calcular e Declarar',
        keywords: ['imposto de renda', 'IRPF', 'declaração', 'restituição']
    },
    {
        category: 'Impostos',
        calculator: 'Simples Nacional',
        angle: 'Simples Nacional: Como Calcular Impostos da Sua Empresa',
        keywords: ['simples nacional', 'impostos', 'empresa', 'DAS']
    },
    {
        category: 'Freelancer',
        calculator: 'Orçamento',
        angle: 'Como Fazer Orçamento de Projeto: Guia para Freelancers',
        keywords: ['orçamento', 'freelancer', 'projeto', 'precificação']
    },
    {
        category: 'Trabalhista',
        calculator: 'Adicional Noturno',
        angle: 'Adicional Noturno: Como Calcular e Seus Direitos',
        keywords: ['adicional noturno', 'trabalho noturno', 'CLT', 'direitos']
    },
    {
        category: 'Financeira',
        calculator: 'Aposentadoria',
        angle: 'Planejamento de Aposentadoria: Quanto Você Precisa Guardar?',
        keywords: ['aposentadoria', 'previdência', 'INSS', 'planejamento']
    },
    {
        category: 'Trabalhista',
        calculator: 'Insalubridade',
        angle: 'Adicional de Insalubridade: Como Calcular e Quem Tem Direito',
        keywords: ['insalubridade', 'adicional', 'CLT', 'saúde']
    },
    {
        category: 'Trabalhista',
        calculator: 'Periculosidade',
        angle: 'Adicional de Periculosidade: Cálculo e Direitos',
        keywords: ['periculosidade', 'adicional', 'CLT', 'risco']
    },
    {
        category: 'Financeira',
        calculator: 'Consórcio',
        angle: 'Consórcio: Vale a Pena? Como Calcular e Comparar',
        keywords: ['consórcio', 'financiamento', 'contemplação', 'imóvel']
    },
    {
        category: 'Impostos',
        calculator: 'ISS',
        angle: 'ISS para Prestadores de Serviço: Como Calcular',
        keywords: ['ISS', 'imposto', 'serviço', 'nota fiscal']
    }
]

async function generateNewPosts() {
    try {
        console.log('🚀 Gerando 15 novos posts para AdSense...\n')

        const admin = await prisma.user.findFirst({
            where: { role: 'ADMIN' }
        })

        if (!admin) {
            throw new Error('Admin user not found')
        }

        for (let i = 0; i < NEW_TOPICS.length; i++) {
            const topic = NEW_TOPICS[i]

            console.log(`\n📝 Post ${i + 1}/15: ${topic.angle}`)

            // Generate content
            const prompt = `Escreva um artigo de blog HUMANIZADO sobre: "${topic.angle}"

IMPORTANTE: Escreva como um brasileiro falando com outro brasileiro, de forma natural e conversacional.

DIRETRIZES:
- Use "você" e tom informal
- Comece com uma pergunta ou situação do dia a dia
- Use expressões brasileiras ("Olha só", "Vou te explicar", "Sabe aquela situação...")
- Varie parágrafos curtos e longos
- Inclua exemplos práticos e numéricos
- Use as palavras-chave: ${topic.keywords.join(', ')}
- Mínimo 900 palavras
- Estrutura: H2 e H3 para subtítulos
- Adicione FAQ com 3-5 perguntas
- Conclusão com CTA para usar a calculadora

NÃO use frases como: "É importante ressaltar", "Vale destacar", "Neste artigo"

Formato: Markdown puro (sem meta tags)`

            const completion = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'Você é um brasileiro especialista em finanças e direito trabalhista que escreve de forma natural e conversacional.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.8,
                max_tokens: 3000
            })

            const content = completion.choices[0].message.content || ''

            // Extract title
            const titleMatch = content.match(/^#\s+(.+)$/m)
            const title = titleMatch ? titleMatch[1] : topic.angle

            // Generate meta description
            const metaPrompt = `Crie uma meta description atrativa de 150-160 caracteres para: "${title}". Tom conversacional, inclua: ${topic.keywords.slice(0, 2).join(', ')}`

            const metaCompletion = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: metaPrompt }],
                temperature: 0.7,
                max_tokens: 100
            })

            const metaDescription = metaCompletion.choices[0].message.content?.trim() || ''

            // Generate slug
            const slug = title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '') + `-${Date.now().toString().slice(-4)}`

            // Generate image
            let featuredImage = null
            try {
                console.log('🎨 Gerando imagem...')
                featuredImage = await generateFeaturedImage(title, topic.keywords)
                console.log(`✅ Imagem: ${featuredImage.localPath}`)
            } catch (error: any) {
                console.warn(`⚠️  Imagem falhou: ${error.message}`)
            }

            // Add internal links
            const contentWithLinks = addInternalLinks(content, topic)

            // Save post
            await prisma.post.create({
                data: {
                    title,
                    slug,
                    content: contentWithLinks,
                    excerpt: metaDescription,
                    published: true,
                    authorId: admin.id,
                    image: featuredImage?.localPath
                }
            })

            console.log(`✅ Publicado: ${title}`)

            // Delay to avoid API rate limits
            await new Promise(resolve => setTimeout(resolve, 2000))
        }

        console.log(`\n🎉 15 novos posts gerados! Total agora: 24 posts`)
    } catch (error) {
        console.error('❌ Erro:', error)
    } finally {
        await prisma.$disconnect()
    }
}

function addInternalLinks(content: string, topic: any): string {
    const calculatorMap: Record<string, string> = {
        '13º Salário': '/calculadora/trabalhista/decimo-terceiro',
        'Aviso Prévio': '/calculadora/trabalhista/aviso-previo',
        'FGTS': '/calculadora/trabalhista/fgts',
        'Empréstimo': '/calculadora/financeira/emprestimo',
        'Investimento': '/calculadora/financeira/investimento',
        'Inflação': '/calculadora/financeira/inflacao',
        'IRPF': '/calculadora/impostos/irpf',
        'Simples Nacional': '/calculadora/impostos/simples-nacional',
        'Orçamento': '/calculadora/freelancer/orcamento',
        'Adicional Noturno': '/calculadora/trabalhista/adicional-noturno',
        'Aposentadoria': '/calculadora/financeira/aposentadoria',
        'Insalubridade': '/calculadora/trabalhista/insalubridade',
        'Periculosidade': '/calculadora/trabalhista/periculosidade',
        'Consórcio': '/calculadora/financeira/consorcio',
        'ISS': '/calculadora/impostos/iss'
    }

    const calcUrl = calculatorMap[topic.calculator]
    if (calcUrl) {
        const cta = `\n\n## Calcule Agora Mesmo\n\nQuer fazer seus próprios cálculos? Use nossa [calculadora de ${topic.calculator.toLowerCase()}](${calcUrl}) gratuitamente!\n\n`

        if (content.includes('## Conclusão') || content.includes('## FAQ')) {
            return content.replace(/(## (?:Conclusão|FAQ))/, `${cta}$1`)
        } else {
            return content + cta
        }
    }

    return content
}

generateNewPosts()
