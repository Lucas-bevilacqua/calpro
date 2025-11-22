'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Subscription {
  plan: 'FREE' | 'PRO' | 'ENTERPRISE';
  status: string;
  isPro: boolean;
  limits: {
    savedCalculations: number;
    pdfExports: number;
    comparisons: number;
  };
}

export function useSubscription() {
  const { data: session, status } = useSession();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubscription() {
      if (status === 'loading') return;
      
      if (!session?.user) {
        setSubscription({
          plan: 'FREE',
          status: 'ACTIVE',
          isPro: false,
          limits: {
            savedCalculations: 3,
            pdfExports: 0,
            comparisons: 0,
          }
        });
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/subscription');
        const data = await response.json();
        setSubscription(data);
      } catch (error) {
        console.error('Erro ao buscar assinatura:', error);
        setSubscription({
          plan: 'FREE',
          status: 'ACTIVE',
          isPro: false,
          limits: {
            savedCalculations: 3,
            pdfExports: 0,
            comparisons: 0,
          }
        });
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, [session, status]);

  return {
    subscription,
    loading,
    isPro: subscription?.isPro || false,
    canSave: (currentCount: number) => {
      if (!subscription) return false;
      if (subscription.isPro) return true;
      return currentCount < subscription.limits.savedCalculations;
    },
    canExportPDF: subscription?.isPro || false,
    canCompare: subscription?.isPro || false,
  };
}
