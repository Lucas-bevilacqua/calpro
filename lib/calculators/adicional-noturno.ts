export interface AdicionalNoturnoInput {
  salarioBase: number;
  horasNoturnasMes: number;
  horasDiurnasMes: number;
  adicionalNoturno?: number; // Percentual (padrão 20%)
  reducaoHora?: number; // Minutos (padrão 52min30s = 7/8 de hora)
}

export interface AdicionalNoturnoOutput {
  valorHoraDiurna: number;
  valorHoraNoturna: number;
  valorHoraNoturnaReduzida: number;
  horasNoturnasReduzidas: number;
  valorAdicional: number;
  valorTotalNoturno: number;
  salarioTotal: number;
  memoriaCalculo: {
    adicionalPercentual: number;
    reducaoMinutos: number;
    fatorReducao: number;
  };
}

export function calcularAdicionalNoturno(input: AdicionalNoturnoInput): AdicionalNoturnoOutput {
  const {
    salarioBase,
    horasNoturnasMes,
    horasDiurnasMes,
    adicionalNoturno = 20,
    reducaoHora = 52.5 // 52min30s
  } = input;

  // Calcular valor da hora diurna
  const horasTotaisMes = horasNoturnasMes + horasDiurnasMes;
  const valorHoraDiurna = salarioBase / horasTotaisMes;

  // Calcular valor da hora noturna (com adicional)
  const valorHoraNoturna = valorHoraDiurna * (1 + adicionalNoturno / 100);

  // Aplicar redução da hora noturna (52min30s = 7/8 de hora)
  // Cada hora noturna vale 52min30s, então trabalha menos tempo para mesma remuneração
  const fatorReducao = 60 / reducaoHora; // 60 / 52.5 = 1.142857
  const horasNoturnasReduzidas = horasNoturnasMes * fatorReducao;
  const valorHoraNoturnaReduzida = valorHoraNoturna * fatorReducao;

  // Calcular valores
  const valorAdicional = (valorHoraNoturna - valorHoraDiurna) * horasNoturnasReduzidas;
  const valorTotalNoturno = valorHoraNoturna * horasNoturnasReduzidas;
  const salarioTotal = salarioBase + valorAdicional;

  return {
    valorHoraDiurna: Number(valorHoraDiurna.toFixed(2)),
    valorHoraNoturna: Number(valorHoraNoturna.toFixed(2)),
    valorHoraNoturnaReduzida: Number(valorHoraNoturnaReduzida.toFixed(2)),
    horasNoturnasReduzidas: Number(horasNoturnasReduzidas.toFixed(2)),
    valorAdicional: Number(valorAdicional.toFixed(2)),
    valorTotalNoturno: Number(valorTotalNoturno.toFixed(2)),
    salarioTotal: Number(salarioTotal.toFixed(2)),
    memoriaCalculo: {
      adicionalPercentual: adicionalNoturno,
      reducaoMinutos: reducaoHora,
      fatorReducao: Number(fatorReducao.toFixed(6))
    }
  };
}

export function getHorarioNoturno(): string {
  return "22h às 5h (urbano) ou 21h às 5h (rural)";
}

export function getAdicionalMinimo(): number {
  return 20; // 20% mínimo por lei
}
