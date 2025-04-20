import type { Dispatch, SetStateAction } from 'react';

import { EditOutlined } from '@ant-design/icons';
import { Input, Modal, Select } from 'antd';

import { useLocale } from '@/locales';

import { handleCellChange } from './home-utils';

interface SelectOption {
  label: React.ReactNode;
  value: string;
}

interface AutoFocusAddableSelectProps {
  record: any;
  text: string;
  initialOptions: SelectOption[];
  dataIndex: string;
  placeholder: string;
  id: string;
  nextId?: string;
  debounceTime?: number;
  mode?: 'multiple' | 'tags';
  allowAddNew?: boolean;
  onAddNew?: () => void;
  editableOptions?: boolean;
  setTableData: Dispatch<SetStateAction<any[]>>;
  tableData: any[];
  setSelectedCatId?: Dispatch<SetStateAction<string | null>>;
}

const AutoFocusAddableSelect = ({
  record,
  initialOptions,
  dataIndex,
  placeholder,
  id,
  nextId,
  debounceTime = 100,
  mode,
  allowAddNew,
  onAddNew,
  editableOptions = false,
  tableData,
  setTableData,
  setSelectedCatId,
}: AutoFocusAddableSelectProps) => {
  const { formatMessage } = useLocale();
  const baseOptions = Array.isArray(initialOptions) ? [...initialOptions] : [];

  // Always include Add New option if allowed
  if (allowAddNew) {
    baseOptions.push({ label: formatMessage({ id: 'app.home.headerInfo.addNew' }), value: 'add-new' });
  }

  // Controlled value: derive from record
  const value = record[dataIndex] || (mode ? [] : undefined);

  const handleChange = (val: any) => {
    if (!mode) {
      if (allowAddNew && val === 'add-new') {
        onAddNew?.();

        return;
      }

      handleCellChange(val, record.key, dataIndex, setTableData, tableData);

      if (dataIndex === 'category') {
        // reset items when category changes
        handleCellChange('', record.key, 'items', setTableData, tableData);
        setSelectedCatId?.(val);
      }
    } else {
      const arr = Array.isArray(val) ? val : [val];
      const latest = arr[arr.length - 1];

      if (allowAddNew && latest === 'add-new') {
        onAddNew?.();

        return;
      }

      handleCellChange(latest, record.key, dataIndex, setTableData, tableData);

      if (dataIndex === 'category') {
        handleCellChange('', record.key, 'items', setTableData, tableData);
        setSelectedCatId?.(latest);
      }
    }

    // autofocus next element
    if (nextId) {
      setTimeout(() => {
        const nxt = document.getElementById(nextId);

        nxt?.focus();
      }, debounceTime);
    }
  };

  // render editable label if needed
  const transformedOptions = editableOptions
    ? baseOptions.map(opt => ({
        ...opt,
        label: (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{localStorage.getItem(`editedOption-${opt.value}`) || opt.label}</span>
            <EditOutlined
              onClick={e => {
                e.stopPropagation();
                // open edit modal logic here if needed
              }}
              style={{ cursor: 'pointer' }}
            />
          </div>
        ),
      }))
    : baseOptions;

  return (
    <Select
      id={id}
      mode={mode}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      options={transformedOptions}
      style={{ width: '100%' }}
    />
  );
};

export default AutoFocusAddableSelect;
