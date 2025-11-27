# 🌐 Configuração de Variáveis de Ambiente no Vercel

## Passo a Passo

### 1. Acessar o Projeto no Vercel

1. Acesse: https://vercel.com/dashboard
2. Clique no seu projeto **calcprobr** (ou callpro)
3. Vá em **Settings** → **Environment Variables**

---

### 2. Adicionar Variáveis de Ambiente

Clique em **Add New** e adicione uma por uma:

#### Database (Supabase)

```
Name: DATABASE_URL
Value: postgresql://postgres.YOUR_USER:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
Environment: Production, Preview, Development
```

```
Name: DIRECT_URL
Value: postgresql://postgres.YOUR_USER:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:5432/postgres
Environment: Production, Preview, Development
```

#### NextAuth

```
Name: NEXTAUTH_URL
Value: https://seu-dominio.vercel.app (ou seu domínio customizado)
Environment: Production, Preview, Development
```

```
Name: NEXTAUTH_SECRET
Value: generate_me_with_openssl_rand_base64_32
Environment: Production, Preview, Development
```

**⚠️ IMPORTANTE:** Gere um secret seguro:
```bash
openssl rand -base64 32
```

#### Stripe (LIVE MODE - Produção)

```
Name: STRIPE_SECRET_KEY
Value: sk_live_SEU_SECRET_KEY_AQUI (copie do seu .env.local)
Environment: Production
```

```
Name: STRIPE_PUBLISHABLE_KEY
Value: pk_live_SEU_PUBLISHABLE_KEY_AQUI (copie do seu .env.local)
Environment: Production
```

```
Name: STRIPE_WEBHOOK_SECRET
Value: whsec_SEU_WEBHOOK_SECRET_DE_PRODUCAO
Environment: Production
```

**⚠️ IMPORTANTE:** O webhook secret de produção é DIFERENTE do local!

Você precisa criar um webhook de produção no Stripe:
1. Stripe Dashboard → Developers → Webhooks → Add endpoint
2. URL: https://seu-dominio.vercel.app/api/stripe/webhook
3. Eventos: customer.subscription.*, invoice.payment_*
4. Copie o signing secret (whsec_...)

```
Name: STRIPE_PRICE_ID_PRO_MONTHLY
Value: price_1SYBe1KkjJ7tububbgKyRJwq
Environment: Production, Preview, Development
```

```
Name: STRIPE_PRICE_ID_PRO_YEARLY
Value: price_1SYBfvKkjJ7tububXemd41Tn
Environment: Production, Preview, Development
```

#### Google AdSense (Opcional)

```
Name: NEXT_PUBLIC_ADSENSE_CLIENT_ID
Value: ca-pub-SEU_ID_AQUI
Environment: Production
```

#### Cron Job Security

```
Name: CRON_SECRET
Value: gere_um_secret_aleatorio_aqui
Environment: Production, Preview, Development
```

#### OpenAI (Opcional)

```
Name: OPENAI_API_KEY
Value: sk-SEU_KEY_AQUI
Environment: Production, Preview, Development
```

---

### 3. Configurar Webhook de Produção no Stripe

**IMPORTANTE:** O webhook local não funciona em produção!

1. Acesse: https://dashboard.stripe.com/webhooks
2. Clique em **Add endpoint**
3. Preencha:
   ```
   Endpoint URL: https://seu-dominio.vercel.app/api/stripe/webhook
   
   Events to send:
   ✅ customer.subscription.created
   ✅ customer.subscription.updated
   ✅ customer.subscription.deleted
   ✅ invoice.payment_succeeded
   ✅ invoice.payment_failed
   ✅ checkout.session.completed
   ```
4. Clique em **Add endpoint**
5. **COPIE O SIGNING SECRET** (whsec_...)
6. Adicione no Vercel como `STRIPE_WEBHOOK_SECRET`

---

### 4. Redeploy

Após adicionar todas as variáveis:

1. Vá em **Deployments**
2. Clique nos 3 pontinhos do último deploy
3. Clique em **Redeploy**
4. Marque **Use existing Build Cache**
5. Clique em **Redeploy**

---

## ✅ Checklist de Variáveis

Marque conforme for adicionando:

### Obrigatórias
- [ ] DATABASE_URL
- [ ] DIRECT_URL
- [ ] NEXTAUTH_URL (com domínio de produção)
- [ ] NEXTAUTH_SECRET (gerar novo)
- [ ] STRIPE_SECRET_KEY
- [ ] STRIPE_PUBLISHABLE_KEY
- [ ] STRIPE_WEBHOOK_SECRET (de produção!)
- [ ] STRIPE_PRICE_ID_PRO_MONTHLY
- [ ] STRIPE_PRICE_ID_PRO_YEARLY

### Opcionais
- [ ] NEXT_PUBLIC_ADSENSE_CLIENT_ID
- [ ] CRON_SECRET
- [ ] OPENAI_API_KEY
- [ ] GOOGLE_CLIENT_ID
- [ ] GOOGLE_CLIENT_SECRET

---

## 🧪 Testar em Produção

Após o deploy:

1. Acesse seu site em produção
2. Vá em `/precos`
3. Clique em **Assinar PRO**
4. Complete o checkout com cartão REAL (ou teste se ainda estiver em test mode)
5. Verifique se:
   - Pagamento aparece no Stripe Dashboard
   - Webhook foi recebido (Stripe Dashboard → Webhooks → Logs)
   - Assinatura foi criada no banco de dados
   - Usuário virou PRO no dashboard

---

## 🚨 Problemas Comuns

### Erro: "Webhook signature verification failed"
**Causa:** Usando webhook secret local em produção
**Solução:** Criar webhook de produção e usar o secret correto

### Erro: "Invalid API Key"
**Causa:** Chaves não foram salvas corretamente no Vercel
**Solução:** Verificar se não tem espaços extras, redeploy

### Checkout não abre
**Causa:** STRIPE_PUBLISHABLE_KEY incorreta
**Solução:** Verificar a chave no Vercel

### Assinatura não sincroniza
**Causa:** Webhook não configurado ou com URL errada
**Solução:** Verificar URL do webhook no Stripe (deve ser https://seu-dominio.vercel.app/api/stripe/webhook)

---

## 📱 Próximos Passos

Depois de configurar:

1. ✅ Testar checkout em produção
2. ✅ Testar cancelamento
3. ✅ Monitorar Stripe Dashboard por 24h
4. ✅ Configurar Google AdSense
5. ✅ Começar a criar conteúdo SEO

---

## 💡 Dicas

1. **Sempre use HTTPS** em produção
2. **Monitore os logs do webhook** no Stripe Dashboard
3. **Configure notificações por email** no Stripe
4. **Ative 2FA** na conta Stripe
5. **Faça backup do banco** antes de grandes mudanças

---

**🎉 Pronto! Seu Stripe está configurado em produção!**

Qualquer dúvida, consulte: https://stripe.com/docs/webhooks
