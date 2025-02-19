import React from 'react';

function FormatWithComma({
  text,
  record,
  handleCellChange,
  children,
}: {
  text: string;
  record: any;
  handleCellChange: (value: string, key: string, dataIndex: string) => void;
  children: React.ReactNode;
}) {
  // Function to format the value: remove commas, convert to number,then format with commas.
  const formatValue = (val: string): string => {
    const plain = val.replace(/,/g, '');

    return Number(plain).toLocaleString('en-US');
  };

  // When the value changes, we can do live formatting..
  const handleValueChange = (value: string) => {
    // Option 1: Format on every change (live)
    const formatted = formatValue(value);

    handleCellChange(formatted, record.key, 'unitCost');
  };

  // Alternatively, you can format on blur (when the user leaves the field)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const formatted = formatValue(e.target.value);

    handleCellChange(formatted, record.key, 'unitCost');
  };

  return { children };
}

export default FormatWithComma;
