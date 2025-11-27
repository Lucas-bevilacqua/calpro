import { Metadata } from "next";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PricingCard } from "@/components/subscription/pricing-card";

export const metadata: Metadata = {
  title: "Preços | calcprobr.com",
  description: "Escolha o plano ideal para você. Comece grátis ou desbloqueie recursos PRO.",
};

const plans = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "para sempre",
    description: "Perfeito para uso ocasional",
    features: [
      "Calculadoras ilimitadas",
      "Cálculos em tempo real",
      "Até 3 cálculos salvos",
      "Acesso mobile",
    ],
    limitations: [
      "Com anúncios",
      "Sem exportação PDF",
      "Sem comparações",
    ],
    cta: "Começar Grátis",
    href: "/auth/register",
    popular: false,
  },
  {
    name: "PRO Mensal",
    price: "R$ 19,90",
    period: "/mês",
    description: "Para profissionais que precisam de mais",
    features: [
      "Tudo do Gratuito",
      "Cálculos salvos ilimitados",
      "Exportar PDF profissional",
      "Sem anúncios",
      "Comparações A vs B",
      "Histórico completo",
      "Suporte prioritário",
    ],
    cta: "Assinar PRO",
    priceId: process.env.STRIPE_PRICE_ID_PRO_MONTHLY,
    plan: "PRO_MONTHLY",
    popular: true,
  },
  {
    name: "PRO Anual",
    price: "R$ 199",
    period: "/ano",
    description: "Economize 17% com o plano anual",
    badge: "2 meses grátis",
    features: [
      "Tudo do PRO Mensal",
      "Economia de R$ 39,80/ano",
      "Pagamento único anual",
      "Prioridade máxima no suporte",
    ],
    cta: "Assinar Anual",
    priceId: process.env.STRIPE_PRICE_ID_PRO_YEARLY,
    plan: "PRO_YEARLY",
    popular: false,
  },
];

export default async function PrecosPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8 md:space-y-10">
      <div className="text-center space-y-3 md:space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Escolha o plano ideal para você
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground px-4 sm:px-0">
          Comece grátis e faça upgrade quando precisar de mais recursos.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            isLoggedIn={!!session}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 px-4 sm:px-0">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Perguntas Frequentes</h2>
        </div>

        <div className="space-y-3 md:space-y-4">
          <div className="rounded-lg border p-4 md:p-5">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Posso cancelar a qualquer momento?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Sim! Você pode cancelar sua assinatura a qualquer momento. Você continuará tendo acesso aos recursos PRO até o final do período pago.
            </p>
          </div>

          <div className="rounded-lg border p-4 md:p-5">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Como funciona o período de teste?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Não oferecemos período de teste, mas você pode começar com o plano gratuito e fazer upgrade quando precisar.
            </p>
          </div>

          <div className="rounded-lg border p-4 md:p-5">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Quais formas de pagamento são aceitas?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Aceitamos cartões de crédito (Visa, Mastercard, American Express) através do Stripe, nossa plataforma de pagamentos segura.
            </p>
          </div>

          <div className="rounded-lg border p-4 md:p-5">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Os cálculos são precisos?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Sim! Todas as nossas calculadoras são baseadas na legislação brasileira vigente e atualizadas regularmente. No entanto, recomendamos consultar um profissional para casos específicos.
            </p>
          </div>

          <div className="rounded-lg border p-4 md:p-5">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Posso mudar de plano depois?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento através do painel de controle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
