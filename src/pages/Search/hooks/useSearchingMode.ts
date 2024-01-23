import { useEffect, useState } from 'react';

type Props = { inputRef: React.MutableRefObject<HTMLInputElement | null> };

const useSearchingMode = ({ inputRef }: Props) => {
  const [isSearching, setIsSearching] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const safeTextValue = inputRef.current && inputRef.current.value;

  useEffect(() => {
    setIsText(inputRef.current ? inputRef.current.value.length > 0 : false);
  }, [inputRef, safeTextValue]);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const node = inputRef.current;
    if (node) {
      node.addEventListener('focus', handleFocus);
      node.addEventListener('blur', handleBlur);
    }

    return () => {
      if (node) {
        node.removeEventListener('focus', handleFocus);
        node.removeEventListener('blur', handleBlur);
      }
    };
  }, [inputRef]);

  useEffect(() => {
    setIsSearching(isText || isFocused);
  }, [isText, isFocused]);

  return isSearching;
};

export default useSearchingMode;
