'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calcularSeguroDesemprego, getMesesMinimos } from '@/lib/calculators/seguro-desemprego';
import { AlertCircle, Calculator, CheckCircle, DollarSign, XCircle } from 'lucide-react';
import { SaveCalculationDialog } from './save-calculation-dialog';

export function SeguroDesempregoForm() {
  const [salario1, setSalario1] = useState('');
  const [salario2, setSalario2] = useState('');
  const [salario3, setSalario3] = useState('');
  const [mesesTrabalhados, setMesesTrabalhados] = useState('');
  const [vezesRecebeu, setVezesRecebeu] = useState('0');
  const [resultado, setResultado] = useState<ReturnType<typeof calcularSeguroDesemprego> | null>(null);

  const handleCalcular = () => {
    if (!salario1 || !salario2 || !salario3 || !mesesTrabalhados) return;

    const result = calcularSeguroDesemprego({
      salariosMensais: [
        parseFloat(salario1),
        parseFloat(salario2),
        parseFloat(salario3)
      ],
      mesesTrabalhados: parseInt(mesesTrabalhados),
      vezesRecebeu: parseInt(vezesRecebeu)
    });

    setResultado(result);
  };

  const mesesMinimos = getMesesMinimos(parseInt(vezesRecebeu) || 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dados do Trabalhador</CardTitle>
          <CardDescription>
            Informe os dados para verificar o direito ao seguro-desemprego
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Salários dos Últimos 3 Meses (R$)</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label htmlFor="salario1" className="text-xs text-muted-foreground">3º mês (mais antigo)</Label>
                <Input
                  id="salario1"
                  type="number"
                  placeholder="Ex: 2500"
                  value={salario1}
                  onChange={(e) => setSalario1(e.target.value)}
                  step="0.01"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="salario2" className="text-xs text-muted-foreground">2º mês</Label>
                <Input
                  id="salario2"
                  type="number"
                  placeholder="Ex: 2500"
                  value={salario2}
                  onChange={(e) => setSalario2(e.target.value)}
                  step="0.01"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="salario3" className="text-xs text-muted-foreground">1º mês (mais recente)</Label>
                <Input
                  id="salario3"
                  type="number"
                  placeholder="Ex: 2500"
                  value={salario3}
                  onChange={(e) => setSalario3(e.target.value)}
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meses">Meses Trabalhados (Total)</Label>
            <Input
              id="meses"
              type="number"
              placeholder="Ex: 18"
              value={mesesTrabalhados}
              onChange={(e) => setMesesTrabalhados(e.target.value)}
              min="0"
            />
            <p className="text-xs text-muted-foreground">
              Mínimo necessário: {mesesMinimos} meses
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vezes">Quantas vezes já recebeu seguro-desemprego?</Label>
            <Select value={vezesRecebeu} onValueChange={setVezesRecebeu}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Nunca recebi (1ª vez)</SelectItem>
                <SelectItem value="1">1 vez</SelectItem>
                <SelectItem value="2">2 ou mais vezes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleCalcular} className="w-full" size="lg">
            <Calculator className="mr-2 h-4 w-4" />
            Verificar Direito
          </Button>
        </CardContent>
      </Card>

      {resultado && (
        <>
          {resultado.temDireito ? (
            <>
              <Card className="border-green-500 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    Você tem direito ao seguro-desemprego!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-2 mb-6">
                    <div className="text-4xl font-bold text-green-700">
                      {resultado.numeroParcelas} parcelas
                    </div>
                    <p className="text-sm text-muted-foreground">
                      de R$ {resultado.valorParcela.toFixed(2)} cada
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Salário médio (últimos 3 meses):</span>
                      <span className="font-medium">R$ {resultado.salarioMedio.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Valor por parcela:</span>
                      <span className="font-medium">R$ {resultado.valorParcela.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Número de parcelas:</span>
                      <span className="font-medium">{resultado.numeroParcelas}x</span>
                    </div>
                    <div className="pt-3 border-t flex justify-between font-semibold text-lg">
                      <span>Total a receber:</span>
                      <span className="text-green-700">R$ {resultado.valorTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Composição do Valor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {resultado.detalhes.primeiraFaixa > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">1ª faixa (80% até R$ 2.313,74):</span>
                      <span className="font-medium">R$ {resultado.detalhes.primeiraFaixa.toFixed(2)}</span>
                    </div>
                  )}
                  {resultado.detalhes.segundaFaixa > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">2ª faixa (50% do excedente):</span>
                      <span className="font-medium">R$ {resultado.detalhes.segundaFaixa.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground">
                      O cálculo segue a tabela progressiva do Ministério do Trabalho, 
                      com valor mínimo de R$ 1.412,00 (salário mínimo) e máximo de R$ 2.313,74.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-red-500 bg-red-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <XCircle className="h-5 w-5" />
                  Você não tem direito ao seguro-desemprego
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-100 border border-red-200">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-red-900">Motivo:</p>
                    <p className="text-red-700 mt-1">{resultado.motivoNegacao}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-2">
            <SaveCalculationDialog
              calculatorType="seguro-desemprego"
              inputs={{
                salariosMensais: [parseFloat(salario1), parseFloat(salario2), parseFloat(salario3)],
                mesesTrabalhados: parseInt(mesesTrabalhados),
                vezesRecebeu: parseInt(vezesRecebeu)
              }}
              results={resultado}
            />
          </div>
        </>
      )}
    </div>
  );
}
