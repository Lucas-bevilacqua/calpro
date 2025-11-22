import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Blog | CalcPro.br",
    description: "Artigos e notícias sobre legislação trabalhista, finanças e economia.",
};

export default function BlogPage() {
    return (
        <div className="container py-20 text-center space-y-6">
            <h1 className="text-4xl font-bold">Blog CalcPro.br</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Estamos preparando conteúdos incríveis para você. Em breve, artigos sobre finanças, carreira e legislação.
            </p>
            <Link href="/">
                <Button>Voltar para o Início</Button>
            </Link>
        </div>
    );
}
