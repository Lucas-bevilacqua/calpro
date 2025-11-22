'use client';

import { useEffect } from 'react';

interface GoogleAdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidthResponsive?: boolean;
  className?: string;
}

export function GoogleAdSense({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
}: GoogleAdSenseProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  if (!clientId) {
    return null; // Don't show ads in development
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}

// Predefined ad components for common placements
export function AdBanner({ className }: { className?: string }) {
  return (
    <GoogleAdSense
      adSlot="1234567890" // Replace with your actual ad slot
      adFormat="horizontal"
      className={className}
    />
  );
}

export function AdSidebar({ className }: { className?: string }) {
  return (
    <GoogleAdSense
      adSlot="0987654321" // Replace with your actual ad slot
      adFormat="vertical"
      className={className}
    />
  );
}

export function AdInArticle({ className }: { className?: string }) {
  return (
    <GoogleAdSense
      adSlot="1122334455" // Replace with your actual ad slot
      adFormat="fluid"
      className={className}
    />
  );
}
