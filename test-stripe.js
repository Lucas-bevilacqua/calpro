// Teste rápido da conexão com Stripe
require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

async function testStripe() {
  try {
    console.log('🔵 Testando conexão com Stripe...');
    console.log('🔵 Chave:', process.env.STRIPE_SECRET_KEY?.substring(0, 20) + '...');
    
    // Testar listando produtos
    const prices = await stripe.prices.list({ limit: 3 });
    console.log('✅ Conexão OK!');
    console.log('✅ Produtos encontrados:', prices.data.length);
    
    prices.data.forEach(price => {
      console.log(`  - ${price.id}: ${price.unit_amount / 100} ${price.currency}`);
    });
    
    // Verificar se os Price IDs existem
    console.log('\n🔵 Verificando Price IDs configurados...');
    console.log('PRO Mensal:', process.env.STRIPE_PRICE_ID_PRO_MONTHLY);
    console.log('PRO Anual:', process.env.STRIPE_PRICE_ID_PRO_YEARLY);
    
    try {
      const priceMonthly = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID_PRO_MONTHLY);
      console.log('✅ Price Mensal encontrado:', priceMonthly.unit_amount / 100, priceMonthly.currency);
    } catch (e) {
      console.log('❌ Price Mensal NÃO encontrado:', e.message);
    }
    
    try {
      const priceYearly = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID_PRO_YEARLY);
      console.log('✅ Price Anual encontrado:', priceYearly.unit_amount / 100, priceYearly.currency);
    } catch (e) {
      console.log('❌ Price Anual NÃO encontrado:', e.message);
    }
    
  } catch (error) {
    console.error('❌ ERRO:', error.message);
    console.error('❌ Tipo:', error.type);
    console.error('❌ Code:', error.code);
  }
}

testStripe();
