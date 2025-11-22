'use client';

import { ReactNode } from 'react';
import { AdWrapper } from '@/components/ads/ad-wrapper';
import { AdSenseTop, AdSenseBottom } from '@/components/ads/adsense';
import { useSubscription } from '@/hooks/use-subscription';

interface CalculatorLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function CalculatorLayout({ children, title, description }: CalculatorLayoutProps) {
  const { isPro } = useSubscription();

  return (
    <div className="container py-10 space-y-6">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{title}</h1>
        {description && (
          <p className="text-xl text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Ad superior (apenas para usuários FREE) */}
      <AdWrapper isPro={isPro}>
        <div className="max-w-3xl mx-auto">
          <AdSenseTop />
        </div>
      </AdWrapper>

      {/* Conteúdo da calculadora */}
      <div className="max-w-3xl mx-auto">
        {children}
      </div>

      {/* Ad inferior (apenas para usuários FREE) */}
      <AdWrapper isPro={isPro}>
        <div className="max-w-3xl mx-auto">
          <AdSenseBottom />
        </div>
      </AdWrapper>
    </div>
  );
}
