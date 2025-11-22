'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calcularImpostosMEI, getDescricaoAtividade, getComposicaoDAS, type AtividadeMEI } from '@/lib/calculators/impostos-mei';
import { AlertCircle, Calculator, DollarSign } from 'lucide-react';
import { SaveCalculationDialog } from './save-calculation-dialog';

export function ImpostosMEIForm() {
  const [atividade, setAtividade] = useState<AtividadeMEI>('servicos');
  const [faturamentoMensal, setFaturamentoMensal] = useState('');
  const [resultado, setResultado] = useState<ReturnType<typeof calcularImpostosMEI> | null>(null);

  const handleCalcular = () => {
    if (!faturamentoMensal) return;

    const result = calcularImpostosMEI({
      atividade,
      faturamentoMensal: parseFloat(faturamentoMensal)
    });

    setResultado(result);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dados do MEI</CardTitle>
          <CardDescription>
            Informe sua atividade e faturamento mensal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="atividade">Tipo de Atividade</Label>
            <Select value={atividade} onValueChange={(value) => setAtividade(value as AtividadeMEI)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comercio">Comércio</SelectItem>
                <SelectItem value="industria">Indústria</SelectItem>
                <SelectItem value="servicos">Serviços</SelectItem>
                <SelectItem value="comercio-servicos">Comércio e Serviços</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="faturamento">Faturamento Mensal (R$)</Label>
            <Input
              id="faturamento"
              type="number"
              placeholder="Ex: 5000"
              value={faturamentoMensal}
              onChange={(e) => setFaturamentoMensal(e.target.value)}
              step="0.01"
            />
          </div>

          <Button onClick={handleCalcular} className="w-full" size="lg">
            <Calculator className="mr-2 h-4 w-4" />
            Calcular DAS
          </Button>
        </CardContent>
      </Card>

      {resultado && (
        <>
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Valor do DAS Mensal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-primary">
                  R$ {resultado.dasValor.toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Valor fixo mensal a pagar
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">INSS (5% do salário mínimo):</span>
                  <span className="font-medium">R$ {resultado.inss.toFixed(2)}</span>
                </div>
                {resultado.issqn > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ISSQN (Serviços):</span>
                    <span className="font-medium">R$ {resultado.issqn.toFixed(2)}</span>
                  </div>
                )}
                {resultado.icms > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ICMS (Comércio/Indústria):</span>
                    <span className="font-medium">R$ {resultado.icms.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-3 border-t flex justify-between font-semibold">
                  <span>Total Anual:</span>
                  <span>R$ {resultado.totalAnual.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Análise de Faturamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Faturamento Mensal:</span>
                  <span className="font-medium">R$ {faturamentoMensal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Faturamento Anual Projetado:</span>
                  <span className="font-medium">R$ {resultado.faturamentoAnual.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Limite Anual MEI:</span>
                  <span className="font-medium">R$ {resultado.limiteAnual.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Percentual Utilizado:</span>
                  <span className={resultado.alertaLimite ? 'text-amber-600' : 'text-green-600'}>
                    {resultado.percentualUtilizado.toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      resultado.alertaLimite ? 'bg-amber-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(resultado.percentualUtilizado, 100)}%` }}
                  />
                </div>
              </div>

              {resultado.alertaLimite && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-900">Atenção ao Limite</p>
                    <p className="text-amber-700 mt-1">
                      Você está próximo do limite anual de faturamento do MEI (R$ 81.000). 
                      Considere migrar para outro regime tributário se ultrapassar.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <SaveCalculationDialog
              calculatorType="impostos-mei"
              inputs={{ atividade, faturamentoMensal: parseFloat(faturamentoMensal) }}
              results={resultado}
            />
          </div>
        </>
      )}
    </div>
  );
}
