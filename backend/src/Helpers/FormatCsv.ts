import { ICsvRow } from "../types/IData";

function formatAsCurrency(value: string) {
  const valueNumber = Number(value);

  const formattedValue = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(valueNumber);

  return formattedValue;
}

function formatDate(value: string) {
  const year = value.slice(0, 4);
  const month = value.slice(4, 6);
  const day = value.slice(6, 8);

  return `${day}/${month}/${year}`
}

export function FormatData(row: ICsvRow): ICsvRow {
  const formattedRow: any = { ...row };

  Object.keys(formattedRow).map((key) => {
    if (key.startsWith('vl')) {
      formattedRow[key] = formatAsCurrency(formattedRow[key]);
    }

    if (key.startsWith('dt')) {
      formattedRow[key] = formatDate(formattedRow[key]);
    }
  });

  return formattedRow;
}
