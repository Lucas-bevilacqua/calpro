# AI Blog Post Generation - Guia de Uso

Sistema automático de geração de posts com IA para o blog do calcprobr.com.

## Setup Inicial

1. **Obtenha uma API Key da OpenAI:**
   - Acesse: https://platform.openai.com/api-keys
   - Crie uma nova chave
   - Copie a chave (começa com `sk-...`)

2. **Configure no .env:**
   ```bash
   OPENAI_API_KEY="sk-sua-chave-aqui"
   ```

3. **Teste a geração:**
   ```bash
   npx tsx scripts/generate-post.ts
   ```

## Como Usar

### Gerar Post Manualmente

```bash
npx tsx scripts/generate-post.ts
```

Isso vai:
- Escolher um tópico aleatório
- Gerar um artigo completo com IA
- Salvar como RASCUNHO no banco
- Mostrar o link para revisar

### Agendar Posts Automáticos

**Opção 1: Cron Job (Linux/Mac)**
```bash
# Gerar 2 posts por semana (Segunda e Quinta às 9h)
0 9 * * 1,4 cd /caminho/do/projeto && npx tsx scripts/generate-post.ts
```

**Opção 2: Task Scheduler (Windows)**
- Abra o Agendador de Tarefas
- Crie nova tarefa
- Ação: `npx tsx scripts/generate-post.ts`
- Agende para 2x por semana

**Opção 3: Vercel Cron (Recomendado)**
Adicione em `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/generate-post",
    "schedule": "0 9 * * 1,4"
  }]
}
```

## Tópicos Disponíveis

O sistema tem 35+ ângulos diferentes em 7 categorias:
- **Trabalhista**: Salário, Férias, Horas Extras
- **Financeira**: Juros Compostos, Financiamento
- **Freelancer**: Valor Hora
- **Impostos**: MEI

## Fluxo de Trabalho

1. **IA gera o post** → Salvo como rascunho
2. **Você revisa** no admin (`/admin/posts`)
3. **Edita se necessário** (título, conteúdo, imagem)
4. **Publica** quando estiver satisfeito

## Custos

- **GPT-4o-mini**: ~$0.10-0.30 por post
- **Estimativa mensal**: $5-10 para 20-30 posts

## Dicas

- **Revise sempre** antes de publicar
- **Adicione imagens** manualmente para melhor engajamento
- **Ajuste o tom** se necessário
- **Verifique fatos** e números mencionados

## Troubleshooting

**Erro: "No admin user found"**
- Rode: `npx tsx scripts/make-admin.ts seu@email.com`

**Erro: "OpenAI API key not found"**
- Verifique se `OPENAI_API_KEY` está no `.env`

**Post muito curto/longo**
- Ajuste `max_tokens` em `generate-post.ts`
