# SEO Manager - Guia Completo

Sistema automatizado de gestão de conteúdo SEO com IA para o calcprobr.com.

## 🚀 Fase 1 - Implementada

### Recursos Disponíveis

1. **📅 Calendário de Conteúdo (30 dias)**
2. **🎨 Geração Automática de Imagens (DALL-E)**
3. **✍️ Posts Otimizados para SEO**
4. **📊 10 Clusters de Palavras-Chave**

---

## Como Usar

### 1. Gerar Calendário de Conteúdo

Cria um plano de 30 dias com 8 posts (2 por semana):

```bash
npx tsx scripts/content-calendar.ts
```

**Output:**
- Arquivo JSON em `content-plans/content-calendar-YYYY-MM-DD.json`
- Lista de posts com:
  - Data agendada
  - Tópico e keywords
  - Estimativa de tráfego
  - Prioridade SEO

**Exemplo de saída:**
```
1. segunda-feira, 25 de novembro de 2024
   📝 Como calcular salário líquido: Guia completo 2024
   🎯 Keywords: salário líquido, calcular salário, descontos CLT
   📈 Est. Traffic: 300/month
   ⭐ Priority: 5/6
```

### 2. Gerar Post com Imagem

Cria um post completo com imagem gerada por IA:

```bash
npx tsx scripts/generate-post.ts
```

**O que é gerado:**
- ✅ Artigo de 1000+ palavras
- ✅ Imagem profissional (DALL-E 3)
- ✅ Meta description otimizada
- ✅ Estrutura SEO (H1, H2, H3)
- ✅ Seção de FAQ
- ✅ Call-to-action
- ✅ Salvo como rascunho

**Sem imagem (mais rápido/barato):**
```bash
npx tsx scripts/generate-post.ts --no-image
```

### 3. Gerar Post pelo Admin

1. Acesse `/admin/posts`
2. Clique em "Gerar com IA"
3. Aguarde (~30-60 segundos)
4. Revise e publique!

---

## 📊 Clusters de Palavras-Chave

O sistema trabalha com 10 clusters otimizados:

### Trabalhista (Alta Prioridade)
1. **Salário Líquido** - 300 visitas/mês
2. **Férias Proporcionais** - 500 visitas/mês
3. **Horas Extras** - 300 visitas/mês
4. **13º Salário** - 500 visitas/mês
5. **Rescisão Trabalhista** - 300 visitas/mês

### Financeira
6. **Juros Compostos** - 100 visitas/mês
7. **Financiamento Imobiliário** - 150 visitas/mês

### Freelancer
8. **Valor Hora Freelancer** - 200 visitas/mês

### Impostos
9. **MEI Impostos** - 300 visitas/mês
10. **Imposto de Renda** - 150 visitas/mês

**Total estimado:** ~2.800 visitas/mês com 30 posts

---

## 🎨 Geração de Imagens

### Como Funciona

- **Modelo:** DALL-E 3 (OpenAI)
- **Estilo:** Profissional, minimalista, corporativo
- **Cores:** Azul e branco
- **Formato:** 16:9 (1792x1024px)
- **Custo:** ~$0.04 por imagem

### Características

- ✅ Alt text automático
- ✅ Otimizada para SEO
- ✅ Salva em `/public/blog-images/`
- ✅ Inserida automaticamente no post

### Exemplo de Prompt

```
Professional blog header image about "Como calcular salário líquido"
Style: Clean, minimalist, professional business illustration
Colors: Blue and white corporate colors
Include: Abstract representations of salário líquido and INSS
No text, no people faces, just clean professional graphics
```

---

## 💰 Custos

### Por Post
- Conteúdo (GPT-4o-mini): ~$0.30
- Imagem (DALL-E 3): ~$0.04
- Meta description: ~$0.01
- **Total:** ~$0.35/post

### Mensal (30 posts)
- Com imagens: ~$10.50
- Sem imagens: ~$9.30

---

## 📈 Estratégia de Publicação

### Recomendado

**2 posts por semana:**
- Segunda-feira: 09:00
- Quinta-feira: 09:00

**Resultado em 30 dias:**
- 8 posts publicados
- ~2.400 visitas estimadas
- Cobertura de 8 tópicos diferentes

### Agendamento Automático

**Opção 1: Cron Job (Linux/Mac)**
```bash
# Segunda e quinta às 9h
0 9 * * 1,4 cd /caminho && npx tsx scripts/generate-post.ts
```

**Opção 2: Task Scheduler (Windows)**
- Criar tarefa agendada
- Executar: `npx tsx scripts/generate-post.ts`
- Repetir: Segunda e Quinta, 09:00

**Opção 3: Vercel Cron (Recomendado)**
```json
{
  "crons": [{
    "path": "/api/cron/generate-post",
    "schedule": "0 9 * * 1,4"
  }]
}
```

---

## 🔧 Troubleshooting

### Erro: "No admin user found"
```bash
npx tsx scripts/make-admin.ts seu@email.com
```

### Erro: "OpenAI API key not found"
Adicione no `.env`:
```
OPENAI_API_KEY="sk-..."
```

### Imagem não gerada
- Verifique saldo da conta OpenAI
- Use `--no-image` para pular imagem
- Verifique permissões da pasta `/public/blog-images/`

### Post muito curto
Ajuste `max_tokens` em `scripts/generate-post.ts`:
```typescript
max_tokens: 3000, // Aumentar para posts maiores
```

---

## 📋 Checklist de Uso

### Setup Inicial
- [ ] API Key OpenAI configurada
- [ ] Usuário admin criado
- [ ] Pasta `/public/blog-images/` criada
- [ ] Teste de geração funcionando

### Workflow Semanal
- [ ] Segunda: Gerar e publicar post
- [ ] Quinta: Gerar e publicar post
- [ ] Revisar performance dos posts
- [ ] Ajustar estratégia se necessário

### Mensal
- [ ] Gerar novo calendário de 30 dias
- [ ] Analisar tráfego dos posts
- [ ] Identificar tópicos de sucesso
- [ ] Atualizar posts antigos

---

## 🎯 Próximas Fases

### Fase 2 (Em Breve)
- 🔍 Pesquisa de palavras-chave automática
- 📊 Tracking de performance
- 🔗 Link interno automático
- 📱 Dashboard SEO

### Fase 3 (Futuro)
- 🧪 A/B testing de títulos
- 🔄 Sugestões de atualização
- 🎯 Análise de concorrência
- 📊 Relatórios automáticos
