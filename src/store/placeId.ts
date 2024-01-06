import { atom, useAtom } from 'jotai';

export const placeIdAtom = atom<string | null>(null);

export const useSelected = () => {
  const [selected, setSelected] = useAtom(placeIdAtom);
  return { selected, setSelected };
};
