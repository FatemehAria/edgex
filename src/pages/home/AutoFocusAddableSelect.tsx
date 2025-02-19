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
}: AutoFocusAddableSelectProps) => {
  const [options, setOptions] = useState(initialOptions);
  const defaultVal = text || (initialOptions.length > 0 ? initialOptions[0].value : '');
  const [selected, setSelected] = useState<string[]>(defaultVal ? [defaultVal] : []);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!text && defaultVal) {
      handleCellChange(defaultVal, record.key, dataIndex);
      setSelected([defaultVal]);
    }
  }, []);

  const onChange = (values: string[]) => {
    const newValue = values.length > 0 ? [values[values.length - 1]] : [];

    setSelected(newValue);

    if (newValue.length > 0) {
      handleCellChange(newValue[0], record.key, dataIndex);

      if (!options.find(opt => opt.value === newValue[0])) {
        setOptions([...options, { label: newValue[0], value: newValue[0] }]);
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
      mode="tags"
      value={selected}
      placeholder={placeholder}
      onChange={onChange}
      options={options}
      style={{ width: '100%' }}
    />
  );
};

export default AutoFocusAddableSelect;
