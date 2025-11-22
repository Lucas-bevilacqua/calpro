'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

export function AdSense({ slot, format = 'auto', responsive = true, className = '' }: AdSenseProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!clientId) {
    return null; // Não renderiza se não tiver client ID configurado
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

// Componentes pré-configurados para diferentes posições
export function AdSenseTop() {
  return (
    <AdSense
      slot="1234567890" // Substituir pelo slot real
      format="horizontal"
      className="my-4"
    />
  );
}

export function AdSenseBottom() {
  return (
    <AdSense
      slot="0987654321" // Substituir pelo slot real
      format="horizontal"
      className="my-4"
    />
  );
}

export function AdSenseSidebar() {
  return (
    <AdSense
      slot="1122334455" // Substituir pelo slot real
      format="vertical"
      className="my-4"
    />
  );
}

export function AdSenseInArticle() {
  return (
    <AdSense
      slot="5544332211" // Substituir pelo slot real
      format="fluid"
      className="my-6"
    />
  );
}
