import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ count: 0 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ count: 0 });
    }

    const count = await prisma.savedCalculation.count({
      where: { userId: user.id },
    });

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Erro ao contar cálculos:', error);
    return NextResponse.json({ count: 0 });
  }
}
