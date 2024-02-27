import { atom, useAtom } from 'jotai';

export const placeIdAtom = atom('');

export const useSelected = () => {
  const [selected, setSelected] = useAtom(placeIdAtom);
  return { selected, setSelected };
};
