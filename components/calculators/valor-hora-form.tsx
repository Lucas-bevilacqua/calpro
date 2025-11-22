'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { calcularValorHora } from '@/lib/calculators/valor-hora-freelancer';
import { Calculator, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { SaveCalculationDialog } from './save-calculation-dialog';

export function ValorHoraForm() {
  const [rendaDesejada, setRendaDesejada] = useState('');
  const [horasPorDia, setHorasPorDia] = useState('8');
  const [diasPorMes, setDiasPorMes] = useState('22');
  const [custosFixos, setCustosFixos] = useState('');
  const [impostos, setImpostos] = useState('6');
  const [margemLucro, setMargemLucro] = useState('20');
  const [resultado, setResultado] = useState<ReturnType<typeof calcularValorHora> | null>(null);

  const handleCalcular = () => {
    if (!rendaDesejada || !horasPorDia || !diasPorMes || !custosFixos) return;

    const result = calcularValorHora({
      rendaDesejadaMensal: parseFloat(rendaDesejada),
      horasPorDia: parseFloat(horasPorDia),
      diasPorMes: parseFloat(diasPorMes),
      custosFixosMensais: parseFloat(custosFixos),
      impostos: parseFloat(impostos),
      margemLucro: parseFloat(margemLucro),
      feriasFerias: 30
    });

    setResultado(result);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dados do Freelancer</CardTitle>
          <CardDescription>
            Informe seus custos e expectativas para calcular seu valor/hora
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="renda">Renda Desejada Mensal (R$)</Label>
            <Input
              id="renda"
              type="number"
              placeholder="Ex: 5000"
              value={rendaDesejada}
              onChange={(e) => setRendaDesejada(e.target.value)}
              step="0.01"
            />
            <p className="text-xs text-muted-foreground">
              Quanto você quer ganhar líquido por mês
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="horas">Horas por Dia</Label>
              <Input
                id="horas"
                type="number"
                value={horasPorDia}
                onChange={(e) => setHorasPorDia(e.target.value)}
                step="0.5"
                min="1"
                max="24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dias">Dias por Mês</Label>
              <Input
                id="dias"
                type="number"
                value={diasPorMes}
                onChange={(e) => setDiasPorMes(e.target.value)}
                min="1"
                max="31"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="custos">Custos Fixos Mensais (R$)</Label>
            <Input
              id="custos"
              type="number"
              placeholder="Ex: 1000"
              value={custosFixos}
              onChange={(e) => setCustosFixos(e.target.value)}
              step="0.01"
            />
            <p className="text-xs text-muted-foreground">
              Internet, software, aluguel, etc.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="impostos">Impostos (%)</Label>
              <Input
                id="impostos"
                type="number"
                value={impostos}
                onChange={(e) => setImpostos(e.target.value)}
                step="0.1"
                min="0"
                max="100"
              />
              <p className="text-xs text-muted-foreground">
                MEI: 6% | Simples: 6-15%
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="margem">Margem de Lucro (%)</Label>
              <Input
                id="margem"
                type="number"
                value={margemLucro}
                onChange={(e) => setMargemLucro(e.target.value)}
                step="1"
                min="0"
                max="100"
              />
              <p className="text-xs text-muted-foreground">
                Recomendado: 15-30%
              </p>
            </div>
          </div>

          <Button onClick={handleCalcular} className="w-full" size="lg">
            <Calculator className="mr-2 h-4 w-4" />
            Calcular Valor/Hora
          </Button>
        </CardContent>
      </Card>

      {resultado && (
        <>
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Seu Valor/Hora
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2 mb-6">
                <div className="text-5xl font-bold text-primary">
                  R$ {resultado.valorHoraFinal.toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">
                  por hora trabalhada
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-muted text-center">
                  <div className="text-2xl font-bold">
                    R$ {resultado.valorDiaria.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Diária</p>
                </div>
                <div className="p-3 rounded-lg bg-muted text-center">
                  <div className="text-2xl font-bold">
                    R$ {resultado.valorSemanal.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Semanal</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Valor/Hora Base:</span>
                  <span className="font-medium">R$ {resultado.valorHoraBruto.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">+ Impostos ({impostos}%):</span>
                  <span className="font-medium">R$ {resultado.memoriaCalculo.impostoHora.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">+ Margem ({margemLucro}%):</span>
                  <span className="font-medium">R$ {resultado.memoriaCalculo.margemHora.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t flex justify-between font-semibold">
                  <span>Valor/Hora Final:</span>
                  <span className="text-primary">R$ {resultado.valorHoraFinal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Projeções de Faturamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Faturamento Mensal:</span>
                <span className="font-medium">R$ {resultado.valorMensal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Faturamento Anual:</span>
                <span className="font-medium">R$ {resultado.valorAnual.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Horas trabalhadas/mês:</span>
                <span className="font-medium">{resultado.horasTrabalhadasMes}h</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Horas trabalhadas/ano:</span>
                <span className="font-medium">{resultado.horasTrabalhadasAno}h</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Composição de Custos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Renda desejada (anual):</span>
                <span className="font-medium">R$ {(parseFloat(rendaDesejada) * 12).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Custos fixos (anual):</span>
                <span className="font-medium">R$ {(parseFloat(custosFixos) * 12).toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t flex justify-between font-semibold">
                <span>Custo Total Anual:</span>
                <span>R$ {resultado.custoTotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <SaveCalculationDialog
              calculatorType="valor-hora-freelancer"
              inputs={{
                rendaDesejadaMensal: parseFloat(rendaDesejada),
                horasPorDia: parseFloat(horasPorDia),
                diasPorMes: parseFloat(diasPorMes),
                custosFixosMensais: parseFloat(custosFixos),
                impostos: parseFloat(impostos),
                margemLucro: parseFloat(margemLucro)
              }}
              results={resultado}
            />
          </div>
        </>
      )}
    </div>
  );
}
