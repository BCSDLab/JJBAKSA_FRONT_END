import { atom, useAtom } from 'jotai';

export const shopSearchFormAtom = atom('');
export const postSearchFormAtom = atom('');

const useSearchForm = (pathname: string) => {
  const searchFormAtom = pathname.startsWith('/shop') ? shopSearchFormAtom : postSearchFormAtom;
  const [text, setText] = useAtom(searchFormAtom);

  const resetText = () => {
    setText('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return {
    text,
    setText,
    resetText,
    handleChange,
  };
};

export default useSearchForm;
