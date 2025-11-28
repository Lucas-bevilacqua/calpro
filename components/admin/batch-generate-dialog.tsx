'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function BatchGenerateDialog() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<any[]>([]);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (count < 1 || count > 20) {
      toast({
        title: 'Erro',
        description: 'Escolha entre 1 e 20 artigos',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setProgress([]);

    try {
      const response = await fetch('/api/ai/generate-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count }),
      });

      const data = await response.json();

      if (data.success) {
        setProgress(data.results);
        toast({
          title: 'Sucesso!',
          description: `${data.generated} artigos gerados com sucesso!`,
        });
        
        // Refresh page after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        throw new Error('Falha na geração');
      }
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao gerar artigos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Sparkles className="h-4 w-4" />
          Gerar Múltiplos Artigos
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gerar Artigos em Lote</DialogTitle>
          <DialogDescription>
            Gere múltiplos artigos de uma vez usando IA. Cada artigo terá 2.500-3.000 palavras.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="count">Quantidade de Artigos</Label>
            <div className="flex gap-2">
              <Input
                id="count"
                type="number"
                min={1}
                max={20}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                disabled={loading}
                className="flex-1"
              />
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCount(3)}
                  disabled={loading}
                >
                  3
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCount(5)}
                  disabled={loading}
                >
                  5
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCount(10)}
                  disabled={loading}
                >
                  10
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              ⏱️ Tempo estimado: ~{count * 2} min | 💰 Custo: ~${(count * 0.20).toFixed(2)} | 🖼️ Imagens incluídas
            </p>
          </div>

          {loading && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Gerando artigos... Aguarde</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Isso pode levar alguns minutos. Não feche esta janela.
              </div>
            </div>
          )}

          {progress.length > 0 && (
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              <Label>Progresso:</Label>
              {progress.map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  {item.success ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <span className="flex-1">{item.title || item.topicId}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Gerar {count} Artigos
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
