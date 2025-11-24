import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env', override: true })

const prisma = new PrismaClient()

// Map of post slugs to specific "Expert Content" to inject
const expertContent: Record<string, string> = {
    'como-calcular-rescisao-trabalhista': `
## Exemplo Prático de Rescisão
Imagine que João trabalhou 2 anos na empresa, ganhava R$ 3.000,00 e foi demitido sem justa causa.
- **Saldo de Salário (10 dias):** R$ 1.000,00
- **Aviso Prévio (36 dias):** R$ 3.600,00
- **13º Proporcional (3/12):** R$ 750,00
- **Férias Vencidas + 1/3:** R$ 4.000,00
- **Multa FGTS (40%):** R$ 3.200,00 (estimado)
**Total Bruto:** ~R$ 12.550,00

## Erros Comuns no Cálculo
1. **Esquecer a média de horas extras:** Se você fez horas extras habituais, elas devem entrar na base de cálculo.
2. **Não contar o aviso prévio no tempo de serviço:** O aviso prévio (mesmo indenizado) conta como tempo de serviço para férias e 13º.
`,
    'guia-completo-13-salario': `
## Tabela de Prazos e Valores
| Parcela | Prazo Limite | Valor | Descontos |
|---------|--------------|-------|-----------|
| 1ª Parcela | 30 de Novembro | 50% do Salário | Nenhum |
| 2ª Parcela | 20 de Dezembro | Saldo Restante | INSS e IRRF |

## O que diz a Lei (Lei 4.090/62)
A lei é clara: o 13º salário é devido a todo empregado urbano, rural ou doméstico. A falta de pagamento gera multa administrativa para a empresa.
`,
    'calculo-ferias-proporcionais': `
## A Regra dos 15 Dias (Art. 146 CLT)
Muitos trabalhadores perdem dinheiro por desconhecerem essa regra. Para ter direito a 1/12 de férias no mês da rescisão, você precisa ter trabalhado **pelo menos 15 dias** naquele mês.
- Saiu dia 14? Perde o mês.
- Saiu dia 15? Ganha o mês inteiro.

## Tabela de Incidência
| Verba | INSS? | IRRF? | FGTS? |
|-------|-------|-------|-------|
| Férias Gozadas | Sim | Sim | Sim |
| Férias Indenizadas | Não | Não | Não |
`,
    'entenda-o-fgts': `
## Quanto rende o FGTS hoje?
O FGTS rende 3% ao ano + TR (Taxa Referencial). Recentemente, houve uma decisão do STF para que a correção não seja inferior à inflação (IPCA), o que deve melhorar o rendimento futuro.

## Saque-Aniversário vs. Saque-Rescisão
- **Saque-Rescisão:** É o padrão. Se for demitido, saca tudo.
- **Saque-Aniversário:** Saca uma parte todo ano, mas se for demitido, **só saca a multa de 40%**, o saldo fica retido. Cuidado ao escolher!
`,
    'seguro-desemprego-quem-tem-direito': `
## Tabela de Parcelas 2025
| Tempo de Trabalho | Parcelas |
|-------------------|----------|
| 6 a 11 meses | 3 parcelas |
| 12 a 23 meses | 4 parcelas |
| 24 meses ou mais | 5 parcelas |

## Valor das Parcelas
O valor não é o seu salário integral. Ele segue uma média dos últimos 3 meses e tem um teto de **R$ 2.313,74** (em 2025).
`,
    'horas-extras-como-calcular': `
## O Reflexo no DSR (Descanso Semanal Remunerado)
Não basta calcular a hora extra, tem que calcular o reflexo no descanso.
**Fórmula:** (Total HE / Dias Úteis) x Domingos e Feriados.
*Exemplo:* R$ 400 de HE em um mês com 4 domingos e 22 dias úteis gera + R$ 72,72 de DSR.

## Limite Legal
O limite máximo é de **2 horas extras por dia**. Acima disso, a empresa pode ser multada, mas você tem direito a receber todas as horas trabalhadas.
`,
    'juros-compostos-investimentos': `
## Juros Simples vs. Compostos
| Mês | Juros Simples (10%) | Juros Compostos (10%) | Diferença |
|-----|---------------------|-----------------------|-----------|
| 1 | R$ 1.100 | R$ 1.100 | R$ 0 |
| 2 | R$ 1.200 | R$ 1.210 | R$ 10 |
| 5 | R$ 1.500 | R$ 1.610 | R$ 110 |
| 10 | R$ 2.000 | R$ 2.593 | R$ 593 |

*Perceba como a diferença dispara com o tempo!*
`,
    'salario-liquido-descontos': `
## Tabela Progressiva INSS 2025
| Faixa Salarial | Alíquota |
|----------------|----------|
| Até R$ 1.412,00 | 7,5% |
| De R$ 1.412,01 a R$ 2.666,68 | 9% |
| De R$ 2.666,69 a R$ 4.000,03 | 12% |
| De R$ 4.000,04 a R$ 7.786,02 | 14% |

*Nota: O cálculo é feito por faixas, não sobre o total.*
`
}

async function enhancePosts() {
    console.log('Iniciando atualização dos posts...')

    for (const [slug, contentToAdd] of Object.entries(expertContent)) {
        const post = await prisma.post.findUnique({
            where: { slug }
        })

        if (post) {
            // Check if content already exists to avoid duplication
            if (!post.content.includes(contentToAdd.substring(0, 20))) {
                await prisma.post.update({
                    where: { slug },
                    data: {
                        content: post.content + '\n\n' + contentToAdd
                    }
                })
                console.log(`✅ Post atualizado: ${slug}`)
            } else {
                console.log(`ℹ️  Post já atualizado: ${slug}`)
            }
        } else {
            console.log(`⚠️  Post não encontrado: ${slug}`)
        }
    }

    console.log('Atualização concluída!')
}

enhancePosts()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
