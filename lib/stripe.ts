import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

export const PLANS = {
  FREE: {
    name: 'Gratuito',
    price: 0,
    features: [
      'Calculadoras ilimitadas',
      'Cálculos em tempo real',
      'Até 3 cálculos salvos',
      'Com anúncios',
    ],
    limits: {
      savedCalculations: 3,
      pdfExports: 0,
      comparisons: 0,
    }
  },
  PRO_MONTHLY: {
    name: 'PRO Mensal',
    price: 19.90,
    priceId: process.env.STRIPE_PRICE_ID_PRO_MONTHLY,
    features: [
      'Tudo do Gratuito',
      'Cálculos salvos ilimitados',
      'Exportar PDF profissional',
      'Sem anúncios',
      'Comparações A vs B',
      'Histórico completo',
      'Suporte prioritário',
    ],
    limits: {
      savedCalculations: -1, // unlimited
      pdfExports: -1,
      comparisons: -1,
    }
  },
  PRO_YEARLY: {
    name: 'PRO Anual',
    price: 199.00,
    priceId: process.env.STRIPE_PRICE_ID_PRO_YEARLY,
    features: [
      'Tudo do PRO Mensal',
      '2 meses grátis',
      'Economia de 17%',
    ],
    limits: {
      savedCalculations: -1,
      pdfExports: -1,
      comparisons: -1,
    }
  }
} as const;
