'use client';

import { Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ProBadgeInlineProps {
  feature: string;
}

export function ProBadgeInline({ feature }: ProBadgeInlineProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
      <div className="flex items-center gap-2">
        <Crown className="h-4 w-4 text-amber-500" />
        <span className="text-sm font-medium">
          {feature} é exclusivo para PRO
        </span>
      </div>
      <Button
        size="sm"
        variant="outline"
        className="border-amber-500 text-amber-600 hover:bg-amber-50"
        onClick={() => router.push('/precos')}
      >
        Fazer Upgrade
      </Button>
    </div>
  );
}
