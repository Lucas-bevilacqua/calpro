# 📋 Projeto CalcPro - Documentação Completa

**Domínio:** [calcprobr.com](https://calcprobr.com)  
**Versão:** 1.0  
**Data:** Novembro 2025  
**Status:** MVP em Desenvolvimento (70% completo)

---

## 🎯 Visão Geral do Projeto

### Missão
Fornecer calculadoras profissionais precisas e atualizadas para o mercado brasileiro, com foco em cálculos trabalhistas, financeiros, freelancer e construção.

### Proposta de Valor
- **Para Usuários:** Calculadoras confiáveis, com referências legais, design moderno e mobile-first
- **Para o Negócio:** Plataforma SaaS com potencial de R$ 88k/mês em 12 meses

### Potencial de Mercado
- **221.000 buscas/mês** de tráfego orgânico potencial
- **R$ 7k-88k/mês** de receita projetada (Mês 3-12)
- **83-91%** de margem de lucro
- **Break-even:** Mês 7-8

---

## 🏗️ Arquitetura Técnica

### Stack Tecnológica

#### Frontend
```typescript
Framework: Next.js 14 (App Router)
Linguagem: TypeScript 5
UI Library: React 19
Styling: TailwindCSS 4
Componentes: shadcn/ui (Radix UI)
Ícones: Lucide React
Gráficos: Recharts
Validação: Zod + React Hook Form
```

#### Backend
```typescript
API: Next.js API Routes
Database: PostgreSQL (Supabase)
ORM: Prisma 5.22
Autenticação: NextAuth.js 4
Pagamentos: Stripe
Cache: (Planejado) Redis
```

#### Infraestrutura
```
Hosting: Vercel
Database: Supabase (PostgreSQL)
CDN: Vercel Edge Network
Analytics: (Planejado) Plausible
Monitoring: Vercel Analytics
```

### Estrutura do Projeto

```
calcpro/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Grupo de rotas de autenticação
│   │   ├── login/
│   │   └── registro/
│   ├── (calculators)/            # Grupo de calculadoras
│   │   ├── rescisao/
│   │   ├── horas-extras/
│   │   ├── decimo-terceiro/
│   │   ├── salario-liquido/
│   │   ├── juros-compostos/
│   │   └── financiamento/
│   ├── (marketing)/              # Landing pages
│   │   ├── page.tsx              # Homepage
│   │   └── sobre/
│   ├── admin/                    # Dashboard administrativo
│   │   ├── users/
│   │   ├── posts/
│   │   └── seo/
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   ├── calculations/
│   │   ├── stripe/
│   │   ├── subscription/
│   │   └── seo/
│   ├── blog/                     # Blog posts
│   ├── dashboard/                # Dashboard do usuário
│   ├── precos/                   # Página de preços
│   └── layout.tsx
├── components/                   # Componentes React
│   ├── calculators/              # Formulários de calculadoras
│   ├── subscription/             # Componentes de assinatura
│   ├── ads/                      # Google AdSense
│   ├── layout/                   # Header, Footer, Nav
│   ├── seo/                      # SEO components
│   └── ui/                       # shadcn/ui components
├── lib/                          # Utilitários e lógica
│   ├── calculators/              # Lógica de cálculos
│   │   ├── rescisao.ts
│   │   ├── horas-extras.ts
│   │   ├── decimo-terceiro.ts
│   │   ├── salario-liquido.ts
│   │   ├── juros-compostos.ts
│   │   └── financiamento.ts
│   ├── stripe.ts                 # Cliente Stripe
│   ├── subscription.ts           # Lógica de assinaturas
│   ├── prisma.ts                 # Cliente Prisma
│   └── seo/                      # SEO utilities
├── hooks/                        # React hooks customizados
│   ├── use-subscription.ts
│   └── use-toast.ts
├── prisma/                       # Database schema
│   ├── schema.prisma
│   └── migrations/
├── scripts/                      # Scripts de automação
│   ├── generate-report.ts        # Relatórios SEO
│   └── create-post.ts            # Criação de posts
└── public/                       # Assets estáticos
    ├── images/
    └── icons/
```

---

## 💾 Modelo de Dados (Prisma Schema)

### Principais Modelos

#### User
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  password      String?
  role          Role      @default(USER)
  avatar        String?
  bio           String?
  
  accounts      Account[]
  sessions      Session[]
  calculations  Calculation[]
  savedCalculations SavedCalculation[]
  posts         Post[]
  preferences   UserPreferences?
  subscription  Subscription?
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

#### Subscription
```prisma
model Subscription {
  id                   String             @id @default(cuid())
  userId               String             @unique
  stripeCustomerId     String?            @unique
  stripeSubscriptionId String?            @unique
  stripePriceId        String?
  plan                 SubscriptionPlan   @default(FREE)
  status               SubscriptionStatus @default(ACTIVE)
  currentPeriodStart   DateTime?
  currentPeriodEnd     DateTime?
  cancelAtPeriodEnd    Boolean            @default(false)
  
  user                 User               @relation(...)
  createdAt            DateTime           @default(now())
  updatedAt            DateTime           @updatedAt
}
```

#### Calculation & SavedCalculation
```prisma
model Calculation {
  id             String   @id @default(cuid())
  userId         String?
  calculatorType String
  inputs         Json
  results        Json
  createdAt      DateTime @default(now())
  
  user           User?    @relation(...)
  savedCalculation SavedCalculation?
}

model SavedCalculation {
  id            String   @id @default(cuid())
  userId        String
  calculationId String   @unique
  name          String
  notes         String?
  
  user          User        @relation(...)
  calculation   Calculation @relation(...)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

#### Post (Blog)
```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  slug      String   @unique
  content   String   @db.Text
  excerpt   String?  @db.Text
  image     String?
  published Boolean  @default(false)
  authorId  String
  
  author    User     @relation(...)
  contentPlan Json?
  seoMetrics  Json?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🧮 Calculadoras Implementadas

### 1. Rescisão Trabalhista CLT
**Status:** ✅ Completa  
**Potencial SEO:** 33.100 buscas/mês  
**Arquivo:** `lib/calculators/rescisao.ts`

**Funcionalidades:**
- Cálculo de aviso prévio (30d + 3d/ano, máx 90d)
- Saldo de salário proporcional
- 13º salário proporcional
- Férias proporcionais + 1/3 constitucional
- Multa FGTS 40% (sem justa causa)
- Acordo trabalhista (50% aviso, 20% FGTS)
- Descontos INSS e IRRF

**Tipos de Rescisão:**
- Sem justa causa (por iniciativa do empregador)
- Pedido de demissão
- Acordo trabalhista (Lei 13.467/2017)
- Justa causa

### 2. Horas Extras com DSR
**Status:** ✅ Completa  
**Potencial SEO:** 27.100 buscas/mês  
**Arquivo:** `lib/calculators/horas-extras.ts`

**Funcionalidades:**
- Adicional de 50% (dias úteis)
- Adicional de 100% (domingos e feriados)
- DSR sobre horas extras
- Cálculo mensal e anual
- Valor hora base correto

### 3. 13º Salário
**Status:** ✅ Completa  
**Potencial SEO:** 49.500 buscas/mês  
**Arquivo:** `lib/calculators/decimo-terceiro.ts`

**Funcionalidades:**
- Primeira parcela (50% até novembro)
- Segunda parcela (50% - descontos)
- Descontos INSS e IRRF
- Avos proporcionais (meses trabalhados)
- Cálculo para rescisão

### 4. Salário Líquido (INSS + IRRF)
**Status:** ✅ Completa  
**Potencial SEO:** 15.000 buscas/mês  
**Arquivo:** `lib/calculators/salario-liquido.ts`

**Funcionalidades:**
- INSS progressivo 2025
- IRRF com dependentes
- Dedução por dependente (R$ 189,59)
- Faixas atualizadas
- Pensão alimentícia

### 5. Juros Compostos
**Status:** ✅ Completa  
**Potencial SEO:** 9.900 buscas/mês  
**Arquivo:** `lib/calculators/juros-compostos.ts`

**Funcionalidades:**
- Aporte inicial + mensal
- Taxa anual/mensal
- Período em meses/anos
- Gráfico de evolução (Recharts)
- Projeção de crescimento

### 6. Financiamento (SAC vs Price)
**Status:** ✅ Completa  
**Potencial SEO:** 12.000 buscas/mês  
**Arquivo:** `lib/calculators/financiamento.ts`

**Funcionalidades:**
- Tabela SAC (parcelas decrescentes)
- Tabela Price (parcelas fixas)
- Comparação lado a lado
- Amortização detalhada
- Gráfico comparativo
- Tabela completa de parcelas

---

## 💰 Modelo de Negócio

### Planos de Assinatura

#### FREE (R$ 0/mês)
- ✅ Calculadoras ilimitadas
- ✅ Até 3 cálculos salvos
- ❌ Com anúncios Google AdSense
- ❌ Sem exportação PDF
- ❌ Sem comparações A vs B

#### PRO Mensal (R$ 19,90/mês)
- ✅ Cálculos salvos ilimitados
- ✅ Exportar PDF profissional
- ✅ Sem anúncios
- ✅ Comparações A vs B
- ✅ Suporte prioritário
- ✅ Campos personalizados

#### PRO Anual (R$ 199/ano)
- ✅ Tudo do PRO Mensal
- ✅ Economia de 17%
- ✅ 2 meses grátis

### Fontes de Receita

#### 1. Google AdSense (Usuários FREE)
```
Mês 3:  R$ 2.400  (50k visitas)
Mês 6:  R$ 7.200  (150k visitas)
Mês 12: R$ 16.500 (300k visitas)
```

#### 2. Assinaturas PRO
```
Mês 3:  R$ 4.975  (250 assinantes, 0.5% conversão)
Mês 6:  R$ 23.880 (1.200 assinantes, 0.8% conversão)
Mês 12: R$ 71.640 (3.600 assinantes, 1.2% conversão)
```

#### 3. B2B/Enterprise (Futuro)
```
Plano Business: R$ 99/mês
Plano Enterprise: R$ 499/mês
White-label: Sob consulta
```

#### 4. Afiliados (Futuro)
- Produtos financeiros complementares
- Cursos e treinamentos
- Ferramentas de RH

### Projeção de Receita

| Mês | Visitas | Google Ads | Assinaturas | Total | Margem |
|-----|---------|------------|-------------|-------|--------|
| 3   | 50k     | R$ 2.400   | R$ 4.975    | R$ 7.375  | 83% |
| 6   | 150k    | R$ 7.200   | R$ 23.880   | R$ 31.080 | 83% |
| 12  | 300k    | R$ 16.500  | R$ 71.640   | R$ 88.140 | 91% |

---

## 🔐 Sistema de Autenticação

### Providers Implementados
- ✅ **Email/Senha** (bcryptjs)
- ✅ **Google OAuth**
- ⏳ **LinkedIn** (planejado)

### Funcionalidades
- ✅ Registro de usuário
- ✅ Login/Logout
- ✅ Sessões persistentes
- ✅ Proteção de rotas (middleware)
- ✅ Roles (USER, ADMIN)
- ✅ Dashboard personalizado

### Middleware de Proteção
```typescript
// middleware.ts
export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname;
      
      // Admin routes
      if (path.startsWith('/admin')) {
        return token?.role === 'ADMIN';
      }
      
      // Protected routes
      if (path.startsWith('/dashboard')) {
        return !!token;
      }
      
      return true;
    }
  }
});
```

---

## 📊 Dashboard Administrativo

### Funcionalidades Implementadas

#### Gestão de Usuários
- ✅ Listagem de todos os usuários
- ✅ Filtros e busca
- ✅ Visualização de detalhes
- ✅ Edição de roles
- ⏳ Bloqueio/desbloqueio

#### Gestão de Posts
- ✅ Listagem de posts
- ✅ Criação de posts
- ✅ Edição de posts
- ✅ Publicação/despublicação
- ✅ Upload de imagens

#### SEO Manager
- ✅ Geração automática de posts com IA
- ✅ Análise de keywords
- ✅ Relatórios de performance
- ✅ Agendamento de publicações
- ⏳ Integração Google Search Console

---

## 🎨 Design System

### Cores Principais
```css
/* Tema Claro */
--primary: 222.2 47.4% 11.2%
--secondary: 210 40% 96.1%
--accent: 210 40% 96.1%
--destructive: 0 84.2% 60.2%

/* Tema Escuro */
--primary: 210 40% 98%
--secondary: 217.2 32.6% 17.5%
```

### Componentes shadcn/ui
- Button, Input, Label
- Dialog, Sheet, Dropdown
- Toast, Alert
- Card, Tabs
- Select, Checkbox
- Avatar, Badge
- Tooltip, Separator

---

## 🚀 Status de Implementação

### ✅ Completo (70%)
- [x] Stack técnica (Next.js, Prisma, PostgreSQL)
- [x] 6 calculadoras funcionais
- [x] Sistema de autenticação
- [x] Sistema de assinaturas Stripe
- [x] Google AdSense integrado
- [x] Paywalls implementados
- [x] Dashboard de usuário
- [x] Dashboard administrativo
- [x] Design system (shadcn/ui)
- [x] SEO básico (metadata)
- [x] Blog estruturado

### 🚧 Em Progresso (20%)
- [ ] 14 calculadoras faltantes (de 20 MVP)
- [ ] Conteúdo SEO (0/20 artigos)
- [ ] Exportação PDF
- [ ] Comparações A vs B
- [ ] Analytics (Plausible)

### ⏳ Planejado (10%)
- [ ] Sitemap dinâmico completo
- [ ] Core Web Vitals otimização
- [ ] Linkbuilding
- [ ] App mobile (PWA)
- [ ] API pública

---

## 📈 Estratégia de SEO

### SEO On-Page
- ✅ Metadata otimizada por página
- ✅ Schema markup (WebApplication, FAQ)
- ✅ URLs amigáveis
- ✅ Heading structure (H1-H6)
- ⏳ Breadcrumbs
- ⏳ Internal linking

### Conteúdo Planejado
- 20 artigos "Como Calcular" (2k-3k palavras)
- FAQs expandidas (10+ perguntas/calculadora)
- Guias completos por categoria
- Comparações (A vs B)

### SEO Técnico
- ✅ robots.txt
- ✅ sitemap.xml básico
- ⏳ Sitemap dinâmico (next-sitemap)
- ⏳ Core Web Vitals otimização
- ⏳ Image optimization

---

## 🔧 Configuração e Deploy

### Variáveis de Ambiente Necessárias

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="https://calcprobr.com"
NEXTAUTH_SECRET="..."

# Google OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_ID_PRO_MONTHLY="price_..."
STRIPE_PRICE_ID_PRO_YEARLY="price_..."

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-..."

# OpenAI (para geração de conteúdo)
OPENAI_API_KEY="sk-..."
```

### Deploy Vercel

```bash
# 1. Conectar repositório GitHub
# 2. Configurar variáveis de ambiente
# 3. Deploy automático em cada push

# Build command
npm run build

# Output directory
.next

# Install command
npm install
```

---

## 📋 Próximos Passos

### Semana 1-2: Monetização
- [ ] Configurar Stripe em produção
- [ ] Configurar Google AdSense
- [ ] Testar fluxo de checkout
- [ ] Implementar exportação PDF

### Semana 3-4: Calculadoras
- [ ] Férias Proporcionais
- [ ] Valor Hora Freelancer
- [ ] Impostos MEI
- [ ] Materiais de Construção

### Semana 5-6: SEO
- [ ] 10 artigos "Como Calcular"
- [ ] Sitemap dinâmico
- [ ] Google Search Console
- [ ] Schema markup completo

### Semana 7-8: Analytics
- [ ] Plausible Analytics
- [ ] Conversion tracking
- [ ] A/B testing
- [ ] Performance monitoring

---

## 📞 Recursos e Documentação

### Documentos do Projeto
- [README.md](README.md) - Visão geral
- [STATUS-IMPLEMENTACAO.md](STATUS-IMPLEMENTACAO.md) - Status detalhado
- [RESUMO-EXECUTIVO.md](RESUMO-EXECUTIVO.md) - Resumo executivo
- [SETUP-MONETIZACAO.md](SETUP-MONETIZACAO.md) - Configuração Stripe/AdSense
- [SEO-MANAGER-GUIDE.md](SEO-MANAGER-GUIDE.md) - Guia do SEO Manager

### Links Úteis
- **Produção:** https://calcprobr.com
- **Repositório:** (privado)
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://supabase.com/dashboard

---

**Última atualização:** Novembro 2025  
**Versão do documento:** 1.0
