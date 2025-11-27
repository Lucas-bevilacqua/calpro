import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
    title: "Termos de Uso | calcprobr.com",
    description: "Termos de Uso do calcprobr.com",
}

export default function TermsPage() {
    return (
        <div className="container px-4 sm:px-6 lg:px-8 py-8 md:py-10 max-w-3xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Termos de Uso</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>Última atualização: 22 de novembro de 2023</p>

                    <h3>1. Aceitação dos Termos</h3>
                    <p>
                        Ao acessar e usar o calcprobr.com, você aceita e concorda em estar vinculado aos termos e disposições deste acordo.
                        Além disso, ao usar os serviços particulares deste site, você estará sujeito a quaisquer regras ou diretrizes publicadas aplicáveis a tais serviços.
                    </p>

                    <h3>2. Descrição do Serviço</h3>
                    <p>
                        O calcprobr.com fornece aos usuários acesso a uma coleção de calculadoras e ferramentas financeiras e trabalhistas.
                        Você entende e concorda que o Serviço é fornecido "como está" e que o calcprobr.com não assume responsabilidade pela pontualidade, exclusão, entrega incorreta ou falha no armazenamento de qualquer comunicação ou configuração de personalização do usuário.
                    </p>

                    <h3>3. Isenção de Responsabilidade</h3>
                    <p>
                        As informações e cálculos fornecidos neste site são apenas para fins informativos e educacionais.
                        Embora nos esforcemos para manter as informações atualizadas e corretas, não fazemos representações ou garantias de qualquer tipo, expressas ou implícitas, sobre a integridade, precisão, confiabilidade, adequação ou disponibilidade em relação ao site ou às informações, produtos, serviços ou gráficos relacionados contidos no site para qualquer finalidade.
                        Qualquer confiança que você deposite em tais informações é, portanto, estritamente por sua conta e risco.
                        Recomendamos consultar um profissional qualificado (contador, advogado, consultor financeiro) antes de tomar qualquer decisão baseada nos cálculos deste site.
                    </p>

                    <h3>4. Modificações no Serviço</h3>
                    <p>
                        O calcprobr.com reserva-se o direito de, a qualquer momento e de tempos em tempos, modificar ou descontinuar, temporária ou permanentemente, o Serviço (ou qualquer parte dele) com ou sem aviso prévio.
                    </p>

                    <h3>5. Links para Outros Sites</h3>
                    <p>
                        Nosso Serviço pode conter links para sites ou serviços de terceiros que não são de propriedade ou controlados pelo calcprobr.com.
                        O calcprobr.com não tem controle e não assume responsabilidade pelo conteúdo, políticas de privacidade ou práticas de quaisquer sites ou serviços de terceiros.
                    </p>

                    <h3>6. Legislação Aplicável</h3>
                    <p>
                        Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem levar em conta o conflito de provisões legais.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
