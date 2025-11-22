import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
    title: "Política de Privacidade | CalcPro.br",
    description: "Política de Privacidade do CalcPro.br",
}

export default function PrivacyPage() {
    return (
        <div className="container py-10 max-w-3xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Política de Privacidade</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>Última atualização: 22 de novembro de 2023</p>

                    <h3>1. Introdução</h3>
                    <p>
                        O CalcPro.br ("nós", "nosso") respeita a sua privacidade e está comprometido em proteger os seus dados pessoais.
                        Esta política de privacidade irá informá-lo sobre como cuidamos dos seus dados pessoais quando você visita nosso site
                        e lhe falar sobre seus direitos de privacidade e como a lei o protege.
                    </p>

                    <h3>2. Dados que coletamos</h3>
                    <p>
                        Podemos coletar, usar, armazenar e transferir diferentes tipos de dados pessoais sobre você, que agrupamos da seguinte forma:
                    </p>
                    <ul>
                        <li><strong>Dados de Identidade:</strong> inclui nome, sobrenome, nome de usuário ou identificador similar.</li>
                        <li><strong>Dados de Contato:</strong> inclui endereço de e-mail.</li>
                        <li><strong>Dados Técnicos:</strong> inclui endereço de protocolo de internet (IP), seus dados de login, tipo e versão do navegador, configuração e localização do fuso horário, tipos e versões de plug-in do navegador, sistema operacional e plataforma e outras tecnologias nos dispositivos que você usa para acessar este site.</li>
                        <li><strong>Dados de Uso:</strong> inclui informações sobre como você usa nosso site, produtos e serviços (ex: quais calculadoras você utiliza).</li>
                    </ul>

                    <h3>3. Como usamos seus dados</h3>
                    <p>
                        Só usaremos seus dados pessoais quando a lei nos permitir. Mais comumente, usaremos seus dados pessoais nas seguintes circunstâncias:
                    </p>
                    <ul>
                        <li>Para registrar você como um novo usuário.</li>
                        <li>Para gerenciar nosso relacionamento com você.</li>
                        <li>Para melhorar nosso site, produtos/serviços, marketing, relacionamento com o cliente e experiências.</li>
                    </ul>

                    <h3>4. Segurança de dados</h3>
                    <p>
                        Estabelecemos medidas de segurança apropriadas para impedir que seus dados pessoais sejam acidentalmente perdidos, usados ou acessados de forma não autorizada, alterados ou divulgados.
                    </p>

                    <h3>5. Seus direitos legais</h3>
                    <p>
                        Sob certas circunstâncias, você tem direitos sob as leis de proteção de dados em relação aos seus dados pessoais, incluindo o direito de solicitar acesso, correção, apagamento, restrição, transferência de seus dados pessoais ou retirar o consentimento.
                    </p>

                    <h3>6. Contato</h3>
                    <p>
                        Se você tiver alguma dúvida sobre esta política de privacidade, entre em contato conosco através da nossa página de contato.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
