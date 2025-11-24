# 🚀 Guia de Lançamento - calcprobr.com

**Data:** 22 de Novembro de 2025  
**Versão:** Beta 1.0

---

## ✅ CHECKLIST PRÉ-LANÇAMENTO

### Produto (100%)
- [x] 11 calculadoras funcionais
- [x] Sistema de autenticação
- [x] Dashboard de usuário
- [x] Salvamento de cálculos
- [x] Design responsivo
- [x] Validação de inputs
- [x] Tratamento de erros

### Monetização (100%)
- [x] Stripe integrado
- [x] Google AdSense pronto
- [x] Paywalls implementados
- [x] Página de preços
- [x] Dashboard PRO
- [x] Sistema de limites

### SEO (80%)
- [x] Metadata completa
- [x] Schema markup
- [x] URLs amigáveis
- [x] Sitemap dinâmico
- [x] Robots.txt
- [ ] Google Search Console
- [ ] Google Analytics

### Legal (100%)
- [x] Termos de Uso
- [x] Política de Privacidade
- [x] Disclaimers nas calculadoras

---

## 🔧 CONFIGURAÇÃO NECESSÁRIA

### 1. Stripe (CRÍTICO)

**Tempo estimado:** 30 minutos

#### Passo 1: Criar Conta
```
1. Acesse https://dashboard.stripe.com/register
2. Complete o cadastro
3. Ative sua conta
```

#### Passo 2: Criar Produtos
```
Dashboard → Products → Add Product

Produto 1: CalcPro PRO Mensal
- Nome: CalcPro PRO Mensal
- Descrição: Acesso PRO com recursos ilimitados
- Preço: R$ 19,90
- Recorrência: Mensal
- Copiar Price ID → STRIPE_PRICE_ID_PRO_MONTHLY

Produto 2: CalcPro PRO Anual
- Nome: CalcPro PRO Anual  
- Descrição: Acesso PRO anual (economize 17%)
- Preço: R$ 199,00
- Recorrência: Anual
- Copiar Price ID → STRIPE_PRICE_ID_PRO_YEARLY
```

#### Passo 3: Configurar Webhook
```
Dashboard → Developers → Webhooks → Add endpoint

URL: https://calcprobr.com/api/stripe/webhook

Eventos:
☑ checkout.session.completed
☑ customer.subscription.updated
☑ customer.subscription.deleted

Copiar Webhook Secret → STRIPE_WEBHOOK_SECRET
```

#### Passo 4: Obter Chaves
```
Dashboard → Developers → API keys

Copiar:
- Secret key → STRIPE_SECRET_KEY
- Publishable key → STRIPE_PUBLISHABLE_KEY
```

#### Passo 5: Adicionar ao .env.local
```env
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_ID_PRO_MONTHLY=price_xxxxx
STRIPE_PRICE_ID_PRO_YEARLY=price_xxxxx
```

---

### 2. Google AdSense (IMPORTANTE)

**Tempo estimado:** 1-3 dias (aprovação)

#### Passo 1: Criar Conta
```
1. Acesse https://www.google.com/adsense/start/
2. Complete o cadastro
3. Adicione seu domínio
4. Aguarde aprovação (1-3 dias)
```

#### Passo 2: Após Aprovação
```
Dashboard → Ads → Get code

Copiar data-ad-client → NEXT_PUBLIC_ADSENSE_CLIENT_ID
```

#### Passo 3: Criar Unidades de Anúncio
```
Dashboard → Ads → Ad units → Display ads

Criar 2 unidades:

1. "CalcPro - Topo"
   - Tipo: Display horizontal
   - Copiar data-ad-slot

2. "CalcPro - Rodapé"
   - Tipo: Display horizontal
   - Copiar data-ad-slot
```

#### Passo 4: Atualizar Código
```typescript
// components/ads/adsense.tsx

export function AdSenseTop() {
  return (
    <AdSense
      slot="SEU_SLOT_AQUI" // ← Substituir
      format="horizontal"
      className="my-4"
    />
  );
}
```

#### Passo 5: Adicionar ao .env.local
```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxx
```

---

### 3. Database (JÁ CONFIGURADO)

**Status:** ✅ Pronto (Supabase)

Apenas executar migration se necessário:
```bash
npx prisma migrate deploy
npx prisma generate
```

---

### 4. Google Search Console (RECOMENDADO)

**Tempo estimado:** 15 minutos

#### Passo 1: Adicionar Propriedade
```
1. Acesse https://search.google.com/search-console
2. Adicionar propriedade → Prefixo de URL
3. URL: https://calcprobr.com
4. Verificar propriedade (via DNS ou arquivo HTML)
```

#### Passo 2: Enviar Sitemap
```
Sitemaps → Adicionar sitemap
URL: https://calcprobr.com/sitemap.xml
```

#### Passo 3: Monitorar
```
- Cobertura de índice
- Desempenho de pesquisa
- Problemas de usabilidade móvel
```

---

### 5. Google Analytics (OPCIONAL)

**Tempo estimado:** 10 minutos

```bash
# Instalar
npm install @vercel/analytics

# Adicionar ao layout
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🧪 TESTES PRÉ-LANÇAMENTO

### Calculadoras (CRÍTICO)
```
☐ Testar todas as 11 calculadoras
☐ Verificar cálculos com casos extremos
☐ Testar em mobile
☐ Verificar validação de inputs
☐ Testar salvamento de cálculos
```

### Autenticação
```
☐ Registro de novo usuário
☐ Login com email/senha
☐ Login com Google
☐ Logout
☐ Recuperação de senha
```

### Monetização
```
☐ Fluxo de checkout Stripe (modo test)
☐ Webhook sincroniza corretamente
☐ Paywall funciona (3 cálculos salvos)
☐ Upgrade para PRO
☐ Portal de gerenciamento
☐ Cancelamento de assinatura
```

### Performance
```
☐ Lighthouse Score > 90
☐ Core Web Vitals OK
☐ Tempo de carregamento < 3s
☐ Mobile-friendly
```

### SEO
```
☐ Metadata em todas as páginas
☐ Schema markup funcionando
☐ Sitemap acessível
☐ Robots.txt correto
☐ URLs amigáveis
```

---

## 🚀 DEPLOY EM PRODUÇÃO

### Vercel (RECOMENDADO)

#### Passo 1: Conectar Repositório
```
1. Acesse https://vercel.com
2. Import Git Repository
3. Selecione seu repositório
```

#### Passo 2: Configurar Variáveis
```
Settings → Environment Variables

Adicionar TODAS as variáveis do .env.local:
- DATABASE_URL
- DIRECT_URL
- NEXTAUTH_URL (https://calcprobr.com)
- NEXTAUTH_SECRET
- STRIPE_SECRET_KEY (usar chave de produção!)
- STRIPE_PUBLISHABLE_KEY (usar chave de produção!)
- STRIPE_WEBHOOK_SECRET
- STRIPE_PRICE_ID_PRO_MONTHLY
- STRIPE_PRICE_ID_PRO_YEARLY
- NEXT_PUBLIC_ADSENSE_CLIENT_ID
- GOOGLE_CLIENT_ID (opcional)
- GOOGLE_CLIENT_SECRET (opcional)
```

#### Passo 3: Deploy
```
1. Click "Deploy"
2. Aguardar build (2-3 minutos)
3. Verificar deploy bem-sucedido
```

#### Passo 4: Configurar Domínio
```
Settings → Domains
Adicionar: calcprobr.com
Configurar DNS conforme instruções
```

---

## 📊 MONITORAMENTO PÓS-LANÇAMENTO

### Dia 1-7 (Primeira Semana)

**Métricas Críticas:**
```
☐ Uptime 99%+
☐ Erros < 1%
☐ Tempo de resposta < 500ms
☐ Primeiros usuários registrados
☐ Primeiros cálculos salvos
```

**Ações:**
```
☐ Monitorar logs de erro
☐ Verificar Google Search Console
☐ Acompanhar Analytics
☐ Responder feedback de usuários
☐ Corrigir bugs críticos
```

### Semana 2-4 (Primeiro Mês)

**Métricas de Crescimento:**
```
☐ Tráfego orgânico começando
☐ Primeiras conversões PRO
☐ Taxa de rejeição < 60%
☐ Tempo médio > 2min
☐ Páginas/sessão > 1.5
```

**Otimizações:**
```
☐ A/B testing de CTAs
☐ Melhorar calculadoras com mais uso
☐ Escrever primeiros artigos SEO
☐ Começar linkbuilding
☐ Otimizar conversão FREE→PRO
```

---

## 💰 EXPECTATIVAS REALISTAS

### Mês 1 (Lançamento)
```
Tráfego: 1.000-5.000 visitas
Usuários registrados: 50-200
Assinantes PRO: 0-5
Receita: R$ 0-100
```

### Mês 3 (Crescimento Inicial)
```
Tráfego: 20.000-50.000 visitas
Usuários registrados: 500-2.000
Assinantes PRO: 10-50
Receita: R$ 200-1.000
```

### Mês 6 (Tração)
```
Tráfego: 100.000-200.000 visitas
Usuários registrados: 3.000-10.000
Assinantes PRO: 100-500
Receita: R$ 2.000-10.000
```

### Mês 12 (Consolidação)
```
Tráfego: 300.000-500.000 visitas
Usuários registrados: 15.000-50.000
Assinantes PRO: 500-2.000
Receita: R$ 10.000-40.000
```

---

## 🎯 PRÓXIMOS PASSOS PÓS-LANÇAMENTO

### Semana 1-2
1. Monitorar estabilidade
2. Corrigir bugs críticos
3. Coletar feedback de usuários
4. Escrever 3 artigos SEO

### Semana 3-4
1. Completar 5 calculadoras restantes
2. Implementar exportação PDF
3. Escrever 5 artigos adicionais
4. Iniciar linkbuilding (10 backlinks)

### Mês 2-3
1. Completar 20 calculadoras MVP
2. 20 artigos SEO publicados
3. 20+ backlinks de qualidade
4. Implementar comparações A vs B
5. Otimizar conversão

---

## 🆘 TROUBLESHOOTING

### Stripe não funciona
```
1. Verificar chaves (test vs production)
2. Verificar webhook secret
3. Testar com cartão de teste: 4242 4242 4242 4242
4. Verificar logs em Dashboard → Developers → Logs
```

### AdSense não aparece
```
1. Verificar se domínio foi aprovado
2. Aguardar 24-48h após aprovação
3. Verificar NEXT_PUBLIC_ADSENSE_CLIENT_ID
4. Ads só aparecem em produção (não em localhost)
```

### Calculadora com erro
```
1. Verificar console do navegador
2. Verificar logs do servidor
3. Testar com valores diferentes
4. Verificar validação de inputs
```

### SEO não indexando
```
1. Verificar robots.txt
2. Enviar sitemap no Search Console
3. Aguardar 1-2 semanas
4. Verificar se há erros de rastreamento
```

---

## 📞 RECURSOS

### Documentação
- Stripe: https://stripe.com/docs
- AdSense: https://support.google.com/adsense
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs

### Suporte
- Stripe: https://support.stripe.com
- Google: https://support.google.com/adsense/community
- Vercel: https://vercel.com/support

---

## 🎉 LANÇAMENTO!

### Quando Lançar?

**Você está pronto para lançar quando:**
- ✅ Stripe configurado e testado
- ✅ Todas as calculadoras testadas
- ✅ Deploy em produção funcionando
- ✅ Domínio configurado
- ✅ Sem erros críticos

**Não espere por:**
- ❌ 20 calculadoras (11 já é suficiente)
- ❌ Conteúdo SEO completo
- ❌ Design perfeito
- ❌ Todas as features

### Como Anunciar?

1. **Redes Sociais**
   - LinkedIn (profissionais)
   - Twitter/X (tech community)
   - Facebook (grupos de RH, freelancers)

2. **Comunidades**
   - Reddit (r/brasil, r/freelance_br)
   - Fóruns de contabilidade
   - Grupos de WhatsApp/Telegram

3. **Product Hunt** (opcional)
   - Lançar após 1 mês de tração
   - Preparar screenshots
   - Engajar comunidade

---

**🚀 Boa sorte com o lançamento!**

**Lembre-se:** Lançar é melhor que perfeito. Você pode iterar e melhorar com feedback real de usuários.
