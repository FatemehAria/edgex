import type { InputProps } from 'antd';

import { Input } from 'antd';
import React from 'react';

import { useDebouncedFocus } from '@/hooks/useDebouncedFocus';

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
  const { handleChange, handleFocus, handlePaste } = useDebouncedFocus<HTMLInputElement>({
    nextId,
    onDebouncedChange,
    debounceTime,
    onChange: rest.onChange,
    onPaste: rest.onPaste,
  });

  return (
    <Input id={id} {...rest} onChange={handleChange} onFocus={handleFocus} autoComplete="on" onPaste={handlePaste} />
  );
};

export default AutoFocusInput;
