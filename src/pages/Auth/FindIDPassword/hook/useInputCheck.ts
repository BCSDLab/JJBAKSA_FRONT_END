import { useRef, useState, useEffect } from 'react';

const useInputCheck = () => {
  const inputRef = useRef<HTMLInputElement[] | null[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isDone, setIsDone] = useState<boolean>(false);

  const checkInput = () => {
    const values = inputRef.current.map((item) => item?.value);
    if (values.filter((item) => item === '').length === 0 && inputRef.current) {
      setIsDone(true);
    } else setIsDone(false);
  };

  const preventOverLength = (e: React.ChangeEvent<HTMLInputElement>, next: number) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.charAt(0);
      if (next <= 3) {
        inputRef.current[next]?.focus();
      } else {
        buttonRef.current?.focus();
      }
    }
    checkInput();
  };

  useEffect(() => inputRef.current[0]?.focus(), []);

  return {
    isDone, inputRef, buttonRef, preventOverLength,
  };
};

export default useInputCheck;
