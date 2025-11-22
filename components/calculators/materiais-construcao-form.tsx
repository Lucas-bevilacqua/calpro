'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calcularMateriais, type TipoMaterial } from '@/lib/calculators/materiais-construcao';
import { Calculator, HardHat, Package } from 'lucide-react';
import { SaveCalculationDialog } from './save-calculation-dialog';

export function MateriaisConstrucaoForm() {
  const [tipoMaterial, setTipoMaterial] = useState<TipoMaterial>('concreto');
  const [inputs, setInputs] = useState<any>({});
  const [resultado, setResultado] = useState<ReturnType<typeof calcularMateriais> | null>(null);

  const handleCalcular = () => {
    try {
      const result = calcularMateriais({
        tipo: tipoMaterial,
        ...inputs
      });
      setResultado(result);
    } catch (error) {
      console.error('Erro ao calcular:', error);
    }
  };

  const updateInput = (key: string, value: string) => {
    setInputs((prev: any) => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tipo de Material</CardTitle>
          <CardDescription>
            Selecione o material que deseja calcular
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tipoMaterial} onValueChange={(value) => {
            setTipoMaterial(value as TipoMaterial);
            setInputs({});
            setResultado(null);
          }}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              <TabsTrigger value="concreto">Concreto</TabsTrigger>
              <TabsTrigger value="tijolos">Tijolos</TabsTrigger>
              <TabsTrigger value="argamassa">Argamassa</TabsTrigger>
              <TabsTrigger value="tinta">Tinta</TabsTrigger>
              <TabsTrigger value="pisos">Pisos</TabsTrigger>
              <TabsTrigger value="telhas">Telhas</TabsTrigger>
            </TabsList>

            <TabsContent value="concreto" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="volume">Volume de Concreto (m³)</Label>
                <Input
                  id="volume"
                  type="number"
                  placeholder="Ex: 5"
                  onChange={(e) => updateInput('volume', e.target.value)}
                  step="0.01"
                />
                <p className="text-xs text-muted-foreground">
                  Comprimento × Largura × Altura em metros
                </p>
              </div>
            </TabsContent>

            <TabsContent value="tijolos" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="comprimento">Comprimento da Parede (m)</Label>
                  <Input
                    id="comprimento"
                    type="number"
                    placeholder="Ex: 10"
                    onChange={(e) => updateInput('comprimento', e.target.value)}
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="altura">Altura da Parede (m)</Label>
                  <Input
                    id="altura"
                    type="number"
                    placeholder="Ex: 2.8"
                    onChange={(e) => updateInput('altura', e.target.value)}
                    step="0.01"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="espessura">Espessura da Parede (cm)</Label>
                <Select onValueChange={(value) => updateInput('espessura', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 cm (Tijolo comum)</SelectItem>
                    <SelectItem value="15">15 cm (Tijolo baiano)</SelectItem>
                    <SelectItem value="20">20 cm (Tijolo baiano)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="argamassa" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="area-arg">Área a Revestir (m²)</Label>
                <Input
                  id="area-arg"
                  type="number"
                  placeholder="Ex: 50"
                  onChange={(e) => updateInput('area', e.target.value)}
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="espessura-arg">Espessura do Reboco (cm)</Label>
                <Select onValueChange={(value) => updateInput('espessura', value)} defaultValue="2">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 cm (Fino)</SelectItem>
                    <SelectItem value="2">2 cm (Padrão)</SelectItem>
                    <SelectItem value="3">3 cm (Grosso)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="tinta" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="area-tinta">Área a Pintar (m²)</Label>
                <Input
                  id="area-tinta"
                  type="number"
                  placeholder="Ex: 100"
                  onChange={(e) => updateInput('area', e.target.value)}
                  step="0.01"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="demaos">Número de Demãos</Label>
                  <Select onValueChange={(value) => updateInput('demaosTinta', value)} defaultValue="2">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 demão</SelectItem>
                      <SelectItem value="2">2 demãos</SelectItem>
                      <SelectItem value="3">3 demãos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rendimento">Rendimento (m²/L)</Label>
                  <Input
                    id="rendimento"
                    type="number"
                    placeholder="12"
                    defaultValue="12"
                    onChange={(e) => updateInput('rendimentoTinta', e.target.value)}
                    step="0.1"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pisos" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="area-piso">Área a Revestir (m²)</Label>
                <Input
                  id="area-piso"
                  type="number"
                  placeholder="Ex: 80"
                  onChange={(e) => updateInput('area', e.target.value)}
                  step="0.01"
                />
                <p className="text-xs text-muted-foreground">
                  Cálculo baseado em piso 60×60cm
                </p>
              </div>
            </TabsContent>

            <TabsContent value="telhas" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="area-telha">Área do Telhado (m²)</Label>
                <Input
                  id="area-telha"
                  type="number"
                  placeholder="Ex: 120"
                  onChange={(e) => updateInput('area', e.target.value)}
                  step="0.01"
                />
                <p className="text-xs text-muted-foreground">
                  Cálculo baseado em telha cerâmica
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Button onClick={handleCalcular} className="w-full mt-6" size="lg">
            <Calculator className="mr-2 h-4 w-4" />
            Calcular Materiais
          </Button>
        </CardContent>
      </Card>

      {resultado && (
        <>
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Quantidade Necessária
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2 mb-6">
                <div className="text-4xl font-bold text-primary">
                  {resultado.quantidadeComPerda.toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {resultado.unidade} (com {resultado.percentualPerda}% de perda)
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quantidade base:</span>
                  <span className="font-medium">{resultado.quantidade.toFixed(2)} {resultado.unidade}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Perda estimada:</span>
                  <span className="font-medium">{resultado.percentualPerda}%</span>
                </div>
                <div className="pt-3 border-t flex justify-between font-semibold">
                  <span>Total a comprar:</span>
                  <span className="text-primary">{resultado.quantidadeComPerda.toFixed(2)} {resultado.unidade}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardHat className="h-5 w-5" />
                Detalhes do Material
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(resultado.detalhes).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {resultado.custoEstimado && (
            <Card>
              <CardHeader>
                <CardTitle>Custo Estimado</CardTitle>
                <CardDescription>
                  Valores aproximados baseados no mercado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Mínimo:</span>
                  <span className="font-medium">R$ {resultado.custoEstimado.minimo.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Médio:</span>
                  <span className="font-medium text-primary">R$ {resultado.custoEstimado.medio.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Máximo:</span>
                  <span className="font-medium">R$ {resultado.custoEstimado.maximo.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-2">
            <SaveCalculationDialog
              calculatorType={`materiais-${tipoMaterial}`}
              inputs={{ tipo: tipoMaterial, ...inputs }}
              results={resultado}
            />
          </div>
        </>
      )}
    </div>
  );
}
