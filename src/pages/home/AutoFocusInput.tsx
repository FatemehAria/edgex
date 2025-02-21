import type { InputProps } from 'antd';

import { Input } from 'antd';
import React, { useRef } from 'react';

interface AutoFocusInputProps extends InputProps {
  id: string;
  nextId?: string;
  onDebouncedChange: (value: string) => void;
  debounceTime?: number;
}

const AutoFocusInput: React.FC<AutoFocusInputProps> = ({
  id,
  nextId,
  onDebouncedChange,
  debounceTime = 500,
  ...rest
}) => {
  const timeoutRef = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

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
      rest.onChange(e);
    }
  };

  return <Input id={id} {...rest} onChange={handleChange} autoComplete="on" />;
};

export default AutoFocusInput;
