import type { Dispatch, SetStateAction } from 'react';

import { EditOutlined } from '@ant-design/icons';
import { Input, Modal, Select } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';

import usePrevious from '@/hooks/usePrevious';
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
  setSelectedCatId?: Dispatch<SetStateAction<string | null>>;
  editVersion: number;
  onOptionEdited: () => void;
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
  setSelectedCatId,
  editVersion,
  onOptionEdited,
}: AutoFocusAddableSelectProps) => {
  const { formatMessage } = useLocale();
  const prevOptions = usePrevious(initialOptions);
  const prevCategory = usePrevious(record.category);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const ID_PREFIX = `editedOption-${dataIndex}-`;
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

  const getInitial = () => {
    const recordValue = record[dataIndex];

    if (recordValue != null) {
      return mode ? (recordValue ? [recordValue] : []) : recordValue;
    }

    const match = initialOptions.find(opt => String(opt.label) === text);

    if (match) {
      return mode ? [match.value] : match.value;
    }

    return mode ? (text ? [text] : []) : text || '';
  };

  const [selected, setSelected] = useState(getInitial);

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!text && initialOptions.length > 0) {
      const currentValue = tableData.find(r => r.key === record.key)?.[dataIndex];

      if ((currentValue === '' || currentValue == null) && initialOptions.length > 0) {
        const defaultVal = initialOptions[0].value;

        handleCellChange(defaultVal, record.key, dataIndex, setTableData, tableData);
        localStorage.setItem(localStorageKey, defaultVal);

        if (mode === 'tags' || mode === 'multiple') {
          setSelected([defaultVal]);
        } else {
          setSelected(defaultVal);
        }

        if (dataIndex === 'category') {
          setSelectedCatId?.(defaultVal);
          // clear the items cell
          handleCellChange('', record.key, 'items', setTableData, tableData);
          localStorage.setItem('category-initialValue', defaultVal);
        }
      }
    }
  }, [initialOptions, text, dataIndex]);

  // useEffect(() => {
  //   if (dataIndex === 'items' && initialOptions.length > 0 && prevOptions !== initialOptions) {
  //     const firstVal = initialOptions[0].value;

  //     handleCellChange(firstVal, record.key, dataIndex, setTableData, tableData);

  //     localStorage.setItem(`${dataIndex}-initialValue`, firstVal);

  //     setSelected(firstVal);
  //   }
  // }, [initialOptions, dataIndex, record.key, setTableData, tableData, prevOptions]);

  useEffect(() => {
    // only for the “items” column
    if (dataIndex !== 'items') return;

    // if the category really changed…
    if (prevCategory !== record.category) {
      if (initialOptions.length > 0) {
        // we have new items → default to the first
        const defaultItem = initialOptions[0].value;

        setSelected(defaultItem);
        handleCellChange(defaultItem, record.key, 'items', setTableData, tableData);
      } else {
        // no items for this category → _clear_ the select
        const empty = mode === 'tags' || mode === 'multiple' ? [] : '';

        setSelected(empty);
        handleCellChange('', record.key, 'items', setTableData, tableData);
      }
    }
  }, [
    record.category, // watch the category
    prevCategory, // compare to last render’s category
    initialOptions, // so we know whether there _are_ any items
    dataIndex,
    record.key,
    setTableData,
    tableData,
    mode, // to know whether to clear to '' or []
  ]);

  const onChange = (value: any) => {
    if (!mode) {
      if (allowAddNew && value === 'add-new') {
        setDropdownVisible(false);
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

      setDropdownVisible(false);

      if (allowAddNew && newValue[newValue.length - 1] === 'add-new') {
        onAddNew && onAddNew();

        return;
      }

      setSelected(newValue);

      if (newValue.length > 0) {
        const latestValue = newValue[newValue.length - 1];

        setSelected([latestValue]);

        handleCellChange(latestValue, record.key, dataIndex, setTableData, tableData);

        localStorage.setItem(localStorageKey, latestValue);

        if (!options.find(opt => opt.value === latestValue)) {
          setOptions([...options, { label: latestValue, value: latestValue }]);
        }
      }

      if (dataIndex === 'category') {
        const categoryId = newValue.length > 0 ? newValue[newValue.length - 1] : '';

        setSelectedCatId && setSelectedCatId(categoryId);
        handleCellChange('', record.key, 'items', setTableData, tableData);
        localStorage.setItem('category-initialValue', categoryId);
      }

      // console.log('selected', selected);
    }

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      if (!isEditModalVisible && nextId) {
        const nextElem = document.getElementById(nextId);

        if (nextElem) nextElem.focus();
      }
    }, debounceTime);
  };

  useEffect(() => {
    setSelected(getInitial());
  }, [record[dataIndex], text, initialOptions, mode]);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingOption, setEditingOption] = useState<{ value: string; label: string; originalValue: any } | null>(null);
  const [editedValue, setEditedValue] = useState('');

  useEffect(() => {
    if (isEditModalVisible && timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [isEditModalVisible]);

  const handleEditClick = (option: { value: string; label: string }, e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownVisible(false);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setEditingOption({ ...option, originalValue: option.value });

    const stored = localStorage.getItem(`${ID_PREFIX}${option.value}`);

    setEditedValue(stored || option.label);
    setIsEditModalVisible(true);
  };

  const handleEditSubmit = () => {
    if (editingOption) {
      localStorage.setItem(`${ID_PREFIX}${editingOption.originalValue}`, editedValue);
      onOptionEdited?.();
      setOptions(prev => prev.map(opt => (opt.value === editingOption.value ? { ...opt, label: editedValue } : opt)));
      // for not resetting the editted label in ui
      // handleCellChange(editedValue, record.key, dataIndex, setTableData, tableData);

      setIsEditModalVisible(false);
    }
  };

  // useEffect(() => {
  //   console.log('selected state updated:', selected);
  // }, [selected]);

  const transformedOptions = useMemo(() => {
    return editableOptions
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
              <span>{localStorage.getItem(`${ID_PREFIX}${opt.value}`) ?? opt.label}</span>
              <EditOutlined onClick={e => handleEditClick(opt, e)} style={{ cursor: 'pointer' }} />
            </div>
          ),
        }))
      : options;
  }, [options, ID_PREFIX, editableOptions, editVersion]);

  // const transformedOptions = editableOptions
  //   ? options.map(opt => ({
  //       ...opt,
  //       label: (
  //         <div
  //           style={{
  //             display: 'flex',
  //             justifyContent: 'space-between',
  //             alignItems: 'center',
  //           }}
  //         >
  //           <span>{localStorage.getItem(`editedOption-${dataIndex}-${opt.value}`) ?? opt.label}</span>
  //           <EditOutlined onClick={e => handleEditClick(opt, e)} style={{ cursor: 'pointer' }} />
  //         </div>
  //       ),
  //     }))
  //   : options;

  return (
    <>
      <Select
        id={id}
        mode={mode}
        value={selected}
        placeholder={placeholder}
        onChange={onChange}
        options={transformedOptions}
        style={{ width: '100%', textAlign: 'right' }}
        onDropdownVisibleChange={open => setDropdownVisible(open)}
        open={dropdownVisible}
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
