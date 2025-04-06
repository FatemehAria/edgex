import { useDebouncedFocus } from '@/hooks/useDebouncedFocus';
import { Input } from 'antd';
import React, { useRef } from 'react';

type TextAreaProps = React.ComponentProps<typeof Input.TextArea>;

interface AutoFocusTextAreaProps extends TextAreaProps {
  id: string;
  nextId?: string;
  onDebouncedChange: (value: string) => void;
  debounceTime?: number;
}

const AutoFocusTextArea: React.FC<AutoFocusTextAreaProps> = ({
  id,
  nextId,
  onDebouncedChange,
  debounceTime = 500,
  ...rest
}) => {
  const { handleChange, handleFocus, handlePaste } = useDebouncedFocus<HTMLTextAreaElement>({
    nextId,
    onDebouncedChange,
    debounceTime,
    onChange: rest.onChange,
    onPaste: rest.onPaste,
  });

  return (
    <Input.TextArea
      id={id}
      {...rest}
      onChange={handleChange}
      onFocus={handleFocus}
      autoComplete="on"
      onPaste={handlePaste}
    />
  );
};

export default AutoFocusTextArea;
