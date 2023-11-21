import { Dispatch, SetStateAction, useState } from 'react';

interface ReturnType {
  count: number;
  increment: VoidFunction;
  decrement: VoidFunction;
  setCount: Dispatch<SetStateAction<number>>;
}

function useCounter(initialValue?: number): ReturnType {
  const [count, setCount] = useState(initialValue || 0);

  const increment = () => setCount((x) => x + 1);
  const decrement = () => setCount((x) => x - 1);

  return {
    count,
    increment,
    decrement,
    setCount,
  };
}

export default useCounter;
