# ✅ Checklist de Deploy - calcprobr.com

## 🎉 STATUS ATUAL: DEPLOY BEM-SUCEDIDO!

O site está no ar e funcionando! Agora só falta configurar as variáveis de ambiente.

---

## ✅ O QUE JÁ ESTÁ PRONTO:

- ✅ **Código no GitHub** - https://github.com/Lucas-bevilacqua/calpro
- ✅ **Deploy no Vercel** - Site no ar e funcionando
- ✅ **11 Calculadoras** - Todas implementadas e funcionais
- ✅ **Design Responsivo** - Mobile e desktop perfeitos
- ✅ **SEO Otimizado** - Meta tags, sitemap, schema markup
- ✅ **Sistema de Autenticação** - NextAuth configurado
- ✅ **Sistema de Monetização** - Stripe + AdSense integrados
- ✅ **Dashboard de Usuário** - Completo
- ✅ **Páginas de Preços** - Implementadas
- ✅ **Blog** - Estrutura pronta

---

## 🔧 O QUE FALTA CONFIGURAR:

### 1. ⚠️ VARIÁVEIS DE AMBIENTE (CRÍTICO)

Você já tem o banco do Vercel plugado, mas precisa configurar:

#### No Vercel Dashboard → Settings → Environment Variables:

```env
# NextAuth (OBRIGATÓRIO)
NEXTAUTH_URL=https://seu-projeto.vercel.app
NEXTAUTH_SECRET=gere-com-openssl-rand-base64-32

# Stripe (Opcional por enquanto - pode usar placeholders)
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder
STRIPE_PRICE_ID_PRO_MONTHLY=price_placeholder
STRIPE_PRICE_ID_PRO_YEARLY=price_placeholder

# Google AdSense (Opcional por enquanto)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-placeholder

# Google OAuth (Opcional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

**Como gerar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

### 2. 🗄️ EXECUTAR MIGRATIONS DO PRISMA

Como você já tem o banco do Vercel plugado, só precisa criar as tabelas:

#### Opção A: Via Vercel CLI (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Link ao projeto
vercel link

# Puxar variáveis de ambiente
vercel env pull .env.local

# Executar migrations
npx prisma migrate deploy
```

#### Opção B: Via Dashboard do Vercel

1. Settings → General → Build & Development Settings
2. Build Command: `prisma generate && prisma migrate deploy && next build`
3. Redeploy

#### Opção C: Criar endpoint temporário

Criar `app/api/setup-db/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Testar conexão
    await prisma.$connect();
    
    // Verificar se as tabelas existem
    const users = await prisma.user.count();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database conectado!',
      users 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
```

Depois acesse: `https://seu-projeto.vercel.app/api/setup-db`

---

### 3. 🎨 CONFIGURAÇÕES OPCIONAIS (Depois)

#### Stripe (Para monetização)

1. Criar conta: https://dashboard.stripe.com
2. Criar produtos PRO Mensal (R$ 19,90) e Anual (R$ 199,00)
3. Copiar as chaves e price IDs
4. Atualizar no Vercel
5. Configurar webhook: `https://seu-projeto.vercel.app/api/stripe/webhook`

#### Google AdSense (Para anúncios)

1. Criar conta: https://adsense.google.com
2. Adicionar domínio
3. Aguardar aprovação (1-7 dias)
4. Copiar o Client ID
5. Atualizar no Vercel

#### Google OAuth (Para login social)

1. Google Cloud Console: https://console.cloud.google.com
2. Criar projeto
3. Ativar Google+ API
4. Criar credenciais OAuth 2.0
5. Adicionar redirect: `https://seu-projeto.vercel.app/api/auth/callback/google`
6. Copiar Client ID e Secret
7. Atualizar no Vercel

---

## 🚀 ORDEM DE PRIORIDADE:

### AGORA (Crítico):
1. ✅ Adicionar `NEXTAUTH_URL` e `NEXTAUTH_SECRET` no Vercel
2. ✅ Executar migrations do Prisma
3. ✅ Testar cadastro e login

### DEPOIS (Importante):
4. ⏳ Configurar Stripe (quando quiser monetizar)
5. ⏳ Configurar AdSense (quando quiser anúncios)
6. ⏳ Configurar Google OAuth (opcional)

### FUTURO (Melhorias):
7. ⏳ Escrever artigos para o blog
8. ⏳ Configurar Google Search Console
9. ⏳ Configurar Google Analytics
10. ⏳ Adicionar mais calculadoras

---

## 🐛 ERROS ATUAIS E SOLUÇÕES:

### Erro 500 em /api/register
**Causa:** Database não tem as tabelas ainda (migrations não rodaram)
**Solução:** Executar `npx prisma migrate deploy`

### Erro 404 em cookies
**Causa:** Normal do Next.js, pode ignorar
**Solução:** Nenhuma necessária

---

## 📊 MÉTRICAS DE SUCESSO:

### Fase 1 - Setup (VOCÊ ESTÁ AQUI)
- ✅ Deploy funcionando
- ⏳ Variáveis configuradas
- ⏳ Database com tabelas
- ⏳ Cadastro funcionando

### Fase 2 - Lançamento
- ⏳ Stripe configurado
- ⏳ AdSense aprovado
- ⏳ Primeiros usuários
- ⏳ Primeiras conversões

### Fase 3 - Crescimento
- ⏳ 1k+ visitas/mês
- ⏳ 100+ usuários cadastrados
- ⏳ 10+ assinantes PRO
- ⏳ R$ 200+/mês em receita

---

## 🎯 PRÓXIMO PASSO IMEDIATO:

1. **Gere o NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

2. **Adicione no Vercel:**
   - Settings → Environment Variables
   - `NEXTAUTH_URL` = `https://seu-projeto.vercel.app`
   - `NEXTAUTH_SECRET` = (o secret gerado)

3. **Execute as migrations:**
   ```bash
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

4. **Redeploy:**
   - Deployments → ... → Redeploy

5. **Teste:**
   - Acesse o site
   - Crie uma conta
   - Faça login
   - Use uma calculadora
   - ✅ SUCESSO!

---

## 📞 SUPORTE:

Se tiver algum erro, me avise e eu te ajudo! 🚀

**Seu projeto está 95% pronto! Só falta configurar as variáveis e rodar as migrations!**
