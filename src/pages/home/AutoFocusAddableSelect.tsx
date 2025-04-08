import type { Dispatch, SetStateAction } from 'react';

import { EditOutlined } from '@ant-design/icons';
import { Input, Modal, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';

import { useLocale } from '@/locales';

import { handleCellChange } from './home-utils';

interface SelectOption {
  label: React.ReactNode | any;
  value: string;
}

interface AutoFocusAddableSelectProps {
  text: string;
  record: any;
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
}

const AutoFocusAddableSelect = ({
  text,
  record,
  initialOptions,
  dataIndex,
  placeholder,
  id,
  nextId,
  debounceTime = 1000,
  mode,
  allowAddNew,
  onAddNew,
  editableOptions = false,
  tableData,
  setTableData,
}: AutoFocusAddableSelectProps) => {
  const { formatMessage } = useLocale();

  const [options, setOptions] = useState(() => {
    const opts = [...initialOptions];

    if (allowAddNew) {
      opts.push({
        label: `${formatMessage({ id: 'app.home.headerInfo.addNew' })}`,
        value: 'add-new',
      });
    }

    return opts;
  });

  useEffect(() => {
    const opts = [...initialOptions];

    if (allowAddNew) {
      opts.push({
        label: `${formatMessage({ id: 'app.home.headerInfo.addNew' })}`,
        value: 'add-new',
      });
    }

    setOptions(opts);
  }, [initialOptions, allowAddNew, formatMessage]);

  const localStorageKey = `${dataIndex}-initialValue`;
  const [selected, setSelected] = useState(() => {
    const stored = localStorage.getItem(localStorageKey);

    if (stored) {
      return mode ? [stored] : stored;
    }

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

      handleCellChange(defaultVal, record.key, dataIndex, setTableData, tableData);

      localStorage.setItem(localStorageKey, defaultVal);

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
      handleCellChange(value, record.key, dataIndex, setTableData, tableData);
      localStorage.setItem(localStorageKey, value);

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
        const latestValue = newValue[newValue.length - 1];

        handleCellChange(latestValue, record.key, dataIndex, setTableData, tableData);

        localStorage.setItem(localStorageKey, latestValue);

        if (!options.find(opt => opt.value === latestValue)) {
          setOptions([...options, { label: latestValue, value: latestValue }]);
        }
      }

      localStorage.setItem('selected-cat-ID', JSON.stringify(selected[0]));
      console.log('selected', selected);
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

  useEffect(() => {
    if (!mode) {
      setSelected(text);
    } else {
      setSelected(text ? [text] : []);
    }
  }, [text, mode]);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingOption, setEditingOption] = useState<{ value: string; label: string; originalValue: any } | null>(null);
  const [editedValue, setEditedValue] = useState('');

  const handleEditClick = (option: { value: string; label: string }, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingOption({ ...option, originalValue: option.value });

    const stored = localStorage.getItem(`editedOption-${option.value}`);

    setEditedValue(stored || option.label);
    setIsEditModalVisible(true);
  };

  const handleEditSubmit = () => {
    if (editingOption) {
      localStorage.setItem(`editedOption-${dataIndex}`, editedValue);

      setOptions(prev => prev.map(opt => (opt.value === editingOption.value ? { ...opt, label: editedValue } : opt)));
      setIsEditModalVisible(false);
    }
  };

  const transformedOptions = editableOptions
    ? options.map(opt => ({
        ...opt,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{localStorage.getItem(`editedOption-${opt.value}`) || opt.label}</span>
            <EditOutlined onClick={e => handleEditClick(opt, e)} style={{ cursor: 'pointer' }} />
          </div>
        ),
      }))
    : options;

  return (
    <>
      <Select
        id={id}
        mode={mode}
        value={selected}
        placeholder={placeholder}
        onChange={onChange}
        options={transformedOptions}
        style={{ width: '100%' }}
      />
      {isEditModalVisible && (
        <Modal
          title={formatMessage({ id: 'app.home.autoFocusAddableSelect' })}
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          onOk={handleEditSubmit}
        >
          <Input value={editedValue} onChange={e => setEditedValue(e.target.value)} />
        </Modal>
      )}
    </>
  );
};

export default AutoFocusAddableSelect;
