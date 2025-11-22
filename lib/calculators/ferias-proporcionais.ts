import { calcularINSS, calcularIRRF } from './utils/tax';

export interface FeriasProporcionaisInput {
  salarioBruto: number;
  dataAdmissao: Date;
  dataReferencia: Date; // Data de cálculo (normalmente data atual ou de saída)
  dependentes?: number;
  feriasVencidas?: number; // Períodos de férias vencidas não gozadas
}

export interface FeriasProporcionaisOutput {
  avosFerias: number;
  valorFerias: number;
  umTercoFerias: number;
  feriasVencidas: number;
  umTercoFeriasVencidas: number;
  totalBruto: number;
  descontoINSS: number;
  descontoIRRF: number;
  totalLiquido: number;
  memoriaCalculo: {
    mesesTrabalhados: number;
    periodoAquisitivo: {
      inicio: Date;
      fim: Date;
    };
  };
}

export function calcularFeriasProporcionais(input: FeriasProporcionaisInput): FeriasProporcionaisOutput {
  const { salarioBruto, dataAdmissao, dataReferencia, dependentes = 0, feriasVencidas = 0 } = input;

  // Encontrar o início do período aquisitivo atual
  let inicioPeriodoAquisitivo = new Date(dataAdmissao);
  
  // Avançar para o último aniversário de admissão antes da data de referência
  while (true) {
    const proximoAniversario = new Date(inicioPeriodoAquisitivo);
    proximoAniversario.setFullYear(proximoAniversario.getFullYear() + 1);
    
    if (proximoAniversario > dataReferencia) {
      break;
    }
    
    inicioPeriodoAquisitivo = proximoAniversario;
  }

  // Calcular avos (meses completos + fração >= 15 dias)
  let avosFerias = 0;
  let tempDate = new Date(inicioPeriodoAquisitivo);
  
  while (tempDate < dataReferencia) {
    const nextMonth = new Date(tempDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    if (nextMonth <= dataReferencia) {
      avosFerias++;
      tempDate = nextMonth;
    } else {
      // Verificar fração final
      const diffTime = dataReferencia.getTime() - tempDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays >= 15) {
        avosFerias++;
      }
      break;
    }
  }

  // Limitar a 12 avos
  if (avosFerias > 12) avosFerias = 12;

  // Calcular valores
  const valorFerias = (salarioBruto / 12) * avosFerias;
  const umTercoFerias = valorFerias / 3;

  // Férias vencidas (se houver)
  const valorFeriasVencidas = feriasVencidas * salarioBruto;
  const umTercoFeriasVencidas = valorFeriasVencidas / 3;

  // Total bruto
  const totalBruto = valorFerias + umTercoFerias + valorFeriasVencidas + umTercoFeriasVencidas;

  // Descontos (férias não sofrem desconto de INSS/IRRF quando indenizadas)
  // Mas se forem gozadas, há desconto. Assumindo indenizadas:
  const descontoINSS = 0;
  const descontoIRRF = 0;

  const totalLiquido = totalBruto - descontoINSS - descontoIRRF;

  // Calcular meses trabalhados totais
  const mesesTrabalhados = Math.floor(
    (dataReferencia.getTime() - dataAdmissao.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );

  return {
    avosFerias,
    valorFerias: Number(valorFerias.toFixed(2)),
    umTercoFerias: Number(umTercoFerias.toFixed(2)),
    feriasVencidas: Number(valorFeriasVencidas.toFixed(2)),
    umTercoFeriasVencidas: Number(umTercoFeriasVencidas.toFixed(2)),
    totalBruto: Number(totalBruto.toFixed(2)),
    descontoINSS: Number(descontoINSS.toFixed(2)),
    descontoIRRF: Number(descontoIRRF.toFixed(2)),
    totalLiquido: Number(totalLiquido.toFixed(2)),
    memoriaCalculo: {
      mesesTrabalhados,
      periodoAquisitivo: {
        inicio: inicioPeriodoAquisitivo,
        fim: new Date(inicioPeriodoAquisitivo.getFullYear() + 1, inicioPeriodoAquisitivo.getMonth(), inicioPeriodoAquisitivo.getDate())
      }
    }
  };
}
