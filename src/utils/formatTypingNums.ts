import type { Dispatch, SetStateAction } from 'react';

import { handleCellChange } from '@/pages/home/home-utils';

// Function to format the value: remove commas, convert to number, ceil, then format with commas.
// export const formatValue = (val: string): string => {
//   const plain = val.replace(/,/g, '');

//   return Number(plain).toLocaleString('en-US');
// };

//handling decimals in fields
export const formatValue = (val: string): string => {
  const plain = val.replace(/,/g, '');

  if (plain === '') return '';

  const match = plain.match(/^(\d*)(\.\d*)?$/);

  if (!match) {
    return plain;
  }

  const [, intPart, decPart] = match;
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decPart != null ? `${withCommas}${decPart}` : withCommas;
};

export const handleValueChange = (
  value: string,
  record: any,
  dataIndex: string,
  setTableData: Dispatch<SetStateAction<any[]>>,
  tableData: any,
  insurancePrice: number,
  totalCostOfRows: number,
) => {
  // Option 1: Format on every change (live)
  const formatted = formatValue(value);

  handleCellChange(formatted, record.key, dataIndex, setTableData, tableData, insurancePrice, totalCostOfRows);
};
