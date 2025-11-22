'use client';

import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubscriptionBadgeProps {
  plan: 'FREE' | 'PRO' | 'ENTERPRISE';
  className?: string;
}

export function SubscriptionBadge({ plan, className }: SubscriptionBadgeProps) {
  if (plan === 'FREE') return null;

  return (
    <div className={cn(
      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
      plan === 'PRO' && "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
      plan === 'ENTERPRISE' && "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      className
    )}>
      <Crown className="h-3 w-3" />
      {plan}
    </div>
  );
}
