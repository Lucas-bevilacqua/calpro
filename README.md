# CalcPro.br - Calculadoras Profissionais

> A calculadora certa para cada profissional brasileiro

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🎯 Sobre o Projeto

CalcPro.br é uma plataforma de calculadoras profissionais especializadas para o mercado brasileiro. Oferecemos ferramentas precisas e atualizadas para cálculos trabalhistas, financeiros, freelancer e construção.

### Potencial de Mercado
- **221.000 buscas/mês** de potencial orgânico
- **R$ 40k-120k/mês** de receita projetada (Mês 6-12)
- **83-91%** de margem de lucro

## ✨ Features

### Calculadoras Disponíveis (11)

**Trabalhista (5):**
- Rescisão Trabalhista CLT
- Horas Extras com DSR
- 13º Salário
- Férias Proporcionais
- Seguro-Desemprego

**Freelancer (2):**
- Valor/Hora Freelancer
- Impostos MEI

**Financeira (3):**
- Salário Líquido (INSS + IRRF)
- Juros Compostos
- Financiamento (SAC/Price)

**Construção (1):**
- Materiais de Construção (6 tipos)

### Funcionalidades

- ✅ Cálculos em tempo real
- ✅ Design responsivo (mobile-first)
- ✅ Salvamento de cálculos (até 3 grátis)
- ✅ Autenticação (email + Google OAuth)
- ✅ Dashboard de usuário
- ✅ Sistema de assinaturas (Stripe)
- ✅ SEO otimizado
- ✅ Schema markup
- ✅ Referências legais

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** TailwindCSS 4
- **UI Components:** shadcn/ui
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Auth:** NextAuth.js
- **Payments:** Stripe
- **Ads:** Google AdSense
- **Hosting:** Vercel

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/calcpro.git

# Entre no diretório
cd calcpro

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# Execute as migrations
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuração

### Variáveis de Ambiente

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_ID_PRO_MONTHLY="price_..."
STRIPE_PRICE_ID_PRO_YEARLY="price_..."

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-..."

# Google OAuth (opcional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### Configuração Stripe

1. Criar conta em [stripe.com](https://stripe.com)
2. Criar 2 produtos (PRO Mensal R$ 19,90 e PRO Anual R$ 199)
3. Configurar webhook: `https://seu-dominio.com/api/stripe/webhook`
4. Copiar chaves para `.env.local`

Ver [SETUP-MONETIZACAO.md](SETUP-MONETIZACAO.md) para detalhes.

### Configuração AdSense

1. Criar conta em [adsense.google.com](https://adsense.google.com)
2. Aguardar aprovação (1-3 dias)
3. Criar unidades de anúncio
4. Copiar client ID para `.env.local`

## 📊 Estrutura do Projeto

```
calcpro/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Rotas de autenticação
│   ├── (calculators)/            # Rotas de calculadoras
│   ├── (marketing)/              # Páginas de marketing
│   ├── api/                      # API routes
│   ├── dashboard/                # Dashboard do usuário
│   └── precos/                   # Página de preços
├── components/                   # Componentes React
│   ├── calculators/              # Formulários de calculadoras
│   ├── subscription/             # Componentes de assinatura
│   ├── ads/                      # Componentes de anúncios
│   ├── layout/                   # Header, Footer, etc
│   └── ui/                       # Componentes UI (shadcn)
├── lib/                          # Utilitários e lógica
│   ├── calculators/              # Lógica de cálculos
│   ├── stripe.ts                 # Cliente Stripe
│   ├── subscription.ts           # Lógica de assinaturas
│   └── prisma.ts                 # Cliente Prisma
├── hooks/                        # React hooks customizados
├── prisma/                       # Schema e migrations
└── public/                       # Assets estáticos
```

## 🧪 Testes

```bash
# Executar testes (quando implementados)
npm test

# Verificar tipos TypeScript
npm run type-check

# Lint
npm run lint
```

## 📈 Roadmap

### ✅ Fase 1: MVP (Completo)
- [x] 11 calculadoras funcionais
- [x] Sistema de autenticação
- [x] Monetização (Stripe + AdSense)
- [x] Dashboard de usuário
- [x] SEO básico

### 🚧 Fase 2: Crescimento (Em Progresso)
- [ ] Completar 20 calculadoras
- [ ] Exportação PDF
- [ ] 20 artigos SEO
- [ ] Comparações A vs B
- [ ] Analytics (Plausible)

### 📅 Fase 3: Escala (Planejado)
- [ ] 50+ calculadoras
- [ ] App mobile (PWA)
- [ ] API pública
- [ ] White-label B2B
- [ ] Internacionalização

## 💰 Modelo de Negócio

### Planos

**FREE:**
- Calculadoras ilimitadas
- Até 3 cálculos salvos
- Com anúncios

**PRO (R$ 19,90/mês):**
- Cálculos salvos ilimitados
- Exportar PDF profissional
- Sem anúncios
- Comparações A vs B
- Suporte prioritário

**PRO Anual (R$ 199/ano):**
- Tudo do PRO Mensal
- Economia de 17%

### Fontes de Receita

1. **Google Ads** - Usuários FREE
2. **Assinaturas PRO** - R$ 19,90/mês
3. **B2B/Enterprise** - R$ 99-499/mês
4. **Afiliados** - Produtos complementares

## 📚 Documentação

- [GUIA-LANCAMENTO.md](GUIA-LANCAMENTO.md) - Guia completo de lançamento
- [SETUP-MONETIZACAO.md](SETUP-MONETIZACAO.md) - Configuração Stripe + AdSense
- [IMPLEMENTACAO-COMPLETA.md](IMPLEMENTACAO-COMPLETA.md) - Documentação técnica
- [STATUS-IMPLEMENTACAO.md](STATUS-IMPLEMENTACAO.md) - Status do projeto
- [LANCAMENTO-PRONTO.md](LANCAMENTO-PRONTO.md) - Checklist de lançamento

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 License

Este projeto está sob a licença MIT. Ver [LICENSE](LICENSE) para mais informações.

## 👥 Autores

- **Seu Nome** - *Trabalho Inicial* - [seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Stripe](https://stripe.com/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)

## 📞 Contato

- Website: [calcpro.br](https://calcpro.br)
- Email: contato@calcpro.br
- Twitter: [@calcprobr](https://twitter.com/calcprobr)

---

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

**🚀 Pronto para lançar? Veja [LANCAMENTO-PRONTO.md](LANCAMENTO-PRONTO.md)**
