# ⚡ Configuração Rápida - Stripe e AdSense

## 🎯 STRIPE (30 minutos)

### Passo 1: Criar Conta Stripe

1. Acesse: https://dashboard.stripe.com/register
2. Preencha seus dados
3. Confirme email
4. Complete o cadastro

### Passo 2: Criar Produtos PRO

**No Dashboard do Stripe:**

1. Clique em **"Products"** no menu lateral
2. Clique em **"Add product"**

**Produto 1 - PRO Mensal:**
```
Name: CalcPro PRO Mensal
Description: Acesso PRO com recursos ilimitados
Pricing model: Standard pricing
Price: R$ 19.90
Billing period: Monthly
```
- Clique em **"Save product"**
- **COPIE o Price ID** (começa com `price_...`)
- Guarde para depois: `STRIPE_PRICE_ID_PRO_MONTHLY=price_xxxxx`

**Produto 2 - PRO Anual:**
```
Name: CalcPro PRO Anual
Description: Acesso PRO anual (economize 17%)
Pricing model: Standard pricing
Price: R$ 199.00
Billing period: Yearly
```
- Clique em **"Save product"**
- **COPIE o Price ID** (começa com `price_...`)
- Guarde para depois: `STRIPE_PRICE_ID_PRO_YEARLY=price_xxxxx`

### Passo 3: Obter Chaves da API

**No Dashboard do Stripe:**

1. Clique em **"Developers"** no menu lateral
2. Clique em **"API keys"**
3. Você verá duas chaves:

**Publishable key:**
```
Começa com: pk_test_...
Copie e guarde: STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

**Secret key:**
```
Clique em "Reveal test key"
Começa com: sk_test_...
Copie e guarde: STRIPE_SECRET_KEY=sk_test_xxxxx
```

### Passo 4: Configurar Webhook

**No Dashboard do Stripe:**

1. Ainda em **"Developers"**, clique em **"Webhooks"**
2. Clique em **"Add endpoint"**
3. Preencha:

```
Endpoint URL: https://SEU-DOMINIO.com/api/stripe/webhook
(Se ainda não tem domínio, use: https://seu-projeto.vercel.app/api/stripe/webhook)

Description: CalcPro Webhook

Events to send:
☑ checkout.session.completed
☑ customer.subscription.updated
☑ customer.subscription.deleted
```

4. Clique em **"Add endpoint"**
5. Na página do webhook, clique em **"Reveal"** no "Signing secret"
6. **COPIE o Webhook Secret** (começa com `whsec_...`)
7. Guarde: `STRIPE_WEBHOOK_SECRET=whsec_xxxxx`

### Passo 5: Adicionar ao Projeto

**Crie/edite o arquivo `.env.local` na raiz do projeto:**

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_ID_PRO_MONTHLY=price_xxxxx
STRIPE_PRICE_ID_PRO_YEARLY=price_xxxxx
```

### Passo 6: Testar

**Cartão de teste do Stripe:**
```
Número: 4242 4242 4242 4242
Data: Qualquer data futura (ex: 12/25)
CVC: Qualquer 3 dígitos (ex: 123)
CEP: Qualquer (ex: 12345)
```

**Testar localmente:**
```bash
npm run dev
# Acesse http://localhost:3000/precos
# Tente fazer um checkout
```

---

## 📢 GOOGLE ADSENSE (1-3 dias para aprovação)

### Passo 1: Criar Conta

1. Acesse: https://www.google.com/adsense/start/
2. Clique em **"Get started"**
3. Entre com sua conta Google
4. Preencha:
   - URL do site: `calcpro.br` (ou seu domínio)
   - País: Brasil
   - Aceite os termos

### Passo 2: Adicionar Código ao Site

**O Google vai te dar um código assim:**
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

**COPIE o `ca-pub-XXXXXXXXXXXXXXXX`**

**Adicione ao `.env.local`:**
```env
# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

**O código já está integrado no projeto!** 
- Arquivo: `app/layout.tsx` (já configurado)
- Componentes: `components/ads/adsense.tsx` (já criados)

### Passo 3: Verificar Site

**No painel do AdSense:**

1. Clique em **"Sites"**
2. Clique em **"Add site"**
3. Digite seu domínio: `calcpro.br`
4. Siga as instruções para verificar (geralmente via DNS ou arquivo HTML)

### Passo 4: Aguardar Aprovação

- **Tempo:** 1-3 dias (às vezes até 1 semana)
- **Email:** Google enviará email quando aprovar
- **Requisitos:**
  - Site com conteúdo original
  - Política de privacidade
  - Termos de uso
  - Tráfego mínimo (você já tem!)

### Passo 5: Criar Unidades de Anúncio (Após Aprovação)

**No painel do AdSense:**

1. Clique em **"Ads"** → **"By ad unit"**
2. Clique em **"Display ads"**

**Criar 2 unidades:**

**Unidade 1 - Topo:**
```
Name: CalcPro - Topo
Ad size: Responsive
Ad type: Display ads
```
- Clique em **"Create"**
- **COPIE o `data-ad-slot`** (número de 10 dígitos)

**Unidade 2 - Rodapé:**
```
Name: CalcPro - Rodapé
Ad size: Responsive
Ad type: Display ads
```
- Clique em **"Create"**
- **COPIE o `data-ad-slot`**

### Passo 6: Atualizar Slots no Código

**Edite o arquivo: `components/ads/adsense.tsx`**

Substitua os slots de exemplo pelos seus:

```typescript
export function AdSenseTop() {
  return (
    <AdSense
      slot="SEU_SLOT_TOPO_AQUI" // ← Substituir
      format="horizontal"
      className="my-4"
    />
  );
}

export function AdSenseBottom() {
  return (
    <AdSense
      slot="SEU_SLOT_RODAPE_AQUI" // ← Substituir
      format="horizontal"
      className="my-4"
    />
  );
}
```

---

## 🚀 DEPLOY NO VERCEL

### Passo 1: Conectar Repositório

1. Acesse: https://vercel.com
2. Clique em **"Add New"** → **"Project"**
3. Importe seu repositório do GitHub
4. Clique em **"Import"**

### Passo 2: Configurar Variáveis de Ambiente

**Na tela de configuração do projeto:**

1. Expanda **"Environment Variables"**
2. Adicione TODAS as variáveis do seu `.env.local`:

```env
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
NEXTAUTH_URL=https://seu-dominio.vercel.app
NEXTAUTH_SECRET=seu-secret-aqui
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRO_MONTHLY=price_...
STRIPE_PRICE_ID_PRO_YEARLY=price_...
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-...
GOOGLE_CLIENT_ID=... (opcional)
GOOGLE_CLIENT_SECRET=... (opcional)
```

3. Clique em **"Deploy"**

### Passo 3: Atualizar Webhook do Stripe

**Depois do deploy, volte ao Stripe:**

1. **Developers** → **Webhooks**
2. Edite o webhook que você criou
3. Atualize a URL para: `https://seu-projeto.vercel.app/api/stripe/webhook`
4. Salve

### Passo 4: Configurar Domínio (Opcional)

**No Vercel:**

1. Vá em **Settings** → **Domains**
2. Adicione seu domínio: `calcpro.br`
3. Configure o DNS conforme instruções
4. Aguarde propagação (5-30 minutos)

---

## ✅ CHECKLIST FINAL

### Stripe
- [ ] Conta criada
- [ ] 2 produtos criados (Mensal e Anual)
- [ ] Price IDs copiados
- [ ] API keys copiadas
- [ ] Webhook configurado
- [ ] Webhook secret copiado
- [ ] Variáveis adicionadas ao `.env.local`
- [ ] Testado com cartão de teste

### AdSense
- [ ] Conta criada
- [ ] Site adicionado
- [ ] Client ID copiado
- [ ] Variável adicionada ao `.env.local`
- [ ] Aguardando aprovação (1-3 dias)
- [ ] (Após aprovação) Unidades de anúncio criadas
- [ ] (Após aprovação) Slots atualizados no código

### Deploy
- [ ] Repositório no GitHub
- [ ] Projeto criado no Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado
- [ ] Webhook do Stripe atualizado com URL de produção
- [ ] Site funcionando

---

## 🆘 PROBLEMAS COMUNS

### Stripe: "Invalid API Key"
```
Solução: Verifique se copiou a chave correta (test vs live)
Verifique se não tem espaços extras
```

### Stripe: Webhook não funciona
```
Solução: 
1. Verifique a URL do webhook
2. Verifique o webhook secret
3. Teste com: stripe trigger checkout.session.completed
```

### AdSense: Não aparece
```
Solução:
1. Ads só aparecem em produção (não em localhost)
2. Aguarde 24-48h após aprovação
3. Verifique se o client ID está correto
4. Limpe o cache do navegador
```

### Vercel: Build falhou
```
Solução:
1. Verifique se todas as variáveis estão configuradas
2. Rode 'npm run build' localmente para ver o erro
3. Verifique os logs no Vercel
```

---

## 📞 PRECISA DE AJUDA?

### Documentação Oficial
- Stripe: https://stripe.com/docs
- AdSense: https://support.google.com/adsense
- Vercel: https://vercel.com/docs

### Suporte
- Stripe: https://support.stripe.com
- AdSense: https://support.google.com/adsense/community
- Vercel: https://vercel.com/support

---

## 🎉 PRONTO!

Depois de configurar tudo:

1. ✅ Teste localmente com `npm run dev`
2. ✅ Faça o deploy no Vercel
3. ✅ Teste em produção
4. ✅ **LANCE! 🚀**

**Tempo total estimado:** 2-4 horas (incluindo aprovação do AdSense)

**Boa sorte! 🎉**
