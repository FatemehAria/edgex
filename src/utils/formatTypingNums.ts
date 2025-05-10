import type { Dispatch, SetStateAction } from 'react';

import { handleCellChange } from '@/pages/home/home-utils';

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
  // markUnitAsEdited?: (rowKey: number) => void,
) => {
  const formatted = formatValue(value);

  // if (dataIndex === 'unitCost' && markUnitAsEdited) {
  //   markUnitAsEdited(record.key);
  // }

  handleCellChange(formatted, record.key, dataIndex, setTableData, tableData, insurancePrice, totalCostOfRows);
};
