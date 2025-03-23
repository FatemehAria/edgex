import type { InputProps } from 'antd';

import { Input } from 'antd';
import React, { useEffect, useRef } from 'react';

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
  // const timeoutRef = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    onDebouncedChange(value);

    // useEffect(() => {
    //   return () => {
    //     if (timeoutRef.current) {
    //       window.clearTimeout(timeoutRef.current);
    //     }
    //   };
    // }, []);

    // timeoutRef.current = window.setTimeout(() => {
    //   if (nextId) {
    //     const nextElem = document.getElementById(nextId);

    //     if (nextElem) {
    //       nextElem.focus();
    //     }
    //   }
    // }, debounceTime);

    if (rest.onChange) {
      rest.onChange(e);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    setTimeout(() => {
      onDebouncedChange(e.currentTarget.value);
    }, 0);

    if (rest.onPaste) {
      rest.onPaste(e);
    }
  };

  return <Input id={id} {...rest} onChange={handleChange} autoComplete="on" onPaste={handlePaste} />;
};

export default AutoFocusInput;
