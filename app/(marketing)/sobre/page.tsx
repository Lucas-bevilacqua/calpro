import { Metadata } from "next";
import { CheckCircle2, Target, Users, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Sobre | calcprobr.com",
    description: "Conheça o calcprobr.com - ferramentas de cálculo profissionais, gratuitas e atualizadas para 2025.",
};

export default function SobrePage() {
    return (
        <div className="container px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8 md:space-y-10">
            <div className="text-center space-y-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Sobre o calcprobr.com
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Ferramentas de cálculo profissionais, gratuitas e sempre atualizadas.
                </p>
            </div>

            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h2>Nossa Missão</h2>
                <p>
                    O calcprobr.com nasceu com o objetivo de democratizar o acesso a ferramentas de cálculo profissionais.
                    Acreditamos que todos devem ter acesso a calculadoras precisas e confiáveis para tomar decisões
                    financeiras e trabalhistas informadas.
                </p>

                <h2>Por que confiar no calcprobr.com?</h2>
                <p>
                    Todas as nossas calculadoras são desenvolvidas com base na legislação brasileira vigente,
                    incluindo as tabelas de INSS, IRRF e regras da CLT atualizadas para 2025. Nosso compromisso
                    é manter as ferramentas sempre em dia com as mudanças legais.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                <Card>
                    <CardHeader>
                        <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg">Gratuito</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            100% gratuito, sem cadastros ou taxas escondidas.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                            <Shield className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg">Confiável</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Baseado na legislação brasileira e tabelas oficiais.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                            <Target className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg">Preciso</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Cálculos verificados e testados contra cenários reais.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                            <Users className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg">Atualizado</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Sempre em dia com as mudanças na legislação.
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>

            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h2>Nossas Calculadoras</h2>
                <p>
                    Oferecemos calculadoras nas seguintes categorias:
                </p>
                <ul>
                    <li><strong>Trabalhista:</strong> Rescisão, Horas Extras, 13º Salário</li>
                    <li><strong>Financeira:</strong> Salário Líquido, Juros Compostos, Financiamento</li>
                    <li><strong>Em breve:</strong> Construção, Freelancer, Contábil</li>
                </ul>

                <h2>Contato</h2>
                <p>
                    Tem sugestões ou encontrou algum erro? Entre em contato conosco através do email:
                    <strong> contato@calcprobr.com</strong>
                </p>
            </div>
        </div>
    );
}
