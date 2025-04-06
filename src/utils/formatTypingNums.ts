import type { Dispatch, SetStateAction } from 'react';

import { handleCellChange } from '@/pages/home/home-utils';

// Function to format the value: remove commas, convert to number, ceil, then format with commas.
export const formatValue = (val: string): string => {
  const plain = val.replace(/,/g, '');

  return Number(plain).toLocaleString('en-US');
};

export const handleValueChange = (
  value: string,
  record: any,
  dataIndex: string,
  setTableData: Dispatch<SetStateAction<any[]>>,
  tableData: any,
) => {
  // Option 1: Format on every change (live)
  const formatted = formatValue(value);

  handleCellChange(formatted, record.key, dataIndex, setTableData, tableData);
};
