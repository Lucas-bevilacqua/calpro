import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone } from "lucide-react"

export const metadata = {
    title: "Contato | calcprobr.com",
    description: "Entre em contato com a equipe do calcprobr.com",
}

export default function ContactPage() {
    return (
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2">
                <div>
                    <h1 className="font-heading text-4xl font-bold tracking-tight lg:text-5xl mb-4">
                        Fale Conosco
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Tem alguma dúvida, sugestão ou encontrou um erro? Entre em contato conosco.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className="text-muted-foreground">contato@calcprobr.com</p>
                            </div>
                        </div>

                        {/* 
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Telefone</h3>
                <p className="text-muted-foreground">+55 (11) 99999-9999</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Endereço</h3>
                <p className="text-muted-foreground">São Paulo, SP - Brasil</p>
              </div>
            </div>
            */}
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Envie uma mensagem</CardTitle>
                        <CardDescription>
                            Preencha o formulário abaixo e responderemos o mais breve possível.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid gap-2">
                                <label htmlFor="name" className="text-sm font-medium">Nome</label>
                                <Input id="name" placeholder="Seu nome" />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <Input id="email" type="email" placeholder="seu@email.com" />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="subject" className="text-sm font-medium">Assunto</label>
                                <Input id="subject" placeholder="Sobre o que você quer falar?" />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="message" className="text-sm font-medium">Mensagem</label>
                                <Textarea id="message" placeholder="Sua mensagem..." className="min-h-[120px]" />
                            </div>
                            <Button type="submit" className="w-full">Enviar Mensagem</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
