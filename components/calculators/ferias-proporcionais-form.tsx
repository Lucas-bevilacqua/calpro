'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { calcularFeriasProporcionais } from '@/lib/calculators/ferias-proporcionais';
import { Calendar, Calculator, Palmtree } from 'lucide-react';
import { SaveCalculationDialog } from './save-calculation-dialog';

export function FeriasProporcionaisForm() {
  const [salarioBruto, setSalarioBruto] = useState('');
  const [dataAdmissao, setDataAdmissao] = useState('');
  const [dataReferencia, setDataReferencia] = useState(new Date().toISOString().split('T')[0]);
  const [feriasVencidas, setFeriasVencidas] = useState('0');
  const [resultado, setResultado] = useState<ReturnType<typeof calcularFeriasProporcionais> | null>(null);

  const handleCalcular = () => {
    if (!salarioBruto || !dataAdmissao || !dataReferencia) return;

    const result = calcularFeriasProporcionais({
      salarioBruto: parseFloat(salarioBruto),
      dataAdmissao: new Date(dataAdmissao),
      dataReferencia: new Date(dataReferencia),
      feriasVencidas: parseInt(feriasVencidas) || 0
    });

    setResultado(result);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dados do Trabalhador</CardTitle>
          <CardDescription>
            Informe os dados para calcular as férias proporcionais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="salario">Salário Bruto (R$)</Label>
            <Input
              id="salario"
              type="number"
              placeholder="Ex: 3000"
              value={salarioBruto}
              onChange={(e) => setSalarioBruto(e.target.value)}
              step="0.01"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="admissao">Data de Admissão</Label>
              <Input
                id="admissao"
                type="date"
                value={dataAdmissao}
                onChange={(e) => setDataAdmissao(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="referencia">Data de Referência</Label>
              <Input
                id="referencia"
                type="date"
                value={dataReferencia}
                onChange={(e) => setDataReferencia(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Data atual ou de saída
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vencidas">Períodos de Férias Vencidas</Label>
            <Input
              id="vencidas"
              type="number"
              placeholder="0"
              value={feriasVencidas}
              onChange={(e) => setFeriasVencidas(e.target.value)}
              min="0"
            />
            <p className="text-xs text-muted-foreground">
              Quantidade de períodos de férias não gozadas
            </p>
          </div>

          <Button onClick={handleCalcular} className="w-full" size="lg">
            <Calculator className="mr-2 h-4 w-4" />
            Calcular Férias
          </Button>
        </CardContent>
      </Card>

      {resultado && (
        <>
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palmtree className="h-5 w-5" />
                Valor Total das Férias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2 mb-6">
                <div className="text-4xl font-bold text-primary">
                  R$ {resultado.totalLiquido.toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Valor líquido a receber
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-muted">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Férias Proporcionais</span>
                    <span className="text-sm text-muted-foreground">{resultado.avosFerias}/12 avos</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Valor das férias:</span>
                    <span className="font-medium">R$ {resultado.valorFerias.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">1/3 Constitucional:</span>
                    <span className="font-medium">R$ {resultado.umTercoFerias.toFixed(2)}</span>
                  </div>
                </div>

                {resultado.feriasVencidas > 0 && (
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-amber-900">Férias Vencidas</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-700">Valor das férias:</span>
                      <span className="font-medium text-amber-900">R$ {resultado.feriasVencidas.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-700">1/3 Constitucional:</span>
                      <span className="font-medium text-amber-900">R$ {resultado.umTercoFeriasVencidas.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Total Bruto:</span>
                    <span className="font-medium">R$ {resultado.totalBruto.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">(-) INSS:</span>
                    <span className="font-medium">R$ {resultado.descontoINSS.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-muted-foreground">(-) IRRF:</span>
                    <span className="font-medium">R$ {resultado.descontoIRRF.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Líquido:</span>
                    <span className="text-primary">R$ {resultado.totalLiquido.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Período Aquisitivo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Início do período:</span>
                <span className="font-medium">
                  {resultado.memoriaCalculo.periodoAquisitivo.inicio.toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fim do período:</span>
                <span className="font-medium">
                  {resultado.memoriaCalculo.periodoAquisitivo.fim.toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Meses trabalhados (total):</span>
                <span className="font-medium">{resultado.memoriaCalculo.mesesTrabalhados} meses</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avos de férias:</span>
                <span className="font-medium">{resultado.avosFerias}/12</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <SaveCalculationDialog
              calculatorType="ferias-proporcionais"
              inputs={{
                salarioBruto: parseFloat(salarioBruto),
                dataAdmissao,
                dataReferencia,
                feriasVencidas: parseInt(feriasVencidas)
              }}
              results={resultado}
            />
          </div>
        </>
      )}
    </div>
  );
}
