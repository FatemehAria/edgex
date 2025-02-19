import { Select } from 'antd';
import { useEffect, useState } from 'react';

const AddableSelect = ({
  text,
  record,
  handleCellChange,
  initialOptions,
}: {
  text: string;
  record: any;
  handleCellChange: (value: string, key: string, dataIndex: string) => void;
  initialOptions: { label: string; value: string }[];
}) => {
  // Manage available options locally
  const [options, setOptions] = useState(initialOptions);

  // Determine the default value:
  // If there's an existing value (text), use it;
  // otherwise, if initialOptions exist, use the first one.
  const defaultVal = text || (initialOptions.length > 0 ? initialOptions[0].value : '');
  // Because Select in tags mode expects its value as an array, we use an array here.
  const [selected, setSelected] = useState<string[]>(defaultVal ? [defaultVal] : []);

  // On mount, if no category is set, set the default.
  useEffect(() => {
    if (!text && defaultVal) {
      handleCellChange(defaultVal, record.key, 'category');
      setSelected([defaultVal]);
    }
  }, []);

  const onChange = (values: string[]) => {
    // Enforce a single selection: only keep the last entered value.
    const newValue = values.slice(-1);

    setSelected(newValue);

    if (newValue.length > 0) {
      // Update the table data with the new (string) value.
      handleCellChange(newValue[0], record.key, 'category');

      // Add the new value to options if it isn’t already there.
      if (!options.find(opt => opt.value === newValue[0])) {
        setOptions([...options, { label: newValue[0], value: newValue[0] }]);
      }
    }
  };

  return (
    <Select
      mode="tags"
      value={selected}
      placeholder="Select or add a category"
      onChange={onChange}
      options={options}
      style={{ width: '100%' }}
    />
  );
};

export default AddableSelect;
