export type TipoMaterial = 'concreto' | 'tijolos' | 'argamassa' | 'tinta' | 'pisos' | 'telhas';

export interface MateriaisInput {
  tipo: TipoMaterial;
  area?: number; // m² (para pisos, tinta, telhas)
  volume?: number; // m³ (para concreto)
  comprimento?: number; // metros (para paredes)
  altura?: number; // metros (para paredes)
  espessura?: number; // cm (para paredes)
  demaosTinta?: number; // número de demãos
  rendimentoTinta?: number; // m²/litro
}

export interface MateriaisOutput {
  quantidade: number;
  unidade: string;
  quantidadeComPerda: number;
  percentualPerda: number;
  detalhes: {
    [key: string]: number | string;
  };
  custoEstimado?: {
    minimo: number;
    maximo: number;
    medio: number;
  };
}

export function calcularMateriais(input: MateriaisInput): MateriaisOutput {
  const { tipo } = input;

  switch (tipo) {
    case 'concreto':
      return calcularConcreto(input);
    case 'tijolos':
      return calcularTijolos(input);
    case 'argamassa':
      return calcularArgamassa(input);
    case 'tinta':
      return calcularTinta(input);
    case 'pisos':
      return calcularPisos(input);
    case 'telhas':
      return calcularTelhas(input);
    default:
      throw new Error('Tipo de material não suportado');
  }
}

function calcularConcreto(input: MateriaisInput): MateriaisOutput {
  const { volume = 0 } = input;
  const percentualPerda = 10; // 10% de perda

  // Traço 1:2:3 (cimento:areia:brita)
  const cimento = volume * 7; // sacos de 50kg
  const areia = volume * 0.5; // m³
  const brita = volume * 0.75; // m³

  const quantidadeComPerda = volume * (1 + percentualPerda / 100);

  return {
    quantidade: volume,
    unidade: 'm³',
    quantidadeComPerda: Number(quantidadeComPerda.toFixed(2)),
    percentualPerda,
    detalhes: {
      cimento: Number(cimento.toFixed(0)),
      cimentoUnidade: 'sacos 50kg',
      areia: Number(areia.toFixed(2)),
      areiaUnidade: 'm³',
      brita: Number(brita.toFixed(2)),
      britaUnidade: 'm³'
    },
    custoEstimado: {
      minimo: volume * 350,
      maximo: volume * 450,
      medio: volume * 400
    }
  };
}

function calcularTijolos(input: MateriaisInput): MateriaisOutput {
  const { comprimento = 0, altura = 0, espessura = 10 } = input;
  const area = comprimento * altura;
  const percentualPerda = 10;

  // Tijolos por m² (depende do tipo)
  // Tijolo baiano (9x19x19): ~25 tijolos/m²
  // Tijolo comum (5x10x20): ~80 tijolos/m²
  const tijolosPorM2 = espessura <= 10 ? 80 : 25;
  
  const quantidade = area * tijolosPorM2;
  const quantidadeComPerda = quantidade * (1 + percentualPerda / 100);

  return {
    quantidade: Number(quantidade.toFixed(0)),
    unidade: 'unidades',
    quantidadeComPerda: Number(quantidadeComPerda.toFixed(0)),
    percentualPerda,
    detalhes: {
      area: Number(area.toFixed(2)),
      areaUnidade: 'm²',
      tipoTijolo: espessura <= 10 ? 'Comum (5x10x20)' : 'Baiano (9x19x19)',
      tijolosPorM2
    },
    custoEstimado: {
      minimo: quantidadeComPerda * 0.50,
      maximo: quantidadeComPerda * 1.50,
      medio: quantidadeComPerda * 1.00
    }
  };
}

function calcularArgamassa(input: MateriaisInput): MateriaisOutput {
  const { area = 0, espessura = 2 } = input; // espessura em cm
  const percentualPerda = 15;

  // Volume de argamassa
  const volume = area * (espessura / 100);
  
  // Sacos de argamassa (cada saco rende ~0.02 m³)
  const sacos = volume / 0.02;
  const quantidadeComPerda = sacos * (1 + percentualPerda / 100);

  return {
    quantidade: Number(sacos.toFixed(0)),
    unidade: 'sacos 20kg',
    quantidadeComPerda: Number(quantidadeComPerda.toFixed(0)),
    percentualPerda,
    detalhes: {
      area: Number(area.toFixed(2)),
      areaUnidade: 'm²',
      espessura: espessura,
      espessuraUnidade: 'cm',
      volume: Number(volume.toFixed(3)),
      volumeUnidade: 'm³'
    },
    custoEstimado: {
      minimo: quantidadeComPerda * 8,
      maximo: quantidadeComPerda * 15,
      medio: quantidadeComPerda * 11
    }
  };
}

function calcularTinta(input: MateriaisInput): MateriaisOutput {
  const { area = 0, demaosTinta = 2, rendimentoTinta = 12 } = input;
  const percentualPerda = 10;

  // Litros necessários
  const litros = (area * demaosTinta) / rendimentoTinta;
  
  // Latas de 18L
  const latas18L = Math.ceil(litros / 18);
  
  // Galões de 3.6L
  const galoes36L = Math.ceil(litros / 3.6);

  const quantidadeComPerda = litros * (1 + percentualPerda / 100);

  return {
    quantidade: Number(litros.toFixed(2)),
    unidade: 'litros',
    quantidadeComPerda: Number(quantidadeComPerda.toFixed(2)),
    percentualPerda,
    detalhes: {
      area: Number(area.toFixed(2)),
      areaUnidade: 'm²',
      demaos: demaosTinta,
      rendimento: rendimentoTinta,
      rendimentoUnidade: 'm²/L',
      latas18L,
      galoes36L
    },
    custoEstimado: {
      minimo: latas18L * 80,
      maximo: latas18L * 200,
      medio: latas18L * 140
    }
  };
}

function calcularPisos(input: MateriaisInput): MateriaisOutput {
  const { area = 0 } = input;
  const percentualPerda = 10;

  // Assumindo piso 60x60cm (0.36m² por peça)
  const pecas = area / 0.36;
  const quantidadeComPerda = pecas * (1 + percentualPerda / 100);

  // Caixas (cada caixa tem ~2.5m²)
  const caixas = Math.ceil(area / 2.5);

  return {
    quantidade: Number(pecas.toFixed(0)),
    unidade: 'peças',
    quantidadeComPerda: Number(quantidadeComPerda.toFixed(0)),
    percentualPerda,
    detalhes: {
      area: Number(area.toFixed(2)),
      areaUnidade: 'm²',
      tamanhoPeca: '60x60cm',
      caixas,
      caixasUnidade: 'caixas (~2.5m²)'
    },
    custoEstimado: {
      minimo: area * 25,
      maximo: area * 150,
      medio: area * 75
    }
  };
}

function calcularTelhas(input: MateriaisInput): MateriaisOutput {
  const { area = 0 } = input;
  const percentualPerda = 15;

  // Telhas por m² (varia por tipo)
  // Cerâmica: ~17 telhas/m²
  // Concreto: ~10 telhas/m²
  const telhasPorM2 = 17; // Assumindo cerâmica

  const quantidade = area * telhasPorM2;
  const quantidadeComPerda = quantidade * (1 + percentualPerda / 100);

  return {
    quantidade: Number(quantidade.toFixed(0)),
    unidade: 'unidades',
    quantidadeComPerda: Number(quantidadeComPerda.toFixed(0)),
    percentualPerda,
    detalhes: {
      area: Number(area.toFixed(2)),
      areaUnidade: 'm²',
      tipoTelha: 'Cerâmica',
      telhasPorM2
    },
    custoEstimado: {
      minimo: quantidadeComPerda * 2,
      maximo: quantidadeComPerda * 5,
      medio: quantidadeComPerda * 3.5
    }
  };
}
