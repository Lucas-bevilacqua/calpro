'use client';

import { useState } from 'react';
import { Check, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  plan: {
    name: string;
    price: string;
    period: string;
    description: string;
    badge?: string;
    features: string[];
    limitations?: string[];
    cta: string;
    href?: string;
    priceId?: string;
    plan?: string;
    popular?: boolean;
  };
  isLoggedIn: boolean;
}

export function PricingCard({ plan, isLoggedIn }: PricingCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!isLoggedIn) {
      router.push('/auth/login?callbackUrl=/precos');
      return;
    }

    if (plan.href) {
      router.push(plan.href);
      return;
    }

    if (!plan.priceId) return;

    setLoading(true);
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan.priceId,
          plan: plan.plan,
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Erro ao criar checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={cn(
      "relative flex flex-col",
      plan.popular && "border-primary shadow-lg scale-105"
    )}>
      {plan.popular && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit">
          <div className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            <Sparkles className="h-3 w-3" />
            Mais Popular
          </div>
        </div>
      )}
      
      {plan.badge && !plan.popular && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {plan.badge}
          </div>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">{plan.price}</span>
          <span className="text-muted-foreground">{plan.period}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
          {plan.limitations?.map((limitation) => (
            <li key={limitation} className="flex items-start gap-2 text-muted-foreground">
              <X className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{limitation}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          variant={plan.popular ? "default" : "outline"}
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? 'Processando...' : plan.cta}
        </Button>
      </CardFooter>
    </Card>
  );
}
