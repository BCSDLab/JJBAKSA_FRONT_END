import {
  Dispatch, SetStateAction, useCallback, useState,
} from 'react';

type ReturnType = [boolean, () => void, () => void, () => void, Dispatch<SetStateAction<boolean>>];

export default function useBooleanState(defaultValue?: boolean): ReturnType {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((x) => !x), []);

  return [value, setTrue, setFalse, toggle, setValue];
}
