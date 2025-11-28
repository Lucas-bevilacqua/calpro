# 📝 Guia de Geração de Artigos com IA

## 🎯 Sistema Otimizado

O sistema de geração de artigos foi **completamente otimizado** para criar conteúdo SEO de alta qualidade.

### ✅ Melhorias Implementadas:

1. **Artigos mais longos:** 2.500-3.000 palavras (vs. 1.800 anterior)
2. **Estrutura mais completa:** 11 seções obrigatórias
3. **Mais exemplos práticos:** 3-5 exemplos com números reais
4. **Tabelas incluídas:** INSS, IRRF, comparações
5. **FAQs expandidas:** 5-7 perguntas por artigo
6. **CTAs estratégicos:** 3 chamadas para ação
7. **Tokens aumentados:** 8.000 tokens (vs. 4.000)
8. **Prompt melhorado:** Instruções mais específicas

---

## 🚀 Como Usar

### Opção 1: Geração em Lote (NOVO! ⚡)

1. **Acesse o painel admin:**
   ```
   http://localhost:3000/admin/posts
   ```

2. **Clique em "Gerar Múltiplos Artigos"**

3. **Escolha a quantidade:**
   - Use os botões rápidos: 3, 5 ou 10 artigos
   - Ou digite um número personalizado (1-20)

4. **Aguarde a geração:**
   - Tempo: ~2 minutos por artigo
   - Progresso em tempo real
   - Imagens geradas automaticamente via DALL-E

5. **Pronto!** Todos os artigos são criados com imagens

### Opção 2: Interface Admin (Individual)

1. **Acesse o painel admin:**
   ```
   http://localhost:3000/admin/posts/new
   ```

2. **Clique em "Gerar com IA"**

3. **Selecione o tópico** ou deixe o sistema escolher automaticamente

4. **Aguarde 30-60 segundos** (artigos longos demoram mais)

5. **Imagem gerada automaticamente** via DALL-E (se configurado)

6. **Revise o conteúdo gerado:**
   - Verifique números e cálculos
   - Ajuste exemplos se necessário
   - Imagem já incluída

7. **Publique!**

---

### Opção 2: API Direta

```bash
curl -X POST http://localhost:3000/api/ai/generate-post \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=SEU_TOKEN" \
  -d '{
    "topicId": "trabalhista-rescisao-trabalhista"
  }'
```

---

## 📊 10 Artigos Prioritários

Gere nesta ordem para máximo impacto SEO:

### 1. **Rescisão Trabalhista** (33k buscas/mês)
- Tópico: `trabalhista-rescisao-trabalhista`
- Impacto: ⭐⭐⭐⭐⭐

### 2. **13º Salário** (49k buscas/mês)
- Tópico: `trabalhista-13-salario`
- Impacto: ⭐⭐⭐⭐⭐

### 3. **Horas Extras** (27k buscas/mês)
- Tópico: `trabalhista-horas-extras`
- Impacto: ⭐⭐⭐⭐⭐

### 4. **Férias Proporcionais** (22k buscas/mês)
- Tópico: `trabalhista-ferias-proporcionais`
- Impacto: ⭐⭐⭐⭐

### 5. **Salário Líquido** (15k buscas/mês)
- Tópico: `financeira-salario-liquido`
- Impacto: ⭐⭐⭐⭐

### 6. **Valor Hora Freelancer** (18k buscas/mês)
- Tópico: `freelancer-valor-hora`
- Impacto: ⭐⭐⭐⭐

### 7. **Impostos MEI** (12k buscas/mês)
- Tópico: `freelancer-impostos-mei`
- Impacto: ⭐⭐⭐

### 8. **Materiais de Construção** (14k buscas/mês)
- Tópico: `construcao-materiais-obra`
- Impacto: ⭐⭐⭐

### 9. **Financiamento** (12k buscas/mês)
- Tópico: `financeira-financiamento`
- Impacto: ⭐⭐⭐

### 10. **Juros Compostos** (9k buscas/mês)
- Tópico: `financeira-juros-compostos`
- Impacto: ⭐⭐⭐

---

## ✅ Checklist Pós-Geração

Antes de publicar, verifique:

- [ ] **Título:** Atrativo e com palavra-chave
- [ ] **Tamanho:** Mínimo 2.500 palavras
- [ ] **Exemplos:** Pelo menos 3 com números reais
- [ ] **Tabelas:** INSS/IRRF atualizadas (2025)
- [ ] **FAQs:** 5-7 perguntas respondidas
- [ ] **CTAs:** 3 links para calculadora
- [ ] **Links internos:** 2-3 para outros artigos
- [ ] **Imagem:** Featured image relevante
- [ ] **Data:** Atualizada para 2025
- [ ] **Revisão:** Sem erros de português

---

## 🎨 Sistema de Imagens (AUTOMÁTICO!)

### ✨ Geração Automática com DALL-E

**Agora as imagens são geradas automaticamente!**

1. **Configuração:**
   - Se `OPENAI_API_KEY` estiver configurada, DALL-E é usado automaticamente
   - Para desabilitar, adicione no `.env.local`: `ENABLE_DALLE_IMAGES="false"`

2. **Características:**
   - Imagens profissionais e relevantes ao tópico
   - Estilo corporativo brasileiro
   - Cores: azul profissional (#2563eb)
   - Tamanho: 1792x1024 (16:9)
   - Salvas em: `/public/blog-images/`

3. **Fallback Automático:**
   - Se DALL-E falhar → usa Unsplash
   - Se Unsplash falhar → usa imagem padrão

**Custo:** ~$0.04 por imagem

### Alternativa: Imagens Gratuitas (Manual)

Se preferir adicionar manualmente:

**Unsplash:**
```
https://unsplash.com/s/photos/calculator
https://unsplash.com/s/photos/finance
https://unsplash.com/s/photos/work
```

**Pexels:**
```
https://www.pexels.com/search/calculator/
https://www.pexels.com/search/money/
```

---

## 📈 Estratégia de Publicação

### Semana 1-2: Artigos de Alto Impacto
- Dia 1: Rescisão Trabalhista
- Dia 2: 13º Salário
- Dia 3: Horas Extras
- Dia 4: Revisão e ajustes
- Dia 5: Férias Proporcionais
- Dia 6: Salário Líquido
- Dia 7: Descanso

### Semana 3-4: Completar os 10
- Dia 8: Valor Hora Freelancer
- Dia 9: Impostos MEI
- Dia 10: Materiais Construção
- Dia 11: Revisão
- Dia 12: Financiamento
- Dia 13: Juros Compostos
- Dia 14: Revisão final

### Resultado Esperado:
- **10 artigos publicados** em 2 semanas
- **+150k visitas/mês** em 3-4 meses
- **+R$ 20k/mês** em receita (Mês 6)

---

## 💰 Custos

### Por Artigo (com imagem):
- Geração de texto (GPT-4o-mini): ~$0.15
- Imagem DALL-E 3: ~$0.04
- **Total:** ~$0.19 por artigo

### Geração em Lote:
- **3 artigos:** ~$0.57 (~2 min/artigo = 6 min total)
- **5 artigos:** ~$0.95 (~2 min/artigo = 10 min total)
- **10 artigos:** ~$1.90 (~2 min/artigo = 20 min total)
- **20 artigos:** ~$3.80 (~2 min/artigo = 40 min total)

### ROI Esperado:
- **Investimento:** $1.90 (10 artigos)
- **Retorno (6 meses):** R$ 20.000+
- **ROI:** 10.000%+

---

## 🔧 Troubleshooting

### Erro: "No content generated"
**Solução:** Verifique se `OPENAI_API_KEY` está configurada no `.env.local`

### Artigo muito curto (< 2.000 palavras)
**Solução:** O prompt foi otimizado. Regenere o artigo.

### Erro 429 (Rate Limit)
**Solução:** Aguarde 1 minuto e tente novamente. Gere no máximo 3 artigos por hora.

### Conteúdo genérico
**Solução:** Use o campo "Custom Prompt" para ser mais específico sobre o que quer.

---

## 📊 Métricas de Sucesso

Acompanhe no Google Search Console:

- **Impressões:** Meta 500k/mês (Mês 3)
- **Cliques:** Meta 20k/mês (Mês 3)
- **CTR:** Meta 4%+
- **Posição média:** Meta #5

---

## 🎯 Próximos Passos

Depois de publicar os 10 artigos:

1. **Linkbuilding:** Conseguir 10-15 backlinks
2. **Atualização:** Revisar artigos a cada 3 meses
3. **Expansão:** Criar mais 10 artigos (total 20)
4. **Vídeos:** Transformar artigos em vídeos YouTube
5. **Newsletter:** Enviar artigos para subscribers

---

## 💡 Dicas Extras

### Para Melhor SEO:
- Publique 2-3 artigos por semana (consistência)
- Atualize artigos antigos a cada 3 meses
- Adicione links internos entre artigos
- Responda comentários (engajamento)
- Compartilhe nas redes sociais

### Para Melhor Conversão:
- CTAs claros e visíveis
- Exemplos práticos com números
- Botões destacados para calculadora
- Prova social (quantas pessoas usaram)

---

## ✅ Sistema Pronto!

O sistema está **100% funcional** e otimizado para gerar artigos de alta qualidade que:

- ✅ Ranqueiam no Google
- ✅ Convertem visitantes
- ✅ Geram receita
- ✅ Custam menos de $0.20 cada

**Comece agora:** http://localhost:3000/admin/posts/new

---

**Dúvidas?** Consulte a documentação ou entre em contato.
