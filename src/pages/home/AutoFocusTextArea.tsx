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
  const timeoutRef = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  return <Input.TextArea id={id} {...rest} onChange={handleChange} />;
};

export default AutoFocusTextArea;
