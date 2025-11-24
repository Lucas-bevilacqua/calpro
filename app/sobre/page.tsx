import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, TrendingUp, Users, Award } from 'lucide-react'

export const metadata = {
    title: 'Sobre | calcprobr.com',
    description: 'Conheça o CalcPro.br - sua ferramenta completa para cálculos financeiros e trabalhistas.',
}

export default function SobrePage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Sobre o CalcPro.br</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Sua ferramenta completa e gratuita para cálculos financeiros e trabalhistas
                </p>
            </div>

            <div className="prose prose-slate max-w-none mb-12">
                <h2 className="text-2xl font-semibold mb-4">Nossa Missão</h2>
                <p className="text-lg mb-6">
                    O CalcPro.br nasceu com o objetivo de democratizar o acesso a ferramentas de cálculo financeiro e trabalhista.
                    Acreditamos que todos devem ter acesso fácil e gratuito a calculadoras precisas para tomar decisões informadas
                    sobre suas finanças e direitos trabalhistas.
                </p>

                <h2 className="text-2xl font-semibold mb-4">O Que Oferecemos</h2>
                <div className="grid md:grid-cols-2 gap-6 not-prose mb-8">
                    <Card>
                        <CardHeader>
                            <Calculator className="h-8 w-8 mb-2 text-primary" />
                            <CardTitle>Calculadoras Precisas</CardTitle>
                            <CardDescription>
                                Ferramentas atualizadas com a legislação brasileira vigente
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <TrendingUp className="h-8 w-8 mb-2 text-primary" />
                            <CardTitle>Conteúdo Educativo</CardTitle>
                            <CardDescription>
                                Artigos e guias para ajudar você a entender seus cálculos
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Users className="h-8 w-8 mb-2 text-primary" />
                            <CardTitle>100% Gratuito</CardTitle>
                            <CardDescription>
                                Todas as ferramentas disponíveis sem custo algum
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Award className="h-8 w-8 mb-2 text-primary" />
                            <CardTitle>Confiável</CardTitle>
                            <CardDescription>
                                Desenvolvido por especialistas em finanças e direito trabalhista
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                <h2 className="text-2xl font-semibold mb-4">Nossa Equipe</h2>
                <p className="text-lg mb-6">
                    O CalcPro.br é mantido por uma equipe de especialistas em finanças pessoais e direito trabalhista,
                    comprometidos em fornecer informações precisas e atualizadas. Nosso conteúdo é revisado regularmente
                    para garantir conformidade com as leis e regulamentações brasileiras.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Compromisso com a Qualidade</h2>
                <p className="text-lg mb-6">
                    Todas as nossas calculadoras são testadas e validadas para garantir resultados precisos.
                    Mantemos nosso conteúdo atualizado com as mudanças na legislação e oferecemos explicações
                    claras para que você entenda cada cálculo.
                </p>
            </div>

            <div className="text-center bg-muted p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Pronto para começar?</h3>
                <p className="text-muted-foreground mb-6">
                    Explore nossas calculadoras e descubra como podemos ajudar você
                </p>
                <Link href="/calculadoras">
                    <Button size="lg">Ver Calculadoras</Button>
                </Link>
            </div>
        </div>
    )
}
