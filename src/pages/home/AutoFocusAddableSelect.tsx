// AutoFocusAddableSelect.tsx
import { Select } from 'antd';
import { useEffect, useRef, useState } from 'react';

interface AutoFocusAddableSelectProps {
  text: string;
  record: any;
  handleCellChange: (value: string, key: string, dataIndex: string) => void;
  initialOptions: { label: string; value: string }[];
  dataIndex: string;
  placeholder: string;
  id: string;
  nextId?: string;
  debounceTime?: number;
  mode?: 'multiple' | 'tags';
  allowAddNew?: boolean;
  onAddNew?: () => void;
}

const AutoFocusAddableSelect = ({
  text,
  record,
  handleCellChange,
  initialOptions,
  dataIndex,
  placeholder,
  id,
  nextId,
  debounceTime = 1000,
  mode,
  allowAddNew,
  onAddNew,
}: AutoFocusAddableSelectProps) => {
  // Local options state
  const [options, setOptions] = useState(() => {
    const opts = [...initialOptions];

    if (allowAddNew) {
      opts.push({ label: 'Add New Supplier', value: 'add-new' });
    }

    return opts;
  });

  // Update local options if initialOptions or allowAddNew change.
  useEffect(() => {
    const opts = [...initialOptions];

    if (allowAddNew) {
      opts.push({ label: 'Add New Supplier', value: 'add-new' });
    }

    setOptions(opts);
  }, [initialOptions, allowAddNew]);

  // For single select (when mode is not provided) use a string; otherwise, use an array.
  const [selected, setSelected] = useState(() => {
    if (mode === 'tags' || mode === 'multiple') {
      return text ? [text] : initialOptions.length > 0 ? [initialOptions[0].value] : [];
    } else {
      return text || (initialOptions.length > 0 ? initialOptions[0].value : '');
    }
  });

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!text && initialOptions.length > 0) {
      const defaultVal = initialOptions[0].value;

      handleCellChange(defaultVal, record.key, dataIndex);

      if (mode === 'tags' || mode === 'multiple') {
        setSelected([defaultVal]);
      } else {
        setSelected(defaultVal);
      }
    }
  }, []);

  const onChange = (value: any) => {
    if (!mode) {
      if (allowAddNew && value === 'add-new') {
        onAddNew && onAddNew();

        return;
      }

      setSelected(value);
      handleCellChange(value, record.key, dataIndex);

      if (!options.find(opt => opt.value === value)) {
        setOptions([...options, { label: value, value }]);
      }
    } else {
      const newValue: string[] = Array.isArray(value) ? value : [value];

      if (allowAddNew && newValue[newValue.length - 1] === 'add-new') {
        onAddNew && onAddNew();

        return;
      }

      setSelected(newValue);

      if (newValue.length > 0) {
        handleCellChange(newValue[newValue.length - 1], record.key, dataIndex);

        if (!options.find(opt => opt.value === newValue[newValue.length - 1])) {
          setOptions([...options, { label: newValue[newValue.length - 1], value: newValue[newValue.length - 1] }]);
        }
      }
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      if (nextId) {
        const nextElem = document.getElementById(nextId);

        if (nextElem) nextElem.focus();
      }
    }, debounceTime);
  };

  return (
    <Select
      id={id}
      mode={mode}
      value={selected}
      placeholder={placeholder}
      onChange={onChange}
      options={options}
      style={{ width: '100%' }}
    />
  );
};

export default AutoFocusAddableSelect;
