# ⚠️ IMPORTANTE: Configurar variáveis de ambiente na Vercel

## Variáveis Obrigatórias

### Database
```
DATABASE_URL=prisma://accelerate.prisma-data.net/?api_key=SEU_API_KEY_AQUI
DIRECT_URL=postgres://SEU_CONNECTION_STRING_AQUI
```

### NextAuth
```
NEXTAUTH_URL=https://calcprobr.com
NEXTAUTH_SECRET=GERE_UM_SECRET_SEGURO_AQUI
```

**Como gerar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### OpenAI (para geração de posts)
```
OPENAI_API_KEY=sk-proj-SEU_KEY_AQUI
```

### Cron Job
```
CRON_SECRET=GERE_UM_SECRET_SEGURO_AQUI
```

### Stripe (opcional)
```
STRIPE_SECRET_KEY=sk_live_SEU_KEY_AQUI
STRIPE_PUBLISHABLE_KEY=pk_live_SEU_KEY_AQUI
STRIPE_WEBHOOK_SECRET=whsec_SEU_SECRET_AQUI
```

### AdSense (opcional)
```
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-SEU_ID_AQUI
```

---

## Como configurar na Vercel

1. Acesse: https://vercel.com/seu-projeto/settings/environment-variables
2. Adicione cada variável acima
3. Selecione os ambientes: Production, Preview, Development
4. Clique em "Save"
5. Faça um novo deploy

---

## Checklist de Deploy

- [ ] DATABASE_URL configurado
- [ ] DIRECT_URL configurado
- [ ] NEXTAUTH_URL = https://calcprobr.com
- [ ] NEXTAUTH_SECRET gerado (seguro)
- [ ] OPENAI_API_KEY configurado
- [ ] CRON_SECRET gerado (seguro)
- [ ] Domínio calcprobr.com configurado na Vercel
- [ ] Novo deploy realizado

---

## Troubleshooting

### Erro 404 no login
- ✅ Verifique se NEXTAUTH_URL está correto (https://calcprobr.com)
- ✅ Verifique se o domínio está configurado na Vercel
- ✅ Faça um novo deploy após configurar as variáveis

### Erro de autenticação
- ✅ Verifique se NEXTAUTH_SECRET está configurado
- ✅ Verifique se DATABASE_URL está correto
- ✅ Verifique se o usuário existe no banco

### Erro ao gerar posts
- ✅ Verifique se OPENAI_API_KEY está configurado
- ✅ Verifique se tem créditos na conta OpenAI
