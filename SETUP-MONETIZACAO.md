# Setup de Monetização - calcprobr.com

## ✅ Implementado

### 1. Sistema de Assinaturas (Stripe)
- ✅ Integração completa com Stripe
- ✅ Planos FREE, PRO Mensal e PRO Anual
- ✅ Webhooks para sincronização automática
- ✅ Portal de gerenciamento de assinatura
- ✅ Paywalls em features premium

### 2. Google AdSense
- ✅ Componentes de ads criados
- ✅ Script do AdSense no layout
- ✅ Ads ocultados para usuários PRO
- ✅ Posicionamento estratégico (topo e rodapé)

### 3. Hooks e Utilitários
- ✅ `useSubscription()` - Hook para verificar plano do usuário
- ✅ `getUserSubscription()` - Função server-side
- ✅ `canSaveCalculation()` - Verificar limites
- ✅ `canExportPDF()` - Verificar acesso a PDF
- ✅ `canCompare()` - Verificar acesso a comparações

---

## 🔧 Configuração Necessária

### Passo 1: Configurar Stripe

1. **Criar conta no Stripe:**
   - Acesse https://dashboard.stripe.com/register
   - Complete o cadastro

2. **Obter chaves da API:**
   - Dashboard → Developers → API keys
   - Copie a `Secret key` e `Publishable key`

3. **Criar produtos e preços:**
   ```bash
   # No dashboard do Stripe:
   Products → Add Product
   
   Produto 1: CalcPro PRO Mensal
   - Preço: R$ 19,90
   - Recorrência: Mensal
   - Copie o Price ID (price_xxxxx)
   
   Produto 2: CalcPro PRO Anual
   - Preço: R$ 199,00
   - Recorrência: Anual
   - Copie o Price ID (price_xxxxx)
   ```

4. **Configurar webhook:**
   ```bash
   # No dashboard do Stripe:
   Developers → Webhooks → Add endpoint
   
   URL: https://seu-dominio.com/api/stripe/webhook
   
   Eventos para escutar:
   - checkout.session.completed
   - customer.subscription.updated
   - customer.subscription.deleted
   
   Copie o Webhook Secret (whsec_xxxxx)
   ```

5. **Adicionar variáveis de ambiente:**
   ```env
   # .env.local
   STRIPE_SECRET_KEY=sk_test_xxxxx
   STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   STRIPE_PRICE_ID_PRO_MONTHLY=price_xxxxx
   STRIPE_PRICE_ID_PRO_YEARLY=price_xxxxx
   ```

### Passo 2: Configurar Google AdSense

1. **Criar conta no AdSense:**
   - Acesse https://www.google.com/adsense/start/
   - Complete o cadastro e aguarde aprovação (pode levar 1-3 dias)

2. **Obter Client ID:**
   - Dashboard → Ads → Get code
   - Copie o `data-ad-client` (ca-pub-xxxxx)

3. **Criar unidades de anúncio:**
   ```bash
   # No dashboard do AdSense:
   Ads → Ad units → Display ads
   
   Criar 3 unidades:
   
   1. "CalcPro - Topo"
      - Tipo: Display horizontal
      - Copie o data-ad-slot
   
   2. "CalcPro - Rodapé"
      - Tipo: Display horizontal
      - Copie o data-ad-slot
   
   3. "CalcPro - Sidebar" (futuro)
      - Tipo: Display vertical
      - Copie o data-ad-slot
   ```

4. **Adicionar variáveis de ambiente:**
   ```env
   # .env.local
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxx
   ```

5. **Atualizar slots nos componentes:**
   ```typescript
   // components/ads/adsense.tsx
   
   export function AdSenseTop() {
     return (
       <AdSense
         slot="1234567890" // ← Substituir pelo slot real
         format="horizontal"
         className="my-4"
       />
     );
   }
   
   export function AdSenseBottom() {
     return (
       <AdSense
         slot="0987654321" // ← Substituir pelo slot real
         format="horizontal"
         className="my-4"
       />
     );
   }
   ```

### Passo 3: Migrar Database

```bash
# Gerar migration para adicionar tabela Subscription
npx prisma migrate dev --name add_subscription

# Ou se já existe, apenas gerar o client
npx prisma generate
```

### Passo 4: Testar Localmente

1. **Testar Stripe (modo test):**
   ```bash
   # Usar cartão de teste:
   Número: 4242 4242 4242 4242
   Data: Qualquer data futura
   CVC: Qualquer 3 dígitos
   ```

2. **Testar webhook localmente:**
   ```bash
   # Instalar Stripe CLI
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   
   # Em outro terminal, testar evento
   stripe trigger checkout.session.completed
   ```

3. **Verificar AdSense:**
   - Ads só aparecem em produção
   - Em desenvolvimento, verá espaços vazios (normal)

---

## 📊 Estrutura de Planos

### FREE (R$ 0)
- Calculadoras ilimitadas
- Até 3 cálculos salvos
- Com anúncios
- Sem exportação PDF
- Sem comparações

### PRO Mensal (R$ 19,90/mês)
- Tudo do FREE
- Cálculos salvos ilimitados
- Exportar PDF profissional
- Sem anúncios
- Comparações A vs B
- Histórico completo
- Suporte prioritário

### PRO Anual (R$ 199/ano)
- Tudo do PRO Mensal
- Economia de R$ 39,80 (17%)
- 2 meses grátis

---

## 🎯 Features com Paywall

### 1. Salvar Cálculos
```typescript
// Limite: 3 para FREE, ilimitado para PRO
// Implementado em: components/calculators/save-calculation-dialog.tsx

if (!canSave(savedCount)) {
  setShowUpgrade(true); // Mostra modal de upgrade
  return;
}
```

### 2. Exportar PDF (A IMPLEMENTAR)
```typescript
// Apenas PRO
// Implementar em: components/calculators/export-pdf-button.tsx

if (!canExportPDF) {
  setShowUpgrade(true);
  return;
}
```

### 3. Comparações A vs B (A IMPLEMENTAR)
```typescript
// Apenas PRO
// Implementar em: components/calculators/comparison-mode.tsx

if (!canCompare) {
  setShowUpgrade(true);
  return;
}
```

### 4. Sem Anúncios
```typescript
// Automático via AdWrapper
// Implementado em: components/ads/ad-wrapper.tsx

<AdWrapper isPro={isPro}>
  <AdSense />
</AdWrapper>
```

---

## 🚀 Deploy em Produção

### 1. Variáveis de Ambiente (Vercel)

```bash
# Vercel Dashboard → Settings → Environment Variables

# Stripe (usar chaves de produção)
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_ID_PRO_MONTHLY=price_xxxxx
STRIPE_PRICE_ID_PRO_YEARLY=price_xxxxx

# AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxx

# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# NextAuth
NEXTAUTH_URL=https://calcprobr.com
NEXTAUTH_SECRET=xxxxx
```

### 2. Configurar Webhook em Produção

```bash
# Stripe Dashboard → Webhooks
URL: https://calcprobr.com/api/stripe/webhook
```

### 3. Verificar AdSense

- Adicionar domínio no AdSense
- Aguardar aprovação (1-3 dias)
- Verificar que ads aparecem corretamente

---

## 📈 Monitoramento

### Métricas Stripe
- Dashboard → Analytics
- Acompanhar:
  - MRR (Monthly Recurring Revenue)
  - Churn rate
  - Conversão FREE → PRO

### Métricas AdSense
- Dashboard → Reports
- Acompanhar:
  - RPM (Revenue per Mille)
  - CTR (Click-Through Rate)
  - Receita diária

### Métricas Internas
```sql
-- Total de assinantes PRO
SELECT COUNT(*) FROM "Subscription" 
WHERE plan = 'PRO' AND status = 'ACTIVE';

-- Conversão FREE → PRO
SELECT 
  (SELECT COUNT(*) FROM "Subscription" WHERE plan = 'PRO') * 100.0 / 
  (SELECT COUNT(*) FROM "User") as conversion_rate;

-- Churn mensal
SELECT COUNT(*) FROM "Subscription" 
WHERE status = 'CANCELED' 
AND "updatedAt" > NOW() - INTERVAL '30 days';
```

---

## 🐛 Troubleshooting

### Webhook não funciona
```bash
# Verificar logs
Stripe Dashboard → Developers → Webhooks → [seu webhook] → Logs

# Testar manualmente
stripe trigger checkout.session.completed
```

### Ads não aparecem
- Verificar se `NEXT_PUBLIC_ADSENSE_CLIENT_ID` está definido
- Verificar se o domínio está aprovado no AdSense
- Ads só aparecem em produção (não em localhost)
- Aguardar 24-48h após aprovação

### Assinatura não sincroniza
- Verificar webhook secret
- Verificar logs em `/api/stripe/webhook`
- Verificar eventos no Stripe Dashboard

---

## ✅ Checklist de Lançamento

### Stripe
- [ ] Conta criada e verificada
- [ ] Produtos criados (PRO Mensal e Anual)
- [ ] Webhook configurado
- [ ] Variáveis de ambiente definidas
- [ ] Testado com cartão de teste
- [ ] Migrado para chaves de produção

### AdSense
- [ ] Conta criada e aprovada
- [ ] Unidades de anúncio criadas
- [ ] Slots atualizados no código
- [ ] Variável de ambiente definida
- [ ] Testado em produção

### Database
- [ ] Migration executada
- [ ] Tabela Subscription criada
- [ ] Enums configurados

### Testes
- [ ] Fluxo de checkout completo
- [ ] Webhook sincroniza corretamente
- [ ] Paywall funciona (limite de 3 salvamentos)
- [ ] Ads aparecem para FREE
- [ ] Ads NÃO aparecem para PRO
- [ ] Portal de gerenciamento funciona

---

## 💰 Projeção de Receita

### Mês 3 (50k visitas)
```
Google Ads:
- 50.000 visitas × 60% FREE = 30.000 visitas com ads
- 30.000 × R$ 0,08 RPV = R$ 2.400

Assinaturas PRO:
- 50.000 × 0.5% conversão = 250 assinantes
- 250 × R$ 19,90 = R$ 4.975

Total: R$ 7.375/mês
```

### Mês 6 (150k visitas)
```
Google Ads:
- 150.000 × 60% = 90.000 visitas com ads
- 90.000 × R$ 0,08 = R$ 7.200

Assinaturas PRO:
- 150.000 × 0.8% = 1.200 assinantes
- 1.200 × R$ 19,90 = R$ 23.880

Total: R$ 31.080/mês
```

---

## 📞 Suporte

### Stripe
- Docs: https://stripe.com/docs
- Support: https://support.stripe.com

### Google AdSense
- Docs: https://support.google.com/adsense
- Forum: https://support.google.com/adsense/community

### Prisma
- Docs: https://www.prisma.io/docs
- Discord: https://pris.ly/discord

---

**Próximos Passos:**
1. Configurar Stripe (30 min)
2. Configurar AdSense (aguardar aprovação 1-3 dias)
3. Testar localmente (1 hora)
4. Deploy em produção (30 min)
5. Monitorar primeiras conversões (ongoing)
