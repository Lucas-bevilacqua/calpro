# 🔍 Google Search Console - Guia de Configuração

## Por que é importante?

O Google Search Console (GSC) permite:
- Ver quais keywords estão ranqueando
- Identificar erros de indexação
- Monitorar performance de SEO
- Submeter sitemap manualmente
- Ver backlinks que o Google encontrou

---

## Passo a Passo

### 1. Acessar Google Search Console
**URL**: https://search.google.com/search-console/

### 2. Adicionar Propriedade
1. Clique em "Adicionar propriedade"
2. Escolha "Prefixo do URL"
3. Digite: `https://calcprobr.com`

### 3. Verificar Propriedade

**Método Recomendado: Meta Tag HTML**

1. O GSC vai fornecer uma meta tag como:
   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```

2. Adicione ao `app/layout.tsx` dentro do `<head>`:
   ```typescript
   <head>
     {/* Google Search Console Verification */}
     <meta name="google-site-verification" content="ABC123XYZ..." />
     
     {/* ... resto do código ... */}
   </head>
   ```

3. Faça commit e push:
   ```bash
   git add app/layout.tsx
   git commit -m "feat: add Google Search Console verification"
   git push
   ```

4. Aguarde deploy (2-3 min)
5. Volte ao GSC e clique em "Verificar"

**Métodos Alternativos**:
- Arquivo HTML (upload de arquivo)
- Google Analytics (se já configurado)
- Google Tag Manager

### 4. Submeter Sitemap

1. No GSC, vá em "Sitemaps" (menu lateral)
2. Adicione: `https://calcprobr.com/sitemap.xml`
3. Clique em "Enviar"

### 5. Aguardar Indexação

- Primeiros dados: 24-48h
- Dados completos: 7 dias
- Indexação completa: 2-4 semanas

---

## O que Monitorar

### Semanalmente
- **Desempenho** → Cliques, impressões, CTR, posição média
- **Cobertura** → Páginas indexadas vs não indexadas
- **Melhorias** → Usabilidade mobile, Core Web Vitals

### Mensalmente
- **Links** → Backlinks externos
- **Consultas** → Top keywords
- **Páginas** → Top páginas por tráfego

---

## Ações Importantes

### 1. Solicitar Indexação Manual
Para posts novos:
1. Inspeção de URL → Cole URL do post
2. Clique em "Solicitar indexação"
3. Aguarde 1-7 dias

### 2. Corrigir Erros
Se aparecer "Erro de rastreamento":
- Verificar se página existe
- Verificar robots.txt
- Verificar sitemap

### 3. Otimizar CTR
Se impressões altas mas cliques baixos:
- Melhorar meta description
- Melhorar title tag
- Adicionar rich snippets

---

## Métricas de Sucesso

### Mês 1
- Páginas indexadas: 30+
- Impressões: 100+
- Cliques: 10+

### Mês 2
- Páginas indexadas: 50+
- Impressões: 1.000+
- Cliques: 50+

### Mês 3
- Páginas indexadas: 80+
- Impressões: 5.000+
- Cliques: 200+

---

## Troubleshooting

### "Página não indexada"
- Aguardar 7 dias
- Solicitar indexação manual
- Verificar se está no sitemap

### "Erro de rastreamento"
- Verificar se site está online
- Verificar robots.txt
- Verificar se há erros 404

### "Sem dados"
- Aguardar 48h após verificação
- Verificar se sitemap foi submetido
- Verificar se há tráfego orgânico

---

**Próximo passo**: Após configurar, volte em 7 dias para ver os primeiros dados! 📊
