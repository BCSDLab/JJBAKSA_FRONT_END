import { atom, useAtomValue, useSetAtom } from 'jotai';

const switchAtom = atom(false);

const useLocationActive = () => {
  const setCount = useSetAtom(switchAtom);

  const state = useAtomValue(switchAtom);
  const setTrue = () => setCount(true);
  const setFalse = () => setCount(false);
  const toggle = () => setCount((prev) => !prev);

  return {
    state, setTrue, setFalse, toggle,
  };
};

export default useLocationActive;
