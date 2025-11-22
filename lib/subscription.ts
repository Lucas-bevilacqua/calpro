import { prisma } from './prisma';
import { SubscriptionPlan, SubscriptionStatus } from '@prisma/client';

export async function getUserSubscription(userId: string) {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  });

  if (!subscription) {
    return {
      plan: 'FREE' as SubscriptionPlan,
      status: 'ACTIVE' as SubscriptionStatus,
      isActive: true,
      isPro: false,
      limits: {
        savedCalculations: 3,
        pdfExports: 0,
        comparisons: 0,
      }
    };
  }

  const isPro = subscription.plan === 'PRO' && subscription.status === 'ACTIVE';
  
  return {
    ...subscription,
    isActive: subscription.status === 'ACTIVE',
    isPro,
    limits: isPro ? {
      savedCalculations: -1,
      pdfExports: -1,
      comparisons: -1,
    } : {
      savedCalculations: 3,
      pdfExports: 0,
      comparisons: 0,
    }
  };
}

export async function canSaveCalculation(userId: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  
  if (subscription.isPro) return true;
  
  const savedCount = await prisma.savedCalculation.count({
    where: { userId },
  });
  
  return savedCount < subscription.limits.savedCalculations;
}

export async function canExportPDF(userId: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  return subscription.isPro;
}

export async function canCompare(userId: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  return subscription.isPro;
}
