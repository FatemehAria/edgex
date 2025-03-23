import { EditOutlined } from '@ant-design/icons';
import { Input, Modal, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';

import { useLocale } from '@/locales';

interface SelectOption {
  label: React.ReactNode | any;
  value: string;
}

interface AutoFocusAddableSelectProps {
  text: string;
  record: any;
  handleCellChange: (value: string, key: string, dataIndex: string) => void;
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
  editableOptions = false,
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

  // For single select use string; for multiple/tags, use array.
  const [selected, setSelected] = useState(() => {
    if (mode === 'tags' || mode === 'multiple') {
      return text ? [text] : initialOptions.length > 0 ? [initialOptions[0].value] : [];
    } else {
      return text || (initialOptions.length > 0 ? initialOptions[0].value : '');
    }
  });

  // const timeoutRef = useRef<number | null>(null);

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

      localStorage.setItem('selected-cat-ID', JSON.stringify(selected[0]));
      console.log('selected', selected);
    }

    // if (timeoutRef.current) {
    //   window.clearTimeout(timeoutRef.current);
    // }

    // timeoutRef.current = window.setTimeout(() => {
    //   if (nextId) {
    //     const nextElem = document.getElementById(nextId);

    //     if (nextElem) nextElem.focus();
    //   }
    // }, debounceTime);
  };

  useEffect(() => {
    if (!mode) {
      setSelected(text);
    } else {
      setSelected(text ? [text] : []);
    }
  }, [text, mode]);

  // --- Editable Options Logic ---
  // State for controlling the edit modal.
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingOption, setEditingOption] = useState<{ value: string; label: string; originalValue: any } | null>(null);
  const [editedValue, setEditedValue] = useState('');

  // When the edit icon is clicked.
  const handleEditClick = (option: { value: string; label: string }, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingOption({ ...option, originalValue: option.value });

    const stored = localStorage.getItem(`editedOption-${option.value}`);

    setEditedValue(stored || option.label);
    setIsEditModalVisible(true);
  };

  const handleEditSubmit = () => {
    if (editingOption) {
      localStorage.setItem(`editedOption-${editingOption.value}`, editedValue);

      setOptions(prev => prev.map(opt => (opt.value === editingOption.value ? { ...opt, label: editedValue } : opt)));
      setIsEditModalVisible(false);
    }
  };

  // Transform options to include an edit icon if editableOptions is true.
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
          title="Edit Option"
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