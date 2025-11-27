import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    console.log('🔵 Iniciando criação de checkout...');
    
    const session = await getServerSession(authOptions);
    console.log('🔵 Sessão:', session?.user?.email);
    
    if (!session?.user?.email) {
      console.log('❌ Usuário não autenticado');
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const { priceId, plan } = await req.json();
    console.log('🔵 Price ID:', priceId);
    console.log('🔵 Plan:', plan);

    if (!priceId) {
      console.log('❌ Price ID não fornecido');
      return NextResponse.json(
        { error: 'Price ID é obrigatório' },
        { status: 400 }
      );
    }

    console.log('🔵 Buscando usuário no banco...');
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true },
    });

    if (!user) {
      console.log('❌ Usuário não encontrado no banco');
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    console.log('✅ Usuário encontrado:', user.id);
    let customerId = user.subscription?.stripeCustomerId;
    console.log('🔵 Customer ID existente:', customerId);

    // Criar customer no Stripe se não existir
    if (!customerId) {
      console.log('🔵 Criando customer no Stripe...');
      const customer = await stripe.customers.create({
        email: user.email!,
        name: user.name || undefined,
        metadata: {
          userId: user.id,
        },
      });
      customerId = customer.id;
      console.log('✅ Customer criado:', customerId);

      // Salvar customer ID
      console.log('🔵 Salvando customer ID no banco...');
      await prisma.subscription.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          stripeCustomerId: customerId,
        },
        update: {
          stripeCustomerId: customerId,
        },
      });
      console.log('✅ Customer ID salvo');
    }

    // Criar checkout session
    console.log('🔵 Criando checkout session no Stripe...');
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/precos?canceled=true`,
      metadata: {
        userId: user.id,
        plan,
      },
    });

    console.log('✅ Checkout session criada:', checkoutSession.id);
    console.log('✅ URL:', checkoutSession.url);
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error('❌ ERRO DETALHADO:', error);
    console.error('❌ Mensagem:', error.message);
    console.error('❌ Stack:', error.stack);
    return NextResponse.json(
      { error: 'Erro ao criar checkout', details: error.message },
      { status: 500 }
    );
  }
}
