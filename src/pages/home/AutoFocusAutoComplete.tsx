import type { AutoCompleteProps } from 'antd';

import { AutoComplete } from 'antd';
import React, { useRef } from 'react';

interface AutoFocusAutoCompleteProps extends AutoCompleteProps {
  id: string;
  nextId?: string;
  onDebouncedChange: (value: string) => void;
  debounceTime?: number;
}

const AutoFocusAutoComplete: React.FC<AutoFocusAutoCompleteProps> = ({
  id,
  nextId,
  onDebouncedChange,
  debounceTime = 500,
  ...rest
}) => {
  const timeoutRef = useRef<number | null>(null);

  const handleChange = (value: string, option: any) => {
    onDebouncedChange(value);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      if (nextId) {
        const nextElem = document.getElementById(nextId);

        if (nextElem) {
          nextElem.focus();
        }
      }
    }, debounceTime);

    if (rest.onChange) {
      rest.onChange(value, option);
    }
  };

  return <AutoComplete id={id} {...rest} onChange={handleChange} />;
};

export default AutoFocusAutoComplete;
