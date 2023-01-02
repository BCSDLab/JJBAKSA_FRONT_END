import { useCallback, useState } from 'react';

export default function useBooleanState(defaultValue?: boolean): ReturnType {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((x) => !x), []);

  return [value, setTrue, setFalse, toggle, setValue];
}
