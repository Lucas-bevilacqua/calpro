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
    <div className="container px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-6 md:space-y-8">
      <div className="text-center space-y-3 md:space-y-4 max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary">{title}</h1>
        {description && (
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4 sm:px-0">{description}</p>
        )}
      </div>

      {/* Ad superior (apenas para usuários FREE) */}
      <AdWrapper isPro={isPro}>
        <div className="max-w-3xl mx-auto px-4 sm:px-0">
          <AdSenseTop />
        </div>
      </AdWrapper>

      {/* Conteúdo da calculadora */}
      <div className="max-w-3xl mx-auto px-4 sm:px-0">
        {children}
      </div>

      {/* Ad inferior (apenas para usuários FREE) */}
      <AdWrapper isPro={isPro}>
        <div className="max-w-3xl mx-auto px-4 sm:px-0">
          <AdSenseBottom />
        </div>
      </AdWrapper>
    </div>
  );
}
