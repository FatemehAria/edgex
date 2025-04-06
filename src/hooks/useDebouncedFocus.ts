import { useEffect, useRef } from 'react';

interface UseDebouncedFocusProps<T extends HTMLInputElement | HTMLTextAreaElement> {
  nextId?: string;
  onDebouncedChange: (value: string) => void;
  debounceTime?: number;
  onChange?: (e: React.ChangeEvent<T>) => void;
  onPaste?: (e: React.ClipboardEvent<T>) => void;
}

export const useDebouncedFocus = <T extends HTMLInputElement | HTMLTextAreaElement>({
  nextId,
  onDebouncedChange,
  debounceTime = 500,
  onChange,
  onPaste,
}: UseDebouncedFocusProps<T>) => {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<T>) => {
    const value = e.target.value;

    onDebouncedChange(value);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      if (nextId) {
        const nextElem = document.getElementById(nextId);

        if (nextElem) nextElem.focus();
      }
    }, debounceTime);

    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<T>) => {
    setTimeout(() => {
      onDebouncedChange(e.currentTarget.value);
    }, 0);

    if (onPaste) {
      onPaste(e);
    }
  };

  return { handleChange, handleFocus, handlePaste };
};
