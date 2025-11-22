'use client';

import { ReactNode } from 'react';

interface AdWrapperProps {
  children: ReactNode;
  isPro: boolean;
}

export function AdWrapper({ children, isPro }: AdWrapperProps) {
  // Se for PRO, não mostra anúncios
  if (isPro) {
    return null;
  }

  return <>{children}</>;
}
