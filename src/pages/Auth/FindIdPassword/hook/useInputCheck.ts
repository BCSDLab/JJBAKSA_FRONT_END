import { useEffect, useRef, useState } from 'react';

const useInputCheck = () => {
  const inputRef = useRef<HTMLInputElement[] | null[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [user, setUser] = useState({
    email: '',
    id: '',
  });

  const checkInput = () => {
    const values = inputRef.current.map((item) => item?.value);
    if (values.filter((item) => item === '').length === 0 && inputRef.current) {
      setIsDone(true);
    } else setIsDone(false);
  };

  const preventOverLength = (e: React.ChangeEvent<HTMLInputElement>, next: number) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.charAt(0);
    }
    if (inputRef.current[next - 1]?.value === '') {
      inputRef.current[next - 1]?.focus();
    } else {
      inputRef.current[next]?.focus();
    }
    checkInput();
  };

  useEffect(() => inputRef.current[0]?.focus(), []);

  return {
    isDone, inputRef, buttonRef, preventOverLength, user, setUser,
  };
};

export default useInputCheck;
